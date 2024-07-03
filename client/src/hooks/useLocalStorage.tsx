import { useState, useEffect } from 'react'

const useLocalStorage = () => {

    const [mounted, setMounted] = useState(false)
    const origin = typeof window !== 'undefined' && window.localStorage ? window.localStorage : null

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return origin
}

export default useLocalStorage