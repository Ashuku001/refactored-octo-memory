import {create} from 'zustand'
import {produce} from 'immer';


import {SizeType, ColorType, CategoryType} from "@/types"
export type OptionType = "content-filter"|"collaborative-filter"|"model-based-filter"|"deep-learning-filter"
export interface StateProps {
    option?: OptionType;
}

export interface SettersProps {
    setOption: (option?: OptionType) => void;
}

export const useRecommendationStore = create<StateProps & SettersProps>((set) => ({
    option: undefined,
    setOption: (option?: OptionType) => {
        set({option})
    },
}))