import { Button } from "@/components/ui/button"
import {  XIcon } from "lucide-react"

type SelectedChoicesProps = {
    onDelete: (deleted: string) => void;
    item: string;
}
export const SelectedChoices = ({onDelete, item}: SelectedChoicesProps) =>{
  return (
    <li className='pl-2 py-0 border rounded-lg flex items-center min-w-fit'>
        <span className='min-w-fit'>
            {item}
        </span>
        <Button
            variant="ghost"
            size='icon'
            type="button"
            className="p-0 m-0 h-7 w-7 rounded-lg"
            onClick={() => {onDelete(item)}}
        >
            <XIcon size={15} className='p-0 m-0'/>
        </Button>
    </li>
  )
}

