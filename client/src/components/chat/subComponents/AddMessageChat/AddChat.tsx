'use client'
import { FormEvent, useEffect, useState } from "react"
import { AddTextMessageDocument } from "@/graphql"
import { useMutation, } from "@apollo/client"
import { useRouter, useParams } from "next/navigation"
import secureLocalStorage from 'react-secure-storage'
import { useTemplateModal } from '@/hooks/useTemplateModal';
import { TipTool } from '@/components/ui/TipTool';
import { LayoutTemplateIcon, SmilePlusIcon } from 'lucide-react';
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"

type Props = {
    id: number
}

function AddChat({ id }: Props) {
    const [customerId, setCustomerId] = useState(id)
    const [prevNewChatId, setChatId] = useState(-100)
    const [textInput, setTextInput] = useState('')
    const [addTextMessage, { loading, error: addMesError, data: addMesData }] = useMutation(AddTextMessageDocument)
    const merchantId = parseInt(secureLocalStorage.getItem('merchantId') as string)
    const templateModal = useTemplateModal()
    const router = useRouter()
    const params = useParams()


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (customerId && customerId > 0) {
            addTextMessage({
                variables: {
                    message: {
                        message: {
                            chatId: undefined,
                            from_customer: false,
                            type: "TEXT",
                            timestamp: new Date()
                        },
                        text: {
                            body: textInput
                        }
                    },
                    customerId: customerId
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
                        chat: {
                            __typename: "Chat",
                            id: (addMesData?.addTextMessage?.chat?.id as number),
                        },
                        __typename: "Message"
                    }

                },

            }).then(() => {
                setTextInput("")
            })
        }
    }

    useEffect(() => {
        setCustomerId(id || -100)
        if (addMesData?.addTextMessage?.chat?.id && addMesData?.addTextMessage?.chat.id !== prevNewChatId) {
            setChatId(addMesData?.addTextMessage?.chat.id as number)
            localStorage.setItem('activeChat', addMesData?.addTextMessage?.chat?.id.toString())
            // reactiveChatId(addMesData?.addTextMessage?.chat.id)
            router.push(`/chats/${addMesData?.addTextMessage?.chat?.id}/${params.customerId}`)
        }

    }, [id, customerId, addMesData, prevNewChatId, router, params.customerId])

    if (addMesError) {
        toast.error("Something went wrong.")
    }

    return (
        <>
            <div className="flex justify-between items-center space-x-2">
                <TipTool 
                    tip="Add emoticon"
                    onClick={() => {} }
                >
                    <SmilePlusIcon className='h-8 w-8 text-slate-400'/>
                </TipTool>
                <TipTool 
                    tip='Send a Template'
                    onClick={() => templateModal.onOpen()}
                >
                   <LayoutTemplateIcon className='h-8 w-8 text-slate-400'/>
                </TipTool>
            </div>
            <form className="flex w-full" onSubmit={handleSubmit}>
                <input
                    disabled={loading}
                    type="text"
                    placeholder={`Type a message ${customerId}`}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto"
                />
                <Button
                    disabled={!textInput || loading}
                    type="submit"
                    className=' dark:text-blue-900 dark:hover:bg-blue-200  hover:bg-blue-900 focus:outline-none'
                >
                    Send
                </Button>
            </form>
        </>
    )
}

export default AddChat