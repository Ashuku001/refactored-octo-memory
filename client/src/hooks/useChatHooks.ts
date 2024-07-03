import {create} from "zustand"
import {produce} from 'immer';

type Data = {
    chatId: number | undefined;
    customerId: number | undefined;
}

interface ChatProps {
    isOpen: boolean;
    data: Data | null;
    onOpen: (data: Data) => void;
    onClose: () => void;
}

export const useChatHook = create<ChatProps> ((set) => ({
    isOpen: false,
    data: null,
    onOpen: (data: Data) => set(
        {
            isOpen: true,
            data:data
        }
        ),
    onClose: () => set(produce((draft) => {
        draft.isOpen = false;
        draft.data.chatId = null;
        draft.data.chatId = null;
    }))
}))
