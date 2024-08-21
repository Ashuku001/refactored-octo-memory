'use client'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useParams } from 'next/navigation';
import {Suspense} from 'react';

import { ProductClientResizable } from "./ResizableClient"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductsStore } from "@/store/ProductsStore";
import { GetCategoriesDocument,GetBrandsDocument, GetProductDocument, GetSizesDocument, GetColorsDocument } from "@/graphql"
import { skipToken } from "@apollo/client";
import ProductForm from "./ProductForm";
import {SizeType, ColorType, CategoryType} from "@/types"
import LoadingSpinner from '@/components/LoadingSpinner';

function ProductDetail() {
  const [productId] = useProductsStore((state) => [state.productId])

    const params = useParams()
    const {data: prodData} = useSuspenseQuery(
        GetProductDocument,
        productId && productId !== 'new' ? {variables: {productId: productId, }, fetchPolicy: "no-cache"} : skipToken,
    )
    const product = prodData?.product

    const {data: catData} = useSuspenseQuery(
        GetCategoriesDocument,
        productId ? {variables: {storeId: parseInt(params.storeId)}} : skipToken
    )
    const categories = catData?.categories
    
    const {data: brandData} = useSuspenseQuery(
        GetBrandsDocument,
        productId ? {variables: {storeId: parseInt(params.storeId)}} : skipToken
    )
    const brands = brandData?.brands

    return (
        <ProductForm
            productData={product}
            categories={categories ?? []}
            brands={brands ?? []}
        />
    )
}

export default ProductDetail
