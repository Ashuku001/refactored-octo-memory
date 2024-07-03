'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoreIcon } from "lucide-react"
import { useRouter } from "next/navigation"

function StoreCard({store}: any) { 
    const router = useRouter()
  return (
    <Card onClick={() => router.push(`/${store.id}`)}
        className="hover:opacity-80 hover:cursor-pointer"
    >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-bold">
            {store?.name}
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="text semi-bold mx-auto my-auto">
            <StoreIcon size={40}/>
            {/* Performance summary of a store */}
        </div>
        </CardContent>
    </Card>
  )
}

export default StoreCard
