import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { Header } from '../header'
import MobileNavBottom from '../mobile-nav-bottom'
import HandleScroll, { ScrollVariant } from '../handle-scroll'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { NavAside } from '../asides/nav-aside'

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
    <main className={cn('min-h-main flex max-w-[100vw]', className)}>
      <div
        className={cn(
          'border-r border-[#e5e5e5] px-4 max-lg:hidden min-h-screen z-50',
          navAsideClass
        )}
      >
        <NavAside className="sticky top-0 shrink-0" {...navAsideProps} />
      </div>

      <div className="flex-1 max-lg:pb-14">
        <HandleScroll variant={ScrollVariant.Top}>
          <Header />
        </HandleScroll>

        <div className={cn('flex', containerClass)}>
          <div
            className={cn(
              'flex-1',
              !disablePadding && 'p-3 sm:p-4',
              contentClass
            )}
          >
            {children}
          </div>
          {/* <div className="w-[300px]">wejdjfkfkdskf</div> */}
        </div>

        <HandleScroll
          variant={ScrollVariant.Bottom}
          classname={isTokenPage ? 'hidden' : ''}
        >
          <MobileNavBottom />
        </HandleScroll>
      </div>
    </main>
  )
}

export default PrimaryLayout
