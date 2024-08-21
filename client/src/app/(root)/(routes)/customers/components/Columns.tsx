"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import NoResults from "@/components/ui/No-Results"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import EditableCell from "@/components/Table/EditableCell"

export type CustomerColumn = {
  id: number,
  name: string | null | undefined,
  age: number  | null | undefined,
  gender: string  | null | undefined,
  incomeCategory: string  | null | undefined,
  customerSegment: string | null | undefined,
  occupation: string | null | undefined,
  lastPromoted: string | null | undefined,
  status: string | null | undefined,
  loyalty: number | null | undefined,
  joinDate: string | null | undefined,
  phoneNumber: string | null | undefined,
} 

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    id: 'action',
    enableSorting: false,
    cell: ({row}) => <CellAction data={row.original}/>
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="flex items-center">
      {!row.original.name ? <NoResults /> :<span>{row.original.name}</span>}
    </div>
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
    cell: ({ row }) => <div className="flex items-center">
      {!row.original.phoneNumber ? <NoResults /> :<span>{row.original.phoneNumber}</span>}
    </div>
  },
  {
    accessorKey: "Age",
    header: "age",
    cell: ({ row }) => <div className="flex items-center">
      {!row.original.age ? <NoResults /> :<span>{row.original.age}</span>}
    </div>
  },
  {
    accessorKey: "Gender",
    header: "gender",
    cell: ({ row }) => <div className="flex items-center">
      {!row.original.gender ? <NoResults /> :<span>{row.original.gender}</span>}
    </div>
  },
  {
    accessorKey: "customerSegment",
    header: "Customer Segment",
    cell: ({ row }) => <div className="flex items-center">
      {!row.original.customerSegment ? <NoResults /> :<span>{row.original.customerSegment}</span>}
    </div>
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
  },
  {
    accessorKey: "o",
    header: "Other details",
    enableSorting: false,
    cell: ({row}) => <HoverCard>
    <HoverCardTrigger className=' line-clamp-3 animate-pulse duration-5000 ease-linear'>
        <p>
          {row.original.age}
        </p>
    </HoverCardTrigger>
    <HoverCardContent className="p-0 w-[420px] h-60 max-h-[450px]">
      <ScrollArea className="h-full">
        {/* <DataTable data={row.original.orderItems} columns={orderItemsCols} searchKey=""/> */}
      </ScrollArea>
    </HoverCardContent>
</HoverCard>
  },

]
