import { CameraIcon } from 'lucide-react'

type Props = {
    caption: string
}

function ImageMes({caption}: Props) {
  return (
    <div className='flex space-x-2 items-center w-full'>
      <CameraIcon className='h-4 w-4 m-0'/>
      <p className='p-0 m-0 line-clamp-1 flex-1'>{caption}</p>
    </div>
  )
}

export default ImageMes
