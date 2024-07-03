import { FileTextIcon } from 'lucide-react'

type Props = {
    filename: string
}

function DocumentMes({filename}: Props) {
  return (
    <div className='flex space-x-2 items-center w-full h-full'>
      <FileTextIcon className='h-4 w-4 m-0'/>
      <p className='p-0 m-0 flex-1 line-clamp-1'>{filename}</p>
    </div>
  )
}

export default DocumentMes
