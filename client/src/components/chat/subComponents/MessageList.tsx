'use client'
import MessageComponent from "@/components/chat/subComponents/MessageComponent"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GetChatDocument, MessageAddedDocument } from "@/graphql"
import { skipToken } from "@apollo/client"
import { useEffect, useState, useRef } from "react"
import { useReactiveVar } from "@apollo/client"
import { reactiveChatId } from "@/cache/cache"
import { InteractiveListPreview } from "@/components/MessagePopover/InteractiveListPreview"
import { useMessageStore } from "@/store/MessagesStore"
import { ProductsModal } from "@/components/modals/ProductModal"
import { ScrollArea } from "@/components/ui/scroll-area"
type Props = {
  id: number
}

function MessageList({ id }: Props) {
  const unRead = useRef<HTMLDivElement>(null)
  // const contexed = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const endOfList = useRef<HTMLDivElement>(null)
  //@ts-ignore
  const [listSections] = useMessageStore((state) => [state.sections])

  // when a new chat is created cause a rerender of this component
  let tempId = useReactiveVar(reactiveChatId)

  const [chatId, setChatId] = useState(id);

  let messages = undefined;

  const { data, subscribeToMore } = useSuspenseQuery(
    GetChatDocument,
    (chatId && chatId > 1) ? { variables: { chatId: (chatId as number) } } : skipToken);
  messages = data?.chat?.messages


  useEffect(() => {
    const subscribeToNewMessages = () => {
      // subscribeToMore({
      //   document: MessageAddedDocument,
      //   variables: { chatId: chatId },
      //   updateQuery: (prev, { subscriptionData }) => {
      //     if (!subscriptionData.data  || (prev?.chat && !prev?.chat?.messages?.length) || prev?.chat?.messages?.pop().id === subscriptionData.data.messageAdded?.message?.id) {
      //       return prev;
      //     }
      //     const newMessage = subscriptionData.data.messageAdded?.message
      //     if (newMessage) {
      //       if (!prev?.chat?.messages?.find((msg) => msg?.id === newMessage?.id)) {
      //         return Object.assign({}, prev, {
      //           chat: {
      //             messages: [...prev?.chat?.messages!, newMessage],
      //           }
      //         });
      //       } 
      //     } else {
      //       return prev
      //     }
      //   }
      // })
    }
    subscribeToNewMessages()


    const activeChat = localStorage.getItem('activeChat')
    // id from props
    if (id > 0 && id !== undefined) {
      setChatId(id)
    } else if (activeChat) {
      setChatId(parseInt(activeChat as string))
    } else {
      // the new chat id
      setChatId(tempId)
    }

    if (messages?.length) {
      if (unRead.current)
        unRead.current?.scrollIntoView({
          behavior: "smooth",
          block: "end"
        })
    }
    if (endOfList.current)
      endOfList.current?.scrollIntoView({
        behavior: "auto",
        block: "end"
      })

    return () => {
      setChatId(-100)
    }
  }, [chatId, id, tempId, messages, subscribeToMore])


  return (
    <div ref={list} className=" h-full max-h-full overflow-hidden">
      <ScrollArea className='h-full px-2 md:px-6 lg:px-10 '>
        <InteractiveListPreview 
          title={"Your interactive list message."} 
          description={"Here is detail of how may people have interacted with your list message."} 
          sections={listSections}
        />
        <ProductsModal/>
        {messages?.map((message) => (
            <MessageComponent key={message?.id} message={message} unRead={unRead} list={list} />
        ))}
        {!unRead.current &&
          <div ref={endOfList}></div>}
      </ScrollArea>
    </div>
  )
}

export default MessageList
