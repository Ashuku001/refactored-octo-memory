import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import toast from "react-hot-toast"

import { SidePanel } from "@/components/ui/SidePanel"
import { useInteractiveButtonModal } from "@/hooks/useInteractiveButton"
import { useFileStore } from "@/store/FileStore"
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useInteractiveButtonStore, buttonText0 } from '@/store/InteractiveButtonStore';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { uploadFile } from '@/lib/appwrite/uploadFile'
import LoadingSpinner from "@/components/LoadingSpinner"
import { FormattedInteractiveButtonData, ButtonHeader, ButtonButton } from "@/types"
import { getInteractiveButtonObj } from '@/lib/generateTemplatePreview/getInteractiveButtonObj';
import { AddInteractiveButtonMessageDocument } from '@/graphql';
import { MessageBody } from '@/components/Interactive/MessageBody';
import { MessageFooter } from '@/components/Interactive/MessageFooter';
import { MessagePreviewButton } from '@/components/Interactive/MessagePreviewButton';
import { MessageHeader, MediaRadioGroup } from '@/components/Interactive/MessageHeader';
import { MessageButtons } from '@/components/Interactive/MessageButton';
import { AssociatedProduct } from '@/components/Interactive/Button/AssociatedProduct';
import {ProductsSwitcherBtnMessage} from '@/components/ProductsSwitcherBtnMessage';

export const InteractiveButtonPanel = () =>{
  const headerOptions = ['NONE', 'TEXT', 'MEDIA']
    //@ts-ignore
  const interactiveModal = useInteractiveButtonModal()
  //@ts-ignore
  const [file, setFile, addFile, filename, setFilename, fileType, setFileType, loadingFile, setLoadingFile] = useFileStore((state) => [
    state.file,
    state.setFile,
    state.addFile,
    state.filename,
    state.setFilename,
    state.fileType,
    state.setFileType,
    state.loadingFile,
    state.setLoadingFile,
])
  //@ts-ignore
  const [headerType,setHeaderType, setHeaderText, setBodyText, setFooterText, fileObj, replyButtons, product, hasProduct] = useInteractiveButtonStore((state) => [
    state.headerType,
    state.setHeaderType,
    state.setHeaderText,
    state.setBodyText,
    state.setFooterText,
    state.fileObj,
    state.replyButtons,
    state.product,
    state.hasProduct,
  ])

  const initialData: {[key: string]: ''} = {
    headerText: '',
    headerType: '',
    bodyText: '',
    footerText: '',
    mediaType: '',
  }

  const [addInteractiveButtonMessage] = useMutation(AddInteractiveButtonMessageDocument)

  const params = useParams()

  const form = useForm({
    defaultValues: initialData
  })

  const onSubmit = async (data: any) => {
    setLoadingFile(true)
    let formattedData: FormattedInteractiveButtonData = {}
    if(data.headerType === 'MEDIA') {
      let fileUrl: string | undefined = undefined
      let header: ButtonHeader | undefined = undefined
      if(fileObj) {
        fileUrl = await uploadFile(addFile, fileObj)
        if(fileUrl){
          if(data.mediaType === "IMAGE") {
            header = {
              type: 'IMAGE',
              link: fileUrl
            }
          }  else if(data.mediaType === 'DOCUMENT') {
            header = {
              type: 'DOCUMENT',
              link: fileUrl,
              filename: fileObj.name,
              type: fileObj.type
            } 
          } else if(data.mediaType === 'VIDEO') {
            header = {
              type: 'VIDEO',
              link: fileUrl
            }
          }
        } else {
          toast.error(`There was an error uploading your ${data.mediaType} please try again`)
        }
        formattedData['header'] = header
      } else {
        toast.error(`Upload media required for selected media type header.`)
        setLoadingFile(false)
        throw new Error()
      }
      
    } else if(data.headerType === 'TEXT') {
      if(typeof data.headerText === "string" && data.headerText.length > 0){
        const header = {
          type: 'TEXT',
          text: data?.headerText
        }
        formattedData['header'] = header
      } else {
        toast.error("Header of type Text must include a text.")
        setLoadingFile(false)
        throw new Error()
      }
    } else {
      formattedData['header'] = undefined
    }

    if(data.bodyText.length > 0){
      const body = {
        text: data.bodyText
      }
      formattedData['body'] = body
    } else {
      toast.error("Body text is required")
      setLoadingFile(false)
      throw new Error()
    }

    if(data.footerText.length > 0) {
      formattedData['footer'] = {
          text: data.footerText
      }
    }

    if(data.buttonText0){
      let buttons: ButtonButton[] = []
      if(data.buttonText0?.length){
        buttons.push({
          type: 'reply',
          reply: {
            id: "1",
            title: data.buttonText0
          }
        })
      }
      if(data.buttonText1?.length){
        buttons.push({
          type: 'reply',
          reply: {
            id: "2",
            title: data.buttonText1
          }
        })
      }
      if(data.buttonText2?.length){
        buttons.push({
          type: 'reply',
          reply: {
            id: "3",
            title: data.buttonText2
          }
        })
      }
      formattedData['buttons'] = buttons
    } else {
      toast.error("At least one button with a title is required for interactive button message.")
      setLoadingFile(false)
      throw new Error()
    }
    
    const {template, tempVariables} = product?.id ? getInteractiveButtonObj(formattedData, product.id) : getInteractiveButtonObj(formattedData)

    let variables = {
      message: {
          message: {
              chatId: parseInt(params.chatId),
              from_customer: false,
              type: "INTERACTIVE",
              timestamp: new Date()
          },
          interactive: tempVariables
      },
      template: JSON.stringify(template)
    }
    try{
      addInteractiveButtonMessage({variables})
      toast.success("Interactive button message sent")
    } catch(error) {
      toast.error("There was an error sending the interactive button message. Please try again later")
    }
    setLoadingFile(false)
    interactiveModal.onClose()
  }


  return (
    <SidePanel
        title="Interactive button message"
        description="Create a button message and associate with a product"
        isOpen={interactiveModal.isOpen}
        onClose={loadingFile ? interactiveModal.onOpen :interactiveModal. onClose}
        className='w-full lg:w-[80%] h-[90vh] fixed mx-auto my-auto'
        side={'bottom'}
    >
      <Separator className="my-1 w-80 mx-auto"/>
      <div className="flex flex-row overflow-hidden h-full">
        <div className="h-full w-[65%] ">
          <h1 className="text-center  font-semibold">Edit Message</h1>
          <ScrollArea className="h-full w-full rounded-md border-r p-4">
            <div className="h-full w-full flex flex-col space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <MessageHeader form={form}>
                    <>
                      {headerType === 'TEXT' && 
                      <FormField
                        control={form.control}
                        name='headerText'
                        render={({field}) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                value={field.value}
                                onChange={(e) => {setHeaderText(e.target.value); field.onChange(e.target.value)}} className="focus-visible:ring-0" placeholder="Enter text header"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />}
                      {headerType === 'MEDIA' && <MediaRadioGroup form={form}/>}
                    </>
                  </MessageHeader>
                  <MessageBody>
                    <>
                    <FormField
                        control={form.control}
                        name='bodyText'
                        render={({field}) => (
                          <FormItem>
                            <FormControl>
                            <Textarea
                              value={field.value}
                              onChange={(e) => {setBodyText(e.target.value); field.onChange(e.target.value)} }
                              placeholder="Enter text for your message body" 
                              className="focus-visible:ring-0"/>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  </MessageBody>
                  <MessageFooter>
                    <>
                    <FormField
                        control={form.control}
                        name='footerText'
                        render={({field}) => (
                          <FormItem>
                            <FormControl>
                            <Input
                              value={field.value}
                              onChange={(e) => {setFooterText(e.target.value); field.onChange(e.target.value)}}
                              placeholder="Enter footer text" className='focus-visible:ring-0'
                            />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  </MessageFooter>
                  <AssociatedProduct form={form}>
                    {hasProduct &&
                      <ProductsSwitcherBtnMessage/>
                    }
                  </AssociatedProduct>
                  <MessageButtons form={form}/>
                  <div className="flex justify-end">
                    <Button type='submit' disabled={loadingFile}>
                      {loadingFile 
                        ? <LoadingSpinner/>
                        : "Send"
                      }
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="mb-20"/>
          </ScrollArea>
        </div>
        <div className="h-full flex-1">
          <h1 className="text-center font-semibold py-1">Message preview</h1>
          <ScrollArea className="h-full w-full rounded-md  p-4 bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')]">
            <div className="h-full w-full flex flex-col items-center">
              <MessagePreviewButton/>
            </div>
            <div className="mb-20"/>
          </ScrollArea>
        </div>
      </div>
    </SidePanel>
  )
}