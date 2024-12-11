import { userLogoDefault } from '@/config/link'
import { Avatar } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import TextareaAutosize from 'react-textarea-autosize'
import { FaRegImage } from 'react-icons/fa6'
import ImageUpload from './image-upload'
import { useUploadImage } from '@/hooks/use-upload-image'
import { IoClose } from 'react-icons/io5'
import { feedApi } from '@/api/feed'
import { defaultUserId } from '@/config/base'
import { toast } from 'sonner'
import { useArticleStore } from '@/stores/use-article-store'

interface Props {
  onPosted: () => void
}

export const PublishPost = ({ onPosted }: Props) => {
  const [value, setValue] = useState('')
  const imgRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { feedList, setFeedList } = useArticleStore()

  const { closeItem, checkCount, blobUrl, onSubmitImg, onChangeUpload } =
    useUploadImage({
      inputEl: imgRef.current,
      maxFile: 3,
      showToast: false,
    })

  const onUploadImg = () => {
    if (checkCount()) imgRef.current?.click()
  }

  const updateFeed = async () => {
    const { data } = await feedApi.getList({
      limit: 10,
      page: 1,
    })

    const firstArticleId = feedList[0]?.article_id
    const newList = []

    console.log('firstArticleId', firstArticleId)

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      console.log(item.article_id, firstArticleId)

      if (item.article_id !== firstArticleId) {
        newList.push(item)
      } else break
    }

    console.log(newList)

    setFeedList(newList.concat(feedList))
  }

  const onSubmit = async () => {
    const lid = toast.loading(t('publishing'))
    setLoading(true)
    try {
      const url = await onSubmitImg()
      const images = url?.map(({ url }) => url)

      await feedApi.createFeed({
        content: value,
        user_id: defaultUserId,
        images: images,
      })
      await updateFeed()
      toast.success(t('published.successfully'))
      onPosted()
    } catch {
      toast.error(t('published.error'))
    } finally {
      setLoading(false)
      toast.dismiss(lid)
    }
  }

  return (
    <>
      <div className="flex">
        <Avatar src={userLogoDefault} alt="Logo" />
        <div className="flex-1">
          <TextareaAutosize
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder={t('idea.placeholder')}
            className="!border-none resize-none text-xl focus:shadow-none focus:!border-none !outline-0 focus-visible:!shadow-[0px_0px_0px_0px_0px_#ffffff00] m-2 pr-5 min-h-[40px] max-h-[60vh] w-full"
            autoFocus={true}
          ></TextareaAutosize>
          <div className="flex space-x-1">
            {blobUrl.map((url, i) => {
              return (
                <div className="relative flex-1">
                  <img
                    src={url}
                    alt="Logo"
                    className="rounded-md w-full h-full object-cover max-h-[15vh]"
                  />
                  <div className="absolute right-0 top-0 bg-black/50 border-dashed border border-gray-500 rounded-full">
                    <IoClose
                      className="cursor-pointer"
                      size={20}
                      onClick={() => {
                        closeItem(i)
                      }}
                    ></IoClose>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex pt-4 items-center justify-between border-t border-gray-600">
        <span>
          <FaRegImage
            size={20}
            className="cursor-pointer hover:text-gray-400"
            onClick={onUploadImg}
          ></FaRegImage>
        </span>
        <Button onClick={onSubmit} disabled={!value.trim() || loading}>
          {t('post')}
        </Button>
      </div>
      <ImageUpload
        ref={imgRef}
        className="hidden"
        multiple={true}
        onChange={(e) => onChangeUpload(e, false)}
      ></ImageUpload>
    </>
  )
}
