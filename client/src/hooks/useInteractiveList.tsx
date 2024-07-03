import {create} from "zustand"

interface useInteractiveListProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useInteractiveListModal = create<useInteractiveListProps> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))
