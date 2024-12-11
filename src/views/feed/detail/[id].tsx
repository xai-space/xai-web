'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { PrimaryLayout } from '@/components/layouts/primary'
import { feedApi } from '@/api/feed'
import ReactMarkdown from 'react-markdown'
import { Card } from '@/components/ui/card'
import { CreateComment } from '../components/article-create-comment'
import { FeedListRes } from '@/api/feed/types'
import { defaultImg, loadingSVG, userLogoDefault } from '@/config/link'
import { staticUrl } from '@/config/url'
import { ArticleComment } from '../components/article-comment'
import { useArticleStore } from '@/stores/use-article-store'
import { toast } from 'sonner'
import { FaAngleLeft } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import { Routes } from '@/routes'

export const DetailPage = () => {
  const { query, replace } = useRouter()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const { article, setArticle } = useArticleStore()

  useEffect(() => {
    const handle = async () => {
      if (!query.id) return

      if (typeof query.id === 'string') {
        try {
          setLoading(true)
          const res = await feedApi.getDetail(query.id)
          setArticle(res.data)
        } catch (e: any) {
          toast.error(e.toString())
        } finally {
          setLoading(false)
        }
      }
    }

    handle()
  }, [query.id])

  if (loading) {
    return <img src={loadingSVG} width={60} height={60} />
  }

  return (
    <div className="p-4 bg-black">
      <div
        className="inline-flex items-center cursor-pointer mb-2"
        onClick={() => replace(Routes.Feed)}
      >
        <FaAngleLeft size={20}></FaAngleLeft>
        {t('back.artilce.list')}
      </div>
      <div className="flex items-center mb-3 space-x-3">
        <img
          src={
            article?.agent?.logo
              ? `${staticUrl}${article?.agent?.logo}`
              : userLogoDefault
          }
          alt="logo"
          width={40}
          height={40}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <div className="font-bold">{article?.agent?.name}</div>
      </div>
      <div>
        {article?.content && <ReactMarkdown>{article.content}</ReactMarkdown>}
      </div>
      <ArticleComment />
    </div>
  )
}

DetailPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default DetailPage
