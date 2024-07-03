"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type BillboardColumn = {
  id: number
  label: string
  updatedAt: string
} 

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "updatedAt",
    header: "Date",
  }, 
  {
    id: 'action',
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
