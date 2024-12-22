import { web3 } from '@coral-xyz/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import type { SendTransactionOptions } from '@solana/wallet-adapter-base'
import { isSolanaWallet } from '@dynamic-labs/solana'

import {
  TransactionPayerPubkeyErr,
  TransactionVersionInvalidErr,
} from '../errors/transaction'
import { Promisable } from '../types/utils'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

type SendVersionedTransactionOptions<
  V extends web3.TransactionVersion = web3.TransactionVersion
> = SendTransactionOptions & {
  version?: V
  lookupTables?: V extends 0 ? web3.AddressLookupTableAccount[] : never
  signatures?: Array<Uint8Array>
}

export const useVersionedTransaction = () => {
  const { connection } = useConnection()
  // const { sendTransaction: SendTx } = useWallet()
  const { primaryWallet } = useDynamicContext()

  const sendTransaction = async (
    transaction: web3.VersionedTransaction,
    options?: SendTransactionOptions
  ) => {
    if (!primaryWallet) return
    if (isSolanaWallet(primaryWallet)) {
      const signer = await primaryWallet?.getSigner()
      return (await signer?.signAndSendTransaction(transaction, options))
        .signature
    }
  }

  const createMessage = async (instructions: web3.TransactionInstruction[]) => {
    const publicKey = new web3.PublicKey(primaryWallet!.address)
    if (!publicKey) throw new TransactionPayerPubkeyErr()

    // const connection = await getConnection
    const { blockhash } = await connection.getLatestBlockhash()
    return new web3.TransactionMessage({
      payerKey: publicKey,
      instructions,
      recentBlockhash: blockhash,
    })
  }

  const createLegacy = async (
    instructions: web3.TransactionInstruction[],
    signatures?: Array<Uint8Array>
  ) => {
    const message = await createMessage(instructions)
    const transaction = new web3.VersionedTransaction(
      message.compileToLegacyMessage(),
      signatures
    )
    return transaction
  }

  const createV0 = async (
    instructions: web3.TransactionInstruction[],
    lookupTables: web3.AddressLookupTableAccount[] = [],
    signatures?: Array<Uint8Array>
  ) => {
    const message = await createMessage(instructions)
    const transaction = new web3.VersionedTransaction(
      message.compileToV0Message(lookupTables),
      signatures
    )
    return transaction
  }

  const send = async <
    V extends web3.TransactionVersion = web3.TransactionVersion
  >(
    transactionOrInstructions:
      | Promisable<web3.VersionedTransaction>
      | Promisable<web3.TransactionInstruction>[],
    {
      version = 0 as V,
      lookupTables,
      signatures,
      ...opts
    }: SendVersionedTransactionOptions<V> = {}
  ) => {
    let transaction: web3.VersionedTransaction
    const tx = await transactionOrInstructions
    const ixs = await Promise.all(
      Array.isArray(transactionOrInstructions) ? transactionOrInstructions : []
    )

    if (tx instanceof web3.VersionedTransaction) {
      transaction = tx
    } else if (version === 'legacy') {
      transaction = await createLegacy(ixs, signatures)
    } else if (version === 0) {
      transaction = await createV0(ixs, lookupTables, signatures)
    } else {
      throw new TransactionVersionInvalidErr()
    }

    return sendTransaction(transaction, opts)
  }

  return {
    createMessage,
    createLegacy,
    createV0,
    send,
  }
}
