import {create} from 'zustand'
import {produce} from 'immer';


export interface StateProps {
    customerId: "new" | number | null;
}

export interface SettersProps {
    setCustomerId: (id: number | "new" | null) => void;
}

export const useCustomer = create<StateProps & SettersProps>((set) => ({
    customerId: null,
    setCustomerId: (id: number| "new" | null) => {
        set({customerId: id})
    },
}))