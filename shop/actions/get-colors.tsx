import { Color } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`
interface PromiseProps {
    colors: Color[]
}

const getColors = async (): Promise<PromiseProps> => {
    const res = await fetch(URL)

    return res.json()
}

export default getColors