import { Progress } from '@/components/ui/progress'
import { TbClockHour4Filled } from 'react-icons/tb'
import { FaHillAvalanche } from 'react-icons/fa6'
import { tokenApi } from '@/api/token'
import { useRequest } from 'ahooks'
import { getTokenProgress } from '@/utils/contract'

const LanchesCardList = () => {
  const { data, loading, error } = useRequest(async () => {
    const res = await tokenApi.getList({ page: 1, page_size: 17 })

    // 确保 res?.data?.results 存在且是一个数组
    const results = res?.data?.results || []

    for (const item of results) {
      // 获取进度
      const tokenReserve = item.total_supply
      const tokenMaxSupply = item.max_supply
      const isGraduated = item.graduated

      item.progress = getTokenProgress(tokenReserve, tokenMaxSupply, isGraduated)
    }

    return res.data
  }, {
    onSuccess: (data) => {
      console.log("getList:", data);
    },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className=" rounded-[16px] pt-4 overflow-hidden">
      {data?.results && data.results.length > 0 ? (
        data.results.map((item, index) => (
          <div key={item.id} className="flex items-center flex-row w-full px-4 py-[8px] hover:bg-[#f5f5f5]">
            <div className="w-14 h-14">
              <img src={item.image} className='w-full h-full rounded-full' alt="" />
            </div>
            <div className="ml-2 flex-1">
              <div className="flex items-center">
                <p className="font-semibold text-sm">Unicat</p>
                <p className="ml-2 px-2 rounded-full leading-[17px] h-[16px] text-[10px] text-white bg-blue-500">
                  {item.name}
                </p>
              </div>
              <div className="flex items-center">
                <TbClockHour4Filled fill={'#3b82f6'} />
                <div className="ml-[3px] text-[12px] text-[#536471] truncate w-[200px]">
                  {item.description}
                </div>
              </div>
              <Progress
                className="h-[12px] mt-[4px]"
                labelClass={'text-[10px]'}
                indicatorClass={'bg-red-500'}
                value={item.progress || 50} // 使用 item.progress 或默认值 50
              ></Progress>
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}

    </div>
  )
}

export default LanchesCardList