import {create} from 'zustand'
import {produce} from 'immer';


import {SizeType, ColorType, CategoryType} from "@/types"

export interface StateProps {
    productId: "new" | number | null;
}

export interface SettersProps {
    setProductId: (id: number | "new" | null) => void;
}

export const useProductsStore = create<StateProps & SettersProps>((set) => ({
    productId: null,
    setProductId: (id: number| "new" | null) => {
        set({productId: id})
    },
}))