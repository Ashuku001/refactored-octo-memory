import { format } from 'date-fns'

import BrandClient from "./components/BrandClient"
import { getClient } from "@/lib/graphql/ApolloClient"
import { GetBrandsDocument } from "@/graphql"
import { BrandColumn } from './components/Columns'

type Props = {
  params: {
    storeId: string
  }
}

async function BillBoardsPage({ params: { storeId } }: Props) {
  let formattedBrands: BrandColumn[] = []
  try {
    const { data } = await getClient().query({
      query: GetBrandsDocument,
      variables: { storeId: parseInt(storeId) }
    })
    formattedBrands = data.brands?.map((item) => ({
      id: item?.id,
      name: item?.name,
      joinDate: item?.joinDate,
      description: item?.description,
      phoneNumber: item?.phoneNumber,
      industry: item?.industry,
      location: item?.loc_name + " " + item?.loc_address,
      loc_latitude: item?.loc_latitude,
      loc_longitude: item?.loc_longitude,
      loc_url: item?.loc_url,
    })) as BrandColumn[]
  } catch (error) {
    console.error("Unable to retrieve brands.")
  }

  return (
    <div className="flex-1 space-y-4 h-full">
      <BrandClient brands={formattedBrands as BrandColumn[]} />
    </div>
  )
}

export default BillBoardsPage