import { GetBrandDocument, GetBrandQuery } from "@/graphql"

import { getClient } from "@/lib/graphql/ApolloClient"
import BrandForm from "./Components/BrandForm"
type Props = {
  params: {
    brandId: string
  }
}
const page = async ({ params: { brandId } }: Props) => {
  let brand: GetBrandQuery["brand"] = undefined
  try {
    if(brandId !== 'new'){
      const { data } = await getClient().query({
        query: GetBrandDocument,
        variables: { brandId: parseInt(brandId) }
      });
      brand = data?.brand
    }
  } catch (error) {
    console.log("Something went wrong.", error)
  }


  return (
    <div className="flex-1 space-y-4 pt-1 px-2">
      <BrandForm initialData={brand} />
    </div>
  )
}

export default page