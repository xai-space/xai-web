import { useState } from "react"
import { TxVersion } from '@raydium-io/raydium-sdk-v2'
import { BN } from "@coral-xyz/anchor"
import { parseSol } from "@/packages/react-sol"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { CONTRACT_ERR } from "@/errors/contract"
import { useInitRaydium } from "./use-init-raydium"
import BigNumber from "bignumber.js"
import { useRaydiumPool } from "./use-raydium-pool"
import { PublicKey } from "@solana/web3.js"

const inputMint = new PublicKey("So11111111111111111111111111111111111111112").toBase58()

export const useRaydium = (poolId: string, onSuccess?: () => void) => {
    const { t } = useTranslation()
    const { raydium } = useInitRaydium()
    const { poolInfo, poolKeys, clmmPoolInfo, getPoolInfo, computeAmountOutFormat } = useRaydiumPool(poolId)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [txId, setTxId] = useState<string>()

    const swap = async (amount: string, slippage: number, baseIn: boolean) => {
        if (!raydium) return
        if (inputMint !== poolInfo.mintA.address && inputMint !== poolInfo.mintB.address) {
            return toast.error(t('swap.input.mint.not.match'))
        }

        slippage = BigNumber(slippage).div(100).toNumber()

        const amountIn = new BN(parseSol(amount))

        const { minAmountOut, remainingAccounts } = await computeAmountOutFormat(amountIn, baseIn, slippage) || {}


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
            // await swapBaseOut(amount, slippage)
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
        computeAmountOutFormat,
        dexHash: txId,
        isDexSubmitting: isSubmitting,
        isDexTraded: isSubmitting,
    }
}