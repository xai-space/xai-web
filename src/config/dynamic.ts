import { DynamicContextProps } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { SolanaWalletConnectors } from '@dynamic-labs/solana'

export const dynamicConfig: DynamicContextProps['settings'] = {
  environmentId: '288c5164-88e0-4ab9-bb11-a45d7977189b',
  walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
  appLogoUrl: '/images/logo.png',
}
