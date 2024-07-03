'use client'
import toast from 'react-hot-toast';
import Link from "next/link"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import TimeAgo from "react-timeago"

import { MessageAddedDocument, LastMessageDocument } from "@/graphql"
import { ChatType } from "@/types"
import LastMessage from './lastMessage/LastMessage'
import Status from './Status'
import { AlertCircleIcon } from 'lucide-react';

type Props = {
    chat: ChatType
    activeChat: [number, Dispatch<SetStateAction<number>>]
}

function ChatComponent({ chat, activeChat }: Props) {
    const [isMounted, setIsMounted] = useState(false)
    let [isOpen, setIsOpen] = activeChat
    const { data, subscribeToMore } = useSuspenseQuery(
        LastMessageDocument,
        { variables: { chatId: (chat?.id as number) } })

    const lastMessage = data?.lastMessage

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const subscribeNewLastMessage = () => {
            subscribeToMore({
                document: MessageAddedDocument,
                variables: { chatId: (chat?.id as number) },
                updateQuery: (prev, { subscriptionData }) => {
                    if(prev?.lastMessage?.id === subscriptionData.data.messageAdded?.message?.id) return prev
                    if (!subscriptionData.data)
                        return prev

                    let newLastmessage = subscriptionData.data.messageAdded?.message
                    if (newLastmessage?.from_customer === true){
                        toast(newLastmessage?.text?.body ?? 
                            newLastmessage?.image?.caption ?? 
                            newLastmessage?.document?.filename ??
                            newLastmessage?.video?.caption ?? "New message received",
                            {
                                position: 'top-right',
                                icon: <AlertCircleIcon className="h-8 w-8 text-green-500"/>
                            })
                    }
                    newLastmessage ={
                        context :  null, 
                        document :  null, 
                        image :  null, 
                        interactive :  null, 
                        isAd :  null, 
                        mesBtnReply: null, 
                        mesListReply: null, 
                        mesTempReply:  null, 
                        messageAd:  null, 
                        messageId:  null, 
                        status :  null, 
                        video :  null,
                        ...subscriptionData.data.messageAdded?.message,
                      }

                    if (newLastmessage) {
                        const result = Object.assign({}, prev, {
                            lastMessage: {
                                text: newLastmessage?.text?.body,
                                createdAt: newLastmessage?.createdAt,
                            }
                        });
                        return result
                    } else {
                        return prev
                    }
                }
            })
        }
        subscribeNewLastMessage()
        setIsOpen(parseInt(localStorage.getItem('activeChat') as string))
    }, [chat?.id, setIsOpen, subscribeToMore])

    if(!isMounted){
        return null
    }

    return (
        <Link
            href={`/chats/${chat?.id}/${chat?.customer.id}`}
            className={`chatboxhover:bg-gray-400 cursor-pointer w-full h-20 `}
            onClick={(e) => {
                localStorage.setItem('activeChat', `${chat?.id}` || '')
                setIsOpen(parseInt(localStorage.getItem('activeChat') as string))
            }}
        >
            <div className={`flex items-center w-full hover:bg-muted/80 dark:hover:bg-muted/50 ${chat?.id! < 0 ? 'bg-red-200' : ''} ${chat?.id === isOpen ? 'bg-muted dark:bg-muted/70' : ''} h-18`}>
                <div className="p-3 w-[20%]">
                    <Image
                        src={'/profile.jpg'}
                        height={40}
                        width={40}
                        alt='P'
                    />
                </div>
                <div className="flex justify-between flex-1 flex-col w-[80%]" >
                    <div className="flex  justify-start items-start h-6">
                        <h3 className="text-md font-sans font-normal line-clamp-1">
                            <p className=' font-sans text-base capitalize'>{chat?.customer?.first_name || chat?.customer?.last_name
                                ? `${chat?.customer?.first_name} ${"   "}  ${chat?.customer?.last_name}`
                                : chat?.customer?.phone_number
                            }
                            </p>
                        </h3>
                        <TimeAgo className="text-[0.80rem] font-sans text-slate-500 font-light  line-clamp-1 ml-auto w-20" date={new Date(lastMessage?.createdAt)} />
                    </div>
                    <div className="last-message flex items-center space-x-2">
                        {!lastMessage?.from_customer &&
                            <Status status={lastMessage?.status} />
                        }
                        <LastMessage lastMessage={lastMessage} />
                    </div>
                </div>

            </div>
            <hr className="w-[85%] float-right bg-gray-800 dark:bg-gray-400"></hr>
        </Link>
    )
}

export default ChatComponent