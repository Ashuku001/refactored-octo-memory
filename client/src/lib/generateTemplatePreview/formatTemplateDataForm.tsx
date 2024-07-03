import { componentIndex } from "./tempalatePreviewObject"
import { Models } from "appwrite"

interface DataObj {
    [key: string]: string
}

type Props = {
    data: DataObj;
    fileObj: Models.File | null;
    templateVariables: any;
    templateData: any;
    fileUrl: string | undefined;
    messageRef: string
}

export const formatTemplateDataForm = ({data, fileObj, templateVariables, templateData, fileUrl, messageRef}: Props) => {
  let newTemplateVariables = templateVariables?.template?.buttons?.length ? templateVariables : undefined // when a message has buttons
  let messageVariables: {[key: string]: any } | undefined = undefined // message has no buttons
  let newTemplateData = templateData // for whatsapp API
  let headerIndex = -1
  if(newTemplateVariables){
    if(messageRef){
      newTemplateVariables = {
        ...newTemplateVariables,
        template: {
          ...newTemplateVariables.template,
          body: messageRef
        }
      }
    }
  }

  if(newTemplateData){
    if (data.imageUrl) {
      headerIndex = componentIndex(newTemplateData, 'header')
      const parIndex = newTemplateData.template.components[headerIndex].parameters.findIndex((parameter: {[key: string]: any}) => parameter.type === 'image')
      newTemplateData.template.components[headerIndex].parameters[parIndex].image.link = fileUrl

      if(newTemplateVariables ){
        newTemplateVariables = {
          ...newTemplateVariables,
          template:  {
            ...newTemplateVariables.template,
            tempImageHead: {link: fileUrl}
          }
        }
      } else {
        messageVariables = {
          url: fileUrl,
          caption: messageRef
        }
      }

    } else if (data.headerText) {
      headerIndex = componentIndex(newTemplateData, 'header')
      console.log("this is a", newTemplateData.template.components[headerIndex])
      const parIndex = newTemplateData.template.components[headerIndex].parameters.findIndex((parameter: {[key: string]: any}) => parameter.type === 'text')
      newTemplateData.template.components[headerIndex].parameters[parIndex].text = data.headerText

      if(newTemplateVariables ){
        newTemplateVariables = {
          ...newTemplateVariables,
          template:  {
            ...newTemplateVariables.template,
            tempTextHead: {body: data.headerText}
          }
        }
      }
    
    } else if (data.documentUrl) {
      console.log("FILE documentTO BE UPLOADED", fileObj, fileObj?.name, fileObj?.mimeType)

      headerIndex = componentIndex(newTemplateData, 'header')
      const parIndex = newTemplateData.template.components[headerIndex].parameters.findIndex((parameter: {[key: string]: any}) => parameter.type === 'document')
      newTemplateData.template.components[headerIndex].parameters[parIndex].document.link = fileUrl
      newTemplateData.template.components[headerIndex].parameters[parIndex].document.filename = fileObj?.name

      if(newTemplateVariables ){
        newTemplateVariables = {
          ...newTemplateVariables,
          template:  {
            ...newTemplateVariables.template,
            tempDocumentHead: {
              link: fileUrl,
              filename: fileObj?.name,
              //@ts-ignore
              mimeType: fileObj?.type
            }
          }  
        }
      }  else {
        messageVariables = {
          url: fileUrl,
          caption: messageRef,
          filename: fileObj?.name,
          //@ts-ignore
          mimeType: fileObj?.type
        }
      }

    } else if (data.videoUrl) {
      console.log("FILE video TO BE UPLOADED", fileObj)
      
      headerIndex = componentIndex(newTemplateData, 'header')
      const parIndex = newTemplateData.template.components[headerIndex].parameters.findIndex((parameter: {[key: string]: any}) => parameter.type === 'video')
      newTemplateData.template.components[headerIndex].parameters[parIndex].video.link = fileUrl

      if(newTemplateVariables ){
        newTemplateVariables = {...newTemplateVariables, 
            template:  {
              ...newTemplateVariables.template,
              tempVideoHead: {
                link: fileUrl,
              }
            }
          } 
          
      } else {
        messageVariables = {
          url: fileUrl,
          caption: messageRef
        }
      }
    } else {
      // for template that are only body messages no header
      if(newTemplateVariables ){
        newTemplateVariables = {...newTemplateVariables, 
            template:  {
              ...newTemplateVariables.template,
              text: {
                body: messageRef,
              }
            }
          } 
          
      } else {
        messageVariables = {
          body: messageRef
        }
      }
    }

    const bodyIndex = componentIndex(newTemplateData, 'body')
    let count = 0
    if (bodyIndex >= 0) {
      for (let i = 0; i < newTemplateData.template.components[bodyIndex].parameters.length; i++) {
        // console.log('IN BOdy', i, newTemplateData.template.components[bodyIndex].parameters[i], data[`var${i}`])
        count += 1
        console.log('HEADER',headerIndex)
          newTemplateData.template.components[bodyIndex].parameters[i].text = data[`var${i}`]
      }
      
    }

    // Include dynamic buttons later
    const buttonsIndex = componentIndex(newTemplateData, 'button')
    if (buttonsIndex >= 0) {
      let newButtons = templateVariables?.template?.buttons
      for (let i = 0; i < newTemplateData.template.components[buttonsIndex].parameters.length; i++) {
        newTemplateData.template.components[buttonsIndex].parameters[i].text = data[`button${i}`]


        // find index replace the button at that index with the data
        const indexInVar = templateVariables?.template?.buttons?.findIndex((btn: {[key: string]: any}) => btn?.id === `button${i}` )
        newButtons[indexInVar] = {text: data[`button${i}`]} // replace the button with the user input
      }

      newTemplateVariables = {...newTemplateVariables,
          template:  {
            ...newTemplateVariables.template,
            buttons: newButtons
          }
        }
    }
  }
  // console.log(newTemplateData, newTemplateVariables, messageVariables)
  return {newTemplateData, newTemplateVariables, messageVariables}
}