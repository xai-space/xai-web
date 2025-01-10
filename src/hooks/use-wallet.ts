import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useAccount } from 'wagmi'

export const useWallet = () => {
  const walletContext = useDynamicContext()
  const isConnected = !!walletContext.primaryWallet?.address

  const showConnectModal = () => walletContext.setShowAuthFlow(true)

  // const tonAddress = useTonAddress()
  const { address } = useAccount()
  // const { publicKey } = useSolWallet()

  const walletAddress = () => {
    // TODO: TON wallet support
    // if (tonAddress !== '') {
    //   return tonAddress
    // }

    if (address) {
      return address
    }

    // if (publicKey) {
    //   return publicKey.toString()
    // }

    return address
  }

  return { walletContext, isConnected, walletAddress, showConnectModal }
}
