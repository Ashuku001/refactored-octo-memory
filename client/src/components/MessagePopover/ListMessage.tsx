import { ListIcon } from 'lucide-react';
import { useListMessagePopover } from "@/hooks/useListMessage"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
  
import { ListSectionsType } from "@/types"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ListMessageProps {
    trigger: string,
    sections: ListSectionsType
}


export const ListMessagePopover: React.FC<ListMessageProps> = ({trigger, sections}) => {
  return (
    <Popover>
        <PopoverTrigger className='w-full'>
        <Button 
            className="w-full flex space-x-2 text-blue-900  dark:text-blue-300 rounded-none font-semibold text-20 text-center" 
            variant={'ghost'}
        >
            <ListIcon className="h-8 w-8"/>
            <span>
                {trigger}
            </span>
        </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[400px]'>
            <div>
                {trigger}
                <ScrollArea>
                    {sections?.map((section, i) => 
                        <Section key={i} section={section}/>
                    )}
                </ScrollArea>
            </div>
        </PopoverContent>
    </Popover>

  )
}


const Section = ({section}: ListSectionsType) => {
    return (
        <div>
            <div className="font-semibold text-blue-500 py-2">{section?.title}</div>
            <div className="">
                {section?.rows?.map((row) => 
                <>
                    <Row key={row.id} row={row} />
                    <Separator className='my-1'/>
                </>
                )}
            </div>
        </div>
    )
}

const Row = ({row}: ListRowType) => {
    return(
        <div>
            <div>
                {row.title} 
            </div>
            <div className='font-light text-slate-600'>
                {row?.description}
            </div>

        </div>
    )
}
