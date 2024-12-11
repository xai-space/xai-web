import { createContext, useContext } from 'react'

import { CONTEXT_ERR } from '@/errors/context'
import { Network } from '@/enums/contract'
import { ChainData } from '@/api/chain/type'

interface Context
  extends Omit<ReturnType<any>, 'isRefetchingTokenInfo'>,
  ReturnType<any> {
  isGraduated: boolean | undefined
  reserveSymbol: string | undefined
  chainId: number
  chainName: string
  tokenAddr: string
  network: Network
  tokenChain: ChainData | undefined
}

const TokenContext = createContext<Context | null>(null)

export const TokenProvider = TokenContext.Provider

export const useTokenContext = () => {
  const ctx = useContext(TokenContext)
  if (!ctx) {
    throw CONTEXT_ERR.notFound('TokenProvider')
  }

  return ctx
}
