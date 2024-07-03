'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

import Heading from "@/components/ui/Heading"
import { DataTable } from "@/components/ui/DataTable"
import { AdColumn, columns } from "./Columns"
import { useBulkNav } from '@/hooks/useSideNav';


type Props = {
    ads: AdColumn[]
}

const MarketingClient = ({ ads }: Props) => {
    const bulkNav = useBulkNav()
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">  
                <Heading
                    title={`List message based Ads (${ads?.length})`}
                    description="Manage marketing for your store"
                />
                <Button onClick={() => {
                    router.push(`/broadcast/list/new`)
                }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={ads} searchKey="adTemplate" />
        </>
    )
}

export default MarketingClient