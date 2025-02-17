'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='bg-slate-200 dark:bg-[#09090B] mx-auto max-w-lg py=1 px-4 min-h-screen'>
      <h2 className='my-4 text-2xl font-bold'>Something went wrong!</h2>
      <p>{error.message}</p>
      <button className='mb-4 p-4 bg-red-500 text-white rounded-xl'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Refresh
      </button>
      <p className='text-xl'>
        Or go back to <Link href='/chats' className='mb-4 p-4 bg-red-500 text-white rounded-xl'>Home {<HomeIcon/>}</Link>
      </p>
    </main>
  )
}