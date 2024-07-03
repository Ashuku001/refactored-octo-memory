import { BillboardType } from "@/types"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`
interface PromiseProps {
    billboard: BillboardType
}

const getBillboard = async (id: number): Promise<PromiseProps> => {
    const res = await fetch(`${URL}/${id}`)
    // console.log("&*&*&*",await res.json())

    return res.json()
}

export default getBillboard