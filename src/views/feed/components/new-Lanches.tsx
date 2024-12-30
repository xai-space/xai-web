import { Progress } from '@/components/ui/progress'
import { TbClockHour4Filled } from 'react-icons/tb'
import { FaHillAvalanche } from 'react-icons/fa6'

const NewLanches = () => {
  const data = [1, 2, 3, 4]

  return (
    <>
      <div className="border-[#e5e5e5] border-[1px] w-[348px] rounded-[16px] pt-4 overflow-hidden">

        <p className="font-semibold text-[20px] px-4 mb-3">New Lanches</p>
        {data.map((item, index) => (
          <div className="flex items-center flex-row w-full px-4 py-[8px] hover:bg-[#f5f5f5]">
            <div className="w-14 h-14">
              <img src="./images/cat.jpg" className='w-full h-full rounded-full' alt="" />
            </div>
            <div className="ml-2 flex-1">
              <div className="flex items-center">
                <p className="font-semibold text-sm">Unicat</p>
                <p className="ml-2 px-2 rounded-full leading-[17px] h-[16px] text-[10px] text-white bg-blue-500">
                  NFT AI Agent
                </p>
              </div>
              <div className="flex items-center">
                <TbClockHour4Filled fill={'#3b82f6'} />
                <div className="ml-[3px] text-[12px] text-[#536471]">
                  It is a hello world unicat yesterday
                </div>
              </div>
              <Progress
                className="h-[12px] mt-[4px]"
                labelClass={'text-[10px]'}
                indicatorClass={'bg-red-500'}
                value={50}
              ></Progress>
            </div>
          </div>
        ))}
        <div className='text-[#1d9bf0] text-left text-[15px] py-[14px] pl-4 hover:bg-[#f5f5f5] cursor-pointer'>Show more</div>

      </div>

    </>
  )
}
export default NewLanches
