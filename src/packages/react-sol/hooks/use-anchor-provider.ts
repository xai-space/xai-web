import { useEffect, useMemo, useState } from 'react'
import {
  type Provider,
  AnchorProvider,
  getProvider as getAnchorProvider,
  setProvider as setAnchorProvider,
  web3,
} from '@coral-xyz/anchor'
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const useAnchorProvider = (
  options: web3.ConfirmOptions = {
    commitment: 'confirmed',
  }
) => {
  const [provider, setProvider] = useState<Provider>()
  const { connection } = useConnection()
  const { primaryWallet } = useDynamicContext()

  const wallet = useAnchorWallet()
  // const wallet: AnchorWallet | undefined = useMemo(() =>

  //   , [wallet])

  useEffect(() => {
    if (!wallet) return
    try {
      const provider = getAnchorProvider()
      setProvider(provider)
    } catch (error) {
      const provider = new AnchorProvider(connection, wallet, options)
      setProvider(provider)
      setAnchorProvider(provider)
    }
  }, [connection, wallet])

  return {
    provider,
    setProvider,
  }
}
