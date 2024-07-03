import { OrderType } from "@/types"

export const getSalesCount = async (orders: OrderType) => {
    return orders.length
}