import { format } from 'date-fns'

import BillboardClient from "./components/BillboardClient"
import { getClient } from "@/lib/graphql/ApolloClient"
import { GetBillboardsDocument } from "@/graphql"
import { BillboardColumn } from './components/Columns'
import toast from 'react-hot-toast';

type Props = {
  params: {
    storeId: string
  }
}

async function BillBoardsPage({ params: { storeId } }: Props) {
  let formattedBillboards: BillboardColumn[] = []
  try {
    const { data } = await getClient().query({
      query: GetBillboardsDocument,
      variables: { storeId: parseInt(storeId) }
    })
    formattedBillboards = data.billboards?.map((item) => ({
      id: item?.id,
      label: item?.label,
      updatedAt: format(new Date(item?.updatedAt), "MMM do, yy")
    })) as BillboardColumn[]
  } catch (error) {
    console.error("Unable to retrieve billboards.")
  }

  return (
    <div className="flex-1 space-y-4 h-full">
      <BillboardClient billboards={formattedBillboards as BillboardColumn[]} />
    </div>
  )
}

export default BillBoardsPage