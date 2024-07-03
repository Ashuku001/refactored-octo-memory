import {create} from "zustand"

interface SelectedProps {
    selectedTemplate: string;
    onSelectTemplate: (name: string) => void
}

export const useSelectedTemplate = create<SelectedProps> ((set) => ({
    selectedTemplate: '',
    onSelectTemplate: (name: string) => set({selectedTemplate: name})

}))

