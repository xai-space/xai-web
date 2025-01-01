import { DynamicContextProps, mergeNetworks } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { SolanaWalletConnectors } from '@dynamic-labs/solana'

export const dynamicConfig: DynamicContextProps['settings'] = {
  environmentId: '6038c09c-859a-474b-b58d-1a9743653e71',
  walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
  appLogoUrl: '/images/logo.png',
  overrides: {
    evmNetworks: (networks) => mergeNetworks([{
      "blockExplorerUrls": [
        "https://testnet.bscscan.com/"
      ],
      "chainId": 97,
      "iconUrls": [
        "https://app.dynamic.xyz/assets/networks/bnb.svg"
      ],
      "name": "TBNB",
      "nativeCurrency": {
        "decimals": 18,
        "name": "TBSC",
        "symbol": "TBNB",
        "iconUrl": "https://app.dynamic.xyz/assets/networks/bnb.svg",
        "pricingProviderTokenId": "TBNB"
      },
      "networkId": 97,
      "rpcUrls": [
        "https://bsc-testnet-rpc.publicnode.com"
      ],
      "vanityName": "TBNB"
    }], networks),
  }
}


