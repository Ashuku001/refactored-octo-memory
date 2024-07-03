import {FileTextIcon} from 'lucide-react'
type Props = {
    document: {
        filename: string;
        url: string;
        mimeType: string;
        caption: string;
    }
}

export function DocMesContext({document}: Props) {
  return (
    <div className='flex'>
      <FileTextIcon color={`${document?.mimeType === 'application/pdf' ?  'red' : 'blue'}`} className='h-10 w-10'/>
      <div className='flex-1'>
        {document?.caption ?
          <div className='p-2 break-words w-full'>
            <p>
                {document?.caption}
            </p>
          </div>
        : 
          <div className={`flex space-x-1 bg-slate-500/20 rounded-sm w-full`}>
            <div className='p-2 break-words'>
                <p>{document?.filename}</p>
                <p className='text-slate-500 text-[12px]'>{document?.mimeType === 'application/pdf' ? 'PDF' : 'DOCX'}</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

