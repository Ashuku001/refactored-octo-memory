import { useEffect, RefObject } from 'react'
import { useParams } from 'next/navigation'
import TimeAgo from "react-timeago"
import { MessageType, InteractiveButtonProps } from "@/types"
import TextMes from './Message/TextMes'
import ImageMes from './Message/ImageMes'
import { Check, BarChartIcon } from 'lucide-react';
import { UpdateMessageStatusDocument, GetChatDocument, StatusFragmentDoc } from '@/graphql'
import { useMutation, skipToken } from '@apollo/client'
import DocumentMessage from './Message/DocumentMessage';
import VideoMessage from './Message/VideoMessage';
import { InteractiveMessage, ButtonReplys, MessageFooter } from './Message/InteractiveMessage';
import MessageContext from './MessageContext';
import { ButtonReplied, TemplateReplied } from './Message/ButtonReplyMessage';
import { ListReplied } from './Message/ListReplyMessage';
import { ProductPreview } from '@/components/Message/ProductPreview';
import Status from '../../../components/Status';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

type Props = {
    message: MessageProps;
    unRead: RefObject<HTMLDivElement>;
    list: RefObject<HTMLDivElement>;
}

type MessageProps = {
    interactive: InteractiveButtonProps
    [key: string]: any
}

function MessageComponent({ message, unRead, list }: Props) {
    const params = useParams()
    const type = message?.type
    const [updateMesStatus] = useMutation(UpdateMessageStatusDocument)

    useEffect(() => {
        const checkIsVisible = (element: HTMLDivElement, status) => {
            const rect = element.getBoundingClientRect();
            if (rect.bottom <= window.innerHeight && message.status !== 'read' && message?.from_customer) {
                updateMesStatus({  
                    variables: {
                        id: message.id,
                        messageId: message?.messageId
                    },
                } 
                )
            }
        };

        let listElement = list.current
        if (unRead?.current !== null && message?.from_customer) {
            checkIsVisible(unRead?.current)
        }
        listElement?.addEventListener('scroll', (e) => {
            if (unRead?.current !== null && message?.from_customer)
                checkIsVisible(unRead?.current)
        })

        return () => {
            listElement?.removeEventListener('scroll', () => {
            })
        }
    }, [list, message?.from_customer, message.id, message.messageId, message.status, params.chatId, unRead, updateMesStatus])


    return (
        <div 
            ref={(message?.status !== "read" && message?.from_customer) ? unRead : null} 
            className='my-3 w-full flex flex-row space-x-4 justify-between text-black dark:text-white ' key={message?.id} >
            {message?.from_customer === false &&
            <div className='flex-1 max-w-[40%] flex  items-center justify-center'>  
                {(type === 'INTERACTIVE' && message?.interactive?.button?.product || message?.interactive?.template?.tempProduct ) && 
                    <ProductPreview product={message?.interactive?.button?.product || message?.interactive?.template?.tempProduct} title="Associated Product to this message"/>
                        
                }
                {(message.isAd && message?.messageAd) &&
                <HoverCard>
                    <HoverCardTrigger className='flex space-x-1 justify-center items-center'>
                        <BarChartIcon className={`h-12 w-12  ${message?.messageAd ? "animate-pulse duration-15000 ease-in-out text-green-300": "animate-none"}`}/>
                        <div>
                            <p>{message.messageAd.read}</p>
                            <p>{message.messageAd.delivered}</p>
                            <p>{message.messageAd.sent}</p>
                            <p>{message.messageAd.response}</p>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <div className=''>
                            <h1 className='text-slate-400 text-center'>This is from bulk message with the following impressions</h1>
                            <div className="text-slate-500 flex justify-center space-x-2 items-center">
                                <p>Sent</p>
                                <TimeAgo 
                                    className="text-[0.80rem] font-sans text-slate-500 font-light  line-clamp-1 w-20" 
                                    date={new Date(message?.createdAt)} 
                                />
                            </div>
                            <p className='flex justify-between items-center'><span>Reads</span> {message.messageAd.read ?? "0"}</p>
                            <p className='flex justify-between items-center'><span>Delivered</span> {message.messageAd.delivered ??"0"}</p>
                            <p className='flex justify-between items-center'><span>Sent</span> {message.messageAd.sent ?? "0"}</p>
                            <p className='flex justify-between items-center'><span>Response</span> {message.messageAd.response ?? "0"}</p>
                        </div>
                    </HoverCardContent>
                </HoverCard>}
            </div>
            }
            <div className={`flex flex-col h-fit w-auto max-w-[180px] md:max-w-[350px] lg:max-w-[450px] p-[1px] rounded-lg  ${message?.from_customer ? ' mr-auto' : ' ml-auto '}`}>
                <div className={` p-[1px] rounded-lg ${message?.from_customer ? ' bg-slate-300 dark:bg-slate-800 rounded-tl-none' :  message?.id < 0 ? "dark:bg-green-800/20 bg-green-300/20 rounded-tr-none" : ' dark:bg-green-800 bg-green-300/80 rounded-tr-none'}`}>
                    {message?.context  &&
                        <MessageContext context={message?.context} contextBy={type}/>
                    }
                    <div className={` `}>
                        {type === 'TEXT' && <TextMes text={message?.text?.body} />}
                        {type === 'IMAGE' && <ImageMes image={message?.image} />}
                        {type === 'DOCUMENT' && <DocumentMessage document={message?.document} />}
                        {type === 'VIDEO' && <VideoMessage video={message?.video} />}
                        {type === 'INTERACTIVE' && <InteractiveMessage interactive={message?.interactive} /> }
                        {type === 'BUTTON_REPLY' && <ButtonReplied mesBtnReply={message?.mesBtnReply} /> }
                        {type === 'TEMP_REPLY' && <TemplateReplied mesTempReply={message?.mesTempReply} /> }
                        {type === 'LIST_REPLY' && <ListReplied mesListReply={message?.mesListReply} /> }
                        <div className='flex justify-end items-center space-x-1 px-1'>
                            <p className={`text-[0.65rem] italic text-slate-400 line-clamp-1 ${message?.from_customer ? 'text-left' : 'text-right'}`}>{new Date(message?.createdAt).toLocaleString()}</p>
                            {!message?.from_customer &&
                                <Status status={message?.status} />
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-1'>
                    {type === 'INTERACTIVE' && <ButtonReplys buttons={message?.interactive?.button?.buttons} /> }
                </div>
            </div>
        </div>


    )
}

export default MessageComponent