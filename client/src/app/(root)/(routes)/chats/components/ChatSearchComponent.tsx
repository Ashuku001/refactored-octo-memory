'use client'
import Link from "next/link"
import Image from "next/image"
import { MessageAddedDocument, LastMessageDocument } from "@/graphql"
import { useEffect } from "react"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import TimeAgo from "react-timeago"
import { ChatType } from "@/types"
import toast from 'react-hot-toast';

type Props = {
    chat: ChatType,
}

function ChatSearchComponent({ chat }: Props) {
    const { data, subscribeToMore } = useSuspenseQuery(
        LastMessageDocument,
        { variables: { chatId: (chat?.id as number) } })

    const lastMessage = data?.lastMessage

    useEffect(() => {
        const subscribeNewLastMessage = () => {
            // subscribeToMore({
            //     document: MessageAddedDocument,
            //     variables: { chatId: (chat?.id as number) },
            //     updateQuery: (prev, { subscriptionData }) => {
            //         if (!subscriptionData.data)
            //             return prev

            //         const newLastmessage = subscriptionData.data.messageAdded?.message
            //         if (newLastmessage?.from_customer === true)
            //             toast(newLastmessage?.text)

            //         if (newLastmessage) {
            //             return  Object.assign({}, prev, {
            //                 lastMessage: {
            //                     text: newLastmessage?.text,
            //                     createdAt: newLastmessage?.createdAt,
            //                     chat: {
            //                         id: chat?.id
            //                     }
            //                 }
            //             });
            //         } else {
            //             return prev
            //         }
            //     }
            // })
        }
        subscribeNewLastMessage()
    }, [chat?.id, subscribeToMore])

    return (
        <Link
            href={`/chats/${chat?.id}`}
            className={`cursor-pointer w-full `}
            onClick={(e) => {
            }}
        >
            <div className={`flex items-center w-full hover:bg-gray-200 dark:hover:bg-gray-700 ${chat?.id! < 0 ? 'bg-red' : ''} `}>
                <div className="p-3">
                    <Image
                        src={'/profile.jpg'}
                        height={40}
                        width={40}
                        alt='P'
                    />
                </div>
                <div className="flex justify-between flex-1 flex-col" >
                    <div className="chat-name flex  justify-start items-start  h-6">
                        <h3 className="text-md font-sans font-normal line-clamp-1">
                            <p className=' font-sans text-base capitalize'>{chat?.customer?.first_name || chat?.customer?.last_name
                                ? `${chat?.customer?.first_name} ${"   "}  ${chat?.customer?.last_name}`
                                : chat?.customer?.phone_number
                            }
                            </p>
                        </h3>
                        <TimeAgo className="text-[0.80rem] font-sans text-gray-500 font-light  line-clamp-1 ml-auto w-20" date={new Date(lastMessage?.createdAt)} />

                    </div>
                    <div className="last-message">
                        <p className="text-md text-left text-gray-500 font-sans font-normal line-clamp-1 w-[80%] h-6">{lastMessage?.text?.body}</p>
                    </div>
                </div>
            </div>
            <hr className="w-[85%] float-right bg-gray-800 dark:bg-gray-400"></hr>
        </Link>
    )
}

export default ChatSearchComponent