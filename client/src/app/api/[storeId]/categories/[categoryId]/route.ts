import { getClient } from "@/lib/graphql/ApolloClient"
import { GetCategoryDocument } from "@/graphql"
import { NextResponse } from "next/server"

type Props = {
    params: {
        categoryId: string
    }
}


export async function GET(req: Request,  {params: {categoryId }}: Props) {
    try {
        const { data } = await getClient().query({
            query: GetCategoryDocument,
            variables: { categoryId: parseInt(categoryId) }
        });
        const category = data?.category
        return NextResponse.json({ category })
    } catch (error) {
        return new NextResponse("Internal server error", { status: 500 })
    }

}