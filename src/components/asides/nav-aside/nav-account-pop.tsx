import { useTranslation } from 'react-i18next'
import { MdLogout } from 'react-icons/md'
import { IoWalletOutline } from 'react-icons/io5'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const NavAccountPopover = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { t } = useTranslation()
  const { setShowDynamicUserProfile, handleLogOut } = useDynamicContext()

  const popoverContent = [
    {
      label: t('wallet.inform'),
      icon: <IoWalletOutline size={24} />,
      onClick: () => setShowDynamicUserProfile(true),
    },
    {
      label: t('disconnect'),
      icon: <MdLogout size={24} />,
      onClick: handleLogOut,
    },
  ]

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        className="border mb-[27px] border-secondary p-0 rounded-2xl overflow-hidden w-50"
        side="top"
        align="end"
        alignOffset={-2}
      >
        {popoverContent.map((item, index) => (
          <div
            key={index}
            className="flex space-x-2 px-[16px] py-[12px] items-center hover:bg-secondary cursor-pointer"
            onClick={item.onClick}
          >
            {item.icon}
            <p className='flex-auto text-[15px] text-[#0f1419] font-semibold'>{item.label}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
