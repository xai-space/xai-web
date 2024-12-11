import { useRouter } from 'next/router'
// import { Address } from 'viem'

export const useTokenQuery = () => {
  const { query, isReady } = useRouter()

  const chainName = (query.chain ?? '') as string
  const tokenAddr = (query.address ?? '') as string
  const referralCode = (query.r ?? '') as string

  return {
    chainName,
    tokenAddr,
    referralCode,
    isReady,
  }
}
