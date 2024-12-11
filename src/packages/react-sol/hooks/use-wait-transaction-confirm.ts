import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useConnection } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'

import { TransactionConfirmErr } from '../errors/transaction'

interface Options<T = any> {
  signature: string | undefined
  onLoading?: () => T
  onError?: (error: Error) => void
  onSuccess?: (data: web3.RpcResponseAndContext<web3.SignatureResult>) => void
  onFinally?: (context: T) => void
  commitment?: web3.Commitment
}

export const useWaitTransactionConfirm = <T = any>({
  signature,
  onLoading,
  onError,
  onSuccess,
  onFinally,
  commitment,
}: Options<T>) => {
  const { connection } = useConnection()
  const ref = useRef<T>()

  const result = useQuery({
    queryKey: ['useWaitTransactionConfirm', signature],
    queryFn: async () => {
      const latestBlock = await connection.getLatestBlockhash()
      try {
        const { context, value } = await connection.confirmTransaction(
          {
            signature: signature!,
            ...latestBlock,
          },
          commitment || connection.commitment
        )

        if (value.err) throw new TransactionConfirmErr()
        return { context, value }
      } catch (error) {
        throw new TransactionConfirmErr()
      }
    },
    enabled: !!signature,
  })
  const { data, error, isLoading, isError, isSuccess } = result

  useEffect(() => {
    if (isLoading) ref.current = onLoading?.()
    if (isError) onError?.(error)
    if (isSuccess) onSuccess?.(data)
    if (isError || isSuccess) onFinally?.(ref.current!)
  }, [isLoading, isError, isSuccess])

  return result
}
