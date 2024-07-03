'use client'
import { useRouter, useParams } from "next/navigation";
import { MoreHorizontal, ViewIcon, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResponseColumn } from "./Columns";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal";
import { useState } from "react";
import { useChatHook } from "@/hooks/useChatHooks";


interface CellActionProps {
    data: ResponseColumn;
}

const CellAction: React.FC<CellActionProps> = ({ 
    data
}) => {
    const [open, setOpen] = useState(false)
    const chat = useChatHook()
    
    const onViewPerformance = () => {
        chat.onOpen({chatId: data?.chatId, customerId: data?.customerId})
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {}}
                loading={false}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="mb-2 ">
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        className="flex cursor-pointer hover:outline-none ring-none hover:opacity-60"
                        onClick={onViewPerformance}
                    >
                        <ViewIcon className="h-4 w-4 mr-2" />
                        View chat
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex cursor-pointer hover:outline-none ring-none  hover:opacity-60"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4 mr-2" />
                        Mark resolved
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction