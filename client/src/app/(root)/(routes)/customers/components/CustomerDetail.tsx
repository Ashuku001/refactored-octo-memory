'use client'
import { useSearchParams } from "next/navigation";
import Customer360 from "./Customer360";
import CustomerForm from "./CustomerForm";
import { GetCustomerDocument } from "@/graphql";
import { skipToken } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useCustomer } from "@/hooks/useCustomer";

export const  CustomerDetail = () => {
    const [customerId] = useCustomer(state => [state.customerId])
    const searchParams = useSearchParams();
    const show = searchParams.get("show")
    const {data} = useSuspenseQuery(
        GetCustomerDocument,
        customerId && customerId !== 'new' ? {variables: {customerId: customerId, }, fetchPolicy: "no-cache"} : skipToken,
    )
    const customer = data?.customer

    console.log(">>>>>> CUSTOMER", customer)
    console.log(">>>>>>CUSTOMER ID", customerId)

    return (
        <div className='right flex flex-col h-full relative w-full'>
            {(show == "360" && customerId != 'new' && customerId != null) && <Customer360 customerId={customerId}/>}
            {show != "360" && <CustomerForm initialData={customer} />}
        </div>
    )
}
