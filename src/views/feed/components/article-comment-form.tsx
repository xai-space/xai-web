import { feedApi } from '@/api/feed'
import Input from '@/components/input'
import { Button } from '@/components/ui/button'
import { defaultUserId } from '@/config/base'
import { useArticleStore } from '@/stores/use-article-store'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import TextareaAutosize from 'react-textarea-autosize'
import { useUserStore } from '@/stores/use-user-store'
import { DynamicConnectButton } from '@dynamic-labs/sdk-react-core'
import { isEmpty } from 'lodash'
import { defaultAgentLogo, defaultUserLogo } from '@/config/link'
import { cn } from '@/lib/utils'

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
  const { setArticle, setFeedList } = useArticleStore()
  const { userInfo } = useUserStore()
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEnter, setIsEnter] = useState(false);
  const postComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userInfo?.user_id) {
      toast.error(t('no.login'))
      return
    }
    e.stopPropagation()

    if (comment.trim().length === 0) {
      toast.warning(t('input.comment'))
      return
    }
    if (typeof query.id === 'string') {
      setLoading(true)
      try {
        console.log("comment:", comment);
        await feedApi.createComment({
          article_id: query.id,
          content: comment,
          raw_comment_id: replayUser?.cid,
        })
        toast.success(t('comment.posted'))
        setIsEnter(false)
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

  // return (
  //   <div className="mt-5 px-4">
  //     <TextareaAutosize
  //       className="w-full bg-gray-200 text-black resize-none p-2 rounded-md min-h-[100px] max-h-[200px]"
  //       value={comment}
  //       disabled={loading}
  //       onChange={(e) => setComment(e.target.value)}
  //       placeholder={
  //         replayUser ? `${t('replay')} @${replayUser.name}` : t('enter.comment')
  //       }
  //     ></TextareaAutosize>
  //     <DynamicConnectButton>
  //       <Button
  //         onClick={postComment}
  //         className="mt-2 text-white bg-[#2563eb]"
  //         disabled={loading || isEmpty(comment.trim())}
  //       >
  //         {loading ? t('posting') : t('post.comment')}
  //       </Button>
  //     </DynamicConnectButton>
  //   </div>
  // )
  return (
    <div className='flex items-start flex-wrap shrink-0 justify-between px-4 mt-5'>
      <div className='flex'>
        <img src={defaultUserLogo} alt="" className='w-10 h-10 rounded-full' />
        {
          (<TextareaAutosize
            className={cn("bg-white max-sm:w-[210px] w-[400px] text-black resize-none ml-2 p-2 rounded-md placeholder-[#536471]", isEnter && 'w-[560px] min-h-[90px]')}
            value={comment}
            disabled={loading}
            onFocus={() => setIsEnter(true)}

            onChange={(e) => setComment(e.target.value)}
            placeholder={
              "Post your reply"
            }
          ></TextareaAutosize>)
        }


      </div>
      <div className='flex justify-end flex-1 '>
        <Button onClick={(e) => postComment(e)} className={cn('bg-[#87898c] text-white text-center  text-[15px] px-4 py-[5px] rounded-full', comment.length > 0 && 'bg-[#0f1419]')}>Reply</Button>
      </div>
    </div>
  )
}
