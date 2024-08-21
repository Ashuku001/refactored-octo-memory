'use client'
import { format } from 'date-fns'
import {Separator} from '@/components/ui/separator'
import Heading from "@/components/ui/Heading"
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarIcon, ArrowLeftIcon } from "lucide-react";
import { Customer360OrderObj } from '@/types';
import Orders from './orders/Orders';
import Profile from './profile/Profile';
import { GetCustomer360Document } from '@/graphql';
import { customer360OrderGroup } from "@/lib/createMap/customer360Group"
import CustomerValue from './value/CustomerValue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { TipTool } from '@/components/ui/TipTool'
import { useCustomer } from '@/hooks/useCustomer'
import { Button } from '@/components/ui/button';
type Customer360Props = {
    customerId: number
}

function Customer360({customerId}: Customer360Props) {
    const [setCustomerId] = useCustomer((state) => [state.setCustomerId])
    const {data} = useSuspenseQuery(GetCustomer360Document, {variables: {customerId: parseInt(customerId)}})
    const customer = data.customer360
    const formattedCustomer = {
        id: customer?.id,
        phone: customer?.phone_number, 
        name: !(customer?.first_name && customer?.last_name) ? undefined : (customer?.first_name ?? '').concat(` ${customer?.last_name}` ?? ''),
        rating: 5,
        createdAt: format(new Date(customer?.createdAt), "MMM do, yy"),

    }
    const {groupedOrders, totalRevenue, abandonedCat, graphRevenue} = customer360OrderGroup(customer.customerOrder, ['CONFIRMED', 'PENDING', 'RECEIVED'])

    return (
        <div className='h-full w-full'>
            <div className="flex w-full items-center space-x-4 h-16 bg-muted/80 dark:bg-muted/50    px-2 py-1">
                <Button 
                    variant={'ghost'}
                    className="bg-slate-900 py-0"
                    onClick={() => setCustomerId(null)}
                >
                    <ArrowLeftIcon size={20} className='text-white'/>
                </Button>
                <Heading 
                    title={`${customer?.first_name ?? customer?.last_name ?? customer?.phone_number}'s 360 degree view`}
                    description=""
                />
            </div>
            <ScrollArea className="h-full relative px-2 py-2">
                <Tabs defaultValue={"profile"} className="h-full bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm relative">
                    <TabsList className='sticky top-0 z-20'>
                        <TabsTrigger
                            value={"profile"}
                            className='px-5'
                        >
                            {"Profile"} 
                        </TabsTrigger>
                        <TabsTrigger
                            value={"orders"}
                            className='px-5'
                        >
                            {"Orders"} 
                        </TabsTrigger>
                        <TabsTrigger
                            value={"engagement"}
                            className='px-5'
                        >
                            {"Engagement"} 
                        </TabsTrigger>
                        <TabsTrigger
                            value={"value"}
                            className='px-5'
                        >
                            {"Customer Value"}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={"profile"} className={'h-full '}>
                        <Profile profile={formattedCustomer}/>
                    </TabsContent>
                    <TabsContent value={"value"} className={'h-full relative'}>
                            <CustomerValue
                                totalRevenue={totalRevenue} 
                                abandonedCat={abandonedCat}
                                costToSearve={0}
                                graphRevenue={graphRevenue}
                            />
                    </TabsContent>
                    <TabsContent value={"engagement"} className={'h-full '}>
                        His recent engagement with the business
                    </TabsContent>
                    <TabsContent value={"orders"} className={'h-full relative'}>
                        <Orders orders={groupedOrders} />
                    </TabsContent>
                </Tabs>
                <div className="mb-12"/>
            </ScrollArea>
        </div>

  )
}

export default Customer360
