// 'use client'
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/Heading"
import { DataTable } from "@/components/ui/DataTable"
import { OrderColumn, columns } from "./Columns"
import { ScrollArea } from "@/components/ui/scroll-area"

type Props = {
    orders: OrderColumn[]
}

const OrderClient = ({ orders }: Props) => {

    return (
        <div className="h-full">
            <div className="px-2">
                <Heading
                    title={`Orders (${orders?.length})`}
                    description="Manage orders for your store"
                />
            </div>
            <Separator />
            <ScrollArea className='h-full px-2'>
                <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                    <DataTable columns={columns} data={orders} searchKey="orderID"/>
                </div>
                <div className='mb-20'/>
            </ScrollArea>
        </div>
    )
}

export default OrderClient