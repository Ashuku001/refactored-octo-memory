'use client'
import { ResizableUI } from "@/components/ui/ResizableUI"
import {OverviewSideBar, AdTemplateOverviewProps} from './OverviewSideBar';
import { ChatRoom } from "@/components/chat/ChatRoom";
import { useChatHook } from "@/hooks/useChatHooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XIcon } from "lucide-react";
import { TipTool } from "@/components/ui/TipTool";


function AdTemplateOverview({adTemplate}: AdTemplateOverviewProps) {
  const [ data, onClose] = useChatHook((state) => [state.data, state.onClose])
  return (
    <ResizableUI
      sidebar={
        <ScrollArea className='h-full '>
          <OverviewSideBar adTemplate={adTemplate}/>
        </ScrollArea>}
      content={(data?.customerId && data?.chatId) ?
        <div className="h-full relative">
          <TipTool
              sideOffset={1}
              tip='Close chat'
              onClick={onClose}
              className="absolute z-10 right-2 top-1.5 dark:bg-black bg-white rounded-full p-2"
          >
            <XIcon   size="20"/>
            <span className="sr-only" >Close chat</span>
          </TipTool>
          <ChatRoom className="h-[100%]" chatId={data?.chatId} customerId={data?.customerId}/> 
        </div>
        : undefined}
    />
  )
}

export default AdTemplateOverview
