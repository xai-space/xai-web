import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { BigNumber } from 'bignumber.js'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LogoField } from './logo'
import { fmt } from '@/utils/fmt'
import { useCreateTokenContext } from '@/contexts/create-token'
import { useAimemeInfoStore } from '@/stores/use-ai-meme-info-store'
import { DescriptionField } from './desc'
import { ChainField } from './chain-field'
import { InitialBuyField } from './initial-buy-field'
import { isArray } from 'lodash'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CoinType } from '@/config/coin'

export const CreateTokenForm = () => {
  const { t } = useTranslation()
  const { url, form, formFields, isDeploying, deployFee, reserveSymbol } =
    useCreateTokenContext()
  const [open, setOpen] = useState(false)

  const { loadingInfo, loadingLogo } = useAimemeInfoStore()

  const coinTypeOptions = [
    { value: CoinType.Default, label: t('coin.type.default') },
    { value: CoinType.Agent, label: t('coin.type.agent') },
    { value: CoinType.NFTAgent, label: t('coin.type.nftagent') },
  ]

  const isZeroFee = BigNumber(deployFee).isZero()
  const disabled = isDeploying || isZeroFee

  const onSubmitBefore = () => {
    if (loadingInfo || loadingLogo) {
      toast.warning(t('onsubmit.createing.warning'))
      return
    }
    setOpen(true)
  }

  useEffect(() => {
    if (isArray(url)) {
      form?.setValue(formFields!.logo!, url[0]?.url)
    }
  }, [url])

  return (
    <Form {...form}>
      <form
        onSubmit={form?.handleSubmit(onSubmitBefore)}
        className="space-y-3 max-sm:w-full max-sm:space-y-2 max-w-[400px]"
      >
        {/* Loog/name/chain/symbol */}
        <div className="md:gap-5 max-sm:space-y-2">
          {/* Logo */}
          <LogoField />

          {/* name/symbol */}
          <div className="flex space-x-5 items-center justify-between flex-1">
            <FormField
              control={form?.control}
              name={formFields?.fullname!}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mt-0 font-bold">*{t('name')}</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder={t('name.placeholder')}
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form?.control}
              name={formFields?.symbol!}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">*{t('symbol')}</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder={t('symbol.placeholder')}
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex">
          {/* Chain / coinType */}
          <div className="flex flex-col justify-between max-sm:flex-row max-sm:h-min max-sm:justify-start max-sm:space-x-4 max-sm:flex-wrap">
            <ChainField />
            {/* <CoinTypeField /> */}
          </div>

          {/* Coin type */}
          {/* <div className="flex flex-col justify-between max-sm:flex-row max-sm:h-min max-sm:justify-start max-sm:space-x-4 max-sm:flex-wrap">
            <FormField
              control={form?.control}
              name={formFields?.coinType!}
              render={({ field }) => (
                <FormItem className="flex-1 mr-4">
                  <FormLabel className="font-bold">{t('coin.type')}</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        form.setValue(formFields?.coinType!, value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {coinTypeOptions.map((item) => (
                          <SelectItem key={item.value} value={`${item.value}`}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div> */}
        </div>

        {/* Description */}
        <DescriptionField />

        {/* Poster */}
        {/* <PosterField /> */}

        {/* Twitter & telegram */}
        <div className="flex justify-between max-w-[500px]">
          <FormField
            control={form?.control}
            name={formFields?.twitter!}
            render={({ field }) => (
              <FormItem className="flex-1 mr-4">
                <FormLabel className="font-bold">{t('twitter-x')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('twitter-x.placeholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name={formFields?.telegram!}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">{t('telegram')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('telegram.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Website */}
        <div className="flex justify-between max-w-[500px]">
          <FormField
            control={form?.control}
            name={formFields?.website!}
            render={({ field }) => (
              <FormItem className="flex-1 mr-4">
                <FormLabel className="font-bold">{t('website')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('website.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-1"></div>
        </div>

        {/* Submit button */}
        <div className="flex flex-col items-start space-y-3 max-w-[500px] max-sm:items-center">
          <InitialBuyField open={open} onOpenChange={setOpen} />
          <Button variant="blue" className="px-10 mt-3" disabled={disabled}>
            {isDeploying ? t('creating') : t('create')}
          </Button>

          <p className="text-zinc-400 text-xs">
            {isZeroFee
              ? t('deploy.unsupport.chain')
              : `${t('deploy.fee')} ≈ ${fmt.decimals(
                  deployFee
                )} ${reserveSymbol}`}
          </p>
        </div>
      </form>
    </Form>
  )
}

export default CreateTokenForm
