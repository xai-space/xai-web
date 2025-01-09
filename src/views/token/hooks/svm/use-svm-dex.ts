import { useRaydium } from '@/hooks/raydium/use-raydium'

export const useSvmDex = (
    poolAddr: string,
    onSuccess?: () => void
) => {
    const { onBuy, onSell, isDexSubmitting, isDexTraded, dexHash } = useRaydium(poolAddr!, onSuccess)

    return {
        dexHash,
        isDexSubmitting,
        isDexTraded,
        dexBuy: onBuy,
        dexSell: onSell,
        dexResetTrade: () => { },
    }
}
