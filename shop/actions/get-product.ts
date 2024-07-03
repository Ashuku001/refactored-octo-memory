import {  Product } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`
interface PromiseProps {
    product: Product
}

const getProduct = async (id: number): Promise<PromiseProps> => {
    const res = await fetch(`${URL}/${id}`)

    return res.json()
}

export default getProduct