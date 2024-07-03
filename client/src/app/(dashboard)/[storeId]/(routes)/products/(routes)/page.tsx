import { format } from 'date-fns'
import { getClient } from '@/lib/graphql/ApolloClient'
import { ProductColumn } from './components/Columns';
import { GetProductsDocument } from "@/graphql"
import { formatter } from '@/lib/utils';
import ProductsClient from './components/ProductsClient';

type Props = {
  params: {
    storeId: string
  }
}

export default async function ProductsPage({params: {storeId}}: Props) {
    let formattedProducts: ProductColumn[] = []
    try {
      const { data } = await getClient().query({
        query: GetProductsDocument,
        variables: {storeId: parseInt(storeId)}
      })
      formattedProducts = data.products?.map((item) => ({
        id: item?.id,
        name: item?.name,
        price: formatter.format(item!.price),
        isFeatured: item?.isFeatured,
        isArchived: item?.isArchived,
        category: item?.category?.name,
        updatedAt: format(new Date(item?.updatedAt), "MMM do, yy")
      })) as ProductColumn[]
    } catch (error) {
      console.error("Something went wrong.", error)
    }
    
    return (
        <div className="w-full h-full ">
             <ProductsClient products={formattedProducts}/>
        </div>
    )
} 