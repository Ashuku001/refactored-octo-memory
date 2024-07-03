"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type ProductColumn = {
  id: number;
  name: string;
  price: string;
  size: string;
  color: string;
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
  // {
  //   accessorKey: "category",
  //   header: "Category"
  // },
  // {
  //   accessorKey: "size",
  //   header: "Size"
  // },
  // {
  //   accessorKey: "color",
  //   header: "Color",
  //   cell: ({ row }) => <div className="flex items-center gap-x-2">
  //     {row.original.color}
  //     <div
  //     className="h-6 w-6 rounded-full border"
  //     style={{backgroundColor: row.original.color}}
  //     >
  //     </div>
  //   </div>
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Date",
  // }, 
 
]
