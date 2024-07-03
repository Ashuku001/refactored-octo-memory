'use client'
import {Suspense} from 'react';

import ProductsList from "./ProductsList"
import { ProductClientResizable } from "./ResizableClient"
import { ProductColumn } from "./Columns";
import { useProductsStore } from "@/store/ProductsStore";
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductDetail from './ProductDetail';

type ProductsClientProps = {
    products: ProductColumn[]
}


function ProductsClient({products}: ProductsClientProps) {
  //@ts-ignore
  const [productId] = useProductsStore((state) => [state.productId])

  return (
    <div className='h-full'>
      <ProductClientResizable
          minSizeLeft={20}
          minSizeRight={40}
          left={
            <ProductsList
              products={products as ProductColumn[]} 
            />
          }
          right={
            productId ? 
              <Suspense fallback={ <div className='flex flex-col items-center justify-center py-20 w-full'><LoadingSpinner/></div>}>
                <ProductDetail />
              </Suspense>
            : undefined
          }
      />
    </div>
  )
}

export default ProductsClient
