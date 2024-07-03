import { getClient } from "@/lib/graphql/ApolloClient"
import { GetProductsDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        storeId: string
    }
}


export async function GET(req: Request,  {params: {storeId }}: Props) {

    const {searchParams} = new URL(req.url)

    const categoryId = parseInt(searchParams.get("categoryId") as string);
    const colorId = parseInt(searchParams.get("colorId") as string) || undefined;
    const sizeId = parseInt(searchParams.get("sizeId") as string) || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    try {
        let variables:{storeId: number, [key: string]: boolean | number} = {
            storeId: parseInt(storeId)
        }
        if(categoryId){
            variables = {...variables, categoryId: categoryId}
        }
        if(sizeId){
            variables = {...variables, sizeId: sizeId}
        }
        if(colorId){
            variables = {...variables, colorId: colorId}
        }
        if(isFeatured){
            variables = {...variables, isFeatured: isFeatured}
        }
        const { data } = await getClient().query({
            query: GetProductsDocument,
            variables: variables
        })
        const products = data?.products
        return NextResponse.json({ products })
    } catch(error){
        return new NextResponse("Internal error", {status: 500})
    }
}