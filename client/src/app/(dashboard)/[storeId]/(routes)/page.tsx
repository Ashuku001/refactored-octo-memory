
import Heading from "@/components/ui/Heading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatter } from "@/lib/utils"
import { CreditCard, DollarSign, Package } from "lucide-react"
import { getTotalRevenue } from "@/app/actions/get-total-revenue"
import { getSalesCount } from "@/app/actions/get-sales-count"
import { getStocksCount } from "@/app/actions/get-stock-count"
import {RevenueGraph} from "@/components/Overview"
import { getGraphRevenue } from "@/app/actions/get-graph-data"

import { getClient } from "@/lib/graphql/ApolloClient"
import { GetOrdersDocument } from "@/graphql"
import { ScrollArea } from '@/components/ui/scroll-area';
import { SalesInsights } from "@/components/business-insights/sales"


interface DashBoardProps {
  params: { storeId: string }
}

const DashBoardPage: React.FC<DashBoardProps> = async ({
  params
}) => {
  const { data } = await getClient().query({
    query: GetOrdersDocument,
    variables: { storeId: parseInt(params.storeId) }
  })

  const paidOrders = data.orders.filter((order) => order?.isPaid === true)
  const totalRevenue: number = await getTotalRevenue(paidOrders)
  const salesCount: number = await getSalesCount(paidOrders)
  const stockCount: number = await getStocksCount(params.storeId)
  const graphRevenue: any= await getGraphRevenue(paidOrders)


  return (
    <ScrollArea className="flex-col h-full px-2">
      <div className="flex-1 space-y-4 pt-1 ">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card className="glassy">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue ?? 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{salesCount.toString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {200}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader className=" py-2">
            <CardTitle>
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2 ">
            <RevenueGraph data={graphRevenue} />
          </CardContent>
        </Card>
        <Card className="col-span-4 h-[110vh]">
          <CardHeader className=" py-4">
            <CardTitle>
              Store insights
            </CardTitle>
            <CardDescription>View insights about your store by clicking the tabs below.</CardDescription>
          </CardHeader>
          <CardContent className="h-[90vh]">
            <SalesInsights />
          </CardContent>
        </Card>
      </div>
      <div className="mb-[10px]"/>
    </ScrollArea>
  )
}

export default DashBoardPage