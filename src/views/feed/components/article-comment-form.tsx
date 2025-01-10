import { feedApi } from '@/api/feed'
import { Button } from '@/components/ui/button'
import { useArticleStore } from '@/stores/use-article-store'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import TextareaAutosize from 'react-textarea-autosize'
import { defaultUserLogo } from '@/config/link'
import { cn } from '@/lib/utils'
import { useWallet } from '@/hooks/use-wallet'

interface ReplyProps {
  replayUser?: {
    name: string
    cid: string
  }
  onSended?: () => void
}

export const ArticleCommentForm = ({ replayUser, onSended }: ReplyProps) => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { setArticle } = useArticleStore()
  const { isConnected, showConnectModal } = useWallet()
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const { feedList, setFeedList } = useArticleStore()

  const postComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!isConnected) {
      showConnectModal()
      return
    }

    if (comment.trim().length === 0) {
      toast.warning(t('input.comment'))
      return
    }

    if (typeof query.id === 'string') {
      setLoading(true)

      feedList.map((item) => {
        if (item.article_id === query.id) {
          item.comment_count = item!.comment_count! + 1 || 1
        }
      })
      setFeedList(feedList)

      try {
        await feedApi.createComment({
          article_id: query.id,
          content: comment,
          raw_comment_id: replayUser?.cid,
        })
        toast.success(t('comment.posted'))
        // setFeedList([])
        await getComment()

        new Promise((resolve) => setTimeout(resolve, 10000)).then(async () => {
          await getComment()
        })
      } catch {
      } finally {
        onSended?.()
        setLoading(false)
        setComment('')
        setLoading(false)
      }
    }
  }

  const getComment = async () => {
    const data = await feedApi.getDetail(query.id as unknown as string)
    setArticle(data.data)
  }

  return (
    <div className={cn('flex items-start  shrink-0 justify-between px-4 mt-5')}>
      <div className="flex w-full">
        <img src={defaultUserLogo} alt="" className="w-10 h-10 rounded-full" />
        <TextareaAutosize
          className={cn(
            'bg-transparent block max-sm:w-[210px] w-full text-black resize-none ml-2 p-2 rounded-md placeholder-[#536471]'
          )}
          value={comment}
          disabled={loading}
          onChange={(e) => setComment(e.target.value)}
          placeholder={'Post your reply'}
        ></TextareaAutosize>
      </div>
      <Button
        onClick={(e) => postComment(e)}
        className={cn(
          'bg-[#87898c] text-white text-center  text-[15px] px-4 py-[5px] rounded-full ml-2',
          comment.length > 0 && 'bg-[#0f1419]'
        )}
      >
        {t('reply')}
      </Button>
    </div>
  )
}
