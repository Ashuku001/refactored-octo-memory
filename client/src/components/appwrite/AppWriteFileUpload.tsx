'use client'
import { useState, useRef, useEffect, ChangeEvent,Dispatch,SetStateAction } from 'react'
import Image from 'next/image'
import { Trash, ImagePlusIcon, FileTextIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FileObj } from '@/types'
import { toast } from 'react-hot-toast';
import { useFormState } from '@/hooks/useFormResetValues';
import { useInteractiveButtonStore } from '@/store/InteractiveButtonStore';
import { useInteractiveButtonModal } from '@/hooks/useInteractiveButton';
import { Models } from 'appwrite';

interface FileUploadProps {
    disabled?: boolean;
    setFileObj: Dispatch<SetStateAction<Models.File | null>>;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    type: string;
    value: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
    disabled,
    setFileObj,
    onChange,
    onRemove,
    type,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const [selectedFile, setSelectedFile] = useState<FileObj>({type: '', file: null})
    const documentPickerRef = useRef<HTMLInputElement>(null)
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const videoPickerRef = useRef<HTMLInputElement>(null)

    // reset form values on change of preview state
    const [previewUrl, setPreviewUrl] = useFormState((state) => [
        state.previewUrl,
        state.setPreviewUrl,
    ])

    const interactiveButtonModal = useInteractiveButtonModal()
    const [setFilePreview, setFileForButtonMessage] = useInteractiveButtonStore((state) => [
        state.setFilePreview,
        state.setFileObj,
    ])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        // for template modal
        if(selectedFile.file){
            setFileObj(selectedFile.fileObj)
        }
    }, [selectedFile, setFileObj])

    if (!isMounted) {
        return null
    }

    const previewFile =(e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const tempFile = e?.target?.files![0];
        
        if (tempFile) {
            reader.readAsDataURL(tempFile);
        }
        reader.onload = (readerEvent) => {
            if(interactiveButtonModal.isOpen){
                // for Preview in Interactivebutton modal
                setFilePreview(readerEvent?.target?.result)
                setFileForButtonMessage(e?.target?.files![0])
            } else {
                // use by template modal
                setPreviewUrl(readerEvent?.target?.result)
                setSelectedFile({type: tempFile.type, file:readerEvent?.target?.result, fileObj: e?.target?.files![0]})
                // setFileObj(e?.target?.files) use if here
                if (tempFile.type?.includes("image")) {
                    imagePickerRef.current.value = null
                } else if (tempFile.type?.includes("video")) {
                    videoPickerRef.current.value = null
                } else if(tempFile.type?.includes("application/pdf")){
                    documentPickerRef.current.value = null
                } else if(tempFile.type?.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
                    documentPickerRef.current.value = null
                }
            }
            onChange(JSON.stringify(selectedFile)) // to validate the input expecting the file

         
        };
    }

    return (
        <div>
            {!interactiveButtonModal.isOpen &&
                type !== 'DOCUMENT' &&
                <div  className='relative mb-2 w-[200px] max-h-[200px] rounded-md overflow-hidden'>
                    {type === 'IMAGE' &&
                        value.map((url) => (
                            previewUrl &&
                            <div key={url}>
                                <div className='z-5 absolute top-2 right-2'>
                                    <Button type='button' onClick={() => onRemove(url)} variant="destructive" size={'icon'}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Image
                                    className='object-cover w-full'
                                    alt='image'
                                    src={previewUrl}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ))
                    }
                    {type === 'VIDEO' &&
                        // value.map((url) => (
                            previewUrl &&
                            <>
                                <div className='z-5 absolute top-2 right-2'>
                                    <Button type='button' onClick={() => onRemove(selectedFile.file)} variant="destructive" size={'icon'}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                <video
                                    className='object-cover h-200px w-200px'
                                    src={previewUrl}
                                />
                            </>
                        // ))
                    }
                </div>
                }
                {type === 'DOCUMENT' &&
                previewUrl &&
                <div  className='relative mb-2 w-full h-[100px] rounded-md overflow-hidden'>  
                    <>
                        <div className='z-5 absolute top-2 right-2'>
                            <Button type='button' onClick={() => onRemove(selectedFile.file)} variant="destructive" size={'icon'}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className='flex space-x-1 bg-slate-900/20 rounded-lg p-2 w-full'>
                                <FileTextIcon color={`${selectedFile.fileObj?.type === 'application/pdf' ?  'red' : 'blue'}`} className='h-10 w-10'/>
                                <div className='p-2 break-words w-full'>
                                    <p className='line-clamp-3'>{selectedFile.fileObj?.name}</p>
                                    <div className='flex justify-between items-center mt-3'>
                                        <p className='text-slate-500 text-[12px]'>{selectedFile.fileObj?.type === 'application/pdf' ? 'PDF' : 'DOCX'}</p>
                                        <p className='text-slate-500 text-[12px]'>Size: {selectedFile.fileObj?.size}</p>
                                    </div>
                                </div>
                        </div>
                    </>
                </div>
            }
            <Button
                type='button'
                disabled={disabled}
                variant={'secondary'}
                onClick={() => {
                    type === 'IMAGE' ? imagePickerRef.current?.click()
                            : type === "VIDEO" ? videoPickerRef.current?.click()
                            : type === 'DOCUMENT' ? documentPickerRef.current?.click()
                            : toast.error("Unsurported file type")
                }}
            >
                <ImagePlusIcon className='h-4 w-4 mr-2' />
                Upload {type}
            </Button>
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
        </div>
    )
}

export default FileUpload
