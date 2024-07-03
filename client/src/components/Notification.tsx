"use client"
import { useEffect } from "react"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LastMessageDocument, MessageAddedDocument } from '@/graphql';
import { AlertCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { BellRingIcon } from "lucide-react";

export const MessageNotification = () => {
    const chatId = 223
    const { data, subscribeToMore } = useSuspenseQuery(
        LastMessageDocument,
        { variables: { chatId: (223) } })

    useEffect(() => {
        const subscribeNewLastMessage = () => {
            // subscribeToMore({
            //     document: MessageAddedDocument,
            //     variables: { chatId: (chatId as number) },
            //     updateQuery: (prev, { subscriptionData }) => {
            //         if(prev?.lastMessage?.id === subscriptionData.data.messageAdded?.message?.id) return prev
            //         if (!subscriptionData.data)
            //             return prev

            //         const newLastmessage = subscriptionData.data.messageAdded?.message
            //         if (newLastmessage?.from_customer === true){
            //             toast(newLastmessage?.text?.body!,
            //                 {
            //                     position: 'top-right',
            //                     icon: <AlertCircleIcon className="h-8 w-8 text-green-500"/>
            //                 })
            //         }

            //         if (newLastmessage) {
            //             const result = Object.assign({}, prev, {
            //                 lastMessage: {
            //                     text: newLastmessage?.text?.body,
            //                     createdAt: newLastmessage?.createdAt,
            //                 }
            //             });
            //             return result
            //         } else {
            //             return prev
            //         }
            //     }
            // })
        }
        subscribeNewLastMessage()
    }, [chatId, subscribeToMore])

    return (
        <div>
            <BellRingIcon size="20"/>
        </div>
    )
}