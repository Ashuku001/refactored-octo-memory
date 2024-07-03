'use client'
import { useState, useRef, useEffect} from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"

import { AddTemplateCampaignDocument } from "@/graphql"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFileStore } from '@/store/FileStore';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useInteractiveTemplateStore } from '@/store/InteractiveTemplateStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFormState } from '@/hooks/useFormResetValues';
import { uploadFile } from '@/lib/appwrite/uploadFile';
import { formatTemplateDataForm } from '@/lib/generateTemplatePreview/formatTemplateDataForm';
import LoadingSpinner from '@/components/LoadingSpinner'
import { MessageBody } from '@/components/Interactive/MessageBody';
import { MessageFooter } from '@/components/Interactive/MessageFooter';
import { MessagePreviewButton } from '@/components/Interactive/MessagePreviewButton';
import { MessageHeader, MediaRadioGroup } from '@/components/Interactive/MessageHeader';
import { Textarea } from '@/components/ui/textarea'
import { MessageButtons } from '@/components/Interactive/MessageButton';
import { AssociatedProduct } from '@/components/Interactive/Button/AssociatedProduct';
import {ProductsSwitcherBtnMessage} from '@/components/ProductsSwitcherBtnMessage';
import { useInteractiveButtonStore } from '@/store/InteractiveButtonStore'

const formSchema = z.object({
  template: z.string(),
  order: z.string().min(3),
  limit: z.coerce.number().min(1),
})

type ButtonAdFormvalue = z.infer<typeof formSchema>
const initialOrderType = [
  {
    id: "createdAt",
    name: "Created At"
  },
  {
    id: "new",
    name: "New"
  },
  {
    id: "old",
    name: "Old"
  },
  {
    id: "mostInteractive",
    name: "Most interactive"
  },
  {
    id: "locality",
    name: "Where they live"
  },
  {
    id: "age",
    name: "Age"
  }
]

const ButtonAdForm = () => {
  const [remTemplate, setRemTemplate] = useState({})
  const messageRef = useRef('')
  const [formTempData, setformTempData] = useState(null)
  const [formTempVars, setFormTempVars] = useState(null)
  const [formMesVars, setFormMesVars] = useState<{ [key: string]: any; } | undefined>(undefined)
  const [orderType, setOrderType] = useState(initialOrderType)
  const [open, setOpen] = useState(false)


  const [addCampaign,{ loading, error }] = useMutation(AddTemplateCampaignDocument)
  const [ templateData, templateVariables, associatedProduct] = useInteractiveTemplateStore((state) => [
    state.tempData,
    state.tempVariables,
    state.product
  ])
  //@ts-ignore
  const [file, addFile, loadingFile, setLoadingFile] = useFileStore((state) => [
    state.file,
    state.addFile,
    state.loadingFile,
    state.setLoadingFile
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

  const [templateForm] = useFormState((state) => [
    state.form,
  ])

  // the main form
  const mainForm = useForm<ButtonAdFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      template: '',
      limit: 0,
      order: ''
    }
  })

  // Button form
  const initialData: {[key: string]: ''} = {
    headerText: '',
    headerType: '',
    bodyText: '',
    footerText: '',
    mediaType: '',
  }
  const buttonForm = useForm({
    defaultValues: initialData
  })


  const onSubmitMainForm = async (data: ButtonAdFormvalue) => {

    if(templateData){
      const variables =  {
        order: data.order,
        limit: data.limit,
        // page: 1,
        message: {
          message: {
            from_customer: false,
            type: "INTERACTIVE",
            timestamp: new Date()
          },
          interactive: formTempVars
        },
        template: JSON.stringify(formTempData)
      }

      addCampaign({ variables })
    } else {
      toast.error("Choose a template before creating a campaign")
    }
  }

  const onSubmitButtonForm = async (data: any) => {
    setLoadingFile(true)
    let fileUrl: string | undefined = undefined
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

      if(associatedProduct?.id){
        newTemplateVariables.template['productId'] = associatedProduct?.id
      }

    setformTempData(newTemplateData)
    setFormTempVars(newTemplateVariables)
    setFormMesVars(messageVariables)
    toast.success("You message template created successfully and ready to for campaign")
    setLoadingFile(false)
  }

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Heading
          title={"Button message campaign"}
          description={"Create a button type message campaign."}
        />
      </div>
      <Separator/>
      <div className='flex flex-row overflow-hidden h-[80vh]'>
        <div className="h-full w-[60%]">
          <h1 className="text-center  font-semibold">Edit Message</h1>
          <ScrollArea className="h-full w-full rounded-md border-r pr-5">
            <div className="h-full w-full flex flex-col space-y-4">
              <Form {...buttonForm}>
                <form onSubmit={buttonForm.handleSubmit(onSubmitButtonForm)}>
                  <MessageHeader form={buttonForm}>
                    <>
                      {headerType === 'TEXT' && 
                      <FormField
                        control={buttonForm.control}
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
                      {headerType === 'MEDIA' && <MediaRadioGroup form={buttonForm}/>}
                    </>
                  </MessageHeader>
                  <MessageBody>
                    <>
                    <FormField
                        control={buttonForm.control}
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
                        control={buttonForm.control}
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
                  <AssociatedProduct form={buttonForm}>
                    {hasProduct &&
                      <ProductsSwitcherBtnMessage/>
                    }
                  </AssociatedProduct>
                  <MessageButtons form={buttonForm}/>
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


      {formTempData &&
      <>
        <Form {...mainForm}>
          <form onSubmit={mainForm.handleSubmit(onSubmitMainForm)} className='inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom'>
            <div className='grid grid-cols-3 gap-8 space-y-2 items-center'>
              <FormField
                control={mainForm.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort your customers.</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select how to order customers"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orderType?.map((order) => (
                          <SelectItem
                            key={order.id}
                            value={order.id}
                          >
                            {order.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                        Sort your customers according to your preference.
                      </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={mainForm.control}
                name="limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many customers to send to?</FormLabel>
                    <FormControl>
                      <Input  type="number"  {...field} placeholder={'How many customers'} />
                    </FormControl>
                    <FormDescription>
                        This will be the first customers according to the order selected.
                      </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              <Button disabled={loading} className='ml-auto mt-2' type='submit'>
                {loadingFile ? <LoadingSpinner/> : "Create campaign"}
              </Button>
          </form>
        </Form>
      </>}

      <div className='mb-50'></div>
    </>
  )
}

export default ButtonAdForm