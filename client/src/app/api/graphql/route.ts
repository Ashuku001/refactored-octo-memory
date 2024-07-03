import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const graphql_query= await req.json()

    const data = await fetch("http://cesServerAPI:4000/graphql", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            query: graphql_query
        })
    })


    return data

}