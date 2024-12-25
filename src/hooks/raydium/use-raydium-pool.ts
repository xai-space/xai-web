import { BN } from '@coral-xyz/anchor';
import { useInitRaydium } from "./use-init-raydium"
import { ComputeClmmPoolInfo, ClmmKeys, ApiV3PoolInfoConcentratedItem, ReturnTypeFetchMultiplePoolTickArrays, PoolUtils } from "@raydium-io/raydium-sdk-v2"
import { isValidClmm } from "./utils"
import { useState } from 'react';

let poolInfo: ApiV3PoolInfoConcentratedItem
let clmmPoolInfo: ComputeClmmPoolInfo
let tickCache: ReturnTypeFetchMultiplePoolTickArrays
let poolKeys: ClmmKeys | undefined

export const useRaydiumPool = (poolId?: string) => {
    const { raydium } = useInitRaydium()
    const [isLoading, setIsLoading] = useState(false)

    const getPoolInfo = async () => {
        if (!raydium || !poolId) return

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
            poolInfo = data.poolInfo
            poolKeys = data.poolKeys
            clmmPoolInfo = data.computePoolInfo
            tickCache = data.tickData
        }

    }

    const computeAmountOutFormat = async (amountIn: BN, isBuy: boolean, slippage: number) => {
        try {
            setIsLoading(true)
            return await PoolUtils.computeAmountOutFormat({
                poolInfo: clmmPoolInfo,
                tickArrayCache: tickCache[poolId!],
                amountIn,
                tokenOut: poolInfo[isBuy ? 'mintB' : 'mintA'],
                slippage,
                epochInfo: await raydium!.fetchEpochInfo(),
            })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        poolInfo,
        raydium,
        poolKeys,
        clmmPoolInfo,
        tickCache,
        getPoolInfo,
        computeAmountOutFormat,
        isLoading,
    }
}
