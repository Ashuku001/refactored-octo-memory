import {create} from "zustand"

interface useInputsProps {
    value: '';
    onSetValue: () => void
}

export const useInputs = create<useInputsProps> ((set) => ({
    value: '',
    onSetValue: () => set({value: ''})

}))

