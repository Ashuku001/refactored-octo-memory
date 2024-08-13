import { NextResponse } from "next/server";
import { getClient } from "@/lib/graphql/ApolloClient";
import {
  AddOrderDocument,
  GetMpesaDocument,
} from "@/graphql";
import { getAccessToken } from "@/lib/mpesa";
import axios from "axios"
import moment from "moment"

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
};
type ResponseType = {
  products: CheckoutProduct[];
  phoneNumber: string;
  totalPrice: string;
};
export async function POST(req: Request, { params: { storeId } }: Props) {
  const { products, phoneNumber, totalPrice }: ResponseType = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  if (!phoneNumber) {
    return new NextResponse("Phone number is required", { status: 400 });
  }

  const orderItems = products.reduce((acc, prod) => {
    acc = [
      ...acc,
      { productId: prod!.id, price: prod!.price, quantity: prod.quantity },
    ];
    return acc;
  }, new Array<OrderItemType>());

  const { data: orderData } = await getClient().mutate({
    mutation: AddOrderDocument,
    variables: {
      storeId: parseInt(storeId),
      order: {
        isPaid: false,
        address: "Not Given",
        phone_number: phoneNumber,
        orderItems: orderItems,
      },
    },
  });

  const order = orderData!.addOrder;

  const { data } = await getClient().query({
    query: GetMpesaDocument,
    variables: {
      storeId: parseInt(storeId),
    },
  });

  const mpesa = data.mpesa
  let paymentResponse: {url: string, response: string, responseType: string} | {} = {}
  if(mpesa){
    await getAccessToken(
      {consumer_key: mpesa.consumer_key, consumer_secret: mpesa.consumer_secret},
    )
    .then( async (accessToken) => {
      const url = process.env.MPESA_STKPUSH;
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = Buffer.from(
        mpesa.business_shortcode + mpesa.pass_key + timestamp
      ).toString("base64");

      await axios
        .post(
          url!,
          {
            BusinessShortCode: mpesa.business_shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount:  Math.round(parseFloat(totalPrice)),
            PartyA: phoneNumber, //phone number to receive the stk push
            PartyB: mpesa.business_shortcode,
            PhoneNumber: phoneNumber,
            CallBackURL: `${mpesa.callback_url}/callback`,
            AccountReference: mpesa.account_reference,
            TransactionDesc: mpesa.transaction_desc,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          paymentResponse =  {
            ...paymentResponse,
            responseType: 'success',
            response: "😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction",
            url: `${mpesa?.callback_url}/cart?success=1`
          }
        
        })
        .catch((error) => {
          console.error(error);
          paymentResponse = {
            ...paymentResponse,
            responseType: 'failed',
            response: "❌ Request failed",
            url: `${mpesa?.callback_url}/cart?canceled=1`
          }
          
        });
    })
    .catch(console.log);
  }

  return NextResponse.json(
    paymentResponse,
    {
      headers: corsHeaders,
    }
  );

  
}
