import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { Header } from '../header'
import MobileNavBottom from '../mobile-nav-bottom'
import HandleScroll, { ScrollVariant } from '../handle-scroll'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { NavAside } from '../asides/nav-aside'
import TopBar from '@/components/topbar'
import RightAside from '@/views/rightAside'

interface Props extends ComponentProps<'main'> {
  disablePadding?: boolean
  containerClass?: string
  contentClass?: string
  navAsideClass?: string
  newsAsideClass?: string
  navAsideProps?: ComponentProps<typeof NavAside>
  newsAsideProps?: ComponentProps<any>
}

export const PrimaryLayout = ({
  className,
  children,
  disablePadding = false,
  containerClass,
  contentClass,
  navAsideClass,
  newsAsideClass,
  navAsideProps,
  newsAsideProps,
}: Props) => {
  const { pathname } = useRouter()

  const isTokenPage = pathname.includes(Routes.TokenPage)
  const isAIPage = pathname.includes(Routes.AI)

  return (
    <main
      className={cn('min-h-main flex justify-center max-w-[100vw]', className)}
    >
      <div
        className={cn('mr-10 max-lg:hidden min-h-screen z-50', navAsideClass)}
      >
        <NavAside className="sticky top-0 shrink-0" {...navAsideProps} />
      </div>

      <div
        className={cn(
          'w-[800px] max-lg:pb-14 border-[#e5e5e5] border-width-[1px]',
          isTokenPage ? 'w-[1000px] max-sm:w-full' : ''
        )}
      >
        <HandleScroll variant={ScrollVariant.Top}>
          <Header />
        </HandleScroll>

        <div className={cn('flex', containerClass)}>
          <div
            className={cn(
              'flex-1 border-l border-r boder-[#e5e5e5]',
              !disablePadding && 'p-3 sm:p-4',
              contentClass
            )}
          >
            {children}
          </div>
        </div>

        <HandleScroll
          variant={ScrollVariant.Bottom}
          classname={isTokenPage ? 'hidden' : ''}
        >
          <MobileNavBottom />
        </HandleScroll>
      </div>
      <div
        className={cn(
          'px-10 max-xl:px-4 max-lg:hidden min-h-screen z-50',
          navAsideClass
        )}
      >
        {pathname === '/[chain]/[address]' ? '' : <RightAside />}
      </div>
    </main>
  )
}

export default PrimaryLayout
