import { ShoppingBag } from 'lucide-react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
  
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductPreview } from '@/components/Message/ProductPreview';
import { SectionType, RowType } from '@/store/InteractiveListStore';


interface ListMessageProps {
    trigger: string,
    sections: SectionType[],
}


export const ListSectionPreview: React.FC<ListMessageProps> = ({trigger, sections}) => {
      return (
        <div>
       
            <div className='h-full'>
                <div className='text-center'>{trigger}</div>
                {!sections?.length ?
                    <div className="text center">Add section and rows to your list product message</div>
                    :<ScrollArea className='h-full'>
                        {sections?.map((section, i) => 
                            <Section key={i} section={section}/>
                        )}
                    </ScrollArea>
                }
            </div>
        </div>
    
      )
    }
    

type SectionProps = {
    section: SectionType
}
const Section = ({section}: SectionProps) => {
    return (
        <div>
            <div className="font-semibold text-blue-500 py-2">{section?.title}</div>
                {section?.rows?.map((row) => 
                    <div key={row.id}>
                        <Row row={row} />
                        <Separator className='my-1'/>
                    </div>
                )}
        </div>
    )
}

type RowProps = {
    row: RowType
}

const Row = ({row}: RowProps) => {
    return(
        <div className='flex justify-center items-center'>
            <div className='flex-1' >
                <p className='line-clamp-1'>
                    {row.title} 
                </p>
                <p className='font-light text-slate-400 line-clamp-1'>
                    {row?.description}
                </p>
            </div>
            <HoverCard>
                <HoverCardTrigger>
                    <ShoppingBag className={`h-8 w-8 z-100 ${row?.product ? "animate-pulse duration-15000 ease-in-out text-green-300": "animate-none"}`}/>
                </HoverCardTrigger>
                <HoverCardContent>
                    {row?.product ? 
                        <ProductPreview product={row.product} />
                        : "No associated product"
                    }
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}
