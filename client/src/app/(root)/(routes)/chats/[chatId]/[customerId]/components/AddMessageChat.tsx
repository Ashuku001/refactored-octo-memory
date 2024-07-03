'use client'
import AddMessage from './AddMessageChat/AddMessage'
import AddChat from './AddMessageChat/AddChat'
import TemplatePanel from './SendTemplate/TemplatePanel'

import { FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { AddTextMessageDocument, GetChatDocument } from '@/graphql'
import { getTextMessageObj } from '@/lib/generateTemplatePreview/textMessageObj'
import toast from 'react-hot-toast'

type Props = {
    initialData: number;
    customerId: number
}


function AddMessageChat({ initialData, customerId }: Props) {
    const [textInput, setTextInput] = useState('')
    const chatId = initialData

    const [addTextMessage, { loading, error, data }] = useMutation(AddTextMessageDocument)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let tempData = getTextMessageObj()
        tempData.text.body = textInput
        addTextMessage({
            variables: {
                message: {
                    message: {
                        chatId: chatId,
                        from_customer: false,
                        type: "TEXT",
                        timestamp: new Date()
                    },
                    text: {
                        body: textInput
                    }
                },
                template: JSON.stringify(tempData)
            },
            optimisticResponse: {
                addTextMessage: {
                    id: Math.round(Math.random() * -1000000),
                    from_customer: false,
                    text: {
                        __typename: "TextMessage",
                        body: textInput
                    },
                    timestamp: new Date(),
                    createdAt: new Date(),
                    type: "TEXT",
                    hasContext: false,
                    chat: {
                        __typename: "Chat",
                        id: chatId,
                    },
                    __typename: "Message"
                }
            },
            // @ts-ignore
            update: (store, { data: { addTextMessage } }) => {
                let data = store.readQuery({query: GetChatDocument, variables: {chatId: chatId} });
                console.log(addTextMessage)
                const newMessage = {...addTextMessage,
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
                    video :  null,}
                if(data?.chat?.messages?.slice(-1)[0]?.id !== addTextMessage.id && addTextMessage?.from_customer === false){
                    data = {...data, chat: {
                        ...data?.chat,
                        messages: [...data?.chat?.messages!, newMessage]
                    }}
                    // store.writeQuery({ query: GetChatDocument, data, variables: {chatId: chatId} });
                }
                store.writeQuery({ query: GetChatDocument, data, variables: {chatId: chatId} })
              },
        })
        setTextInput("")
        if (error) {
            toast.error("Something went wrong.")
        }

    }

    return (
        <>
            <TemplatePanel />
            {initialData
                ? <AddMessage handleSubmit={handleSubmit} loading={loading} textInput={textInput} setTextInput={setTextInput} />
                : (customerId && customerId > 0) &&
                <AddChat id={customerId} />

            }
        </>
    )
}

export default AddMessageChat

