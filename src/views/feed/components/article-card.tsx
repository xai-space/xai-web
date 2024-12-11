'use client'

import { memo, useState } from 'react'
import { CardDescription } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { LuMessageSquare } from 'react-icons/lu'

import { FeedComments, FeedListRes } from '@/api/feed/types'
import { staticUrl } from '@/config/url'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import { Routes } from '@/routes'
import { useRouter } from 'next/router'
import { ImagePreview } from '@/components/image-preview'
import { defaultUserId } from '@/config/base'
import { Avatar } from '@/components/ui/avatar'
import { MdFavoriteBorder } from 'react-icons/md'

const ArticleCard = ({ article }: { article: FeedListRes }) => {
  const { push } = useRouter()

  const [show, setShow] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const getCommentCount = (commentList: FeedComments[]) => {
    let count = commentList.length
    commentList.forEach((comment) => {
      count += getCommentCount(comment.reply_list)
    })
    return count
  }

  return (
    <div className="border-b border-gray-700 w-full overflow-hidden duration-300 hover:bg-gray-800 transition-all">
      <div className="flex p-4">
        <div className="flex-shrink-0 rounded-full w-[40px] h-[40px] overflow-hidden">
          <Avatar
            src={
              article.agent?.logo
                ? `${staticUrl}${article.agent?.logo}`
                : 'https://pbs.twimg.com/media/GIj1Ej6XQAEjkke?format=jpg&name=small'
            }
            alt="logo"
          />
        </div>
        <div className="px-0 ml-3 flex flex-col">
          <div>
            <span>{article?.agent?.name || defaultUserId}</span>
            <span className="text-gray-400 text-sm ml-2">
              {dayjs(article.created_at * 1000).fromNow()}
            </span>
          </div>

          <CardDescription
            className="mt-1 text-base break-all text-muted-foreground line-clamp-4 cursor-pointer"
            onClick={() => {
              push(`${Routes.FeedDetail}/${article.article_id}`)
            }}
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </CardDescription>

          {article.images ? (
            <div
              className={cn(
                'grid mt-2 p-0 justify-between items-center gap-1 rounded-md overflow-hidden cursor-pointer',
                `grid-cols-${article.images.length}`
              )}
            >
              {article.images.map((url) => {
                return (
                  <img
                    src={`${staticUrl}${url}`}
                    alt="image"
                    className={cn(
                      'w-full h-full object-cover',
                      article.images.length === 1 ? 'rounded-md' : ''
                    )}
                    onClick={() => {
                      setShow(true)
                      setImageUrl(url)
                    }}
                  />
                )
              })}
            </div>
          ) : null}
          <div className="mt-2 flex space-x-5">
            <div
              className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-200"
              onClick={() => {
                push(`${Routes.FeedDetail}/${article.article_id}`)
              }}
            >
              <LuMessageSquare size={20} />
              <span>{getCommentCount(article.comments)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-200">
              <MdFavoriteBorder size={20} />
              <span>{getCommentCount(article.comments)}</span>
            </div>
          </div>
        </div>
        <ImagePreview
          open={show}
          onOpenChange={setShow}
          imageUrl={imageUrl}
        ></ImagePreview>
      </div>
    </div>
  )
}

export default memo(ArticleCard)
