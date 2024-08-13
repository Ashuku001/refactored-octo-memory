
import { GetAllStoresDocument } from "@/graphql"
import { getClient } from "@/lib/graphql/ApolloClient"
import {ReactiveStoreModal} from "@/components/ReactiveStoreModal"
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import StoreCard from "@/components/StoreCard"

// used to trigger the modal to add a store nothing is returned
async function SetupPage() {
  const {data} = await getClient().query({
    query: GetAllStoresDocument
  })
  let stores: typeof data.stores = []
  stores = data.stores

  return (
    <div className="flex-col items-center justify-center w-full px-2">
      <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50   px-2  py-2">
        <Heading 
          title={`Stores (${stores?.length})`}
          description="Overview of all your stores."
        />
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-3 gap-8 w-full">
        {!stores?.length && <ReactiveStoreModal/> }
        {stores?.map((store) => <StoreCard key={store?.id} store={store} />)}
      </div>
    </div>
  )
}

export default SetupPage