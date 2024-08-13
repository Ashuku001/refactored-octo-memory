import { produce } from "immer";
import {create} from "zustand"

export type DataType = {merchantId: number, customerId: number[]}

interface RecommendationModalProp {
    isOpen: boolean;
    onOpen: (data: DataType | null) => void;
    onClose: () => void;
    data: DataType | null;
}

export const useRecommendationModal = create<RecommendationModalProp> ((set) => ({
    isOpen: false,
    data: null,
    onOpen: (data: DataType| null) => set(produce((draft) => {
        draft.isOpen = true;
        draft.data = data;
    })),
    onClose: () => set({isOpen: false})

}))
