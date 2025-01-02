import { useMutation } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { captureException } from '@sentry/nextjs'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { useLocalStorage } from '@/hooks/use-storage'
import { userApi } from '@/api/user'
import { reportException } from '@/errors'
import { useChainsStore } from '@/stores/use-chains-store'
import { useUserStore } from '@/stores/use-user-store'

export const useSolSign = (onSuccess?: VoidFunction) => {
  const { publicKey, signMessage } = useWallet()
  const { getStorage, setStorage, removeStorage } = useLocalStorage()
  const { setUserInfo } = useUserStore()
  const { getChainId } = useChainsStore()
  const { t } = useTranslation()

  const pubkey = getStorage('token')
  const isCorrectSign = pubkey === publicKey?.toString()

  const { isPending, mutateAsync } = useMutation({
    mutationKey: [userApi.login.name],
    mutationFn: userApi.login,
    onMutate: () => toast.loading(t('user.login.loading')),
    onSettled: (_, __, ___, id) => toast.dismiss(id),
    onError: (e) => reportException(e),
    onSuccess: () => toast.success(t('user.login.success')),
  })

  const signLogin = async () => {
    try {
      if (!signMessage || !publicKey) throw new Error('Wallet not connected')

      const timestamp = Date.now().toString()
      const message = await signMessage(
        new TextEncoder().encode(`Signin at ${timestamp}`)
      )

      const msg = Buffer.from(message).toString('hex')

      const { data } = await mutateAsync({
        wallet_address: String(publicKey),
        chain_id: String(getChainId('solana_devnet')),
        sign: msg,
        timestamp,
      })

      setStorage('token', data.token)
      setUserInfo(data.user)
    } catch (e) {
      reportException(e)
      throw e
    }
  }

  const {
    isPending: isSigning,
    mutateAsync: signAsync,
    reset,
  } = useMutation({
    mutationKey: ['useSignSol'],
    mutationFn: signLogin,
    onError: () => {
      reset()
    },
    onSuccess: onSuccess,
  })

  const checkForSign = async () => {
    try {
      const pubkey = getStorage('token')
      if (pubkey !== publicKey?.toString()) await signAsync()
      return true
    } catch (err: any) {
      captureException(err, {
        extra: {
          scope: 'useSolSign',
          method: 'checkForSign',
          message: err.message,
        },
      })
      return false
    }
  }

  const logout = () => {
    setUserInfo(null)
    removeStorage('token')
  }

  return {
    isCorrectSign,
    isLoggingIn: isPending || isSigning,
    signLogin: signAsync,
    checkForSign,
    logout,
  }
}
