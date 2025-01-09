import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { useResponsive } from '@/hooks/use-responsive'
import { HeaderMobile } from './mobile'
import { Routes } from '@/routes'

export interface Nav {
  title: string
  path: string
  // only show on mobile
  mobileOnly?: boolean
}

export const Header = () => {
  const { isPad, isMobile } = useResponsive()
  const { t } = useTranslation()
  const { push } = useRouter()

  const withMobileIcon = (icon: string, text: string) =>
    isMobile ? `${icon} ${text}` : text

  const navs: Nav[] = [
    {
      title: withMobileIcon('💎', 'Coin'),
      path: Routes.Main,
    },
    {
      title: t('next.moonshot'),
      path: Routes.NewsMoonshot,
      mobileOnly: true,
    },
    {
      title: t('classic.meme'),
      path: Routes.NewsClassicMeme,
      mobileOnly: true,
    },
  ]

  const onNavClick = ({ path }: Nav) => push({ pathname: path })

  return (
    <header
      className={cn(
        'min-h-header lg:min-h-0 flex bg-secondary justify-between items-center px-6 relative max-lg:border-b',
        'max-sm:px-3'
      )}
    >
      {isPad && <HeaderMobile />}
    </header>
  )
}

export default Header
