import ApiList from "@/components/ui/api.list"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/Heading"
function page() {
  return (
    <div className="h-full">
        <div className='px-2'> 
            <Heading title="API" description="API calls for Products" />
        </div>
        <Separator className='mb-2'/>
        <ScrollArea className="h-full px-2">
            <ApiList entityName="products" entityIdName="productId" />
        </ScrollArea>
    </div>
  )
}

export default page
