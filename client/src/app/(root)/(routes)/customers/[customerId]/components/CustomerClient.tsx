import { format } from 'date-fns'
import {Separator} from '@/components/ui/separator'
import Heading from "@/components/ui/Heading"
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarIcon } from "lucide-react";
import { Customer360OrderObj } from '@/types';
import Orders from './orders/Orders';
import Profile from './profile/Profile';
import { customer360OrderGroup } from "@/lib/createMap/customer360Group"
import CustomerValue from './value/CustomerValue';
import { ScrollArea } from '@/components/ui/scroll-area';


type CustomerClientProps = {
    customer: {
        id: number;
        whatsapp_name: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        createdAt: string;
        customerOrder: Customer360OrderObj[]
    }
}

async function CustomerClient({customer}: CustomerClientProps) {

    const formattedCustomer = {
        id: customer?.id,
        phone: customer?.phone_number, 
        name: !(customer?.first_name && customer?.last_name) ? undefined : (customer?.first_name ?? '').concat(` ${customer?.last_name}` ?? ''),
        rating: 5,
        createdAt: format(new Date(customer?.createdAt), "MMM do, yy"),

    }
    const {groupedOrders, totalRevenue, abandonedCat, graphRevenue} = await customer360OrderGroup(customer.customerOrder, ['CONFIRMED', 'PENDING', 'RECEIVED'])

    return (
        <div className='h-full'>
            <Heading 
                title={`${customer?.first_name ?? customer?.last_name ?? customer?.phone_number}'s 360 degree view`}
                description=""
            />
            <Separator className="my-2"/>
            <ScrollArea className="h-full relative">
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

export default CustomerClient
