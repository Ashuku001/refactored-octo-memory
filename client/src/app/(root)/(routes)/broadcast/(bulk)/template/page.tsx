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
      query: GetAdsDocument,
    })
    formattedAds = data?.ads?.map((item) => ({
      id: item?.id,
      read: item?.read  ?? 0,
      delivered: item?.delivered ?? 0,
      sent: item?.sent  ?? 0,
      response: item?.response  ?? 0,
      failed: item?.failed  ?? 0,
      name: item?.adTemplate.name.replaceAll('_', ' '),
      adTemplate: {
        id: item?.adTemplate.id,
      },
      updatedAt: format(new Date(item?.updatedAt), "MMM do, yy"),
    })) as AdColumn[]
  } catch (error) {
    toast.error("Something went wrong.")
  }

  return (
    <div className="pt-1 w-full h-full ">
      <MarketingClient ads={formattedAds as AdColumn[]} />
    </div>
  )
}

export default MarketingPage