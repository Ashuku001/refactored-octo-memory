import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function loading() {
    return (
        <div className="bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')]  flex flex-col h-full relative">
            <div className='h-15 bg-[#F0F2F5] dark:bg-slate-800 flex justify-center items-center px-4 py-1 '>
                <div className='flex justify-between items-center space-x-4'>
                    <Skeleton count={1} circle={true} width={'45px'} height={'45px'} />
                    <Skeleton count={2} />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton circle={true} className='w-[40px] h-[40px]' />
                    <div className="w-[45px] h-[45px] flex justify-center items-center">
                        <Skeleton />
                    </div>
                </div>
            </div>
            <div className="flex-1 max-h-[78vh] pb-[26px]">
                        <div className=' my-3 w-full flex flex-row space-x-4 justify-between text-black dark:text-white '>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className='flex flex-row'>
                                    <div className={`border rounded-r-lg md:rounded-lg p-5 w-[200px] md:w-[350px] lg:w-[500px] ]${((i as number) % 2) == 0 ? 'ml-[20%]' : 'mr-[20%]'}`}>
                                        <p className='font-bold'>
                                            <Skeleton />
                                        </p>
                                        <Skeleton count={Math.floor(Math.random() * 5) + 1} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className='w-[200px] md:w-[350px] lg:w-[500px ]'>
                            {[...Array(10)].map((item) => (
                                <div key={item} className="p-5 border rounded-2xl">
                                    <Skeleton />
                                    <Skeleton count={2} />
                                    <br />
                                    <Skeleton count={1} />
                                </div>
                            ))}
                        </div> */}
            </div>
            <div className='flex flex-row items-center justify-center'>
                <Skeleton count={1} circle={true} width={'40px'} height={'40px'} />
                <Skeleton count={1} />
                <Skeleton count={1} circle={true} width={'40px'} height={'40px'} />
            </div>
        </div>
    )
}

export default loading