import {FileTextIcon} from 'lucide-react'
type Props = {
    document: {
        filename: string;
        url: string;
        mimeType: string;
        caption: string;
    }
}

function DocumentMessage({document}: Props) {
  return (
    <div className='w-full'>
      <div className={`flex space-x-1 bg-slate-500/20 rounded-sm`}>
        <div className='w-[10%] flex items-center justify-center'>
          <FileTextIcon color={`${document?.mimeType === 'application/pdf' ?  'red' : 'blue'}`} className='h-10 w-10'/>
        </div>
        <div className='p-2 break-words flex-1 w-full overflow-hidden'>
            <p className='break-words overflow-hidden'>{document?.filename}</p>
            <p className='text-slate-500 text-[12px]'>{document?.mimeType === 'application/pdf' ? 'PDF' : 'DOCX'}</p>
        </div>
      </div>
      {document?.caption &&
      <div className='p-2 break-words'>
        <p>
            {document?.caption}
        </p>
      </div>
      }
    </div>
  )
}

export default DocumentMessage
