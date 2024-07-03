'use client'
import { useRouter, useParams } from "next/navigation";
import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DeleteBillboardDocument } from "@/graphql";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel,DropdownMenuItem,DropdownMenuContent } from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal";
import { useState } from "react";
import { CustomerType } from "@/types";
import { CustomerModal } from '@/components/modals/CustomerModal';


interface CustomerCellActionProps {
    data: CustomerType;
}

const CustomerCellAction: React.FC<CustomerCellActionProps> = ({
    data
}) => {
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)

    const [deleteBillboard, { loading: delLoading, error: delError }] = useMutation(DeleteBillboardDocument)

    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Billboard id copied to the clipboard")
    }

    const onDelete = async () => {
        try {
            deleteBillboard({
                variables: {
                    //@ts-ignore
                    billboardId: parseInt(data?.id),
                    storeId: parseInt(params.storeId as string)
                }
            })
            setOpenConfirm(false)
            toast.success("billboard deleted")
        } catch (error) {
            toast.error("Make sure you remove all categories using this billboard")
        }
    }

    return (
        <>
            <CustomerModal
                initialData={data}
                isOpen={openUpdate}
                onClose={() => setOpenUpdate(false)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Customer Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        className="flex cursor-pointer hover:outline-none hover:opacity-60"
                        onClick={() => setOpenUpdate(true)}
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Update
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CustomerCellAction