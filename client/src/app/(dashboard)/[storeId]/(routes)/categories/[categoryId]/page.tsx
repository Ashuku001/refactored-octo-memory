
import { getClient } from "@/lib/graphql/ApolloClient"
import CategoryForm from "./Components/CategoryForm"
import { GetBillboardsDocument, GetCategoryDocument } from "@/graphql"
import { format } from "date-fns"
import toast from "react-hot-toast"

type Props = {
  params: {
    storeId: string
    categoryId: string;
  }
}

const page = async ({ params: { storeId, categoryId } }: Props) => {
  let category = null
  let formattedBillboards = null
  try {
    try {
      const { data: catData } = await getClient().query({
        query: GetCategoryDocument,
        variables: { categoryId: parseInt(categoryId) }
      });
      category = catData?.category
    } catch(error){
      console.info("Something went wrong")
    }

    const { data: billboards } = await getClient().query({
      query: GetBillboardsDocument,
      variables: { storeId: parseInt(storeId) }
    })
    formattedBillboards = billboards?.billboards?.map((item) => ({
      id: item?.id,
      label: item?.label,
      createdAt: format(new Date(item?.updatedAt), "MMM do, yy")
    }))
  } catch (error) {
    console.info("Something went wrong")
  }


  return (
    <div className="flex-1 space-y-4 pt-1">
      <CategoryForm initialData={category} billboards={formattedBillboards} />
    </div>
  )
}

export default page