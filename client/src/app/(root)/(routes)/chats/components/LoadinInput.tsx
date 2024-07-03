import React from 'react'

function LoadinInput() {
    return (
        <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
            <div className="flex items-center w-full space-x-2">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-600 w-24 flex-1"></div>
                <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-600 w-20"></div>
            </div>
        </div>
    )
}

export default LoadinInput