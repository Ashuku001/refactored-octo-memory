"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CheckIcon, XIcon } from 'lucide-react';
import NoResults from "@/components/ui/No-Results"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/DataTable";

export type OrderItemType = {productId?: number, name: string, price: string, quantity: number, subtotal: string}

export type OrderColumn = {
  id: number
  phone: string;
  name: string;
  isPaid: boolean;
  orderID: string,
  totalPrice: string;
  orderItems: OrderItemType[]
  products: string;
  updatedAt: string
}

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


export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "orderID",
    header: "Order ID",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="flex items-center">
      {!row.original.name ? <NoResults /> :<span>{row.original.name}</span>}
    </div>
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({row}) => <HoverCard>
    <HoverCardTrigger className='w-[400px] line-clamp-3 animate-pulse duration-5000 ease-linear'>
        <p>
          {row.original.products}
        </p>
    </HoverCardTrigger>
    <HoverCardContent className="p-0 w-[420px] h-60 max-h-[450px]">
      <ScrollArea className="h-full">
        <DataTable data={row.original.orderItems} columns={orderItemsCols} searchKey=""/>
      </ScrollArea>
    </HoverCardContent>
</HoverCard>
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => <div className="flex items-center gap-x-2">
      {row.original.isPaid}
      <CheckIcon
        className="h-6 w-6 rounded-full border"
        color={`${row.original.isPaid ? 'green' : ''}`}
      >
      </CheckIcon>
    </div>
  },
  {
    accessorKey: "updatedAt",
    header: "Date",
  }
]




