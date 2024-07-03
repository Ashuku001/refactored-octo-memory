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
  responded?: number | undefined;
  updatedAt: any;
  adTemplate?: {
      id?: number
      name?: string
  } | undefined;
} | null

export const columns: ColumnDef<AdColumn>[] = [
  {
    accessorKey: "adTemplate",
    header: "Ad template name"
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
    accessorKey: "responded",
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
