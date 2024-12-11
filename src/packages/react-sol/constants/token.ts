import { web3 } from '@coral-xyz/anchor'

export const LAMPORT_PER_TOKEN_ACCOUNT = 2039280

export const SOL_PER_TOKEN_ACCOUNT =
  LAMPORT_PER_TOKEN_ACCOUNT / web3.LAMPORTS_PER_SOL
