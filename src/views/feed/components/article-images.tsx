import { ImagePreview } from '@/components/image-preview'
import { staticUrl } from '@/config/url'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import ArticleFooter from '../detail/components/article-footer'

interface Props {
  images?: string[]
  article?: any
}

export const ArticleImages = ({ images, article }: Props) => {
  const [show, setShow] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  if (!images?.length) return <></>

  return (
    <>
      <div
        className={cn(
          'grid mt-2  justify-between items-center gap-1 rounded-md overflow-hidden cursor-pointer',
          `grid-cols-${images.length}`
        )}
      >
        <PhotoProvider photoClosable>
          {images.map((url) => {
            return (
              <PhotoView src={`${staticUrl}${url}`}>
                <img
                  key={url}
                  src={`${staticUrl}${url}`}
                  alt="image"
                  className={cn(
                    'w-full h-full rounded-xl object-cover ',
                    images.length === 1 ? 'rounded-[16px]' : ''
                  )}
                  onClick={() => {
                    setShow(true)
                    setImageUrl(url)
                  }}

                />

              </PhotoView>

            )
          })}

        </PhotoProvider>
      </div>
      {/* <ImagePreview
        open={show}
        onOpenChange={setShow}
        imageUrl={imageUrl}
      ></ImagePreview> */}
    </>
  )
}
