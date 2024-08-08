import { format } from 'date-fns'

import OrderClient from './components/OrderClient'
import { getClient } from "@/lib/graphql/ApolloClient"
import { GetOrdersDocument } from "@/graphql"
import { OrderColumn, OrderItemType } from './components/Columns'
import { formatter } from '@/lib/utils'
import toast from 'react-hot-toast'

type Props = {
  params: {
    storeId: string
  }
}

async function OrdersPage({ params: { storeId } }: Props) {
  let formattedOrders: OrderColumn[] = []
  try {
    const { data } = await getClient().query({
      query: GetOrdersDocument,
      variables: { storeId: parseInt(storeId) }
    })
    formattedOrders = data.orders?.map((order) => ({
      id: order?.id,
      isPaid: order?.isPaid,
      phone: order?.phone,
      orderID: order?.orderID,
      name: !(order?.customerOrder?.first_name && order?.customerOrder?.last_name) ? undefined : (order?.customerOrder?.first_name ?? '').concat(` ${order?.customerOrder?.last_name ?? ''} ` ),
      address: order?.address,
      products: order?.orderItems?.map((orderItem) => orderItem?.orderProduct?.name).join(', '),
      orderItems: order?.orderItems?.reduce((acc, orderItem) => {
        acc = [...acc, {name: orderItem!.orderProduct.name, price: formatter.format(orderItem!.price), quantity: orderItem!.quantity, subtotal: formatter.format(Number(orderItem!.price * orderItem!.quantity))}]
        // acc.push({name: orderItem!.orderProduct.name, price: formatter.format(orderItem!.price), quantity: orderItem!.quantity, subtotal: formatter.format(Number(orderItem!.price * orderItem!.quantity))})
        return acc
      }, new Array<OrderItemType>),
      totalPrice: order?.orderItems ? formatter.format(order.orderItems?.reduce((total, orderItem)=> {
        return total + Number(orderItem!.price * orderItem!.quantity)
      }, 0)) : 0,
      updatedAt: format(new Date(order?.createdAt), "MMM do, yy")
    })) as OrderColumn[]
  } catch (error) {
    toast.error("Something went wrong.")
  }


  return (
    <div className="flex-1 space-y-4 h-full">
      <OrderClient orders={formattedOrders as OrderColumn[]} />
    </div>
  )
}

export default OrdersPage