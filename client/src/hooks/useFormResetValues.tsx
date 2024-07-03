import {create} from "zustand"

interface DefaultValueProps {
    [key: string]: string
}

interface FormValueProps {
    form: null;
    defaultValues: DefaultValueProps;
    previewUrl: any;

    setFormState: (form: any) => void;
    setDefaultValues: (values: any) => void;
    setPreviewUrl: (url: any) => void;
}

export const useFormState = create<FormValueProps> ((set) => ({
    form: null,
    setFormState: (form) => set({form:form}),
    defaultValues: {},
    setDefaultValues: (values) => set({
        defaultValues: values
    }),
    previewUrl: null,
    setPreviewUrl: (url:any) => set({
        previewUrl: url
    })
}))

