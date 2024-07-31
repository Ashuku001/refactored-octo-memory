// import { getClient } from "@/lib/graphql/ApolloClient"
// import { GetColorDocument } from "@/graphql"
// import { NextResponse } from "next/server"

// type Props = {
//     params: {
//         colorId: string
//     }
// }


// export async function GET(req: Request,  {params: {colorId }}: Props) {
//     try {
//         const { data } = await getClient().query({
//             query: GetColorDocument,
//             variables: { colorId: parseInt(colorId) }
//         });
//         const color = data?.color
//         return NextResponse.json({ color })
//     } catch (error) {
//         return new NextResponse("Internal error", { status: 500 })
//     }

// }