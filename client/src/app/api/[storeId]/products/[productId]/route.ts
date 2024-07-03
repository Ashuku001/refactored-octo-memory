import { getClient } from "@/lib/graphql/ApolloClient"
import { GetProductDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        productId: string
    }
}


export async function GET(req: Request,  {params: {productId }}: Props) {
    try {
        const { data } = await getClient().query({
            query: GetProductDocument,
            variables: { productId: parseInt(productId) }
        });
        const product = data?.product
        return NextResponse.json({ product })
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }

}