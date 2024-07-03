"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type AdColumn = {
  __typename: "Ad";
  id: number;
  read?: number | null | undefined;
  delivered?: number | null | undefined;
  sent?: number | null | undefined;
  failed?: number | null | undefined;
  response?: number | undefined;
  updatedAt: any;
  name: string;
  adTemplate?: {
      id?: number
      name?: string
  } | undefined;
} | null

export const columns: ColumnDef<AdColumn>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "read",
    header: "Read",
  },
  {
    accessorKey: "delivered",
    header: "Delivered",
  },
  {
    accessorKey: "sent",
    header: "Sent",
  },
  {
    accessorKey: "response",
    header: "Responded",
  },
  {
    accessorKey: "failed",
    header: "Failed",
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
