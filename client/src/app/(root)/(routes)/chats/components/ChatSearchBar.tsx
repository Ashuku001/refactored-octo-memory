'use client'
import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { CustomerChatSearchDocument } from '@/graphql'
import CustomersList from './CustomersSearchList'
import { ArrowLeft, SearchIcon } from 'lucide-react'
import { useShowSearchList } from '@/cache/cache'
import { ChatType } from '@/types'
import LoadingChatHeader from '@/components/LoadingChatHeader';
import { Input } from '@/components/ui/input'

function ChatSearchBar() {
    const [searchString, setSearchString] = useState('')
    const [getCusChats, { loading, error, data }] = useLazyQuery(CustomerChatSearchDocument, {
        fetchPolicy: "no-cache"
    })

    const customers = data?.customerChatSearch?.customers
    const chats = data?.customerChatSearch?.chats

    return (
        <div className="py-2 flex flex-col items-center relative ">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center flex-1">
                    <div className="absolute left-1">
                        {searchString
                            ? <ArrowLeft size={'30'} onClick={e => setSearchString('')} className='hover:text-green-500 text-green-600 corsor-pointer' />
                            :
                            <SearchIcon size={'30'}/>
                        }
                    </div>
                    <Input className="focus-visible:ring-0 text-ellipsis pl-10 "
                        placeholder="Search or start new chat"
                        type="text"
                        value={searchString}
                        onChange={e => {
                            e.preventDefault()
                            setSearchString(e.target.value)
                            if (searchString.length > 2) {
                                getCusChats({ variables: { page: 0, limit: 20, text: searchString } })
                            }
                            if (e.target.value === '') {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                useShowSearchList(false)
                            }

                        }}
                    />
                </div>
                <div className="w-[40px] h-[40px] flex items-center">
                    <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                        className="relative">
                        <path fill="#54656F" d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"></path>
                    </svg>
                </div>
            </div>
            <div className={`relative  w-[300px] md:w-[350px] `}>
                <div className={`absolute top-0 right-[0]  mx-auto px-2 z-20 bg-[#ffffff] dark:bg-gray-800 overflow-y-auto w-full border-r border-slate-400 `}>
                    {loading && <div className={`py-2 mb-[60vh] flex flex-col space-y-2`}>
                        <LoadingChatHeader />
                        <LoadingChatHeader />
                        <LoadingChatHeader />
                        <LoadingChatHeader />
                    </div>}
                    {error && <p className={`text-center py-20  ${searchString.length === 0 ? 'hidden' : ''}`}>{error.message}</p>}
                    {(customers || chats) &&
                        <CustomersList customers={customers} chats={chats as ChatType[]} />
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatSearchBar
