import { useQuery } from '@tanstack/react-query'
import { IDL } from '@/program/token/idl'
import { programIds } from '@/program'
import { TokenListItem } from '@/api/token/types'
import { useProgram } from '@/packages/react-sol'
import { getCurveAccount } from '@/program/token/account'

export const useSvmTokenPools = (token: TokenListItem) => {
    const { program, error } = useProgram({
        idl: IDL,
        programId: programIds.programId,
    })

    const { data: pools, refetch: refetchPools } = useQuery({
        queryKey: ['getPools', token.contract_address],
        queryFn: async () => {
            if (!program) throw error

            const { curveConfig } = getCurveAccount(token.contract_address)

            const curve = await program.account['curveConfig'].fetch(curveConfig)

            return curve
        },
        enabled: !!token.contract_address,
        refetchInterval: 10_000,
    })

    const {
        graduated: isGraduated,
        solAim,
        tokenReserve,
        tokenMaxSupply,
    } = pools || {}

    return { isGraduated, solAim, tokenReserve, maxSupply: tokenMaxSupply }
}