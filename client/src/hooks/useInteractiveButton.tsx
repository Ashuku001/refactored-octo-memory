import {create} from "zustand"

interface useInteractiveButtonProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useInteractiveButtonModal = create<useInteractiveButtonProps> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))
