import { Category } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`
interface PromiseProps {
    categories: Category[]
}

const getCategories = async (): Promise<PromiseProps> => {
    const res = await fetch(URL)

    return res.json()
}

export default getCategories