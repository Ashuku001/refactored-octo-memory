import Image from "next/image";
import { ImageIcon,VideoIcon, FileTextIcon } from "lucide-react";
import { FilePrevObj as FileObjectInt } from '@/components/appwrite/newFileUpload';

interface FilePrevObj extends FileObjectInt {
  mediaType: string;
}

export type HeaderType = {
  type: string, 
  value?: string | FilePrevObj
};

type PreviewHeaderProps = {
   header: HeaderType
}


export function PreviewHeader({header}: PreviewHeaderProps) {
  return (
    <div className="min-h-4">
      {header?.value &&
      <>
        {header?.type  === 'TEXT' && <p className="font-bold">{header?.value as string}</p>}
        {header?.type  === 'MEDIA' &&  <MediaHeader header={header?.value as FilePrevObj} /> }
      </>
      }
    </div>
  )
}

type MediaHeaderProps = {
  header?: FilePrevObj
}
export const MediaHeader = ({header}: MediaHeaderProps) => {
  return (
    <div className="flex items-center justify-center">
    {header?.mediaType.includes('IMAGE') &&
      <>
        {header?.preview
        ? <Image
            src={header?.preview}
            height={200}
            width={200}
            alt=""
            className='cover max-h-[400px] w-auto rounded-lg'
          /> 
        : <ImageIcon className='h-10 w-10' />}
      </>
    }
    {header?.mediaType.includes('DOCUMENT') && 
    <>
    {header?.preview 
      ? <div className='flex space-x-1 bg-slate-900/20 rounded-lg p-2 w-full'>
      <FileTextIcon color={`${header.file?.type === 'application/pdf' ?  'red' : 'blue'}`} className='h-10 w-10'/>
      <div className='p-2 break-words w-full'>
          <p className='line-clamp-3'>{header.file?.name}</p>
          <div className='flex justify-between items-center mt-3'>
              <p className='text-slate-500 text-[12px]'>{header.file?.type === 'application/pdf' ? 'PDF' : 'DOCX'}</p>
              <p className='text-slate-500 text-[12px]'>Size: {header.file?.size}</p>
                </div>
            </div>
      </div>
      : <FileTextIcon className='h-10 w-10' />
    }
    </>
    }
    {header?.mediaType.includes('VIDEO') &&
      <>
      {header?.preview 
        ?  <video
              className='object-cover h-200px w-200px'
              src={header?.preview}
          />
        : <VideoIcon className='h-10 w-10' />
      }
      </>
    }
    </div>
  )
}
