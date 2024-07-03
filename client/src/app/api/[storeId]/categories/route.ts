import { getClient } from "@/lib/graphql/ApolloClient"
import { GetCategoriesDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        storeId: string
    }
}


export async function GET(req: Request,  {params: {storeId }}: Props) {

    try {
        const { data } = await getClient().query({
            query: GetCategoriesDocument,
            variables: { storeId: parseInt(storeId) }
        })
        const categories = data?.categories
        return NextResponse.json({ categories })
    } catch(error){
        return new NextResponse("Internal error", {status: 500})
    }
}