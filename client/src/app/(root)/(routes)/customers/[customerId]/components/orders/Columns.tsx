"use client"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { OrderItemType } from '@/types';
import { CheckIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from '@/components/ui/DataTable';
import { formatter } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export type CusOrderColType = {
    orderID: string;
    id: number
    isPaid: boolean
    phone: string;
    address: string;
    totalPrice: string;
    orderItems: OrderItemType[]
    products: string;
    updatedAt: string;
    store: string;
} | null


export const orderItemsCols: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => <div className="line-clamp-1">
      {row.original.name}
    </div>
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal"
  }
]

export const cusOrderCols: ColumnDef<CusOrderColType>[] = [
  {
    accessorKey: "orderID",
    header: "Order ID"
  },
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  // },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({row}) => <HoverCard>
    <HoverCardTrigger className='w-[180px] line-clamp-3 animate-pulse duration-5000 ease-linear'>
        <p>
          {row.original.products}
        </p>
    </HoverCardTrigger>
    <HoverCardContent className="p-1 w-[420px] h-60 max-h-[450px]">
      <ScrollArea className='h-full'>
        <DataTable data={row.original.orderItems} columns={orderItemsCols} searchKey="name"/>
      </ScrollArea>
    </HoverCardContent>
</HoverCard>
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => <div className="flex items-center">
      {row.original.isPaid}
      <CheckIcon
        className="h-6 w-6 rounded-full border"
        color={`${row.original.isPaid ? 'green' : ''}`}
      >
      </CheckIcon>
    </div>
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
    cell: ({row}) => <div>
      {formatter.format(row.original?.totalPrice)}
    </div>
  },
  {
    accessorKey: "updatedAt",
    header: "Date",
  }
]
