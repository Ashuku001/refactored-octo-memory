import { FormattedInteractiveButtonData } from "@/types"


export const getInteractiveButtonObj = (data: FormattedInteractiveButtonData, productId=null) => {
  
  let tempVariables = {
    type: "BUTTON",
    button: {
      productId: productId,
      body: '',
      action: 'BUTTON_REPLY',
    }
  }
  
  let template = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "",
    type: "interactive",
    interactive: {}
  }

  let interactive: any = {
    type: "button",
    body: {
      text: "",
    },
    action: {
      buttons: [],
    },
  }

  if(data?.header){
    let header
    if(data.header.type === 'TEXT'){
      tempVariables.button['header'] = "TEXT"
      tempVariables.button['btnTextHead']  = {
        body: data.header.text
      }
      header = {
        type: 'text',
        text: data.header.text
      }
    } else if (data.header.type === 'IMAGE'){
      tempVariables.button['header'] = "IMAGE"
      tempVariables.button['btnImageHead']  = {
        link: data.header.link
      }
      header = {
        type: 'image',
        image: {
          link: data.header.link
        }
      }
    } else if (data.header.type === 'DOCUMENT'){
      tempVariables.button['header'] = "DOCUMENT"
      tempVariables.button['btnDocumentHead']  = {
        link: data.header.link,
        filename: data.header.filename,
        fileType: data.header.type
      }
      header = {
        type: 'document',
        document: {
          link: data.header.link,
          filename: data.header.filename,
        }
      }
    } else if (data.header.type === 'VIDEO'){
      tempVariables.button['header'] = "VIDEO"
      tempVariables.button['btnVideoHead']  = {
        link: data.header.link
      }
      header = {
        type: 'video',
        video: {
          link: data.header.link
        }
      }
    }
    interactive['header'] = header
  }

  if(data?.body && data?.body?.text.length > 0) {
    interactive.body.text = data?.body?.text
    tempVariables.button['body'] = data?.body?.text
  }

  if(data?.footer && data?.footer?.text.length > 0) {
    tempVariables.button['footer'] = data?.footer?.text
    interactive['footer'] = {
      text: data?.footer?.text
    }
  }

  if(data?.buttons?.length > 0) {
    interactive.action.buttons = data?.buttons
    let buttons = []
    data?.buttons?.map((btn) => {
      buttons.push({
        buttonId: btn.reply.id,
        title: btn.reply.title
      })
    })
    tempVariables.button['buttons'] = buttons
  }

  template.interactive = interactive

  return {template, tempVariables}
}
