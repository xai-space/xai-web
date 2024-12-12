import { feedApi } from '@/api/feed'
import { FeedComments } from '@/api/feed/types'
import Input from '@/components/input'
import { Button } from '@/components/ui/button'
import { defaultUserId } from '@/config/base'
import { defaultUserLogo } from '@/config/link'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
// import { CommentList } from './article-comment-list'

interface Props {
  onPosted: () => any
}

export const CreateComment = ({ onPosted }: Props) => {
  return
}
