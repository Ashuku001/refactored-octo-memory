
import AddMessageChat from "@/components/chat/subComponents/AddMessageChat"
import MessageList from "@/components/chat/subComponents/MessageList"
import { Suspense} from "react"
import LoadingChat from "@/components/chat/subComponents/LoadingSkeletonChat"
import ChatHeader from '@/components/chat/subComponents/ChatHeader';
import LoadingInput from '@/components/chat/subComponents/LoadingTextInput';
import LoadingChatHeader from '@/components/LoadingChatHeader'
import { cn } from "@/lib/utils";

type ChatRoomProps = {
    chatId: number;
    customerId: number;
    className?: string
}

export function ChatRoom({customerId, chatId, className}: ChatRoomProps) {
    return (
        <>
            <div className={cn(className, "bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')]  flex flex-col relative")}>
                <div className="h-15 bg-[#F0F2F5] dark:bg-slate-800 flex justify-center items-center px-4 py-1 ">
                    <Suspense fallback={<LoadingChatHeader />}>
                        <ChatHeader customerId={customerId} />
                    </Suspense>
                </div>
                <div  className={cn("flex-1 max-h-[75vh]")}>
                        <Suspense fallback={<LoadingChat />}>
                            <MessageList id={chatId} />
                        </Suspense>
                </div>
                <div className="w-full h-15 absolute bottom-0 right-0 flex justify-between items-center px-4 py-2 mt-2  space-x-2 bg-slate-100 dark:bg-gray-800">
                    <Suspense fallback={<LoadingInput />}>
                        <AddMessageChat initialData={chatId} customerId={customerId} />
                    </Suspense>
                </div>
            </div>
            
        </>
    )
}
