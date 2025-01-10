import { useTranslation } from 'react-i18next'
import { TbRepeat } from 'react-icons/tb'
import { toast } from 'sonner'

export const RepatButton = () => {
  const { t } = useTranslation()
  return (
    <div
      className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800"
      onClick={() => {
        toast.info(t('coming-soon'))
      }}
    >
      <TbRepeat size={20} />
      <span>0</span>
    </div>
  )
}
