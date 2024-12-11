import { type Address } from 'viem'
import {
  mainnet,
  scroll,
  opBNB,
  fantom,
  zkSync,
  linea,
  bsc,
  blast,
  base,

  /***** testnet *****/
  bscTestnet,
  opBNBTestnet,
  baseSepolia,
  blastSepolia,
  fantomTestnet,
  zkSyncSepoliaTestnet,
} from 'wagmi/chains'

import { dotenv } from '@/utils/env'

// Add new contract name here.
type Keys = 'reserveToken' | 'uniswapv2Router' | 'recommend' | 'exchangeNft'

type AddrMap = Record<number, Partial<Record<Keys, Address>> | undefined>

const prod: AddrMap = {
  [mainnet.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',
  },
  [bsc.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',

    exchangeNft: '0x',
  },
  [base.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',

    exchangeNft: '0x',
  },
  [blast.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',

    exchangeNft: '0x0x',
  },
  [opBNB.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',
  },
  [scroll.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',
  },
  [fantom.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',
  },
  [zkSync.id]: {
    reserveToken: '0x',
  },
  [linea.id]: {
    uniswapv2Router: '0x',
  },
} as const

const dev: AddrMap = {
  [bsc.id]: {
    reserveToken: prod[bsc.id]?.reserveToken,
    uniswapv2Router: prod[bsc.id]?.uniswapv2Router,

    recommend: '0x',

    exchangeNft: '0x',
  },
  [base.id]: {
    reserveToken: prod[base.id]?.reserveToken,
    uniswapv2Router: prod[base.id]?.uniswapv2Router,

    recommend: '0x',

    exchangeNft: '0x',
  },
  [blast.id]: {
    reserveToken: prod[blast.id]?.reserveToken,
    uniswapv2Router: prod[blast.id]?.uniswapv2Router,

    recommend: '0x',

    exchangeNft: '0x',
  },

  /***** testnet *****/
  [bscTestnet.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',

    recommend: '0x',

    exchangeNft: '0x',
  },
  [baseSepolia.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',
  },
  [blastSepolia.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',
  },
  [opBNBTestnet.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',

    recommend: '0x',
  },
  [fantomTestnet.id]: {
    reserveToken: '0x',
    uniswapv2Router: '0x',
  },
  [zkSyncSepoliaTestnet.id]: {
    reserveToken: '0x',
  },
}

export const addrMap = dotenv.isDev ? dev : prod
