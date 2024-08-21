'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useCustomer } from "@/hooks/useCustomer"
import CustomDataTable from "@/components/Table/CustomTable"
import Heading from "@/components/ui/Heading"
import { CustomerColumn, columns } from "./Columns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"

type Props = {
    customers: CustomerColumn[]
}

const CustomerList = ({ customers }: Props) => {
    const [data, setData] = useState<CustomerColumn[]>([])
    const [searchKey, setSearchKey] = useState<string>('')
    const searchKeyOptions = ["name", "phoneNumber", "age", "gender", "customerSegment"]
    const [setCustomerId] = useCustomer((state) => [state.setCustomerId])

    const router = useRouter()
    useEffect(() => {
        if(customers.length) {
            setData(customers)
        }
    }, [setData, customers])
    return (
        <div className='h-full'>
            <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50   px-2  py-1">
                <Heading
                    title={`Customers (${customers?.length})`}
                    description="Manage customers for your store"
                />
                <Button onClick={() => {
                    router.push(`/customers?show=add`)
                    setCustomerId('new')
                }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator className="mb-2"/>
            <ScrollArea className='h-full px-2'>
                <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                    <CustomDataTable 
                        data={data} 
                        setData={setData} 
                        columns={columns} 
                        paginate={true}

                        searchKey={!!searchKey.length ? searchKey : searchKeyOptions[0]}
                        setSearchKey={setSearchKey}
                        searchKeyOptions={searchKeyOptions}
                    />
                </div>
                <Heading title="API" description="API calls for Customers" />
                <Separator />
                {/* <ApiList entityName="customers" entityIdName="brandId" /> */}
                <div className='mb-20'/>
            </ScrollArea>
        </div>
    )
}

export default CustomerList