import { ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { useResponsive } from '@/hooks/use-responsive'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'

export enum ScrollVariant {
  Top = 'top',
  Bottom = 'bottom',
}

export const HandleScroll = ({
  children,
  classname,
  variant,
}: {
  children: ReactNode
  classname?: string
  variant?: ScrollVariant.Top | ScrollVariant.Bottom
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(window.scrollY)
  const [visible, setVisible] = useState(true)
  const { isPad } = useResponsive()
  const { pathname } = useRouter()

  const isTokenPage = pathname.includes(Routes.TokenPage)

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.scrollY

      //

      setVisible(position > moving)
      setPosition(moving)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [position])

  return (
    <div
      className={cn(
        'overflow-y-auto opacity-100 top-0 z-50 bg-secondary transition-all duration-500',
        !visible && variant === ScrollVariant.Bottom && isPad && 'opacity-50',
        !visible && variant === ScrollVariant.Top && isPad && '-top-80',
        !isTokenPage && 'sticky',
        classname
      )}
      ref={ref}
    >
      {children}
    </div>
  )
}

export default HandleScroll
