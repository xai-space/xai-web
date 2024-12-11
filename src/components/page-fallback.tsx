import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { isAddress, isHash, zeroAddress, zeroHash } from 'viem'
import { useTranslation } from 'react-i18next'
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'

import { NotFound } from './not-found'
import { useChainsStore } from '@/stores/use-chains-store'
import { Network } from '@/enums/contract'
import { useConnection } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  showFallback?: boolean
}

export const PageFallback = ({ children, fallback, showFallback }: Props) => {
  const { t } = useTranslation()
  const { query, isReady } = useRouter()
  const chain = query.chain as string
  const addr = (query.address || query.id) as string
  const hash = query.hash as string
  const { chainsMap } = useChainsStore()
  const { connection } = useConnection()
  const chainName = chainsMap[chain]?.network
  const [isValidAddress, setIsValidAddress] = useState(false)

  const isAddressValid = async () => {
    if (chainName === Network.Evm) setIsValidAddress(isAddress(addr))

    if (chainName === Network.Svm) {
      const decoded = bs58.decode(addr)
      if (decoded.length !== 32) return setIsValidAddress(false)

      const accountInfo = await connection.getAccountInfo(
        new web3.PublicKey(addr)
      )

      setIsValidAddress(!!accountInfo)
    }
  }
  useEffect(() => {
    ;(async () => {
      await isAddressValid()
    })()
  }, [addr])

  const fallbackComp = useMemo(
    () =>
      fallback || (
        <NotFound
          title={t('token.invalid.token')}
          src="/images/empty.png"
          imgClass="max-w-64 max-sm:max-w-1/2"
        />
      ),
    [fallback, t]
  )
  const [isInvalidAddr, isInvalidHash] = useMemo(
    () => [
      !!addr && (addr === zeroAddress || !isValidAddress),
      !!hash && (hash === zeroHash || !isHash(hash)),
    ],
    [addr, hash, isValidAddress]
  )

  if (showFallback) return fallbackComp
  if (isReady && (isInvalidAddr || isInvalidHash)) return fallbackComp

  return children
}

export default PageFallback
