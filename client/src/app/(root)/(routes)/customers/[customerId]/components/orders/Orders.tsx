import { Customer360OrderObj } from "@/types"
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/DataTable';
import { cusOrderCols } from './Columns';
import { ScrollArea } from '@/components/ui/scroll-area';
function Orders({orders}: Customer360OrderObj[]) {

  return (
  <Tabs defaultValue={orders[0]?.tab} className="h-full relative">
    <TabsList className="sticky top-12 z-20">
        {orders?.map((order, i) => 
        <TabsTrigger
            value={order.tab}
            key={i}
            className='px-5'
        >
            {order.tab} ( {order?.orders?.length} )
        </TabsTrigger>
          )} 
    </TabsList>
    <ScrollArea className='h-full'>
      {orders?.map((order, i) => (
        <TabsContent key={i} value={order.tab} className={'h-full bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm'}>
            <DataTable columns={cusOrderCols} data={order.orders} searchKey="orderID" />
        </TabsContent>
        ))}
    </ScrollArea>
  </Tabs>
  )
}

export default Orders
