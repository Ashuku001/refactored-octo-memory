import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from 'next/navigation'
import { PhoneIcon, Globe2Icon, ArrowUpLeftIcon } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'

import TemplatePreview from "@/components/template/TemplatePreview"
import { RemoteTemplateObj, File } from '@/types';
import { AddImageMessageDocument, AddTextMessageDocument, GetChatDocument, AddDocumentMessageDocument, AddVideoMessageDocument, AddInteractiveTemplateMessageDocument } from '@/graphql'

import { useTemplateModal } from '@/hooks/useTemplateModal';
import { Models } from 'appwrite';
import { useFileStore } from '@/store/FileStore';
import { uploadFile } from '@/lib/appwrite/uploadFile';
import { useInteractiveTemplateStore } from '@/store/InteractiveTemplateStore';
import { formatTemplateDataForm } from '@/lib/generateTemplatePreview/formatTemplateDataForm';

type PreviewFormProps = {
  tempObj: RemoteTemplateObj,
}

interface IconsType {
  [key: string]: any
}

interface BodyInputsState {
  [key: string]: any;
}

const icons: IconsType = { PHONE_NUMBER: <PhoneIcon className='h-4 w-4 mr-2' />, URL: <Globe2Icon className='h-4 w-4 mr-2' />, QUICK_REPLY: <ArrowUpLeftIcon className="h-4 w-4 mr-2"/> }

const TemplatePreviewForm = ({ tempObj }: PreviewFormProps) => {
  const [previewUi, setPreviewUI] = useState({})
  const [fileObj, setFileObj] = useState<Models.File | null>(null)
  const [mutChatId, setChatId] = useState<number | null>(null)
  let mutError = null

  const [ templateData, templateVariables, associatedProduct] = useInteractiveTemplateStore((state) => [
    state.tempData,
    state.tempVariables,
    state.product
  ])
  const messageRef = useRef('')

  const params = useParams()
  const router = useRouter()


  const templateModal = useTemplateModal()

  const [addImageMessage, { loading:addIML, error:addIME, data: addIMD }] = useMutation(AddImageMessageDocument)
  const [addTextMessage, { loading:addTML, error:addTME, data: addTMD }] = useMutation(AddTextMessageDocument)
  const [addDocumentMessage, { loading:addDML, error:addDME, data: addDMD }] = useMutation(AddDocumentMessageDocument)
  const [addVideoMessage, { loading:addVML, error:addVME, data: addVMD }] = useMutation(AddVideoMessageDocument)
  const [addInteractiveTemplateMessageDocument, { loading:addTempML, error:addTempME, data: addTempMD }] = useMutation(AddInteractiveTemplateMessageDocument)

  const [file, addFile, filename, setFilename, fileType, setFileType,  setLoadingFile] = useFileStore((state) => [
    state.file,
    state.addFile,
    state.filename,
    state.setFilename,
    state.fileType,
    state.setFileType,
    state.setLoadingFile
  ])


  const onSubmit = async (data: any) => {
    let newTemplateVariables = templateVariables
    let newTemplateData = templateData
    let headerIndex = -1
    let fileUrl: string | undefined = undefined
    setLoadingFile(true) 
    if(newTemplateData){
      if((data.imageUrl?.length || data.documentUrl?.length || data.videoUrl?.length) && fileObj){
          fileUrl = await uploadFile(addFile, fileObj)
      }
      let {newTemplateData, newTemplateVariables, messageVariables} = formatTemplateDataForm(
        { data,
          fileObj,
          templateVariables,
          templateData,
          fileUrl,
          messageRef: messageRef.current
      })
  
  
      let mutLoading = false
      
      if(newTemplateVariables) {
        newTemplateVariables.template.body = messageRef?.current
        if(associatedProduct?.id){
          newTemplateVariables.template['productId'] = associatedProduct?.id
        }
        addInteractiveTemplateMessageDocument({
          variables: {
            message: {
              message: {
                chatId: params.chatId === 'new' ? undefined: parseInt(params.chatId),
                from_customer: false,
                type: "INTERACTIVE",
                timestamp: new Date()
              },
              interactive: newTemplateVariables
            },
            customerId: parseInt(params.customerId),
            template: JSON.stringify(newTemplateData)
          }
        }).then(() => {
          toast.success("Template message sent successfully.")
          setLoadingFile(false) 
          templateModal.onClose()
        })
        // mutLoading = addTempL
        mutError = addTempME
      } else if(messageVariables) {
        let variables = null
        let mutation = null

        if(data.imageUrl){
          variables = {
            message: {
              message: {
                chatId: params.chatId === 'new' ? undefined: parseInt(params.chatId),
                from_customer: false,
                type: "IMAGE",
                timestamp: new Date()
              },
              image: messageVariables
            },
            customerId: parseInt(params.customerId),
            template: JSON.stringify(newTemplateData)
    
          }
          mutation = addImageMessage
          mutError = addIME
        } else if(data.documentUrl){
          variables =  {
            message: {
              message: {
                chatId: params.chatId === 'new' ? undefined: parseInt(params.chatId),
                from_customer: false,
                type: "DOCUMENT",
                timestamp: new Date()
              },
              document: messageVariables
            },
            customerId: parseInt(params.customerId),
            template: JSON.stringify(newTemplateData)
          }
          mutation = addDocumentMessage
          mutError = addDME
        } else if(data.videoUrl) {
          variables =  {
            message: {
              message: {
                chatId: params.chatId === 'new' ? undefined: parseInt(params.chatId),
                from_customer: false,
                type: "VIDEO",
                timestamp: new Date()
              },
              video: messageVariables
            },
            customerId: parseInt(params.customerId),
            template: JSON.stringify(newTemplateData)
          }
          mutation = addVideoMessage
          mutError = addVME
        } else {
          variables =  {
            message: {
                message: {
                    chatId: params.chatId === 'new' ? undefined: parseInt(params.chatId),
                    from_customer: false,
                    type: "TEXT",
                    timestamp: new Date()
                },
                text: messageVariables
            },
            customerId: parseInt(params.customerId),
            template: JSON.stringify(newTemplateData)
          }
          mutation = addTextMessage
          mutError = addTME
        }
        mutation({
          variables: variables,
          }).then(() => {
            toast.success("Template message sent successfully.")
            setLoadingFile(false) 
            templateModal.onClose()
          })
      }

      if(mutError) {
        toast.error("Failed to send your template message. Please try again later")
        setLoadingFile(false)
      }
    } else {
      toast.error("An error occured could not read template data please try again later")
      setLoadingFile(false) 
    }
  }

  useEffect(() => {
    if(params.chatId === 'new' && addTempMD?.addInteractiveTemplateMessage?.chat?.id){
      router.push(`/chats/${addTempMD?.addInteractiveTemplateMessage?.chat?.id}/${params.customerId}`)
    } else if(params.chatId === 'new' && addIMD?.addImageMessage?.chat?.id){
      router.push(`/chats/${addIMD?.addImageMessage?.chat?.id}/${params.customerId}`)
    } else if(params.chatId === 'new' && addDMD?.addDocumentMessage?.chat?.id){
      router.push(`/chats/${addDMD?.addDocumentMessage?.chat?.id}`)
    } else if(params.chatId === 'new' && addVMD?.addVideoMessage?.chat?.id){
      router.push(`/chats/${addVMD?.addVideoMessage?.chat?.id}`)
    } else if(params.chatId === 'new' && addTMD?.addTextMessage?.chat?.id){
      router.push(`/chats/${addTMD?.addTextMessage?.chat?.id}/${params.customerId}`)
    }


  }, [addTMD, addIMD, params.chatId, params.customerId, mutChatId, addDMD, addVMD, addTempMD, addTML, router]);
  

  return (
    <>
      <TemplatePreview
        tempObj={tempObj}
        id="TemplateMesForm"
        onSubmit={onSubmit}
        setFileObj={setFileObj}
        messageRef={messageRef}
      />
    </>
  )
}

export default TemplatePreviewForm