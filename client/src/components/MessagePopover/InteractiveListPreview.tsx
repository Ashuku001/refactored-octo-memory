import { useListMessagePreviewModal } from '@/hooks/useListMessagePreview';
import { SidePanel } from '@/components//ui/SidePanel';
import { ListSectionsType, ListRowType } from "@/types"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductPreview } from '@/components/Message/ProductPreview';

type PreviewProps  = {
    title: string,
    description: string,
    sections: ListSectionsType
}


export const InteractiveListPreview: React.FC<PreviewProps> = ({title, description, sections}) => {
    const listMessagePreview = useListMessagePreviewModal()
  return (
    <SidePanel
        title={title}
        description={description}
        isOpen={listMessagePreview.isOpen}
        onClose={listMessagePreview.onClose}
        className ='w-full lg:w-[50%] h-[90vh] fixed mx-auto my-auto px-5'
        side={'bottom'}
    >
        <div className='h-full'>
      <ScrollArea className='h-full'>
          {sections?.map((section, i) => 
              <Section key={i} section={section}/>
          )}
        <div className='mb-20'/>
      </ScrollArea>
        </div>
    </SidePanel>
  )
};


const Section = ({section}: ListSectionsType) => {
  return (
      <div>
          <div className="font-semibold text-blue-500 py-2">{section?.title}</div>
          <div className="">
              {section?.rows?.map((row) => 
              <div key={row.id}>
                  <Row  row={row} />
                  <Separator className='my-1'/>
              </div>
              )}
          </div>
      </div>
  )
}

const Row = ({row}: ListRowType) => {
  return(
      <div className='flex items-center justify-between'>
        <div className='flex-1 '>
          <p className='line-clamp-1'>
              {row.title} 
          </p>
          <p className='font-light text-slate-600 line-clamp-1'>
              {row?.description}
          </p>
        </div>
        <div className='w-[40%]'>
          <ProductPreview product={row.product} />
        </div>
      </div>
  )
}
