import { Address, formatEther } from 'viem'

import { useTokenContext } from '@/contexts/token'
import { useEvmTradeAmount } from './evm/use-trade-amount'
import { useUniswapV2Amount } from '@/hooks/uniswapv2/use-uniswapv2-amount'
import { BI_ZERO } from '@/constants/number'
import { useSvmTradeAmount } from './svm/use-trade-amount'
import { Network } from '@/enums/contract'
import { formatSol, parseSol } from '@/packages/react-sol'

export const useTradeAmount = () => {
  const {
    chainId,
    tokenAddr,
    tokenLeft,
    network,
    reserveTotalAmount,
    isGraduated,
    graduatedPool,
  } = useTokenContext()

  const evm = useEvmTradeAmount(chainId, tokenAddr as Address)
  const svm = useSvmTradeAmount(tokenAddr)
  // TODO/mul: more chains...

  const uniswapV2 = useUniswapV2Amount(chainId, graduatedPool)

  const getReserveAmount = async (tokenAmount: string) => {
    if (isGraduated) {
      const reserveAmount = await uniswapV2.getReserveAmount(tokenAmount)
      return [reserveAmount, formatEther(reserveAmount)] as const
    }

    if (network === Network.Svm) {
      const reserveAmount = await svm.getReserveAmount(tokenAmount)
      return [reserveAmount, formatSol(reserveAmount)] as const
    }

    const reserveAmount = await evm.getReserveAmount(tokenAmount)
    return [reserveAmount, formatEther(reserveAmount)] as const
  }

  const getTokenAmount = async (reserveAmount: string) => {
    if (isGraduated) {
      const tokenAmount = await uniswapV2.getTokenAmount(reserveAmount)
      return [tokenAmount, formatEther(tokenAmount)] as const
    }

    if (network === Network.Svm) {
      const tokenAmount = await svm.getTokenAmount(reserveAmount)
      return [tokenAmount, formatSol(tokenAmount)] as const
    }

    const tokenAmount = await evm.getTokenAmount(reserveAmount)
    return [tokenAmount, formatEther(tokenAmount)] as const
  }

  const getLastAmount = async () => {
    if (isGraduated) return [BI_ZERO, '0'] as const

    if (network === Network.Svm) {
      return [parseSol(reserveTotalAmount), reserveTotalAmount] as const
    }

    const lastAmount = await evm.getLastAmount(tokenLeft)
    return [lastAmount, formatEther(lastAmount)] as const
  }

  return {
    getTokenAmount,
    getReserveAmount,
    getLastAmount,
  }
}
