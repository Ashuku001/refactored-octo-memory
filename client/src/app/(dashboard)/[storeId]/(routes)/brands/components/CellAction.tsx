'use client'
import { useRouter, useParams } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DeleteBrandDocument } from "@/graphql";

import { Button } from "@/components/ui/button";
import { BrandColumn } from "./Columns"
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuLabel,DropdownMenuItem,DropdownMenuContent } from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal";
import { useState } from "react";

interface CellActionProps {
    data: BrandColumn;
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const [open, setOpen] = useState(false)
    const [deleteBillboard, { loading: delLoading, error: delError }] = useMutation(DeleteBrandDocument)

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
                    brandId: parseInt(data?.id),
                    storeId: parseInt(params.storeId as string)
                }
            })
            setOpen(false)
            toast.success("brand deleted")
        } catch (error) {
            toast.error("Make sure you remove all categories using this brand")
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={delLoading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        className="flex cursor-pointer hover:outline-none hover:opacity-60"
                        onClick={() => onCopy(data.id.toString())}
                    >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex cursor-pointer hover:outline-none hover:opacity-60"
                        onClick={() => router.push(`/${params.storeId}/brands/${data.id}`)}
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex cursor-pointer hover:outline-none hover:opacity-60"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction