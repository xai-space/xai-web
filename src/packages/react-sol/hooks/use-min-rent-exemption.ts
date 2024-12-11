import { useQuery } from '@tanstack/react-query'
import { useConnection } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'

import { formatSol } from '../lib'

interface Options {
  publicKey: web3.PublicKey | null
  commitment?: web3.Commitment
}

export const useMinRentExemption = ({
  publicKey,
  commitment = 'confirmed',
}: Options) => {
  const { connection } = useConnection()

  const { data: rent, ...results } = useQuery({
    queryKey: ['useMinRentExemption', publicKey?.toString()],
    queryFn: async () => {
      const { data } = (await connection.getAccountInfo(publicKey!)) || {
        data: Buffer.from([]),
      }
      return connection.getMinimumBalanceForRentExemption(
        data.byteLength,
        commitment
      )
    },
    enabled: !!publicKey,
  })

  return {
    ...results,
    rent,
    rentSol: rent ? formatSol(rent) : undefined,
  }
}
