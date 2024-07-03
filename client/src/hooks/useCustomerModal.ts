import {create} from "zustand"

interface CustomerModalProps {
    isOpen: boolean;
    loading: boolean;

    onClose: () => void;
    onOpen: () => void;
    setLoading: (loading: boolean) => void
}

export const useCustomerModal = create<CustomerModalProps> ((set) => ({
    isOpen: false,
    loading: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    setLoading: (loading: boolean) => set({loading})
}))
