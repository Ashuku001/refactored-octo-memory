'use client'
import React, { useEffect, useState } from 'react'
import PreviewModal from '@/components/Preview-Modal'

function ModalProvider() {
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(!isMounted) return null; 


    return (
        <>
            <PreviewModal/>
        </>
    )
}

export default ModalProvider
