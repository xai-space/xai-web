import { FeedListItem } from '@/api/feed/types'
import { CommentCount } from '@/components/comment-count'
import { LikeButton } from '@/components/like-button'
import { RepatButton } from '@/components/repat'

interface Props {
  article?: FeedListItem
  setArticle: (article: FeedListItem) => void
}

const ArticleFooter = ({ article, setArticle }: Props) => {
  const onLike = () => {
    article!.is_liked = !article!.is_liked
    article!.like_count = article!.is_liked
      ? article!.like_count + 1
      : article!.like_count - 1
    setArticle(article!)
  }

  return (
    <div className="mt-[16px] flex justify-between py-2 border-t border-b border-[#e5e5e5]">
      <CommentCount article={article} />
      <LikeButton article={article} onLike={onLike} />
      <RepatButton />
    </div>
  )
}

export default ArticleFooter
