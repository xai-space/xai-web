import { useMutation } from '@tanstack/react-query'
import { web3 } from '@coral-xyz/anchor'
import { useConnection } from '@solana/wallet-adapter-react'

import { Promisable } from '../types/utils'
import { useVersionedTransaction } from './use-versioned-transaction'
import { TransactionVersionInvalidErr } from '../errors/transaction'

interface Options {
  instructions: Promisable<web3.TransactionInstruction>[]
  version?: web3.TransactionVersion
}

export const useSimulateTransaction = () => {
  const { connection } = useConnection()
  const { createLegacy, createV0 } = useVersionedTransaction()

  const {
    mutate: simulateTransaction,
    mutateAsync: simulateTransactionAsync,
    ...results
  } = useMutation({
    mutationKey: ['useSimulateTransaction'],
    mutationFn: async ({ instructions, version = 0 }: Options) => {
      let transaction: web3.VersionedTransaction
      const ixs = await Promise.all(instructions)

      if (version === 'legacy') {
        transaction = await createLegacy(ixs)
      } else if (version === 0) {
        transaction = await createV0(ixs)
      } else {
        throw new TransactionVersionInvalidErr()
      }

      return connection.simulateTransaction(transaction)
    },
  })

  return {
    ...results,
    simulateTransaction,
    simulateTransactionAsync,
  }
}
