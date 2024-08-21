import { DataTableWOInput } from "@/components/ui/DataTableWOInput"
import { cusValueCols } from "./Columns"
import { Separator } from "@/components/ui/separator"
import { SubHeading } from "@/components/ui/SubHeading"
import {RevenueGraph} from "@/components/Overview"
import { ScrollArea } from '@/components/ui/scroll-area';
interface CustomerValueProps {
    totalRevenue: number,
    abandonedCat: number,
    costToSearve: number,
    graphRevenue: any,
}

function CustomerValue({totalRevenue, abandonedCat, costToSearve, graphRevenue}: CustomerValueProps) {
    const data = [{totalRevenue, costToSearve, profit: totalRevenue - costToSearve}]
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-muted/20 to-muted/50 px-2" >
      <ScrollArea className="h-full">
        <SubHeading title="Long Term Value" description="Value of customer from the start of relationship"/>
        <Separator className="my-1" />
        <DataTableWOInput data={data} columns={cusValueCols} searchKey=""/>
        <Separator className="my-5"/>
        <SubHeading title="Monthly revenue" description="Buying behavior"/>
        <Separator className="my-1"/>
        <RevenueGraph data={graphRevenue}/>
        <div className="mb-30"/>
      </ScrollArea>
    </div>
  )
}

export default CustomerValue
