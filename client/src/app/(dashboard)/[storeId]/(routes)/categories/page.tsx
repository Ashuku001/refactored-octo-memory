import { format } from 'date-fns'

import CategoryClient from "./components/CategoryClient"
import { getClient } from "@/lib/graphql/ApolloClient"
import { GetCategoriesDocument } from "@/graphql"
import { CategoryColumn } from './components/Columns'
import toast from 'react-hot-toast'

type Props = {
  params: {
    storeId: string
  }
}


async function CategorysPage({ params: { storeId } }: Props) {
  let formattedCategories: CategoryColumn[] = []
  try {
    const { data } = await getClient().query({
      query: GetCategoriesDocument,
      variables: { storeId: parseInt(storeId) }
    })
    formattedCategories = data.categories?.map((item) => ({
      id: item?.id,
      name: item?.name,
      billboardLabel: item?.billboard?.label,
      updatedAt: format(new Date(item?.updatedAt), "MMM do, yy")
    })) as CategoryColumn[]

  } catch (error) {
    toast.error("Something went wrong.")
  }

  return (
    <div className="flex-1 h-full">
      <CategoryClient categories={formattedCategories as CategoryColumn[]} />
    </div>
  )
}

export default CategorysPage