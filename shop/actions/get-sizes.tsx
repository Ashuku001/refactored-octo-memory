import { Size } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`
interface PromiseProps {
    sizes: Size[]
}

const getSizes = async (): Promise<PromiseProps> => {
    const res = await fetch(URL)

    return res.json()
}

export default getSizes