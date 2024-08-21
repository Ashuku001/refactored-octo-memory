"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { MarketResponseObj } from '@/types';
import { CheckIcon, StarIcon } from 'lucide-react';
import NoResults from '@/components/ui/No-Results';

export type CusProfileCol = {
  id: number;
  whatsapp_name: string;
  name: string;
  phone: string;
  rating: number;
  createdAt: string;
} | null

export const cusProfileCols: ColumnDef<CusProfileCol>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="flex items-center">
      {!row.original.name ? <NoResults /> :<span>{row.original.name}</span>}
    </div>
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => 
      <div className="flex items-center space-x-2">
        <span>{row.original.rating}</span>
        <StarIcon color="orange" fill='orange' size={18}/>  
      </div>
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    header: 'Actions',
    id: 'action',
    cell: ({row}) => <CellAction data={row.original}/>
  },
]
