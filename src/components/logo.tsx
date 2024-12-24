import React, { ComponentProps } from 'react'
import Link from 'next/link'

import { Routes } from '@/routes'
import { cn } from '@/lib/utils'

interface Props extends ComponentProps<'img'> {
  showMeme?: boolean
  showLogo?: boolean
  linkClass?: string
  betaClass?: string
}

export const Logo = ({
  className,
  showMeme = false,
  showLogo = true,
  linkClass,
  betaClass,
  ...props
}: Props) => {
  return (
    <Link
      href={Routes.Main}
      className={cn(
        'font-bold inline-flex items-center gap-2 shrink-0',
        linkClass
      )}
    >
      {showMeme && (
        <img
          src="/images/xai_logo.png"
          alt="meme"
          className="max-w-[60px] max-sm:w-8 object-cover"
        />
      )}
    </Link>
  )
}

export default Logo
