import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ListIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useListMessagePopover } from "@/hooks/useListMessage"
import { ListSectionsType, InteractiveListProps, ListRowType, ProductType, StoreType } from "@/types"
import { InteractiveListPreview } from '@/components/MessagePopover/InteractiveListPreview';
import { useListMessagePreviewModal } from '@/hooks/useListMessagePreview';
import { useMessageStore } from '@/store/MessagesStore';


type InteractiveProps = {
    interactive: any
}
export const InteractiveMessage = ({interactive}: InteractiveProps)  => {

  return (
    <>
    {interactive?.type === 'BUTTON' &&
        <InteractiveButtonMessage button={interactive.button}/>
    }
    {interactive?.type === 'TEMPLATE' &&
        <InteractiveTemplateMessage template={interactive.template}/>
    }
    {interactive?.type === 'LIST' &&
        <InteractiveListMessage list={interactive.list}/>
    }
    </>
  )
}


type InteractiveButtonProps = {
    button: {
        header: string;
        btnImageHead: ImageHeaderType;
        btnTextHead: TextHeaderType;
        body: string;
        buttons: ButtonReplyType[];
        footer: string;
        buttonReplys: any
    }
}

function InteractiveButtonMessage({button}: InteractiveButtonProps) {
  return (
    <div>
        {button?.header === 'IMAGE' &&
            <MessageHeader image={button?.btnImageHead}/>
        }
        {button?.header === 'TEXT' &&
            <MessageHeader text={button?.btnTextHead}/>
        }
        <MessageBody body={button?.body} />
        <MessageFooter footer={button?.footer} />
    </div>
  )
}

type InteractiveTemplateProps = {
    button: {
        header: string;
        tempImageHead: ImageHeaderType;
        tempTextHead: TextHeaderType;
        body: string;
        buttons: QuickReplyType[];
        footer: string;
    }
}

type QuickReplyType = {
    text: string
}

function InteractiveTemplateMessage({template}: InteractiveTemplateProps) {
  return (
    <div>
        {template?.header === 'IMAGE' &&
            <MessageHeader image={template?.tempImageHead}/>
        }
        {template?.header === 'TEXT' &&
            <MessageHeader text={template?.tempTextHead}/>
        }
        <MessageBody body={template?.body} />
        <MessageFooter footer={template?.footer} />
        <MessageQuickReplyBtn buttons={template?.buttons} />
    </div>
  )
}


function InteractiveListMessage({list}: InteractiveListProps) {
    const listPreview = useListMessagePreviewModal()
    const [setListMessageSections] = useMessageStore((state) => [state.setListMessageSections])
    
    return (
      <div>
          {list?.header === 'TEXT' &&
              <MessageHeader text={list?.listTextHead}/>
          }
          <MessageBody body={list?.body} />
          <MessageFooter footer={list?.footer} />
          <Separator className="mb-2"/>
          <Button 
            className="w-full flex space-x-2 text-blue-900  dark:text-blue-300 rounded-none font-semibold text-20 text-center" 
            variant={'ghost'}
            onClick={() => {
                setListMessageSections(list.sections)
                listPreview.onOpen()
            }}
        >
            <ListIcon className="h-8 w-8"/>
            <span>
                {list.button}
            </span>
        </Button>
      </div>
    )
}

type ImageHeaderType = {link: string} 
type TextHeaderType = {body: string} 
type DocumentHeaderType = {
    link: string;
    filename: string;
    mimeType: string;
} 
type MessageHeaderProps = {
    image?: ImageHeaderType | null
    text?: TextHeaderType | null
    video?: {link: string} | null
    document?: DocumentHeaderType | null
}

export const MessageHeader = ({image, text, video, document}: MessageHeaderProps) => {
    return (
        <div>
            {image &&
            <Image
            alt="Img"
            height={100}
            width={200}
            src={image?.link}
            className="object-cover rounded-md h-full  w-full"
            />
            }
            {text && <p className="p-1 break-words font-bold">{text.body}</p>}
        </div>
    )
}

type MessageBodyProps = {
    body: string
}

export const MessageBody = ({body}: MessageBodyProps) => {
    return (
        <p className="p-1 break-words w-full">
            {body}
        </p>
    )
}

type MessageFooterPropst = {
    footer: string
}

export const MessageFooter = ({footer}: MessageFooterPropst) =>{
    return (
        <p className="text-left text-[14px] text-slate-400 p-1 line-clamp-1">
            {footer}
        </p>
    )
}

type ButtonReplyType = {
    buttonId: string;
    title: string;
}

type ButtonReplysProps = {
    buttons: [ButtonReplyType] | []
}

export const ButtonReplys = ({buttons}: ButtonReplysProps) => {
    return (
    // @ts-ignore
    <div className={`flex ${(buttons?.length == 2) ? "items-center justify-between space-x-2" : "flex-col space-y-1"}`}>
        {buttons?.map((btn) => 
            <button
                key={btn?.buttonId} disabled
                className="text-center text-blue-900 dark:text-blue-300  w-full dark:bg-green-800 bg-green-300/80 rounded-lg px-4 py-1 drop-shadow-lg"
            >
                {btn?.title}
            </button>
        )}
    </div>
    )
}

export const MessageQuickReplyBtn = ({buttons}: QuickReply) => {
    return(
        buttons?.map((button, i) =>
            <button key={i} disabled className='w-full p-2 border-t-1'>
                {button.text}
            </button>
        )
    )
}