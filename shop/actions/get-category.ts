import {   Category } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`
interface PromiseProps {
    category: Category
}

const getCategory = async (id: string): Promise<PromiseProps> => {
    const res = await fetch(`${URL}/${id}`)

    return res.json()
}

export default getCategory