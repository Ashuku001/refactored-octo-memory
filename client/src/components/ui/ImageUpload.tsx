'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Trash, ImagePlusIcon } from 'lucide-react'
// import { CldUploadWidget } from 'next-cloudinary'

import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area'

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
        console.log(result)
        console.log("Image uploaded url", result.info.secure_url)
    }

    if (!isMounted) {
        return null
    }

    return (
        <div className='w-full'>
            <div className='mb-4 flex items-center gap-4 w-full'>
                <ScrollArea className='w-full'>
                    <ScrollBar orientation='horizontal'/>
                    <div className='flex items-center space-x-5'>
                        {value.map((url) => (
                            <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                                <div className='z-10 absolute top-2 right-2'>
                                    <Button type='button' onClick={() => onRemove(url)} variant="destructive" size={'icon'}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Image
                                    className='object-cover w-full'
                                    alt='image'
                                    src={url}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            {/* a button to open this widget */}
            {/* <CldUploadWidget onUpload={onUpload} uploadPreset='ie5yb7bs' >
                {({ open }) => {
                    const onClick = () => {
                        open()
                    }

                    return (
                        <Button
                            type='button'
                            disabled={disabled}
                            variant={'secondary'}
                            onClick={onClick}
                        >
                            <ImagePlusIcon className='h-4 w-4 mr-2' />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget> */}
        </div>
    )
}

export default ImageUpload
