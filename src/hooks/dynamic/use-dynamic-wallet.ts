import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useMemo } from 'react'

import { useChainsStore } from '@/stores/use-chains-store'
import { Network } from '@/enums/contract'

export const useDynamicWallet = () => {
  const { primaryWallet, network } = useDynamicContext()
  const { evmChainsMap, svmChiansMap } = useChainsStore()

  const chainsInfo = useMemo(() => {
    if (!network || !primaryWallet) return

    // TODO/Top: Maybe there is a better way.
    return typeof network === 'string'
      ? network === 'devnet'
        ? svmChiansMap['2']
        : svmChiansMap['1']
      : evmChainsMap[network.toString()]
  }, [network, primaryWallet])

  const currentNetwork = useMemo(
    () => (primaryWallet?.chain === 'EVM' ? Network.Evm : Network.Svm),
    [primaryWallet]
  )

  return {
    chainsInfo,
    currentNetwork,
  }
}
