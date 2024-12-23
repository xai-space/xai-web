import { Progress } from '@/components/ui/progress'
import { TbClockHour4Filled } from 'react-icons/tb'
import { FaHillAvalanche } from 'react-icons/fa6'

const NewLanches = () => {
  return (
    <>
      <div className="border-[#e5e5e5] border-[1px] rounded-md p-4">
        <div>
          <p className="font-semibold  mb-2">New Lanches</p>
          <div className="flex items-center flex-row">
            <div className="w-14 h-14 flex justify-center items-center bg-gray-200">
              <FaHillAvalanche fill={'#4d9feb'} size={48} />
            </div>
            <div className="ml-2">
              <div className="flex">
                <p className="font-semibold">Unicat</p>
                <p className="ml-2 px-2 rounded-full leading-[24px] text-[12px] text-white bg-blue-500">
                  NFT AI Agent
                </p>
              </div>
              <div className="flex items-center">
                <TbClockHour4Filled fill={'#3b82f6'} />
                <div className="ml-[3px] text-[12px] text-[#aeadad]">
                  It is a hello world unicat yesterday
                </div>
              </div>
              <Progress
                className="h-4"
                indicatorClass={'bg-red-500'}
                value={50}
              ></Progress>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NewLanches
