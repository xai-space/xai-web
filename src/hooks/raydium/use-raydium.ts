import { useEffect, useState } from "react"
import { programIds } from '@/program'
import { ApiV3PoolInfoConcentratedItem, ClmmKeys, ComputeClmmPoolInfo, PoolUtils, Raydium, ReturnTypeFetchMultiplePoolTickArrays, TxVersion } from '@raydium-io/raydium-sdk-v2'
import { clusterApiUrl } from '@solana/web3.js'
import { useConnection } from "@solana/wallet-adapter-react"
import { BN } from "@coral-xyz/anchor"
import { PublicKey } from "@metaplex-foundation/js"
import { isValidClmm } from "./utils"
import { parseSol } from "@/packages/react-sol"
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { isSolanaWallet } from "@dynamic-labs/solana"
import { CONTRACT_ERR } from "@/errors/contract"
import { useInitRaydium } from "./use-init-raydium"
import BigNumber from "bignumber.js"

const inputMint = new PublicKey("So11111111111111111111111111111111111111112").toBase58()

let poolInfo: ApiV3PoolInfoConcentratedItem
let clmmPoolInfo: ComputeClmmPoolInfo
let tickCache: ReturnTypeFetchMultiplePoolTickArrays
let poolKeys: ClmmKeys | undefined

export const useRaydium = (poolId: string, onSuccess?: () => void) => {
    const { t } = useTranslation()
    const { raydium } = useInitRaydium()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [txId, setTxId] = useState<string>()


    const getPoolInfo = async () => {
        if (!raydium) return


        if (raydium.cluster === 'mainnet') {
            const data = await raydium.api.fetchPoolById({ ids: poolId })

            poolInfo = data[0] as ApiV3PoolInfoConcentratedItem
            if (!isValidClmm(poolInfo.programId)) throw new Error('target pool is not CLMM pool')

            clmmPoolInfo = await PoolUtils.fetchComputeClmmInfo({
                connection: raydium.connection,
                poolInfo,
            })
            tickCache = await PoolUtils.fetchMultiplePoolTickArrays({
                connection: raydium.connection,
                poolKeys: [clmmPoolInfo],
            })
        } else {
            const data = await raydium.clmm.getPoolInfoFromRpc(poolId)
            console.log('--------data++++++', data);
            poolInfo = data.poolInfo
            poolKeys = data.poolKeys
            clmmPoolInfo = data.computePoolInfo
            tickCache = data.tickData
        }

    }

    const swap = async (amount: string, slippage: number, baseIn: boolean) => {
        if (!raydium) return
        if (inputMint !== poolInfo.mintA.address && inputMint !== poolInfo.mintB.address) {
            return toast.error(t('swap.input.mint.not.match'))
        }

        slippage = BigNumber(slippage).div(100).toNumber()

        const amountIn = new BN(parseSol(amount))
        console.log('amountIn', amountIn);
        const { minAmountOut, remainingAccounts } = await PoolUtils.computeAmountOutFormat({
            poolInfo: clmmPoolInfo,
            tickArrayCache: tickCache[poolId],
            amountIn,
            tokenOut: poolInfo[baseIn ? 'mintB' : 'mintA'],
            slippage,
            epochInfo: await raydium.fetchEpochInfo(),
        })

        const { execute } = await raydium.clmm.swap({
            poolInfo,
            poolKeys,
            inputMint: poolInfo[baseIn ? 'mintA' : 'mintB'].address,
            amountIn,
            amountOutMin: minAmountOut.amount.raw,
            observationId: clmmPoolInfo.observationId,
            ownerInfo: {
                useSOLBalance: true,
            },
            remainingAccounts,
            txVersion: TxVersion.V0,
        })

        const { txId } = await execute()
        setTxId(txId)
    }

    const onBuy = async (amount: string, slippage: string) => {
        setIsSubmitting(true)
        try {
            if (!raydium) return
            await getPoolInfo()
            const baseIn = inputMint === poolInfo.mintA.address
            await swap(amount, Number(slippage), baseIn)
            onSuccess?.()
        } catch (e: any) {
            CONTRACT_ERR.message(e?.toString?.())
        } finally {
            setIsSubmitting(false)
        }
    }

    const onSell = async (amount: string, slippage: string) => {
        setIsSubmitting(true)
        try {
            if (!raydium) return
            await getPoolInfo()
            const baseIn = inputMint === poolInfo.mintB.address
            await swap(amount, Number(slippage), baseIn)
            onSuccess?.()
        } catch (e: any) {
            CONTRACT_ERR.message(e?.toString?.())
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        raydium,
        onBuy,
        onSell,
        dexHash: txId,
        isDexSubmitting: isSubmitting,
        isDexTraded: isSubmitting,
    }
}