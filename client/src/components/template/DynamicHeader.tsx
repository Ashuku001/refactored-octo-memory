import { PhotoIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
type Props = {
    format: string
}
function DynamicHeader({ format }: Props) {
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState(null)

    switch (format) {
        case 'IMAGE':
            return <div className=''>
                <button
                    type='button'
                    onClick={() => {
                        imagePickerRef.current?.click()
                    }}
                    className='w-full border border-gray0300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-slate-300'
                >
                    <PhotoIcon className='h-6 w-6 mr-2 inline-block' />
                </button>
                {image && (
                    <Image
                        src={''}
                        alt='Uploaded Image'
                        width={200}
                        height={200}
                        className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                        onClick={() => {
                            setImage(null);
                        }}
                    />
                )}

                <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                        // check e is an image
                        if (!e.target.files![0].type.startsWith('image/')) return
                        // @ts-ignore
                        setImage(e.target.files![0]!);
                    }}
                />
            </div>
        case 'DOCUMENT':
            return <input className='flex flex-col space-y-2 w-full' type="file" />
        case 'VIDEO':
            return <input className='flex flex-col space-y-2 w-full' type="file" />
        default:
            return null
    }
}

export default DynamicHeader