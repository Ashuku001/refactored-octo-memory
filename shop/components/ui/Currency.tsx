"use client"

import { useState, useEffect } from "react"

export const formatter = new Intl.NumberFormat("en-US",{
    "style": "currency",
    "currency": "USD"
})
  
interface CurrencyProps {
    value?: string | number
}


function Currency({value}: CurrencyProps) {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if(!isMounted) return null
  return (
    <div className="font-semibold">
      <p>

      {formatter.format(Number(value))}
      </p>
    </div>
  )
}

export default Currency
