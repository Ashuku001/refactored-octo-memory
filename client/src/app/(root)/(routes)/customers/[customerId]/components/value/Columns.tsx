"use client"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { OrderItemType } from '@/types';
import { CheckIcon, PercentIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from '@/components/ui/DataTable';
import { formatter } from '@/lib/utils';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export type CusValueColProps = {
    totalRevenue: number;
    profit: number;
    costToSearve: number;
}


export const cusValueCols: ColumnDef<CusValueColProps>[] = [
  {
    accessorKey: "totalRevenue",
    header: "Revenue",
    cell: ({row}) => <div>
      {formatter.format(row.original?.totalRevenue)}
    </div>
  },
  {
    accessorKey: "costToSearve",
    header: "Cost to Searve",
    cell: ({row}) => <div>
      {formatter.format(row.original?.costToSearve)}
    </div>
  },
  {
    accessorKey: "marketingCost",
    header: "Marketing Cost",
    cell: ({row}) => <div>
      {formatter.format(row.original?.costToSearve)}
    </div>
  },
  {
    accessorKey: "",
    header: "Share of Revenue",
    cell: ({row}) => <div className="flex space-x-2">
      <span>{100 - row.original?.costToSearve / row.original?.totalRevenue * 100}</span> <PercentIcon size={"16"} className="text-slate-500"/>
    </div>
  },
  {
    accessorKey: "profit",
    header: "Net Revenue",
    cell: ({row}) => <div>
      {formatter.format(row.original?.profit)}
    </div>
  }
]
