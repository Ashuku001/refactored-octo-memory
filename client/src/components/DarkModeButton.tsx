"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from "lucide-react"

function DarkModeButton() {
  const [mounted, setMounted] = useState(false) // until it is mounted on the client
  const{ systemTheme, theme, setTheme} = useTheme();

  // once you mount set it to true
  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted){
    return null
  }

  // if theme is system set it to system else what the user has set
  const currentTheme = theme === "system" ? systemTheme : theme;


  return (
    <div className='pr-2'>
      {
        // if dart render sun icon else 
        currentTheme === "dark" ? (
          <SunIcon
          size={'25'}
             className="cursor-pointer text-yellow-200"
             onClick={() => setTheme("light")}
          />
        ) :
        <MoonIcon
        size={'25'}
          className="cursor-pointer text-gray-500"
          onClick={() => setTheme("dark")}
        />
      }
    </div>
  )
}

export default DarkModeButton