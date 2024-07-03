import { GetBillboardDocument } from "@/graphql"

import { getClient } from "@/lib/graphql/ApolloClient"
import BillboardForm from "./Components/BillBoardForm"
import { BillboardType } from "@/types"
type Props = {
  params: {
    billboardId: string
  }
}
const page = async ({ params: { billboardId } }: Props) => {
  let billboard = undefined
  try {
    if(billboardId !== 'new'){
      const { data } = await getClient().query({
        query: GetBillboardDocument,
        variables: { billboardId: parseInt(billboardId) }
      });
      billboard = data?.billboard
    }
  } catch (error) {
    console.log("Something went wrong.", error)
  }


  return (
    <div className="flex-1 space-y-4 pt-1 px-2">
      <BillboardForm initialData={billboard} />
    </div>
  )
}

export default page