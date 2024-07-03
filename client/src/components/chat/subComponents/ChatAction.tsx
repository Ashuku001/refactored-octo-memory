"use client"
import { PlusIcon, FileText, ImageIcon, VideoIcon,LayoutTemplateIcon, MapPin, ListChecks, CommandIcon } from "lucide-react"
import { useState, useRef, useEffect, ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SendFilePanel } from './SendFiles/SendFilePanel';
import { useTemplateModal } from "@/hooks/useTemplateModal"
import { FileObj } from "@/types"
import { useSendFileModal } from '@/hooks/useSendFileModal';
import { TipTool } from '@/components/ui/TipTool';
import { useInteractiveButtonModal } from '@/hooks/useInteractiveButton';
import { useInteractiveListModal } from '@/hooks/useInteractiveList';
import { InteractiveListPanel } from './InteractiveMessage/InteractiveListMessage';
import { InteractiveButtonPanel } from './InteractiveMessage/InteractiveButtonPanel';

export function ChatAction() {
    const [selectedFile, setSelectedFile] = useState<FileObj>({type: '', file: null})
    const documentPickerRef = useRef<HTMLInputElement>(null)
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const videoPickerRef = useRef<HTMLInputElement>(null)


    const sendFileModal = useSendFileModal()
    const templateModal = useTemplateModal()
    const interactiveButtonModal = useInteractiveButtonModal()
    const interactiveListModal = useInteractiveListModal()

    const previewFile =(e: ChangeEvent<HTMLInputElement>) => {
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e?.target?.files![0];

        if (selectedFile) {
        sendFileModal.onOpen()
          reader.readAsDataURL(selectedFile);
        }
        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent) => {
            setSelectedFile({type: selectedFile.type, file:readerEvent?.target?.result, fileObj: e?.target?.files![0]})
            if (selectedFile.type.includes("image")) {
                imagePickerRef.current.value = null
            } else if (selectedFile.type.includes("video")) {
                videoPickerRef.current.value = null
            } else if(selectedFile.type.includes("application/pdf")){
                documentPickerRef.current.value = null
            } else if(selectedFile.type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
                documentPickerRef.current.value = null
            
            }

        };
    }

    useEffect((e: ChangeEvent<HTMLInputElement>) => {
        previewFile(e)
    })

    return (
        <>
            <SendFilePanel selectedFile={selectedFile}/>
            <InteractiveButtonPanel />
            <InteractiveListPanel/>
            <DropdownMenu>
            <TipTool tip='Send media message'>
                <DropdownMenuTrigger asChild>
                    <div>
                        <span className="sr-only">Open menu</span>
                        <PlusIcon className="h-8 w-8 m-0 p-0 text-slate-400"/>
                    </div>
                </DropdownMenuTrigger>
            </TipTool>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                    onClick={() => templateModal.onOpen()}
                    >
                    <div className="flex space-x-2">
                        <LayoutTemplateIcon className="h-5 w-5"/> 
                        <p>Template</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => interactiveListModal.onOpen()}
                >
                    <div className="flex space-x-2">
                        <ListChecks className="h-5 w-5"/> 
                        <p>Interactive list message</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => interactiveButtonModal.onOpen()}
                >
                    <div className="flex space-x-2">
                        <CommandIcon className="h-5 w-5"/> 
                        <p>Interactive button message</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => imagePickerRef.current?.click()}
                >
                    <div className="flex space-x-2">
                        <ImageIcon className="h-5 w-5"/> 
                        <p>Image</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => documentPickerRef.current?.click()}
                >
                    <div className="flex space-x-2">
                        <FileText className="h-5 w-5"/> 
                        <p>Document</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => videoPickerRef.current?.click()}
                >
                    <div className="flex space-x-2">
                        <VideoIcon className="h-5 w-5"/> 
                        <p>Video</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    // onClick={}
                >
                    <div className="flex space-x-2">
                        <MapPin className="h-5 w-5"/> 
                        <p>Location</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <input
                type="file"
                ref={documentPickerRef}
                hidden
                accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={previewFile}
            />
            <input
                type="file"
                ref={imagePickerRef}
                hidden
                accept="image/png, image/jpeg, image/jpg"
                onChange={previewFile}
            />
            <input
                type="file"
                ref={videoPickerRef}
                hidden
                accept="video/*"
                onChange={previewFile}
            />
            </DropdownMenu>
        </>
    )
}
