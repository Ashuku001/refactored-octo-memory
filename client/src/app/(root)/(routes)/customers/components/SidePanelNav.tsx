'use client'
import CustomerSearch from "./CustomerSearch";
import { CustomerModal } from "@/components/modals/CustomerModal";
import { Button } from "@/components/ui/button";
import { useCustomerModal } from "@/hooks/useCustomerModal";

function SidePanelNav() {
    const customerModal = useCustomerModal()
    return (
        <div>
            <CustomerModal
                isOpen={customerModal.isOpen}
                onClose={customerModal.onClose}
            />
            <div className="flex flex-col justify-center ">
                <CustomerSearch/>
                <Button variant={"ghost"} onClick={customerModal.onOpen }>Add customer</Button>
            </div>
        </div>
    )
}

export default SidePanelNav