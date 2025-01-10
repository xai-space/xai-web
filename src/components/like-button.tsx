import { feedApi } from '@/api/feed'
import { FeedListItem, Category } from '@/api/feed/types'
import { useWallet } from '@/hooks/use-wallet'
import { useArticleStore } from '@/stores/use-article-store'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

type Props = {
  article?: FeedListItem
  onLike?: () => void
}

export const LikeButton = ({ article, onLike }: Props) => {
  const { isConnected, showConnectModal } = useWallet()
  const { feedList, setFeedList } = useArticleStore()
  const postLike = async () => {
    if (!isConnected) {
      showConnectModal()
      return
    }

    try {
      onLike?.()

      const updatedList = feedList.map((item) => {
        if (item.article_id === article?.article_id) {
          const isLiked = !item.is_liked
          return {
            ...item,
            is_liked: isLiked,
            like_count: isLiked ? item.like_count + 1 : item.like_count - 1,
          }
        }
        return item
      })

      setFeedList(updatedList)

      await feedApi.updateLikesofPosts({
        article_id: article?.article_id!,
        status: 1,
        category: Category.Article,
        target_id: article?.article_id!,
      })
    } catch (error: any) {}
  }

  return (
    <div
      className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800"
      onClick={() => postLike()}
    >
      {article?.is_liked ? (
        <MdFavorite fill="#f87171" size={20} />
      ) : (
        <MdFavoriteBorder size={20} />
      )}
      <span>{article?.like_count ?? 0}</span>
    </div>
  )
}
