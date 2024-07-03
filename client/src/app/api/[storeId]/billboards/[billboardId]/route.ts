import { getClient } from "@/lib/graphql/ApolloClient"
import { GetBillboardDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        billboardId: string
    }
}


export async function GET(req: Request,  {params: {billboardId }}: Props) {
    try {
        const { data } = await getClient().query({
            query: GetBillboardDocument,
            variables: { billboardId: parseInt(billboardId) }
        });
        const billboard = data?.billboard
        return NextResponse.json({ billboard })
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }

}