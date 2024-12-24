import { dotenv } from '@/utils/env'
import { web3 } from '@coral-xyz/anchor'
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  MPL_TOKEN_METADATA_PROGRAM_ID
)

const prod = {
  metadata: TOKEN_METADATA_PROGRAM_ID,
  programId: new web3.PublicKey('XdEv8PpYt88HUV3VujjRJdYBQMinoJLNBBznNcvrcin'),
  feeReceiverAccount: new web3.PublicKey(
    '6zqCRRZSGdBHQBYESmck5KoFppwMzQ29aSqP3dVzzaW8'
  ),
  network: 'devnet',
} as const

const dev = {
  metadata: TOKEN_METADATA_PROGRAM_ID,
  programId: new web3.PublicKey('XdEv8PpYt88HUV3VujjRJdYBQMinoJLNBBznNcvrcin'),
  feeReceiverAccount: new web3.PublicKey(
    '6zqCRRZSGdBHQBYESmck5KoFppwMzQ29aSqP3dVzzaW8'
  ),
  network: 'devnet',
} as const

export const programIds = dotenv.isProd ? prod : dev
