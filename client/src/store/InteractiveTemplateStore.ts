import {create} from 'zustand'

export type ProductType = {
    id: number;
    name: string;
    price: string;
}

export type StoreType = {
    id: number;
    name: string;
    products: ProductType[]
  }

export interface TemplateMessageState {
    previewUI: any;
    tempData: any;
    tempVariables: any;
    loadingTemplate: boolean;
    product: ProductType | null;
}

export interface TemplateMessageSetters {
    setPreviewUI: (previewUI: any) => void
    setTempData: (tempData: any) => void
    setTempVariables: (tempVariables: any) => void
    setLoadingTemplate: (loading: boolean) => void
    setProduct: (product: ProductType | null) => void;
    
}

export const useInteractiveTemplateStore = create<TemplateMessageState & TemplateMessageSetters> ((set) => ({
    previewUI: {},
    tempData: {},
    tempVariables: {},
    loadingTemplate: false,
    product: null,

    setPreviewUI: (previewUI: any) => {
        set({previewUI}) 
    },
    setTempData: (tempData: any) => {
        set({tempData})
    },
    setTempVariables: (tempVariables: any) => {
        set({tempVariables})
    },
    setLoadingTemplate: (loading: boolean) => set({loadingTemplate: loading}),
    setProduct: (product: ProductType | null) => {
        set({product})
    },
}) )