import {create} from 'zustand'
import {produce} from 'immer';
import {CouponObj, DiscountObj} from "@/lib/createMap/PromotionsGroup"

import {SizeType, ColorType, CategoryType} from "@/types"
export type PromotionTypes = "discount" | "coupon" | null
export type PromotionObj = CouponObj | DiscountObj | null
export interface StateProps {
    promotionType: "discount" | "coupon" | null;
    initialData: PromotionObj
}

export interface SettersProps {
    setPromotionType: (id: PromotionTypes) => void;
    setInitialData: (data: PromotionObj)=> void;
}

export const usePromotionStore = create<StateProps & SettersProps>((set) => ({
    promotionType: null,
    initialData: null,

    setPromotionType: (id: PromotionTypes) => {
        set({promotionType: id})
    },
    setInitialData: (data: PromotionObj) => {
        set({initialData: data})
    }
}))