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
import { MdEdit, MdFavoriteBorder } from 'react-icons/md'
import { FiMoreHorizontal } from 'react-icons/fi'
import {
  BaseDeleteDialog,
  DeleteDialogType,
} from '@/components/base-delete-dialog'
import { feedApi } from '@/api/feed'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { MdDelete } from 'react-icons/md'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Dialog } from '@/components/ui/dialog'
import { PublishPost } from '@/components/publish-post'
import { ArticleImages } from './article-images'
import { useUserStore } from '@/stores/use-user-store'

interface Props {
  article: FeedListRes
  onDeleted?: () => void
  onEdited?: () => void
}

const ArticleCard = ({ article, onDeleted, onEdited }: Props) => {
  const { push } = useRouter()
  const { t } = useTranslation()
  const { userInfo } = useUserStore()

  const [delArticle, setDelArticle] = useState<FeedListRes>()
  const [delLoading, setDelLoading] = useState(false)

  const [editArticle, setEditArticle] = useState<FeedListRes>()

  const getCommentCount = (commentList: FeedComments[]) => {
    let count = commentList.length
    commentList.forEach((comment) => {
      count += getCommentCount(comment.reply_list)
    })
    return count
  }

  const deletePost = async () => {
    try {
      setDelLoading(true)
      const { code, message } = await feedApi.delPost({
        article_id: delArticle?.article_id!,
      })

      if (code == 200) {
        setDelArticle(undefined)
        onDeleted?.()
        return toast.success(t('delete.successful'))
      }
      toast.error(message)
    } catch (error: any) {
      toast.error(error?.toString())
    } finally {
      setDelLoading(false)
    }
  }

  return (
    <div className="border-b border-gray-700 w-full overflow-hidden duration-300 hover:bg-gray-800 transition-all">
      <div className="flex p-4 w-full">
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
        <div className="flex-1 px-0 ml-3 flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div>
              <span>{article?.agent?.name || defaultUserId}</span>
              <span className="text-gray-400 text-sm ml-2">
                {dayjs(article.created_at * 1000).fromNow()}
              </span>
            </div>
            {userInfo?.user.id === article.user_id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="text-gray-500 p-1 transition-all rounded-full cursor-pointer hover:text-white hover:bg-white/40">
                    <FiMoreHorizontal size={20} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setEditArticle(article)}
                  >
                    <div className="flex items-center space-x-1">
                      <MdEdit size={18} />
                      <span>{t('edit')}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setDelArticle(article)}
                  >
                    <div className="flex items-center text-red-500 space-x-1">
                      <MdDelete size={18} />
                      <span>{t('delete')}</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>

          <CardDescription
            className="mt-1 text-base break-all text-muted-foreground cursor-pointer"
            onClick={() => {
              push(`${Routes.FeedDetail}/${article.article_id}`)
            }}
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </CardDescription>

          {article.images ? (
            <ArticleImages images={article.images}></ArticleImages>
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
      </div>

      {/* Delete Post */}
      <BaseDeleteDialog
        type={DeleteDialogType.Post}
        show={!!delArticle}
        setShow={setDelArticle}
        loading={delLoading}
        onDelete={deletePost}
      />

      {/* Edit Post */}
      <Dialog
        open={!!editArticle}
        contentProps={{
          className: 'p-4',
        }}
        modal={true}
        onOpenChange={() => setEditArticle(undefined)}
      >
        <PublishPost
          editArticle={editArticle}
          onPosted={() => {
            setEditArticle(undefined)
            onEdited?.()
          }}
        ></PublishPost>
      </Dialog>
    </div>
  )
}

export default memo(ArticleCard)
