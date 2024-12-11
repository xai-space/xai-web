import { useAccount } from 'wagmi'
import {
  useDynamicContext,
  useIsLoggedIn,
  useSwitchNetwork,
} from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { WALLET_ERR } from '@/errors/wallet'

export const useCheckAccount = () => {
  const { primaryWallet, network, setShowDynamicUserProfile } =
    useDynamicContext()
  const isLoggedIn = useIsLoggedIn()
  const switchNetwork = useSwitchNetwork()

  const checkForConnect = () => {
    if (!isLoggedIn || !primaryWallet) {
      // setShowLinkNewWalletModal(true)
      WALLET_ERR.walletNotFound()
      return false
    }
    return true
  }

  const checkForChain = async (chainId: number | string | undefined) => {
    if (!chainId || !network || !primaryWallet) return false

    chainId = +chainId

    if (network === chainId) return true

    if (!isEthereumWallet(primaryWallet)) {
      WALLET_ERR.errorChain('Ethereum')
      return setShowDynamicUserProfile(true)
    }

    try {
      await switchNetwork({ wallet: primaryWallet, network: chainId })
      return true
    } catch (error) {
      return false
    }
  }

  const checkAccount = async (chainId: number | string | undefined) => {
    if (!checkForConnect()) return false
    if (!(await checkForChain(chainId))) return false

    return true
  }

  return {
    address: primaryWallet?.address,
    isConnected: isLoggedIn,
    walletChainId: network,
    checkForConnect,
    checkForChain,
    checkAccount,
  }
}
