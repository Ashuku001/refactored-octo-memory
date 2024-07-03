import { getClient } from "@/lib/graphql/ApolloClient"
import { GetSizeDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        sizeId: string
    }
}


export async function GET(req: Request,  {params: {sizeId }}: Props) {
    try {
        const { data } = await getClient().query({
            query: GetSizeDocument,
            variables: { sizeId: parseInt(sizeId) }
        });
        const size = data?.size
        return NextResponse.json({ size })
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }

}