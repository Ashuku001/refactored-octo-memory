'use client'
import { useRouter, useParams } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DeleteProductDocument } from "@/graphql";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger,  DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel  } from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal";
import { CouponObj, DiscountObj } from "@/lib/createMap/PromotionsGroup";
import { PromotionTypes, usePromotionStore } from "@/store/PromotionsStore";


interface CardActionProps {
    data: DiscountObj | CouponObj;
}

const CardAction: React.FC<CardActionProps> = ({
    data
}) => {
    const [open, setOpen] = useState(false)
    const [deleteBillboard, { loading: delLoading, error: delError }] = useMutation(DeleteProductDocument)
    const [setInitialData, setPromotionType] = usePromotionStore((state) => [state.setInitialData, state.setPromotionType])

    const router = useRouter()
    const params = useParams()

    const onCardAction = () => {
        setInitialData(data)
        setPromotionType(data.name as PromotionTypes)
    }

    const onDelete = async () => {
        try {
            deleteBillboard({
                variables: {
                    productId: data.id,
                    storeId: parseInt(params.storeId as string)
                }
            })
            setOpen(false)
            toast.success("product deleted")
        } catch (error) {
            toast.error("Failed to delete try again later.")
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
                        onClick={onCardAction}
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

export default CardAction