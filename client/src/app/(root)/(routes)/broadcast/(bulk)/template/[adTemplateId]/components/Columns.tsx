"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type ResponseColumn = {
  customerId: number;
  phone: string,
  name: string,
  chatId: number,
  text: string,
  createdAt: string,
} | null

export const columns: ColumnDef<ResponseColumn>[] = [
  {
    header: 'Actions',
    id: 'action',
    cell: ({row}) => <CellAction data={row.original}/>
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "text",
    header: "Response",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

]
