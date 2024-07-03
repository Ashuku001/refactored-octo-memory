import React from 'react'

function LoadingInput() {
    return (
        <div className="w-full absolute bottom-0 right-0 flex justify-between items-center px-4 py-2 mt-2  space-x-2 bg-slate-100/50 dark:bg-gray-800/50">
            <div className='flex justify-between px-4 py-2 items-center space-x-4'>
                <div className="h-2.5 bg-gray-200  rounded-full dark:bg-gray-700 w-[60%] mb-2"></div>
                <div className="w-[60%] h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
        </div>
    )
}

export default LoadingInput