import { PublicKey } from "@metaplex-foundation/js"
import { useInitRaydium } from "./use-init-raydium"
import { useQuery } from "@tanstack/react-query"
import { formatSol } from "@/packages/react-sol"

export const useRaydiumPool = (poolAddr?: string) => {
    const { raydium } = useInitRaydium()

    const { data: poolInfo } = useQuery({
        queryKey: ['raydium-pool', poolAddr],
        queryFn: async () => {
            if (!raydium || !poolAddr) return
            const poolInfos = await raydium.clmm.getRpcClmmPoolInfos({
                poolIds: [new PublicKey(poolAddr)],
            })
            return poolInfos[poolAddr]
        },
        enabled: !!raydium && !!poolAddr,
        refetchInterval: 10000
    })

    console.log('poolInfo-----', poolInfo?.swapInAmountTokenB.toString())

    return {
        poolInfo,
        raydium
    }
}