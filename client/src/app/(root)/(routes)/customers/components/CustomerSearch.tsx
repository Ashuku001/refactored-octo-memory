'use client'
import { ChangeEvent, useState, Suspense } from 'react'
import { useLazyQuery } from '@apollo/client'
import { CustomersSearchDocument } from '@/graphql'
import LoadingChatHeader from '@/components/LoadingChatHeader'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import CustomersSearchList from './CustomersSearchList'
import { useShowSearchList } from '@/cache/cache'

function ChatSearchBar() {
    const [searchString, setSearchString] = useState('')
    const [searchCustomers, { loading, error, data }] = useLazyQuery(CustomersSearchDocument, {
        fetchPolicy: "no-cache"
    })
    const customers = data?.customersSearch

    // make a fetch call to render the search results
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(e.target.value?.length > 2){
            searchCustomers({variables: { page: 0, limit: 5, text: searchString } })
        }
        if (e.target.value === '') {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useShowSearchList(false)
        }
        setSearchString(e.target.value)
    }

    return (
        <div className="lower-nav px-4 py-2 flex flex-col items-center relative  border-r-1">
            <div className="flex justify-between items-center w-full">
                <div className="absolute left-5 w-6 h-6">
                    {searchString
                        ? <ArrowLeftIcon onClick={e => setSearchString('')} className='hover:text-green-500 text-green-600 corsor-pointer' />
                        :
                        <MagnifyingGlassIcon />
                    }
                </div>
                <input className="w-full outline-none bg-[#F0F2F5] rounded-md pl-8 py-1 mr-2 dark:bg-gray-700 text-ellipsis"
                    placeholder="Search for a customer"
                    type="text"
                    value={searchString}
                    onChange={handleChange}
                />
            </div>
            
            <div className='relative w-[300px] md:w-[350px]'>
            <div className={`absolute top-0 right-[0]  mx-auto px-2 z-20 bg-[#ffffff] dark:bg-gray-800 overflow-y-auto w-full border-r border-slate-400 `}>
                {loading && <div className={`py-2 mb-[60vh] flex flex-col space-y-2`}>
                    <LoadingChatHeader />
                    <LoadingChatHeader />
                    <LoadingChatHeader />
                    <LoadingChatHeader />
                </div>}
                {error && <p className={`text-center py-20  ${searchString.length === 0 ? 'hidden' : ''}`}>{error.message}</p>}
                {(customers) &&
                            <CustomersSearchList customers={customers} />
                        }
            </div>
            </div>
        </div>
    )
}

export default ChatSearchBar
