import { Network } from '@/enums/contract'
import { useEvmTradeBalance } from './evm/use-trade-balance'
import { useSvmTradeBalance } from './svm/use-trade-balance'

interface TradeBalance {
  nativeBalance: string
  tokenBalance: string
  isFetchingBalance: boolean
  refetchBalance: VoidFunction
}

export const useTradeBalance = (network: Network) => {
  const tradeBalanceHooks: Record<Network, () => TradeBalance> = {
    [Network.Svm]: useSvmTradeBalance,
    [Network.Evm]: useEvmTradeBalance,
    [Network.Tvm]: useEvmTradeBalance,

    // TODO/mul: more chain...
  }

  return tradeBalanceHooks[network]?.() ?? null
}
