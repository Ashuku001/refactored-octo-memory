'use client'
import { useState, useRef, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'
import { Trash, ImagePlusIcon, FileTextIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FileObj } from '@/types'
import { toast } from 'react-hot-toast';
import { useFormState } from '@/hooks/useFormResetValues';
import { useInteractiveButtonStore } from '@/store/InteractiveButtonStore';
import { useInteractiveButtonModal } from '@/hooks/useInteractiveButton';
export interface FilePrevObj {
    type: string;
    file: any; 
    preview: any;
}

interface FileUploadProps {
    disabled?: boolean;
    inlinePreview: boolean;
    file: FilePrevObj | undefined;
    type: "IMAGE" | "DOCUMENT" | "VIDEO";

    setFile: (file: FilePrevObj) => void;
    onRemove: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    disabled,
    inlinePreview = false,
    type,
    file,

    setFile,
    onRemove,
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const documentPickerRef = useRef<HTMLInputElement>(null)
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const videoPickerRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
      setFile(undefined)
    }, [setFile, type]);
    

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
            setFile({type: tempFile.type, preview:readerEvent?.target?.result, file: e?.target?.files![0]})
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
    };

    return (
        <div>
            {inlinePreview &&
            <div>

                <div  className='relative mb-2 w-[200px] max-h-[200px] rounded-md overflow-hidden'>
                    {(type === 'IMAGE' && file?.preview  ) &&
                        <div>
                            <div className='z-5 absolute top-2 right-2'>
                                <Button type='button' onClick={() => onRemove()} variant="destructive" size={'icon'}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                className='object-cover w-full'
                                alt='image'
                                src={file?.preview}
                                width={200}
                                height={200}
                            />
                        </div>
                    }
                    {(type === 'VIDEO' && file?.preview) &&
                        <div>
                            <div className='z-5 absolute top-2 right-2'>
                                <Button type='button' onClick={() => onRemove()} variant="destructive" size={'icon'}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <video
                                className='object-cover h-200px w-200px'
                                src={file?.preview}
                            />
                        </div>
                    }
                </div>
                {type === 'DOCUMENT' && file?.preview &&
                    <div  className='relative mb-2 w-full h-[100px] rounded-md overflow-hidden'>  
                        <>
                            <div className='z-5 absolute top-2 right-2'>
                                <Button type='button' onClick={() => onRemove()} variant="destructive" size={'icon'}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className='flex space-x-1 bg-slate-900/20 rounded-lg p-2 w-full'>
                                    <FileTextIcon color={`${file.file?.type === 'application/pdf' ?  'red' : 'blue'}`} className='h-10 w-10'/>
                                    <div className='p-2 break-words w-full'>
                                        <p className='line-clamp-3'>{file.file?.name}</p>
                                        <div className='flex justify-between items-center mt-3'>
                                            <p className='text-slate-500 text-[12px]'>{file.file?.type === 'application/pdf' ? 'PDF' : 'DOCX'}</p>
                                            <p className='text-slate-500 text-[12px]'>Size: {file.file?.size}</p>
                                        </div>
                                    </div>
                            </div>
                        </>
                    </div>
                }
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
                Upload {type.toLowerCase()}
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
