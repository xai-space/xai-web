import { useEffect, useState, type ComponentProps } from 'react'
import { createContext, useContext } from 'react'
import { cn } from '@/lib/utils'
import { Header } from '../header'
import MobileNavBottom from '../mobile-nav-bottom'
import HandleScroll, { ScrollVariant } from '../handle-scroll'
import { useRouter, NextRouter } from 'next/router'
import { Routes } from '@/routes'
import { NavAside } from '../asides/nav-aside'
import RightAside from '@/views/rightAside'
import styles from './com.module.css'
import PostDetailHead from '@/components/head-bar/post-detail-head'
import { routeArray } from '@/components/head-bar/route-map'
import { HeadBarProvider } from './HeadBarContext'
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

  // createContext
  const HeadBarContext = createContext<any>(null)

  const { pathname } = useRouter()

  const isTokenPage = pathname.includes(Routes.TokenPage)
  const node = routeArray.find(item => item.path == pathname)?.node
  const [isBlurred, setIsBlurred] = useState(false)


  useEffect(() => {
    const container = document.querySelector('.scroll-container')

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.scrollTop >= 100) {
        setIsBlurred(true)
      } else {
        setIsBlurred(false)
      }
    }
    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const [follow, setFollow] = useState(false);
  return (
    <main
      className={cn('min-h-main flex justify-center max-w-[100vw]', className)}
    >
      <div
        className={cn('mr-10 max-lg:hidden min-h-screen z-50', navAsideClass)}
      >
        <NavAside className="sticky top-0 shrink-0" {...navAsideProps} />
      </div>

      <div className={cn('border-[#e5e5e5] border-width-[1px]', isTokenPage ? 'min-w-[600px]' : 'w-[600px]')}>
        <HandleScroll variant={ScrollVariant.Top}>
          <Header />
        </HandleScroll>

        <div className={cn('flex', containerClass)}>
          <HeadBarProvider value={{ follow, setFollow }}>
            <div
              className={cn(
                styles.scrollbar,
                'flex-1 border-l border-r boder-[#e5e5e5] h-screen overflow-y-auto scroll-container',
                !disablePadding && 'p-3 sm:p-4',
                contentClass
              )}
            >
              {node &&
                <div className={cn(styles.grass, "sticky top-0 z-50 h-[53px] ", pathname === "/" && "border-b border-[#e5e5e5]")}>
                  {node}
                </div>
              }
              {children}
            </div>
          </HeadBarProvider>
        </div>

        <HandleScroll
          variant={ScrollVariant.Bottom}
          classname={isTokenPage ? 'hidden' : ''}
        >
          <MobileNavBottom />
        </HandleScroll>
      </div>
      <div className={cn('px-10 max-xl:px-4 max-lg:hidden min-h-screen z-50')}>
        {/* <RightAside /> */}
        {isTokenPage ? '' : <RightAside />}
      </div>
    </main>
  )
}

export default PrimaryLayout
