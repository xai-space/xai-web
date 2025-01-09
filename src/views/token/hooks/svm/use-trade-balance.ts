import { useConnection } from '@solana/wallet-adapter-react'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { useQuery } from '@tanstack/react-query'
import { web3 } from '@coral-xyz/anchor'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isSolanaWallet } from '@dynamic-labs/solana'

import { useTokenContext } from '@/contexts/token'

export const useSvmTradeBalance = () => {
  // const { publicKey } = useWallet()
  const { primaryWallet } = useDynamicContext()
  const { connection } = useConnection()
  const { tokenAddr } = useTokenContext()

  const {
    data: balanceSol = '0',
    isFetching: isFetchingReserve,
    refetch: refetchNativeBalance,
  } = useQuery({
    queryKey: ['getNativeBalance', primaryWallet?.address],
    queryFn: async () => await primaryWallet?.getBalance(),
    enabled: !!primaryWallet && isSolanaWallet(primaryWallet),
    refetchInterval: 5_000,
  })

  const {
    data: tokenBalance = 0,
    isFetching: isFetchingToken,
    refetch: refetchTokenBalance,
  } = useQuery({
    queryKey: ['getMintBalance', tokenAddr, primaryWallet?.address],
    queryFn: async () => {
      const tokenAccount = await getAssociatedTokenAddress(
        new web3.PublicKey(tokenAddr),
        new web3.PublicKey(primaryWallet?.address!)
      )

      const tokenAmount = await connection.getTokenAccountBalance(tokenAccount)

      return tokenAmount.value.amount ?? 0
    },
    enabled: !!tokenAddr && !!primaryWallet && isSolanaWallet(primaryWallet),
    refetchInterval: 5_000,
  })

  const refetchBalance = () => {
    refetchNativeBalance()
    refetchTokenBalance()
  }

  return {
    nativeBalance: balanceSol,
    tokenBalance: tokenBalance,
    isFetchingBalance: isFetchingReserve || isFetchingToken,
    refetchBalance,
  }
}
