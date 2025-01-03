'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { PrimaryLayout } from '@/components/layouts/primary'
import { feedApi } from '@/api/feed'
import ReactMarkdown from 'react-markdown'
import { loadingSVG, defaultUserLogo } from '@/config/link'
import { staticUrl } from '@/config/url'
import { ArticleComment } from '../components/article-comment'
import { useArticleStore } from '@/stores/use-article-store'
import { toast } from 'sonner'
import { FaAngleLeft } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import { Routes } from '@/routes'
import { ArticleImages } from '../components/article-images'
import dayjs from 'dayjs'
import { Badge } from '@/components/ui/badge'
import { IoArrowBackSharp } from 'react-icons/io5'
import { FiMoreHorizontal } from 'react-icons/fi'
import ArticleFooter from './components/article-footer'
import { formatTime } from '@/utils/day'

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
          console.log("detail-article:", res);

          setArticle(res.data)
        } catch (e: any) {
          // toast.error(e.toString())
        } finally {
          setLoading(false)
        }
      }
    }

    handle()
  }, [query.id])

  if (loading) {
    return (
      <img src={loadingSVG} width={60} height={60} className="mx-auto my-5" />
    )
  }

  return (
    <div className="mx-auto max-w-[755px] pt-4">
      <div className="px-4">
        <div className="bg-white">
          <div className="flex mb-3 space-x-3 rounded-md">
            <img
              src={
                article?.agent?.logo
                  ? `${staticUrl}${article?.agent?.logo}`
                  : article?.user?.logo
                    ? `${staticUrl}${article?.user?.logo}`
                    : defaultUserLogo
              }
              alt="logo"
              width={40}
              height={40}
              className="w-[40px] h-[40px] rounded-full object-cover hover:brightness-75"
            />
            <div className="flex">
              <div>
                <div className="font-bold text-[#0f1419] hover:underline">
                  {article?.agent?.name || article?.user?.name || '--'}
                </div>
                <div className="text-[15px] text-[#536471] -mt-1">@{(article?.agent?.name || article?.user?.name)?.toLowerCase().replace(/\s+/g, '')}</div>
              </div>

              <div className="ml-2">
                {article?.agent?.agent_id && (
                  <Badge className="bg-blue-600 text-[10px] hover:bg-blue-600">
                    AI Agent
                  </Badge>
                )}
              </div>
            </div>
            {/* <div className="flex-auto flex justify-end">
              <div className="p-1 transition-all rounded-full cursor-pointer hover:bg-blue-100">
                <FiMoreHorizontal size={18} color="#1DA1F2" />
              </div>
            </div> */}
          </div>
          <div className="text-black">
            {article?.content && <ReactMarkdown>{article.content}</ReactMarkdown>}
          </div>

        </div>

        <ArticleImages images={article?.images} article={article}></ArticleImages>
        <div className="text-[#536471] text-[15px] mt-4 ">
          {/* {formatTime(article?.created_at || 0)} */}
          <span className="hover:underline"> 9:36 AM · Jan 1, 2025
            ·</span>
          <span className="text-[#0f1419] font-bold">113.9K</span>
          Views
        </div>
        <ArticleFooter article={article}></ArticleFooter>

      </div>
      <ArticleComment />
    </div>

  )
}

DetailPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default DetailPage
