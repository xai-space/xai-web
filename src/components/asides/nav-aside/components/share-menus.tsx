import React, { type ComponentProps } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaGlobe } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { AiFillBook } from 'react-icons/ai'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { parseMediaUrl } from '@/utils'

interface Props extends ComponentProps<'div'> {
    x?: string
    tg?: string
    website?: string
    whitepaper?: string
    buttonProps?: ComponentProps<typeof Button>
    size?: number
}

export const ShareMenus = ({
    className,
    x,
    tg,
    website,
    whitepaper,
    buttonProps,
    size = 20,
    ...props
}: Props) => {
    const { className: buttonClass } = buttonProps ?? {}
    const links = [
        {
            title: 'Twitter',
            link: parseMediaUrl('x', x),
            icon: <FaXTwitter size={size} />,
        },
        {
            title: 'Telegram',
            link: parseMediaUrl('tg', tg),
            icon: <FaTelegramPlane size={size} />,
        },
        {
            title: 'Website',
            link: parseMediaUrl('website', website),
            icon: <FaGlobe size={size} />,
        },
        {
            title: 'Whitepaper',
            link: parseMediaUrl('website', whitepaper),
            icon: <AiFillBook size={size} />,
        },
    ]

    return (
        <>
            {links.map(({ title, link, icon }) =>
                !!link ? (
                    <DropdownMenuItem>
                        <div className='flex py-2 px-2 pr-10' onClick={() => open(link)}>
                            <div>{icon}</div>
                            <div className='ml-[24px] text-[20px] text-[#0f1419] font-semibold'>{title}</div>
                        </div>
                    </DropdownMenuItem>
                ) : null
            )}
        </>
    )
}

export default ShareMenus
