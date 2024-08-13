"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type ProductColumn = {
  id: number;
  name: string;
  price: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  updatedAt: string;
} 

export const columns: ColumnDef<ProductColumn>[] = [
  {
    header: "Actions",
    id: 'action',
    cell: ({row}) => <div className="w-10">
      <CellAction data={row.original}/>
    </div> 
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => <div className="line-clamp-2">{row.original.name}</div>
  },
  // {
  //   accessorKey: "isArchived",
  //   header: "Archived"
  // },
  {
    accessorKey: "isFeatured",
    header: "Featured"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({row}) => <div className="line-clamp-2">{row.original.category}</div>
  },
  {
    accessorKey: "updatedAt",
    header: "Date",
  }, 
 
]
