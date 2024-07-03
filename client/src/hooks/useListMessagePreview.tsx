import {create} from "zustand"

interface ListMessagePreviewProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useListMessagePreviewModal = create<ListMessagePreviewProps> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))
