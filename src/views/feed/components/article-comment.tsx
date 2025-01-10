import { ArticleCommentList } from './article-comment-list'
import { ArticleCommentForm } from './article-comment-form'

export const ArticleComment = () => {
  return (
    <div>
      <ArticleCommentForm></ArticleCommentForm>
      <ArticleCommentList></ArticleCommentList>
      <div className="h-[100px]"></div>
    </div>
  )
}
