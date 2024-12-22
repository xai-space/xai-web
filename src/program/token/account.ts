import { utils, web3 } from '@coral-xyz/anchor'

import { programIds } from '..'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token'

export const getFeeAccount = () => {
  const [feeConfig] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('fee_config')],
    programIds.programId
  )

  return feeConfig
}

export const getCurveAccount = (tokenAddr: string) => {
  const mintPda = new web3.PublicKey(tokenAddr)

  const [configPDA, _] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('curve_config'), mintPda.toBuffer()],
    programIds.programId
  )

  return {
    curveConfig: configPDA,
  }
}

const commentAccounts = (mintPDA: web3.PublicKey) => {
  const [programSigner] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('program_signer')],
    programIds.programId
  )

  const { curveConfig } = getCurveAccount(mintPDA.toBase58())
  const feeConfig = getFeeAccount()

  const vaultPDA = utils.token.associatedAddress({
    mint: mintPDA,
    owner: programSigner,
  })

  return {
    programSigner,
    vault: vaultPDA,
    curveConfig,
    feeConfig,
  }
}

export const getCreateTokenAccount = (
  signer: web3.PublicKey,
  identifierAccount: web3.PublicKey
) => {
  console.log("identifierAccount: ", identifierAccount);
  console.log("programIds.programId: ", programIds.programId.toBase58());

  const [mintPDA] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('mint'), identifierAccount.toBuffer()],
    programIds.programId
  )

  const cm = commentAccounts(mintPDA)

  const [metadataAddress] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      programIds.metadata.toBuffer(),
      mintPDA.toBuffer(),
    ],
    programIds.metadata
  )

  const [initTokenConfig] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('init_token_config')],
    programIds.programId
  )

  return {
    metadata: metadataAddress,
    mint: mintPDA,
    user: signer,
    systemProgram: web3.SystemProgram.programId,
    tokenProgram: utils.token.TOKEN_PROGRAM_ID,
    tokenMetadataProgram: programIds.metadata,
    associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
    feeReceiverAccount: programIds.feeReceiverAccount,
    initTokenConfig,
    rent: web3.SYSVAR_RENT_PUBKEY,
    identifierAccount,
    ...cm,
  }
}

export const getTradeAccount = async (
  signer: web3.PublicKey,
  tokenAddress: string
) => {
  const mintPdaPub = new web3.PublicKey(tokenAddress)

  const cm = commentAccounts(mintPdaPub)

  const tokenProgram = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'

  const receiverAta = await getAssociatedTokenAddress(mintPdaPub, signer)
  const [recommendRewardVault] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('recommend_reward_vault')],
    programIds.programId
  )

  const userTokenAta = await getAssociatedTokenAddress(
    new web3.PublicKey(tokenAddress),
    signer
  )

  return {
    vaultSol: cm.curveConfig,
    feeReceiverAccount: programIds.feeReceiverAccount,
    recommendRewardVault: recommendRewardVault,
    user: signer,
    tokenMint: mintPdaPub,
    receiver: signer,
    userTokenAta,
    receiverAta: receiverAta,
    tokenProgram: tokenProgram,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: web3.SystemProgram.programId,
    ...cm,
  }
}

export const getRecommendAccount = async (
  account: web3.PublicKey,
  connection: web3.Connection
) => {
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('fee_recommend_reward'), account.toBuffer()],
    programIds.programId
  )

  const accountInfo = await connection.getAccountInfo(pda)

  return {
    pda,
    accountInfo,
  }
}
