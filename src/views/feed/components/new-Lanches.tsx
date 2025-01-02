import { Progress } from '@/components/ui/progress'
import { TbClockHour4Filled } from 'react-icons/tb'
import { FaHillAvalanche } from 'react-icons/fa6'
import { tokenApi } from '@/api/token'
import { useRequest } from 'ahooks'
import { getTokenProgress } from '@/utils/contract'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { staticUrl } from '@/config/url'
import { useEvmTokensPools } from '@/hooks/token/use-evm-tokens-pools'
import { zeroAddress } from 'viem'
import { useSvmTokenPools } from '@/hooks/token/use-svm-token-pool'
import { TokenListItem } from '@/api/token/types'
import { Network } from '@/enums/contract'

const NewLanches = () => {
  const { push } = useRouter()

  const { data, loading, error } = useRequest(
    async () => {
      const res = await tokenApi.getList({ page: 1, page_size: 4 })
      return res.data
    },
    {
      onSuccess: (data) => {
        console.log('getList:', data)
      },
    }
  )
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="border-[#e5e5e5] border-[1px] w-[348px] rounded-[16px] pt-4 overflow-hidden">
      <p className="font-semibold text-[20px] px-4 mb-3">New Lanches</p>
      {data?.results && data.results.length > 0 ? (
        data.results.map((item, index) => (
          <NewLanchesList token={item} key={index} />
        ))
      ) : (
        <div>No data available</div>
      )}
      <div
        onClick={() => push(Routes.FeatureLanches)}
        className="text-[#1d9bf0] text-left text-[15px] py-[14px] pl-4 hover:bg-[#f5f5f5] cursor-pointer"
      >
        Show more
      </div>
    </div>
  )
}

const NewLanchesList = ({ token }: { token: TokenListItem }) => {
  const { pools } = useEvmTokensPools(
    token.network === Network.Svm ? [] : [token]
  )

  const {
    tokenReserve: tokenReserveBigint,
    maxSupply: tokenMaxSupplyBigint,
    isGraduated: isGraduatedBool,
  } = useSvmTokenPools(token)
  const pool = pools[0]

  // 获取进度
  let tokenReserve = pool?.tokenReserve!
  let tokenMaxSupply = pool?.maxSupply!
  let isGraduated = pool?.graduationThreshold === zeroAddress

  if (!pool) {
    tokenReserve = tokenReserveBigint
    tokenMaxSupply = tokenMaxSupplyBigint
    isGraduated = !!isGraduatedBool
  }

  token.progress = getTokenProgress(tokenReserve, tokenMaxSupply, isGraduated)

  return (
    <div
      key={token.id}
      className="flex cursor-pointer items-center flex-row w-full px-4 py-[8px] hover:bg-[#f5f5f5]"
    >
      <div className="w-14 h-14">
        <img
          src={`${staticUrl}${token.image}`}
          className="w-full h-full rounded-full"
          alt=""
        />
      </div>
      <div className="ml-2 flex-1">
        <div className="flex items-center">
          <p className="font-semibold text-sm">{token.name}</p>
          <p className="ml-2 px-2 rounded-full leading-[17px] h-[16px] text-[10px] text-white bg-blue-500">
            {token.coin_type === 1
              ? 'NFTAgent Token'
              : token.coin_type === 2
              ? 'Agent Token'
              : 'Ordinary Token'}
          </p>
        </div>
        <div className="flex items-center">
          <TbClockHour4Filled fill={'#3b82f6'} />
          <div className="ml-[3px] text-[12px] text-[#536471] truncate w-[200px]">
            {token.description}
          </div>
        </div>
        <Progress
          className="h-[12px] mt-[4px]"
          labelClass={'text-[10px]'}
          indicatorClass={'bg-red-500'}
          value={token.progress} // 使用 item.progress 或默认值 50
        ></Progress>
      </div>
    </div>
  )
}

export default NewLanches
