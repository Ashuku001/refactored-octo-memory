"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type BrandColumn = {
  id: number,
  name: string,
  joinDate: string,
  description: string,
  phoneNumber: string,
  industry: string,
  location: string,
  loc_latitude: string,
  loc_longitude: string,
  loc_url: string,
} 

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "phoneNumber",
    header: "PhoneNumber",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
  }, 
  {
    id: 'action',
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
