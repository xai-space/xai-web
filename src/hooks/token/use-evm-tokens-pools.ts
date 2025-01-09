import { useReadContracts } from 'wagmi'
import { Abi, Address } from 'viem'

import { TokenListItem } from '@/api/token/types'
import { bcAbiMap } from '@/contract/abi/bonding-curve'
import { Network } from '@/enums/contract'

export interface PoolItem {
    k: bigint
    token: bigint
    tokenReserve: bigint
    virtualTokenReserve: bigint
    ethReserve: bigint
    virtualEthReserve: bigint
    addPoolETHAmount: bigint
    graduationThreshold: Address
    creator: Address
    headmaster: Address
    maxSupply: bigint
}

export const useEvmTokensPools = (tokens: TokenListItem[]) => {
    const filterTokens = tokens.filter((token) => token.chain !== 'bera_bartio' && token.network !== Network.Svm)

    const {
        data: pools = [],
        isLoading: isLoadingPools,
        refetch: refetchPools,
    } = useReadContracts({
        contracts: filterTokens.map((token) => ({
            abi: bcAbiMap['0.1.0'] as Abi,
            // address: token.bond_address as Address,
            address: token.bonding_curve as Address,
            // chainId: getChainId(token.chain),
            chainId: 97,
            functionName: 'getPool',
            args: [[token.contract_address as Address]],
        })),
        query: {
            // enabled: getContractsEnabled(tokens, 'bond_version', 'bond_address'),
            // TODO/top: fix `@ts-ignore`, write `"strictNullChecks": true` to `tsconfig.ts`,
            // But in vain, it may not take effect.
            select: (data) => {
                // @ts-ignore
                return data.flatMap(({ result }) => result) as (PoolItem | undefined)[];
            },
            refetchInterval: 10_000,
        },
    })

    return {
        pools,
        isLoadingPools,
        refetchPools,
    }
}
