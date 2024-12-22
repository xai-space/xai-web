import { useMutation } from '@tanstack/react-query'
import { useConnection } from '@solana/wallet-adapter-react'
import BigNumber from 'bignumber.js'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isSolanaWallet } from '@dynamic-labs/solana'
import { BN, web3 } from '@coral-xyz/anchor'

import { CONTRACT_ERR } from '@/errors/contract'
import { getRecommendAccount, getTradeAccount } from '@/program/token/account'
import {
  formatSol,
  parseSol,
  useProgram,
  useVersionedTransaction,
  useWaitTransactionConfirm,
} from '@/packages/react-sol'
import { IDL } from '@/program/token/idl'
import { programIds } from '@/program'
import { subSlippage } from '@/utils/contract'
import { useInvite } from '@/hooks/use-invite'
import { zeroAddress } from 'viem'
import { WALLET_ERR } from '@/errors/wallet'
import { useDynamicWallet } from '@/hooks/dynamic/use-dynamic-wallet'
import { useSvmTradeAmount } from './use-trade-amount'

export const useSvmTrade = (tokenAddr?: string, onSuccess?: VoidFunction) => {
  const { primaryWallet } = useDynamicContext()
  const { currentNetwork: network } = useDynamicWallet()
  const { getTokenAmount, getReserveAmount } = useSvmTradeAmount(tokenAddr)
  const { connection } = useConnection()
  const { getReferrals } = useInvite()
  const { send } = useVersionedTransaction()
  const { program, error } = useProgram({
    idl: IDL,
    programId: programIds.programId,
  })

  // Build TX instructions
  let instructions: web3.TransactionInstruction[] = []

  const checkForTrade = (amount: string) => {
    if (!!primaryWallet && !isSolanaWallet(primaryWallet)) {
      WALLET_ERR.errorChain('Solana')
      return false
    }
    if (BigNumber(amount).lte(0)) {
      CONTRACT_ERR.balanceInvalid()
      return false
    }
    return true
  }

  /** Invite reward */
  const initRecommendAccounts = async () => {
    const [parent, gparent] = await getReferrals()
    // Test data
    // const [parent, gparent] = [
    //   '8JEzcbe725oNHksvSPTgNBUoQb7SBKc69ZdnC4c9uGvq',
    //   'D9eUQ9xKX7VE41nVKzo4GgrCRiC76FMP13FQMohXFXwA',
    // ]

    // Only recommended accounts with non-zero addresses are considered
    const recommendAccounts: web3.PublicKey[] = [parent, gparent]
      .filter((account) => account !== zeroAddress)
      .map((account) => new web3.PublicKey(account))

    // console.log('recommendAccounts', recommendAccounts)

    const accountPdas: web3.PublicKey[] = []
    const accountInfos: (web3.AccountInfo<Buffer> | null)[] = []

    await Promise.all(
      recommendAccounts.map(async (account) => {
        const { pda, accountInfo } = await getRecommendAccount(
          account,
          connection
        )
        accountPdas.push(pda)
        accountInfos.push(accountInfo)
      })
    )

    // console.log('accountPdas', accountPdas, accountInfos)

    instructions = []
    // If the account is not initialized
    for (let index = 0; index < accountInfos.length; index++) {
      const info = accountInfos[index]
      if (!info) {
        const ix = await program?.methods
          .initializeFeeRecommendReward()
          .accounts({
            feeRecommendReward: accountPdas[index],
            recommender: recommendAccounts[index],
            user: new web3.PublicKey(primaryWallet?.address!),
            systemProgram: web3.SystemProgram.programId,
          })
          .instruction()
        instructions.push(ix!)
      }
    }

    // console.log('instructions', instructions)
    const remainingAccounts: {
      pubkey: web3.PublicKey
      isWritable: boolean
      isSigner: boolean
    }[] = []

    // Unchangeable order
    recommendAccounts.forEach((account, index) => {
      if (account) {
        // Add invited accounts
        remainingAccounts.push({
          pubkey: account,
          isWritable: true,
          isSigner: false,
        })
      }
    })
    recommendAccounts.forEach((account, index) => {
      if (account) {
        // add invited PDA accounts
        remainingAccounts.push({
          pubkey: accountPdas[index],
          isWritable: true,
          isSigner: false,
        })
      }
    })

    return remainingAccounts
  }

  const getBuyInstructions = async (
    reserveAmount: string,
    slippage: string,
    tokenAddr: string
  ) => {
    const tokenAmount = await getTokenAmount(reserveAmount)

    const amountIn = new BN(parseSol(reserveAmount).toString())
    console.log('amountIn', amountIn.toString(), new BN(subSlippage(formatSol(tokenAmount), slippage, network)).toString())

    const ctx = await getTradeAccount(
      new web3.PublicKey(primaryWallet?.address!),
      tokenAddr
    )

    const remainingAccounts = await initRecommendAccounts()

    const ix_final = await program!.methods
      .buy(
        amountIn,
        new BN(subSlippage(formatSol(tokenAmount), slippage, network))
      )
      .accounts(ctx)
      .remainingAccounts(remainingAccounts)
      .instruction()

    instructions.push(ix_final!)

    return instructions
  }

  const {
    data: buyHash,
    isPending: isBuySubmitting,
    mutateAsync: buy,
    reset: resetBuy,
  } = useMutation({
    mutationKey: ['svm-trade-buy'],
    mutationFn: async ({
      reserveAmount,
      slippage,
    }: {
      reserveAmount: string
      slippage: string
    }) => {
      if (!checkForTrade(reserveAmount)) return
      if (!program) throw error
      console.log("reserveAmount", reserveAmount);

      await getBuyInstructions(reserveAmount, slippage, tokenAddr!)

      return send(instructions)
    },
    onError: ({ message }) => {
      CONTRACT_ERR.message(message)
    },
  })

  const {
    data: sellHash,
    isPending: isSellSubmitting,
    mutateAsync: sell,
    reset: resetSell,
  } = useMutation({
    mutationKey: ['svm-trade-sell'],
    mutationFn: async ({
      tokenAmount,
      slippage,
    }: {
      tokenAmount: string
      slippage: string
    }) => {
      if (!checkForTrade(tokenAmount)) return
      if (!program) throw error

      const reserveAmount = await getReserveAmount(tokenAmount)
      const ctx = await getTradeAccount(
        new web3.PublicKey(primaryWallet?.address!),
        tokenAddr!
      )

      const amountIn = new BN(parseSol(tokenAmount).toFixed(0))

      const remainingAccounts = await initRecommendAccounts()

      const ix_final = await program.methods
        .sell(
          amountIn,
          new BN(subSlippage(formatSol(reserveAmount), slippage, network))
        )
        .accounts(ctx)
        .remainingAccounts(remainingAccounts)
        .instruction()

      instructions.push(ix_final!)

      return send(instructions)
    },
  })

  const resetTrade = () => {
    resetBuy()
    resetSell()
  }

  const { data: result, isFetched: isTraded } = useWaitTransactionConfirm({
    signature: buyHash || sellHash,
    onSuccess: () => {
      onSuccess?.()
    },
    onFinally: () => {
      resetTrade()
    },
  })

  return {
    hash: buyHash || sellHash,
    isSubmitting: isBuySubmitting || isSellSubmitting,
    isTraded,
    buy,
    getBuyInstructions,
    sell,
    resetTrade,
  }
}
