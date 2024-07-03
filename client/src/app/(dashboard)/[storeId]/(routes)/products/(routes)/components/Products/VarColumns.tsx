"use client"

import { ColumnDef } from "@tanstack/react-table"
import FileUpload from "@/components/appwrite/AppWriteFileUpload";

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
      <FileUpload/>
    </div> 
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  // {
  //   accessorKey: "size",
  //   header: "Size"
  // },
 
]
