'use client'
import { useState, useRef } from 'react'
import TemplateTabs from '@/components/template/RemoteTemplateTabs';
import TemplatePreviewForm from './TemplatePreviewForm'
import { SidePanel } from "@/components/ui/SidePanel";
import { useTemplateModal } from '@/hooks/useTemplateModal';
import { useFileStore } from '@/store/FileStore';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';


function TemplatePanel() {
    const [remTemplate, setRemTemplate] = useState({})
    const templateModal = useTemplateModal()

    //@ts-ignore
    const [loadingFile] = useFileStore((state) => [
        state.loadingFile,
    ])

  return (
    <SidePanel
        title="Choose a template to send"
        description="Your active templates"
        isOpen={templateModal.isOpen}
        onClose={loadingFile ? templateModal.onOpen : templateModal.onClose}
        className='flex flex-col w-full lg:w-[70%] h-[620px] fixed bottom-0 mx-2 p-2'
        side='bottomRight'
    >
        <Separator className="my-1 w-80 mx-auto"/>
        <div className='flex flex-col h-[510px]'>
            <div className='flex-1 flex flex-row overflow-hidden '>
                    <div className='w-[32%] h-full '>
                        <TemplateTabs setTemplate={setRemTemplate} template={remTemplate}/>
                        <div className="mb-5"/>
                    </div>
                    <div className='h-full flex-1 px-5'>
                        <h1 className='text-center'>The preview</h1>
                        <ScrollArea className="h-full w-full rounded-md  p-4 bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')]">
                            <TemplatePreviewForm tempObj={remTemplate} />
                            <div className="mb-5"/>
                        </ScrollArea>
                    </div>
            </div>
            <div className='h-[30px] pt-4 flex justify-between items-center'>
                <Button 
                    disabled={loadingFile}
                    onClick={() => templateModal.onClose()} 
                    className=' dark:text-blue-900 dark:hover:bg-blue-200  hover:bg-blue-900 focus:outline-none'>
                {loadingFile ? <LoadingSpinner/> : "Cancel"}
                </Button>
                <Button
                    disabled={loadingFile}
                    type='submit'
                    form="TemplateMesForm"
                    className=' dark:text-blue-900 dark:hover:bg-blue-200  hover:bg-blue-900 focus:outline-none' >
                        {loadingFile ? <LoadingSpinner/> : "Send"}
                </Button>
            </div>
        </div>
    </SidePanel>
  )
}

export default TemplatePanel
