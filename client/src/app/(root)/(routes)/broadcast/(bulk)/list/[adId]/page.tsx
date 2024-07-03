import { GetBillboardDocument } from "@/graphql"

import { getClient } from "@/lib/graphql/ApolloClient"
import ListAdForm from './components/ListAdForm';
type Props = {
  params: {
    adId: string
  }
}
const page = async ({ params: { adId } }: Props) => {
  return (
    <div className="flex-1 space-y-4 pt-1">
      <ListAdForm />
    </div>
  )
}

export default page