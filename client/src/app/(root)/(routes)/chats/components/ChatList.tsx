'use client'
import {
    useSuspenseQuery,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { ChatAddedDocument, GetChatsDocument } from "@/graphql";
import ChatComponent from "./ChatComponent";
import { Suspense, useEffect, useState } from "react";
import { ChatType } from "@/types";
import { gql } from "@apollo/client";
import LoadingChatHeader from '@/components/LoadingChatHeader';
import secureLocalStorage from 'react-secure-storage'
import toast from 'react-hot-toast';
import {AlertCircleIcon} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area';

export const GET_MERCHANTS_ID = gql`
    query GetMerchantId {
        merchantId @client
    }
`


function ChatList() {
    const [isMounted, setIsMounted] = useState(false)
    const { data, subscribeToMore } = useSuspenseQuery(GetChatsDocument)
    let activeChat = useState<number>(-100)
    const merchantId = parseInt(secureLocalStorage.getItem('merchantId') as string)
    const chats = data?.chats


    useEffect(() => {
        const subscribeToNewChats = () => {
            subscribeToMore({
                document: ChatAddedDocument,
                variables: { merchantId: merchantId },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                        return prev;
                    }

                    const newChat = subscriptionData.data?.chatAdded
                    if (newChat?.messages?.slice(-1)[0]?.from_customer === true)
                        toast("New Message",
                        {
                            position: 'top-right',
                            icon: <AlertCircleIcon className="h-8 w-8 text-green-500"/>
                        })


                    if (!prev?.chats?.find((chat) => chat?.id === newChat?.id)) {
                        return Object.assign({}, prev, {
                            chats: [newChat, ...prev?.chats!],
                        });
                    } else {
                        return prev
                    }
                }
            })
        }

        subscribeToNewChats()
    }, [merchantId, subscribeToMore])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }

    return (
        <div className="h-full max-w-full overflow-hidden">
            <ScrollArea className='h-full'>
                {chats?.map(chat => (
                    <Suspense key={chat?.id} fallback={<LoadingChatHeader />}>
                        <ChatComponent key={chat?.id} chat={chat as ChatType} activeChat={activeChat} />
                    </Suspense>
                ))}
            </ScrollArea>
        </div>
    )
}

export default ChatList