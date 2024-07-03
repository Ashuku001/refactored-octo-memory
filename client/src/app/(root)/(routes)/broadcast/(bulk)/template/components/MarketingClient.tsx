'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import Heading from "@/components/ui/Heading"
import { DataTable } from "@/components/ui/DataTable"
import { AdColumn, columns } from "./Columns"
import { ScrollArea } from "@/components/ui/scroll-area"

type Props = {
    ads: AdColumn[]
}

const MarketingClient = ({ ads }: Props) => {

    const router = useRouter()
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between w-full">
                <Heading
                    title={`Template message based Ads (${ads?.length})`}
                    description="Manage marketing for your store"
                />
                <Button onClick={() => {
                    router.push(`/broadcast/template/new`)
                }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm h-full">
                <ScrollArea className='h-full'>
                    <DataTable columns={columns} data={ads} searchKey="name" />
                    <div className="mb-20"/>
                </ScrollArea>
            </div>
        </div>
    )
}

export default MarketingClient