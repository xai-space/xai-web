import { FeedListItem } from '@/api/feed/types'
import { useWallet } from '@/hooks/use-wallet'
import { Routes } from '@/routes'
import { useRouter } from 'next/router'
import { LuMessageSquare } from 'react-icons/lu'

export const CommentCount = ({ article }: { article?: FeedListItem }) => {
  const { push } = useRouter()
  const { isConnected, showConnectModal } = useWallet()

  return (
    <div
      className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800"
      onClick={() => {
        if (!isConnected) {
          showConnectModal()
          return
        }
        push(`${Routes.FeedDetail}/${article?.article_id}`)
      }}
    >
      <LuMessageSquare size={20} />
      <span>{article?.comment_count}</span>
    </div>
  )
}
