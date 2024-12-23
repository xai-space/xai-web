import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  shadowVariants,
  ShadowVariantsProps,
} from '@/styles/variants/offset-shadow'
import { useAudioPlayer } from '@/hooks/use-audio-player'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center whitespace-nowrap select-none',
    'rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-1 hover:opacity-90',
    'focus-visible:ring-ring disabled:pointer-events-none overflow-hidden',
    'disabled:opacity-50 transition-all duration-100'
  ),
  {
    variants: {
      variant: {
        default:
          'text-primary-foreground !shadow-offset-border hover:!shadow-none bg-border-bg',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-2 border-white sm:hover:opacity-90 active:opacity-90',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:
          '!border-none bg-transparent sm:hover:opacity-90 active:opacity-90',
        link: 'text-primary underline-offset-4 hover:underline text-white bg-black',
        warning: 'bg-orange-500 text-primary-foreground hover:bg-orange-500/90',
        yellow: 'border-2 border-black sm:hover:opacity-90',
        purple:
          'bg-purple-700 border-none sm:hover:bg-purple-700/90 active:bg-purple-700/90 text-white',
        circle:
          'h-9 w-9 rounded-full bg-black/60 text-white sm:hover:bg-black/80 active:bg-black/80',
        red: 'bg-red-500 border-none sm:hover:bg-red-500/90 active:bg-red-500/90 text-white',
        'hover-circle':
          'h-9 w-9 rounded-full sm:hover:bg-zinc-100 !duration-300 shrink-0 !p-1',
        blue: 'bg-clip-padding border-solid chamfer-blue bg-border-blue text-primary-foreground',
        gray: 'bg-clip-padding border-solid chamfer-gray bg-border-gray',
      },
      glitch: {
        none: '',
        default: 'hover:animate-glitch',
      },
      size: {
        default: 'h-9 px-4 py-2 p-[12px]',
        xs: 'h-6 rounded px-2 text-xs p-[7px]',
        sm: 'h-8 rounded-md px-3 text-xs p-[10px]',
        lg: 'h-10 rounded-md px-8 text-lg p-[14px]',
        'icon-2xl': 'h-14 w-14 p-[14px]',
        'icon-xl': 'h-12 w-12 p-[13px]',
        'icon-lg': 'h-11 w-11 p-[12px]',
        icon: 'h-9 w-9 p-[10px]',
        'icon-sm': 'h-8 w-8 p-[9px]',
        'icon-sm2': 'h-7 w-7 text-sm p-[8px]',
        'icon-xs': 'h-6 w-6 text-xs p-[7px]',
      },
    },
    defaultVariants: {
      variant: 'blue',
      size: 'default',
      glitch: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    ShadowVariantsProps {
  asChild?: boolean
  isLoading?: boolean
  loadingChild?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((p, ref) => {
  const {
    className,
    variant,
    size,
    asChild = false,
    shadow,
    onClick,
    children,
    isLoading,
    loadingChild,
    disabled,
    ...props
  } = p
  const Comp = asChild ? Slot : 'button'
  const { playGua } = useAudioPlayer()

  return (
    <Comp
      ref={ref}
      className={cn(
        buttonVariants({ variant, size }),
        // shadowVariants({ shadow }),
        className,
        'min-w-5'
      )}
      onClick={(e) => {
        playGua()
        onClick?.(e)
      }}
      disabled={disabled || isLoading}
      children={isLoading && loadingChild ? loadingChild : children}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
