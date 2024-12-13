'use client'

import { aiApi } from '@/api/ai'
import Input from '@/components/input'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { apiUrl } from '@/config/url'
import { useLang } from '@/hooks/use-lang'
import { formatFileName } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { feedApi } from '@/api/feed'
import { useRouter } from 'next/navigation'
import { defaultUserId } from '@/config/base'
import { useTranslation } from 'react-i18next'
import { Textarea } from '@/components/ui/textarea'

const articleFormSchema = z.object({
  content: z.string().min(1),
})

type ArticleFormValues = z.infer<typeof articleFormSchema>

const defaultValues: Partial<ArticleFormValues> = {
  content: '',
}

export const ArticleCreate = () => {
  const { getLang } = useLang()

  const { t } = useTranslation()

  const router = useRouter()

  const lang = getLang()

  const [images, setImages] = useState<Array<string>>([])

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  async function onSubmit(data: ArticleFormValues) {
    try {
      const res = await feedApi.createFeed({
        content: data.content,
      })

      if (res.data.article_id) {
        router.push(`/feed/detail/${res.data.article_id}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onUploadImg = async (
    files: Array<File>,
    callback: (
      urls: string[] | { url: string; alt: string; title: string }[]
    ) => void
  ) => {
    const formattedFiles = files.map((file) => {
      const newFileName = formatFileName(file.name)
      return new File([file], newFileName, { type: file.type })
    })

    const formData = new FormData()
    formData.append('file', formattedFiles[0])

    const res = await aiApi.uploadImage(formData)
    setImages([...images, res.data.url])

    const urls = {
      url: `${apiUrl.assets}/${res.data.url}`,
      alt: res.data.filename,
      title: res.data.filename,
    }

    callback([urls])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Input {...field} className="hidden" />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormItem>
            )}
          />
          {/* <MdEditor
            id="myId"
            value={text}
            onChange={setText}
            theme="dark"
            language={lang === 'zh' ? 'zh-CN' : 'en-US'}
            noImgZoomIn
            noMermaid
            noKatex
            onUploadImg={onUploadImg}
          /> */}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="z-50"
            disabled={!form.getValues('content')?.trim()?.length}
          >
            {t('create')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
