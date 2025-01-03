import { staticUrl } from '@/config/url'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { PhotoProvider, PhotoView } from 'react-photo-view';
interface Props {
  open: boolean
  imageUrl: string
  onOpenChange: (open: boolean) => void
}

export const ImagePreview = ({ open, onOpenChange, imageUrl }: Props) => {
  return (
    // <Dialog
    //   open={open}
    //   onOpenChange={onOpenChange}
    //   contentProps={{
    //     className: 'h-[95vh] bg-red-500',
    //   }}
    // >
    //   <div className="pt-3">
    //     <img src={staticUrl + imageUrl} alt="Image" className="h-full rounded-md" />
    //   </div>
    // </Dialog>
    <PhotoProvider>
      <PhotoView src={staticUrl + imageUrl}>

      </PhotoView>
    </PhotoProvider>
  )
}
