import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getClient } from "@/lib/graphql/ApolloClient";
import { AddOrderDocument, GetProductsOfIdsDocument } from "@/graphql";
import Stripe from "stripe";

// allow request from different origins
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// allow cors origin
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

type Props = {
  params: {
    storeId: string;
  };
};

type OrderItemType = { productId: number; price: number; quantity: number };
type CheckoutProduct = {
  id: number;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
}
type ResponseType = {
  products:CheckoutProduct[]
}
export async function POST(req: Request, { params: { storeId } }: Props) {
  let { products }: ResponseType= await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  console.log(products)
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: product.quantity,
      price_data: { 
        currency: "USD",
        product_data: {
          name: product!.name,
        },
        unit_amount: product!.price * 100,
      },
    });
  });

  const orderItems = products.reduce((acc, prod) => {
    acc = [...acc, { productId: prod!.id, price: prod!.price, quantity: 1 }];
    return acc;
  }, new Array<OrderItemType>());

  const { data: orderData } = await getClient().mutate({
    mutation: AddOrderDocument,
    variables: {
      storeId: parseInt(storeId),
      order: {
        isPaid: false,
        address: "nakuru",
        phone_number: "a dummy phone number set at check out",
        orderItems: orderItems,
      },
    },
  });

  const order = orderData!.addOrder;
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order!.id,
      storeId: storeId
    },
  });

  return NextResponse.json(
    {
      url: session.url,
    },
    {
      headers: corsHeaders,
    }
  );
}
