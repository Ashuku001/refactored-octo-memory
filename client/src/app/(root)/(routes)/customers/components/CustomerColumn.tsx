"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MarketResponseObj } from '@/types';
import CustomerCellAction from '@/components/ui/CustomerCellAction';

export type ResponseColumn = {
  customerId: number;
  phone: string,
  name: string,
  createdAt: string,
  rating: number,
} | null

export const CustomerColumn: ColumnDef<ResponseColumn>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "phone",
    header: "Phone number",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
 
  {
    accessorKey: "rating",
    header: "Rate",
  },
  {
    accessorKey: "createdAt",
    header: "date",
  },
  {
    id: 'action',
    cell: ({row}) => <CustomerCellAction data={row.original}/>
  }
]
