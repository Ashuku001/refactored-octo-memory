import {create} from "zustand"

interface useSendFileProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSendFileModal = create<useSendFileProps> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

