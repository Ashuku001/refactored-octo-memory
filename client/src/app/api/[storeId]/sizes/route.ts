// import { getClient } from "@/lib/graphql/ApolloClient"
// import { GetSizesDocument } from "@/graphql"
// import { NextResponse } from "next/server"

// type Props = {
//     params: {
//         storeId: string
//     }
// }


// export async function GET(req: Request,  {params: {storeId }}: Props) {

//     try {
//         const { data } = await getClient().query({
//             query: GetSizesDocument,
//             variables: { storeId: parseInt(storeId) }
//         })
//         const sizes = data?.sizes
//         return NextResponse.json({ sizes })
//     } catch(error){
//         return new NextResponse("Internal error", {status: 500})
//     }
// }