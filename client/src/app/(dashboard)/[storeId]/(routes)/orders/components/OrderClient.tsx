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
            <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50  px-2  py-1">
                <Heading
                    title={`Orders (${orders?.length})`}
                    description="Manage orders for your store"
                />
            </div>
            <Separator />
            <ScrollArea className='h-full px-2 pt-1'>
                <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                    <DataTable columns={columns} data={orders} searchKey="orderID"/>
                </div>
                <div className='mb-20'/>
            </ScrollArea>
        </div>
    )
}

export default OrderClient