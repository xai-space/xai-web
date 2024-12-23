'use client'

import { memo, use, useEffect, useMemo, useState } from 'react'
import { CardDescription } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { LuMessageSquare } from 'react-icons/lu'

import { FeedComments, FeedListItem } from '@/api/feed/types'
import { staticUrl } from '@/config/url'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import { Routes } from '@/routes'
import { useRouter } from 'next/router'
import { ImagePreview } from '@/components/image-preview'
import { defaultUserId } from '@/config/base'
import { Avatar } from '@/components/ui/avatar'
import { MdEdit, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
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
import { defaultAgentLogo, defaultUserLogo } from '@/config/link'
import Link from 'next/link'
import { UserCategory, UserInfoRes } from '@/api/user/types'
import { useArticleStore } from '@/stores/use-article-store'

interface Props {
  article: FeedListItem
  onDeleted?: () => void
  onEdited?: () => void
}
let status = 0

const ArticleCard = ({ article, onDeleted, onEdited }: Props) => {
  const { push } = useRouter()
  const { t } = useTranslation()
  const { userInfo } = useUserStore()

  const [delArticle, setDelArticle] = useState<FeedListItem>()
  const [delLoading, setDelLoading] = useState(false)

  const [editArticle, setEditArticle] = useState<FeedListItem>()
  const { setPostsList } = useArticleStore()

  const getCommentCount = (commentList: FeedComments[]) => {
    let count = commentList?.length
    commentList?.forEach((comment) => {
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

  const toAccount = () => {
    // push(Routes.AgentInfo)
    setPostsList([])
    push(
      `${Routes.Account}/${
        article.agent?.agent_id || article.user?.user_id
      }?t=${article.agent?.agent_id ? UserCategory.Agent : UserCategory.User}`
    )
  }

  // likes-posts
  const [likes, setLikes] = useState(article.like_count)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    status = article.is_liked ? 0 : 1
    console.log('status-likes:', status)

    setIsLiked(article.is_liked)
  }, [article.is_liked])
  const postLike = async () => {
    console.log('postLike')

    try {
      await feedApi.updateLikesofPosts({
        category: 'article',
        target_id: article.article_id,
        status,
      })

      if (status) {
        setLikes((pre) => pre + 1)
        setIsLiked(true)
      } else {
        setLikes((pre) => {
          if (pre <= 0) return 0
          return pre - 1
        })
        setIsLiked(false)
      }
      status = status ? 0 : 1
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="border-b border-[#e5e5e5] w-full overflow-hidden duration-300 hover:bg-gray-200 transition-all">
      <div className="flex p-4 w-full">
        <div
          className="flex-shrink-0 rounded-full w-[40px] h-[40px] overflow-hidden cursor-pointer"
          onClick={toAccount}
        >
          <Avatar
            src={
              article.agent?.logo
                ? `${staticUrl}${article.agent?.logo}`
                : article?.user?.logo
                ? `${staticUrl}${article.user?.logo}`
                : defaultUserLogo
            }
            alt="logo"
          />
        </div>
        <div className="flex-1 px-0 ml-3 flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="text-black">
              <span className="cursor-pointer" onClick={toAccount}>
                {article?.agent?.name || article?.user?.name || '--'}
              </span>
              <span className="text-gray-400 text-sm ml-2">
                {dayjs(article.created_at * 1000).fromNow()}
              </span>
            </div>
            {userInfo?.user_id === article?.user?.user_id ? (
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
            className="mt-1 text-base break-all text-white cursor-pointer"
            onClick={() => {
              push(`${Routes.FeedDetail}/${article.article_id}`)
            }}
          >
            <ReactMarkdown
              className={'text-black'}
              components={{
                a: ({ href, children }) => {
                  return (
                    <Link
                      href={href || '#'}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      {children}
                    </Link>
                  )
                },
              }}
            >
              {article.content}
            </ReactMarkdown>
          </CardDescription>

          {article.images ? (
            <ArticleImages images={article.images}></ArticleImages>
          ) : null}
          <div className="mt-2 flex space-x-5">
            <div
              className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={() => {
                push(`${Routes.FeedDetail}/${article.article_id}`)
              }}
            >
              <LuMessageSquare size={20} />
              <span>{article?.comment_count}</span>
            </div>
            <div
              className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={() => postLike()}
            >
              {isLiked ? (
                <MdFavorite fill="#f87171" size={20} />
              ) : (
                <MdFavoriteBorder size={20} />
              )}
              <span>{likes}</span>
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
