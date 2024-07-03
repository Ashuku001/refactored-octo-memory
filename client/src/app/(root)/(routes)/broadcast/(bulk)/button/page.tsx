import { format } from 'date-fns'

import MarketingClient from "./components/MarketingClient"
import { getClient } from "@/lib/graphql/ApolloClient"
import { GetAdsDocument } from "@/graphql"
import { AdColumn } from './components/Columns'
import toast from 'react-hot-toast'

type Props = {
  params: {
    storeId: string
  }
}


async function MarketingPage({ params: { storeId } }: Props) {
  let formattedAds: AdColumn[] = []
  try {
    const { data } = await getClient().query({
      query: GetAdsDocument
    })
    formattedAds = data.ads?.map((item) => ({
      id: item?.id,
      read: item?.read,
      delivered: item?.delivered,
      sent: item?.sent,
      responded: item?.response,
      failed: item?.failed,
      adTemplate: item?.adTemplate.name.replaceAll('_', ' '),
      updatedAt: format(new Date(item?.updatedAt), "MMM do, yy")
    })) as AdColumn[]
  } catch (error) {
    toast.error("Something went wrong.")
  }

  return (
    <div className="flex-1 space-y-4 pt-1 w-full ">
      <MarketingClient ads={formattedAds as AdColumn[]} />
    </div>
  )
}

export default MarketingPage