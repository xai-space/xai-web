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
      icon: <IoWalletOutline />,
      onClick: () => setShowDynamicUserProfile(true),
    },
    {
      label: t('disconnect'),
      icon: <MdLogout />,
      onClick: handleLogOut,
    },
  ]

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        className="border border-secondary rounded-sm w-40"
        side="top"
        align="end"
        alignOffset={-2}
      >
        {popoverContent.map((item, index) => (
          <div
            key={index}
            className="flex space-x-2 items-center hover:bg-secondary cursor-pointer p-2"
            onClick={item.onClick}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
