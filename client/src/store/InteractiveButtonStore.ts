import { Models } from 'appwrite';
import {create} from 'zustand'
import { FileObj } from '@/types';

export type HeaderType = "NONE" | "TEXT" | "MEDIA"
export type MediaType = "IMAGE" | "DOCUMENT"  | "VIDEO" | "NONE"
export type ButtonType = "BUTTON_REPLY" | "NONE"


export type ReplyButtonsType = {
    type: 'reply',
    reply: {
        id: string;
        title: string;
    } 
}

export interface ButtonMessageState {
    headerType: HeaderType;
    mediaType: MediaType;
    buttonType: ButtonType;
    replyButtons: ReplyButtonsType[] | [];

    headerText: string;
    fileObj: FileObj | null;
    filePreview: string | null;
    bodyText: string;
    footerText: string;
    buttonText0: string,
    buttonText1: string,
    buttonText2: string,

    setHeaderType: (type: HeaderType) => void;
    setMediaType: (type: MediaType) => void;
    setButtonType: (type: ButtonType) => void;
    setReplyButtons: (button: ReplyButtonsType) => void;

    setHeaderText: (text: string) => void;
    setBodyText: (text: string) => void;
    setFooterText: (text: string) => void;
    setFileObj: (file: FileObj | null) => void;
    setFilePreview: (file: string | null) => void;
    setButtonText0: (text: string) => void;
    setButtonText1: (text: string) => void;
    setButtonText2: (text: string) => void;
}

export const useInteractiveButtonStore = create<ButtonMessageState>((set) => ({
    headerType: "NONE",
    mediaType: "NONE",
    buttonType: 'NONE',

    headerText: '',
    bodyText: '',
    footerText: '',
    fileObj: null,
    filePreview: null,
    replyButtons: [],
    buttonText0: "",
    buttonText1: "",
    buttonText2: "",


    setReplyButtons: (button: ReplyButtonsType) => {
        set((state) => ({ replyButtons:[...state.replyButtons, button] }))
    },
    setMediaType: (type: MediaType) => {
        set({mediaType: type})
    },
    setHeaderType: (type: HeaderType) => {
        set({headerType: type})
    },

    setButtonType: (type: ButtonType) => {
        set({buttonType: type})
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
    setFileObj: (file: FileObj | null) => {
        set({fileObj: file})
    },
    setFilePreview: (filePreview: string | null) => {
        set({filePreview})
    },
    setButtonText0: (text: string) => {
        set({buttonText0: text})
    },
    setButtonText1: (text: string) => {
        set({buttonText1: text})
    },
    setButtonText2: (text: string) => {
        set({buttonText2: text})
    },
}))