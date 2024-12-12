import { FeedComments } from '@/api/feed/types'
import { defaultUserLogo } from '@/config/link'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { useArticleStore } from '@/stores/use-article-store'
import { useState } from 'react'
import { ArticleCommentForm } from './article-comment-form'
import { defaultUserId } from '@/config/base'
import { cn } from '@/lib/utils'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

export const ArticleCommentList = () => {
  const { t } = useTranslation()

  const { article } = useArticleStore()

  return (
    <div className="mt-8">
      <div className="text-xl mb-2">{t('comment')}</div>
      {article?.comments.map((comment) => {
        return (
          <ArticleCommentItem
            key={comment.comment_id}
            className="border-t border-gray-400"
            comment={comment}
          ></ArticleCommentItem>
        )
      })}
    </div>
  )
}

interface CommentItem {
  comment: FeedComments
  rowComment?: FeedComments
  className?: string
  onReply?: () => void
}

const ArticleCommentItem = ({ className, comment, onReply }: CommentItem) => {
  const [show, setShow] = useState(false)

  const { t } = useTranslation()
  const [viewAll, setViewAll] = useState(false)

  return (
    <div className={cn('relative pl-12 py-4', className)}>
      <img
        src={defaultUserLogo}
        alt="Logo"
        width={40}
        height={40}
        className={cn(
          'object-cover w-[40px] h-[40px] rounded-full',
          'absolute top-4 left-0'
        )}
      />
      <div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center font-bold">
            <span>{comment.user_id}</span>
          </div>
          <span>{dayjs(comment.created_at * 1000).fromNow()}</span>
        </div>
        <ReactMarkdown className="mt-1">{comment.content}</ReactMarkdown>

        <div className="flex items-center mt-2 space-x-4">
          {defaultUserId !== comment.user_id ? (
            <div>
              <BiMessageRoundedDetail
                className="cursor-pointer hover:text-gray-300"
                onClick={() => setShow(!show)}
              ></BiMessageRoundedDetail>
            </div>
          ) : null}
          {comment.reply_list.length ? (
            <div
              className={cn(
                'flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-400',
                viewAll ? 'text-gray-400' : ''
              )}
              onClick={() => {
                setViewAll(!viewAll)
              }}
            >
              {viewAll ? (
                <>
                  <span>{t('close.all.reply')}</span>
                  <FaChevronUp
                    size={14}
                    className="translate-y-[1px]"
                  ></FaChevronUp>
                </>
              ) : (
                <>
                  <span>{t('view.all.reply')}</span>
                  <FaChevronDown size={14}></FaChevronDown>
                </>
              )}
            </div>
          ) : null}
        </div>
        {show ? (
          <ArticleCommentForm
            replayUser={{
              cid: comment.comment_id,
              name: comment.user_id,
            }}
            onSended={() => {
              setShow(false)
              setViewAll(true)
            }}
          ></ArticleCommentForm>
        ) : null}
        {comment.reply_list.length && viewAll ? (
          <div className="rounded-md">
            {comment.reply_list.map((reply) => {
              return (
                <ArticleReplyCommentItem
                  rowComment={comment}
                  comment={reply}
                  key={reply.comment_id}
                  onReply={() => {
                    setViewAll(true)
                    onReply?.()
                  }}
                ></ArticleReplyCommentItem>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const ArticleReplyCommentItem = ({
  className,
  comment,
  rowComment,
  onReply,
}: CommentItem) => {
  const [show, setShow] = useState(false)

  const { t } = useTranslation()

  return (
    <div className={cn('pt-5', className)}>
      <div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center font-bold">
            <img
              src={defaultUserLogo}
              alt="Logo"
              width={22}
              height={22}
              className={cn('object-cover w-[22px] h-[22px] rounded-full mr-2')}
            />
            <span>{comment.user_id}</span>
          </div>
          <span>{dayjs(comment.created_at * 1000).fromNow()}</span>
        </div>
        <div className="mt-1">
          <span className="text-gray-300">
            <span className="text-blue-500 cursor-pointer">
              @{rowComment?.user_id}
              {` `}
            </span>
          </span>
          {comment.content}
        </div>
        <div className="flex items-center space-x-4">
          {defaultUserId !== comment.user_id ? (
            <div className="my-4">
              <BiMessageRoundedDetail
                className="cursor-pointer hover:text-gray-300"
                onClick={() => setShow(!show)}
              ></BiMessageRoundedDetail>
            </div>
          ) : null}
          {/* <div
            className="text-sm cursor-pointer hover:text-gray-400"
            onClick={() => {
              setViewAll(!viewAll)
            }}
          >
            {t('view.all.reply')}
          </div> */}
        </div>
        {show ? (
          <ArticleCommentForm
            replayUser={{
              cid: comment.comment_id,
              name: comment.user_id,
            }}
            onSended={() => {
              setShow(false)
              onReply?.()
            }}
          ></ArticleCommentForm>
        ) : null}
        {comment.reply_list.length ? (
          <div className="mt-2">
            <div className="rounded-md">
              {comment.reply_list.map((reply) => {
                return (
                  <ArticleReplyCommentItem
                    key={reply.comment_id}
                    comment={reply}
                    onReply={onReply}
                  ></ArticleReplyCommentItem>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
