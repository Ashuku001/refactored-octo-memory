import {create} from "zustand"

interface useBulkNavProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useBulkNav = create<useBulkNavProps> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))
