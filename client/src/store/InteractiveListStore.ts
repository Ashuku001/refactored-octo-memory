import {create} from 'zustand'
import { FileObj } from '@/types';
import {produce} from 'immer';

export type HeaderType = "NONE" | "TEXT"
export type ButtonType = "BUTTON_REPLY" | "NONE"

export type ProductType = {
    id: number;
    name: string;
    price: string;
}

export type SectionType = {
    id: number;
    title: string;
    rows: RowType[];
}

export type RowType = {
    product?: ProductType | null
    id: number;
    title: string;
    description: string;
}

export interface ListMessageState {
    headerType: HeaderType;
    listLoading: boolean;
    rowsCount: number;
    
    headerText: string;
    setLoading: (loading: boolean) => void;
    bodyText: string;
    footerText: string;
    actionButtonText: string;


    sections: SectionType[];
    addSection: (section: SectionType) => void;
    deleteSection: (id: number) => void;
    updateSectionTitle: (id: number, payload: {title: string}) => void;
    addRow: (sectionId: number,  row: RowType) => void;
    deleteRow: (sectionId: number, rowId: number) => void;
    updateRowTitle: (sectionId: number, rowId: number, payload: {title: string}) => void;
    updateRowDescription: (sectionId: number, rowId: number, payload: {description: string}) => void;
    updateProduct: (sectionId: number, rowId: number, payload:{product: ProductType | null}) => void


    setHeaderType: (type: string) => void;
    setHeaderText: (text: string) => void;
    setBodyText: (text: string) => void;
    setFooterText: (text: string) => void;
    setActionButtonText: (text: string) => void;
    setRowsCount: (count: number) => void
}

export const useInteractiveListStore = create<ListMessageState>((set) => ({
    headerType: "NONE",
    listLoading: false,
    rowsCount: 0,

    headerText: '',
    bodyText: '',
    footerText: '',
    actionButtonText: '',
    replyButtons: '',


    // Section
    sections: [{
        id: Math.floor(Math.random() * 100),
        title: "",
        rows: [{
            id: Math.floor(Math.random() * 100),
            title: '',
            description: ''
        }],
    }],
    addSection: (section: SectionType) => {
        set(produce((draft) => {
            draft.sections.push(section)
        }))
    },
    deleteSection: (id: number)  => {
        set(
            produce((draft) => {
                const index = draft.sections.findIndex((section: SectionType) => section.id === id);
                draft.sections.splice(index, 1)
            })
        )
    },
    updateSectionTitle: (id: number, payload) => {
        set(produce((draft) => {
            const section = draft.sections.find((section: SectionType) => section.id === id);
            section.title = payload.title;
        }))
    },

    // section rows
    addRow: (sectionId: number, row: RowType) => {
        set(
            produce((draft) => {
                const section = draft.sections.find((section: SectionType) => section.id === sectionId)
                section.rows = [...section.rows, row]
            })
        )
    },
    deleteRow: (sectionId: number, rowId: number) => {
        set(
            produce((draft) => {
                let section = draft.sections.find((section: SectionType) => section.id === sectionId)
                let rowIndex = section.rows.findIndex((row) => row.id === rowId)
                section.rows.splice(rowIndex, 1)
            })
        )
    },
    setRowsCount: (count: number) => {
        set((state) => ({rowsCount: state.rowsCount + count}))
    },
    updateRowTitle: (sectionId: number, rowId: number, payload: {title: string}) => {
        set(produce((draft) => {
            let section = draft.sections.find((section: SectionType) => section.id === sectionId)
            const row = section.rows.find((row) => row.id === rowId)
            row.title = payload.title
        }))
    },
    updateRowDescription: (sectionId: number, rowId: number, payload: {description: string}) => {
        set(produce((draft) => {
            let section = draft.sections.find((section: SectionType) => section.id === sectionId)
            const row = section.rows.find((row) => row.id === rowId)
            row.description = payload.description
        }))
    },
    updateProduct: (sectionId: number, rowId: number, payload:{product: ProductType}) => {
        set(produce((draft) => {
            let section = draft.sections.find((section: SectionType) => section.id === sectionId)
            const row = section.rows.find((row) => row.id === rowId)
            row.product = payload.product
        }))
    },


    setHeaderType: (type: string) => {
        set({headerType: type})
    },
    setLoading: (loading: boolean) => {
        set({listLoading: loading})
    },

    setHeaderText: (text: string) => {
        set({headerText: text})
    },
    setBodyText: (text: string) => {
        set({bodyText: text})
    },
    setFooterText: (text: string) => {
        set({footerText: text})
    },
    setActionButtonText: (text: string) => {
        set({actionButtonText: text})
    },


}))