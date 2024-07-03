import { getClient } from "@/lib/graphql/ApolloClient"
import { GetCustomer360Document } from "@/graphql"
import CustomerClient from "./components/CustomerClient";
import NoResults from "@/components/ui/No-Results";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    params: {
        customerId: string
    }
}

async function Page({ params: { customerId } }: Props) {
    let customer
    try{
        const {data} = await getClient().query({
            query: GetCustomer360Document,
            variables: { customerId: parseInt(customerId) } 
        })
        customer = data.customer360
       
    }catch(error){

    }
    return (
            <div className='right flex flex-col h-full relative px-1'>
                {!customer ? 
                    <div className="w-full h-full flex items-center justify-center">
                        <NoResults />
                    </div>:
                    // {/* @ts-ignore */}
                    <CustomerClient customer={customer}/>
                }
            </div>
    )
}

export default Page