import { MediaMessageObj } from "@/types"

export const getMediaMessageObj = (type: string) => {
    let mediaMessage: MediaMessageObj =  {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "",
        type: ""
    } as MediaMessageObj

    if (type==='VIDEO') {
        mediaMessage.type = 'video'
        mediaMessage['video'] = {
            link: '',
            caption: '',
        }
    } else if (type==='DOCUMENT') {
        mediaMessage.type = 'document'
        mediaMessage['document'] = {
            link: '',
            caption: '',
            filename: '',
        }
    } else if (type==='IMAGE') {
        mediaMessage.type ='image'
        mediaMessage['image'] = {
            link: '',
            caption: '',
        }
    } else if (type === 'location') {
        mediaMessage.type ='location'
        mediaMessage['location'] = {
            link: '',
            caption: '',
        }
    }

    return mediaMessage
}