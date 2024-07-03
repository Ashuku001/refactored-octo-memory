import { getClient } from '@/lib/graphql/ApolloClient'
import { GetPromotionsDocument,  GetPromotionsQuery } from "@/graphql"
import {PromotionsClient} from './components/PromotionsClient';
import { PromotionColumnMapObj, promotionsGroup } from '@/lib/createMap/PromotionsGroup';

type Props = {
  params: {
    storeId: string
  }
}


export default async function PromotionsPage({params: {storeId}}: Props) {

  let promotions: PromotionColumnMapObj[]  = []

  try {
    const { data } = await getClient().query({
      query: GetPromotionsDocument,
      variables: {storeId: parseInt(storeId)}
    })
    promotions = await promotionsGroup(data.promotions)    
  } catch (error) {
    console.error("Something went wrong.", error)
  }
  return (
      <div className="w-full h-full px-2">
            <PromotionsClient promotions={promotions}/>
      </div>
  )
} 