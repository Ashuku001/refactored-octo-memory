import Stripe from "stripe";
import { headers } from "next/headers";

import { getClient } from "@/lib/graphql/ApolloClient";
import { NextResponse } from "next/server";
import { UpdateOrderCheckoutDocument } from "@/graphql";

export async function POST(req: Request){
    const body = await req.text()   // this is a webhook
    
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event;

    try {
        event = Stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any){
        return new NextResponse(`Stripe-Webhook Error: ${error.message}`, {status: 400})
    };
    
    const session = event.data.object as Stripe.Checkout.Session
    const address =  session?.customer_details?.address

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country
    ]

    const addressString = addressComponents.filter((c) => c !==null).join(", ")

    if(event.type === "checkout.session.completed"){
        const {data: orderData} = await getClient().mutate({
            mutation: UpdateOrderCheckoutDocument,
            variables: {
                orderId: parseInt(session.metadata?.orderId!),
                storeId: parseInt(session.metadata?.storeId!),
                payload: {
                    isPaid: true,
                    phone_number: session.customer_details?.phone ?? "no number",
                    address: addressString,
                }
            }
        })

        const order = orderData?.updateOrderCheckout
        const boughtProducts = order?.orderItems?.map((item) => [item?.productId, item?.quantity])
        //  Update the quantities of this products in terms of quantity
    }
    
    return new NextResponse(null, {status: 200})

}