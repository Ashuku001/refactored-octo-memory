'use client'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { ChatAction } from '../ChatAction'
import { useTemplateModal } from '@/hooks/useTemplateModal'
import { LayoutTemplateIcon, SmilePlusIcon } from 'lucide-react';
import { TipTool } from '@/components/ui/TipTool';
  

type Props = {
    loading: boolean;
    textInput: string;
    setTextInput: Dispatch<SetStateAction<string>>
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}


function AddMessage({  handleSubmit, loading, textInput, setTextInput }: Props) {
    const templateModal = useTemplateModal()

    return (
        <>
            <div className="flex justify-between items-center space-x-2">
                <TipTool
                    sideOffset={1}
                    tip="Add emoticon"
                    onClick={() => {} }
                >
                    <SmilePlusIcon className='h-8 w-8 text-slate-400'/>
                </TipTool>
                <TipTool
                    sideOffset={1}
                    tip='Send a Template'
                    onClick={() => templateModal.onOpen()}
                >
                   <LayoutTemplateIcon className='h-8 w-8 text-slate-400'/>
                </TipTool>
                <ChatAction/>
            </div>
            <form className="flex w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    disabled={loading}
                    placeholder="Type a message"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto"
                />
                <button
                    disabled={!textInput && !loading}
                    type="submit"
                    className='bg-slate-300 dark:bg-gray-500 rounded-lg px-4 py-2 outline-none -ml-5 rounded-l-none'
                >
                    Send
                </button>
            </form>
        </>
    )
}

export default AddMessage