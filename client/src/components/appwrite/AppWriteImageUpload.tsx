'use client'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { Trash, ImagePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useFileStore } from '@/store/FileStore'
import { uploadFile } from '@/lib/appwrite/uploadFile'
import { Models } from 'appwrite'
import LoadingSpinner from '../LoadingSpinner'
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    imageSize?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    imageSize,
    value
}) => {
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedFile, setImage] = useState<File | null>(null)
    //@ts-ignore
    const [addFile] = useFileStore((state) => [state.addFile])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = async (fileObj: Models.File) => {
        const url = await uploadFile(addFile, fileObj)
        onChange(url)
        setImage(null)
        setLoading(false)
    }

    const previewFile = async (file: File) => {
        setLoading(true)
        const url = await uploadFile(addFile, file)
        onChange(url)
        setImage(null)
        setLoading(false)
    };

    if (!isMounted) {
        return null
    }

    return (
        <div className='w-full'>
            <div className='flex items-center w-full'>
                <ScrollArea className='w-full'>
                    <ScrollBar orientation='horizontal'/>
                    <div className='flex items-center space-x-5'>
                        {value?.map((url) => (
                            <div key={url} className={cn('relative w-[200px] mb-2 h-auto rounded-md overflow-hidden', imageSize)}>
                                <div className='z-10 absolute top-2 right-2'>
                                    <Button type='button' onClick={() => onRemove(url)} variant="destructive" size={'icon'}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Image
                                    src={url}
                                    className='object-cover w-full'
                                    alt=''
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                
            </div>
            <Button
                type='button'
                disabled={loading}
                variant={'secondary'}
                className='px-1'
                onClick={() => imagePickerRef.current?.click()}
            >
                {loading 
                ?   <div className={cn('flex items-center justify-center', imageSize)}>
                        <LoadingSpinner />
                    </div> 
                : 
                    <>
                        <ImagePlusIcon className='h-4 w-4 mr-1' />
                        Upload Image
                    </>
                }
            </Button>
            <input
                type="file"
                ref={imagePickerRef}
                hidden
                onChange={(e) => {
                    // check e is an image
                    if(!e.target.files![0].type.startsWith('image/')) return
                    previewFile(e.target.files![0]);
                }}
            />
        </div>
    )
}

