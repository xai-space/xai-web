import { DynamicContextProps } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { SolanaWalletConnectors } from '@dynamic-labs/solana'

export const dynamicConfig: DynamicContextProps['settings'] = {
  environmentId: '6038c09c-859a-474b-b58d-1a9743653e71',
  walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
  appLogoUrl: '/images/logo.png',
}
