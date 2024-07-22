"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type ProductColumn = {
  id: number;
  name: string;
  price: string;
  category: string;
  brand: string;
  description: string;
  score: number;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => <div className="line-clamp-1">{row.original?.name.slice(0, 25)}</div>
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => <div className="line-clamp-1">{row.original.price?.slice(0, 25)}</div>
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({row}) => <div className="line-clamp-1">{row.original.category?.slice(0, 25)}</div>
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({row}) => <div className="line-clamp-1">{row.original.brand?.slice(0, 25)}</div>
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({row}) => <div className="line-clamp-1">{row.original.description?.slice(0, 25)}</div>
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({row}) => <div className="line-clamp-1">{`${row.original?.score}%`}</div>
  },
]
