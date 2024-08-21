import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { data } = await request.json()
        const response = await fetch(`https://graph.facebook.com/${process.env.api_version}/${process.env.phone_number_id}/messages`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${process.env.access_token}`,
                'Content-Type': 'application/json'
            },
            body: data
        })

        const result = await response.json()


        return NextResponse.json(result)

    } catch (error) {
        return new NextResponse("Internal error", {status: 500})
    }




}
