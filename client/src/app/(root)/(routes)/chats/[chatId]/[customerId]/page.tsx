import ChatHeader from "./components/ChatHeader"
import AddMessageChat from "./components/AddMessageChat"
import MessageList from "./components/MessageList"
import { Suspense } from "react"
import LoadingChat from "./components/LoadingSkeletonChat"
import LoadingChatHeader from '@/components/LoadingChatHeader';
import LoadingInput from '@/components/chat/subComponents/LoadingTextInput';

type Props = {
    params: {
        chatId: string;
        customerId: string
    }
}

async function ChatPage({ params: { chatId, customerId } }: Props) {
    
    const content =
        (<div className="bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')]  flex flex-col h-full relative">
            <div className="h-15 bg-[#F0F2F5] dark:bg-slate-800 flex justify-center items-center px-4 py-1 ">
                <Suspense fallback={<LoadingChatHeader />}>
                    <ChatHeader chatId={parseInt(chatId)} customerId={parseInt(customerId)} />
                </Suspense>
            </div>
            <div  className="flex-1 max-h-[78vh] pb-[26px]">
                    <Suspense fallback={<LoadingChat />}>
                        <MessageList id={parseInt(chatId)} />
                    </Suspense>
            </div>
            <div className="w-full h-15 absolute bottom-0 right-0 flex justify-between items-center px-4 py-2 mt-2  space-x-2 bg-slate-100 dark:bg-gray-800">
                <Suspense fallback={<LoadingInput />}>
                    <AddMessageChat initialData={parseInt(chatId)} customerId={parseInt(customerId)} />
                </Suspense>
            </div>
        </div>
        )

    return content
}

export default ChatPage