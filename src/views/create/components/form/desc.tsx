import { toast } from 'sonner'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useAimemeInfoStore } from '@/stores/use-ai-meme-info-store'
import { aiApi } from '@/api/ai'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { useCheckAccount } from '@/hooks/use-check-chain'
import { useCreateTokenContext } from '@/contexts/create-token'
import { CoinType } from '@/config/coin'

let memeDescAbort = new AbortController()

export const DescriptionField = () => {
  const { form, formFields } = useCreateTokenContext()
  const { t } = useTranslation()
  const { loadingDesc, setLoadingDesc } = useAimemeInfoStore()
  const { playGuaGua } = useAudioPlayer()
  const { checkForConnect } = useCheckAccount()

  const createDesc = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    // TODO: change it after find libraries
    // if (!walletIsConnected()) return
    if (form.getValues(formFields?.fullname) === '') {
      toast.warning(t('need.base.info.warning'))
      return
    }
    setLoadingDesc(true)
  }

  const fetchMemeLogo = () => {
    memeDescAbort.abort()
    memeDescAbort = new AbortController()
    aiApi
      .getMemeInfo(
        {
          input: form.getValues(formFields.fullname)! as string,
          type: 1,
        },
        memeDescAbort.signal
      )
      .then(({ data }) => {
        if (data) {
          form.setValue(formFields.description, data.description!)
        }
      })
      .finally(() => {
        setLoadingDesc(false)
      })
  }

  useEffect(() => {
    if (loadingDesc) {
      playGuaGua()
      fetchMemeLogo()
    }
  }, [loadingDesc])

  useEffect(() => {
    return () => {
      memeDescAbort.abort('')
    }
  }, [])

  return (
    <FormField
      control={form?.control}
      name={formFields?.description!}
      render={({ field }) => (
        <FormItem className="max-w-[500px]">
          <FormLabel className="font-bold flex items-center">
            {(form.getValues(formFields.coinType) as unknown as CoinType) ==
            CoinType.Default
              ? t('description')
              : t('agent.personality')}
            {/* <LuRefreshCcw
              className={cn(
                'ml-2',
                loadingDesc ? 'animate-spin' : 'cursor-pointer'
              )}
              title="Regenerate"
              onClick={createDesc}
            /> */}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={t('description.placeholder')}
              rows={5}
              {...field}
              disabled={
                loadingDesc ||
                +form.getValues(formFields.coinType) == CoinType.NFTAgent
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
