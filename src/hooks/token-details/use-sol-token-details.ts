import { web3 } from '@coral-xyz/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Metaplex } from '@metaplex-foundation/js'
import { useQuery } from '@tanstack/react-query'

import { formatSol, useProgram } from '@/packages/react-sol'
import { programIds } from '@/program'
import { getCurveAccount } from '@/program/token/account'
import { IDL } from '@/program/token/idl'
export const useSolTokenDetails = (tokenAddr: string) => {
  const { connection } = useConnection()
  const { program, error } = useProgram({
    idl: IDL,
    programId: programIds.programId,
  })

  const {
    data: tokenMetadata,
    isLoading: isLoadingMetadata,
    refetch: refetchMetadata,
  } = useQuery({
    queryKey: ['getTokenDetails', tokenAddr],
    queryFn: async () => {
      const metaplex = Metaplex.make(connection)

      const token = await metaplex
        .nfts()
        .findByMint({ mintAddress: new web3.PublicKey(tokenAddr) })

      return token
    },
    enabled: !!tokenAddr,
  })

  const { data: pools, refetch: refetchPools } = useQuery({
    queryKey: ['getPools', tokenAddr],
    queryFn: async () => {
      if (!program) throw error

      const { curveConfig } = getCurveAccount(tokenAddr)

      const curve = await program.account['curveConfig'].fetch(curveConfig)

      return curve
    },
    enabled: !!tokenAddr,
    refetchInterval: 10_000,
  })

  const {
    graduated: isGraduated,
    solAim,
    tokenReserve,
    tokenMaxSupply,
  } = pools || {}

  const totalSupply = formatSol(tokenMaxSupply)
  const reserveTotalAmount = formatSol(solAim)
  const tokenLeftAmount = formatSol(tokenReserve)

  const progress = useMemo(() => {
    if (isGraduated) return '100'

    const percent = BigNumber(totalSupply)
      .minus(tokenLeftAmount)
      .div(totalSupply)
      .multipliedBy(100)

    return percent.lte(0) || percent.isNaN() ? '0' : percent.toFixed(2)
  }, [tokenMaxSupply, solAim, tokenReserve, isGraduated])

  const refetchDetails = () => {
    refetchMetadata()
    refetchPools()
  }

  const tokendata = {
    token: tokenMetadata?.address.toBase58(),
    name: tokenMetadata?.name,
    symbol: tokenMetadata?.symbol,
    decimals: tokenMetadata?.mint.decimals,
    totalSupply: totalSupply,
    creator: tokenMetadata?.creators,
  }

  return {
    tokenMetadata: tokendata,
    isLoadingDetails: isLoadingMetadata,
    progress,
    isGraduated,
    totalSupply,
    tokenLeftAmount,
    reserveTotalAmount,
    refetchDetails,
  }
}
