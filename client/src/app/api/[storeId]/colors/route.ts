import { getClient } from "@/lib/graphql/ApolloClient"
import { GetColorsDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        storeId: string
    }
}


export async function GET(req: Request,  {params: {storeId }}: Props) {

    try {
        const { data } = await getClient().query({
            query: GetColorsDocument,
            variables: { storeId: parseInt(storeId) }
        })
        const colors = data?.colors
        return NextResponse.json({ colors })
    } catch(error){
        return new NextResponse("Internal error", {status: 500})
    }
}