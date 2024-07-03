import Image from "next/image"
import { ProductPreview } from "@/components/Message/ProductPreview"

type InteractiveProps = {
    interactive: any
    contextBy?: string
}
export const InteractiveContext = ({interactive, contextBy}: InteractiveProps)  => {

  return (
    <> 
        {(contextBy !== 'BUTTON_REPLY'  && contextBy !==  'TEMP_REPLY') &&
            <ProductPreview product={interactive?.button?.product || interactive?.template?.tempProduct} title="Inquring About product"/>
        }
        {interactive.type === 'BUTTON' &&
            <InteractiveButtonMessage button={interactive.button} contextBy={contextBy}/>
        }
        {interactive.type === 'TEMPLATE' &&
            <InteractiveTemplateMessage template={interactive.button}  contextBy={contextBy}/>
        }
    </>
  )
}

type InteractiveButtonProps = {
    contextBy?: string;
    button: {
        header: string;
        image: ImageHeaderType;
        body: string;
        product: {
            name: string;
            price: string;
        }
    }
}

function InteractiveButtonMessage({button, contextBy}: InteractiveButtonProps) {
  return (
    <div>
        {button?.header === 'IMAGE' &&
            <MessageHeader image={button?.image}/>
        }
        {(contextBy !== 'BUTTON_REPLY'  && contextBy !==  'TEMP_REPLY') && 
            <MessageBody body={button?.body} />
        }
    </div>
  )
}

type TemplateProps = {
    contextBy?: string;
    template: {
        header: string;
        image: ImageHeaderType;
        body: string;
        product: {
            name: string;
            price: string;
        }
    }
}

function InteractiveTemplateMessage({template, contextBy}: TemplateProps) {
  return (
    <div>
        {template?.header === 'IMAGE' &&
            <MessageHeader image={template?.image}/>
        }
        {(contextBy !== 'BUTTON_REPLY'  && contextBy !==  'TEMP_REPLY') && 
            <MessageBody body={template?.body} />
        }
    </div>
  )
}

type ImageHeaderType = {link: string} 
type TextHeaderType = {text: string} 
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
