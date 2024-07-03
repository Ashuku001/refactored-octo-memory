
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GetCustomersDocument } from "@/graphql"
import { CustomerType } from "@/types"
import {getClient} from '@/lib/graphql/ApolloClient'
import { ScrollArea } from '@/components/ui/scroll-area';
import NoResults from '@/components/ui/No-Results';
import Customer from './Customer';

async function CustomersList() {
    let customers = null
    try{
        const { data } = await getClient().query({query: GetCustomersDocument})
        customers = data?.customers
    } catch(error){

    }

    return (
        <div className="h-full max-w-full overflow-hidden">
            <ScrollArea className="h-full">
                {customers?.length !== 0
                    ? <>
                        {customers?.map((customer) => (
                            <Customer key={customer?.id} customer={customer as CustomerType}/>
                        ))}
                    </>
                    : <div className="text-center flex  flex-col items-center justify-center w-full">
                        <NoResults />
                        <p>Click add customer to add new customers</p>
                    </div>
                }
            </ScrollArea>
        </div>
    )
}

export default CustomersList