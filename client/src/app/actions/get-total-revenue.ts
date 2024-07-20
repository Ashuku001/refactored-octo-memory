import { OrderType } from "@/types"

export const getTotalRevenue = async (orders: OrderType) => {
    const totalRevenue: number = orders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + Number(item?.price * item?.quantity)
        }, 0)

        return total + orderTotal
    }, 0)


    return totalRevenue
}