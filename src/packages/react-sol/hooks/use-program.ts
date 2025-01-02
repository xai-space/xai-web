import { useQuery } from '@tanstack/react-query'
import { type Idl, type Address, Program } from '@coral-xyz/anchor'

import { useConnection } from '@solana/wallet-adapter-react'
import { useRpcProviders } from '@dynamic-labs/sdk-react-core'
import { solanaProvidersSelector } from '@dynamic-labs/solana-core'

export interface UseProgramOptions<IDL extends Idl> {
  idl: IDL
  programId: Address
}

export const useProgram = <IDL extends Idl = Idl>({
  idl,
  programId,
}: UseProgramOptions<IDL>) => {
  const { connection } = useConnection()

  const { data: program, ...results } = useQuery({
    queryKey: ['useProgram', programId],
    queryFn: async () => {
      try {
        console.log('useProgram', idl, programId);

        return await new Program<IDL>(idl, programId, {
          connection,
        })
      } catch (error) {
        console.error('Failed to create program:', error)
      }
    },
    enabled: !!connection,
  })

  return {
    program,
    ...results,
  }
}
