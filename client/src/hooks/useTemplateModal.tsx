import {create} from "zustand"

interface useTemplateModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useTemplateModal = create<useTemplateModalProps> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

