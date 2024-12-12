'use-client'

import clsx from 'clsx'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { isEmpty } from 'lodash'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ConnectWallet from './connect-wallet'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'

interface Props {
  className?: string
  onInputGen: (value: string) => void
  onRandomGen: () => void
}

export const AIIdeaBar = (props: Props) => {
  const { className, onInputGen } = props
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const isLoggedIn = useIsLoggedIn()

  const onGen = () => {
    if (!isLoggedIn) return

    if (isEmpty(value.trim())) {
      toast.error(t('input.you.idea'))
      return
    }
    onInputGen(value)
  }

  return (
    <div
      className={clsx(
        'bg-secondary rounded-sm py-5 pb-4 max-md:w-full max-md:py-3  max-md:mt-2',
        className
      )}
    >
      <div className="flex items-center px-7 max-md:px-3 max-md:flex-col max-md:items-start">
        <div className="flex items-center">
          <img
            src="/images/ai.png"
            alt="img"
            className="w-8 h-8 rounded-sm mr-5"
          />
          <div>{t('ai.generate.bio')}</div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            onGen()
          }}
          className="flex items-stretch max-md:mt-4"
        >
          <Input
            placeholder={t('input.you.idea')}
            className="max-w-[180px] ml-4 max-md:ml-0 items-stretch "
            onChange={({ target }) => setValue(target.value)}
          />
          <ConnectWallet size={'sm'} className="ml-2 h-9 text-sm">
            <Button size={'sm'} className="ml-2 h-9 text-sm">
              {t('ai.craete')}
            </Button>
          </ConnectWallet>
        </form>
      </div>
    </div>
  )
}
