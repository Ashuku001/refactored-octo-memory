import { getClient } from "@/lib/graphql/ApolloClient"
import { GetBillboardsDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        storeId: string
    }
}


export async function GET(req: Request,  {params: {storeId }}: Props) {

    try {
        const { data } = await getClient().query({
            query: GetBillboardsDocument,
            variables: { storeId: parseInt(storeId) }
        })
        const billboards = data?.billboards
        return NextResponse.json({ billboards })
    } catch(error){
        return new NextResponse("Internal error", {status: 500})
    }
}