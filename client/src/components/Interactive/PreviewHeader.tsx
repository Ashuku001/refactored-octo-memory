import { useEffect } from "react";
import Image from "next/image";
import { useInteractiveButtonStore } from "@/store/InteractiveButtonStore";
import { ImageIcon, FileIcon, VideoIcon, MapPinIcon } from "lucide-react";

type PreviewHeaderProps = {
    type: string;
}


export function PreviewHeader({type}: PreviewHeaderProps) {
  //@ts-ignore
  const [mediaType, setMediaType, headerType, headerText] = useInteractiveButtonStore((state) => [
    state.mediaType,
    state.setMediaType,
    state.headerType,
    state.headerText,
  ])
  useEffect(() => {
    if(headerType !== 'MEDIA')
      setMediaType("NONE")
  },[headerType, setMediaType])
  return (
    <div className="min-h-4">
      {headerType === 'TEXT' && <p className="font-extrabold">{headerText}</p>}
      {mediaType !== "NONE" && <MediaHeader type={mediaType} />}
    </div>
  )
}

type MediaHeaderProps = {
  type: string
}
export const MediaHeader = ({type}: MediaHeaderProps) => {
  //@ts-ignore
  const [ filePreview] = useInteractiveButtonStore((state) => [
    state.filePreview,
  ])

  return (
    <div className="flex items-center justify-center">
    {type === 'IMAGE' &&
      <>
        {filePreview
        ? <Image
            src={filePreview}
            height={200}
            width={200}
            alt=""
            className='cover max-h-[400px] w-auto rounded-lg'
          /> 
        : <ImageIcon className='h-10 w-10' />}
      </>
    }
    {type === 'DOCUMENT' && <FileIcon className='h-10 w-10' />}
    {type === 'VIDEO' && <VideoIcon className='h-10 w-10' />}
    {type === 'LOCATION' && <MapPinIcon className='h-10 w-10' />}
    </div>
  )
}
