import { GetCustomersDocument } from "@/graphql"
import {getClient} from '@/lib/graphql/ApolloClient'
import { CustomerColumn } from "./components/Columns"
import {format} from "date-fns"
import { CustomerClient } from "./components/CustomerClient"


async function page() {
  let customers: CustomerColumn[] | [] = []
  try{
      const { data } = await getClient().query({query: GetCustomersDocument})
      customers = data?.customers?.map((c) => ({
        id: c?.id,
        phoneNumber: c?.phone_number,
        name: !(c?.first_name && c?.last_name) ? undefined : (c?.first_name ?? '').concat(` ${c?.last_name ?? ''} `),
        age: c?.age?.toString(),
        gender: c?.gender,
        incomeCategory: c?.incomeCategory,
        occupation: c?.occupation,
        customerSegment: c?.customerSegment,
        lastPromoted: c?.lastPromoted,
        status: c?.status,
        loyalty: c?.customerLoyalty?.pointsBalance,
        joinDate: format(new Date(c?.joinDate ?? c?.createdAt), "MMM do, yy")
      })) as unknown as CustomerColumn[]
  } catch(error){

  }
  return (
    <div className='flex-1 space-y-4 h-full'>
      <CustomerClient customers={customers}/>
    </div>
  )
}

export default page