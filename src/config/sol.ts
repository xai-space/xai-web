import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { web3 } from '@coral-xyz/anchor'
import { dotenv } from '@/utils/env'

const endpoint = {
  mainnet: web3.clusterApiUrl(WalletAdapterNetwork.Devnet, true),
  devnet: web3.clusterApiUrl(WalletAdapterNetwork.Devnet, true),
}

export const solConfig = {
  endpoint: dotenv.isProd ? endpoint.mainnet : endpoint.devnet,
  wallets: [],
}
