import { Routes } from '@/routes'
import { useState } from 'react'
import { LuMessageSquare } from 'react-icons/lu'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { TbRepeat } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const ArticleFooter = ({ article }: { article: any }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(article?.like_count)
  const { push } = useRouter()
  const { t } = useTranslation()

  return (
    <div className="mt-[16px] flex justify-between py-2 border-t border-b border-[#e5e5e5]">
      <div
        className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => {
          push(`${Routes.FeedDetail}/${article.article_id}`)
        }}
      >
        <LuMessageSquare size={20} />
        <span>{article?.comment_count}</span>
      </div>
      <div className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800">
        {isLiked ? (
          <MdFavorite fill="#f87171" size={20} />
        ) : (
          <MdFavoriteBorder size={20} />
        )}
        <span>{likes}</span>
      </div>
      <div
        className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => {
          toast.info(t('coming-soon'))
        }}
      >
        <TbRepeat size={20} />
        <span>0</span>
      </div>
    </div>
  )
}

export default ArticleFooter
