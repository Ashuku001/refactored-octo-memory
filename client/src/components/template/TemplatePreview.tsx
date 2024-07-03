import { useEffect, useState, React } from "react"
import { PhoneIcon, Globe2Icon, ArrowUpLeftIcon, ShoppingBagIcon } from 'lucide-react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RemoteTemplateObj, File } from '@/types';
import { templatePreviewObj } from "@/lib/generateTemplatePreview/tempalatePreviewObject"
import DynamicBody from './DynamicBody'
import TextDynamicHeader from './TextDynamicHeader'
import DynamicButtons from './DynamicButtons'

import { FormMessage, Form,  FormField, FormItem, FormControl } from "@/components/ui/form"
import { useTemplateModal } from '@/hooks/useTemplateModal';
import { useFileStore } from '@/store/FileStore';
import FileUpload from '@/components/appwrite/AppWriteFileUpload';
import { Models } from 'appwrite';
import { useFormState } from '@/hooks/useFormResetValues';
import { useInteractiveTemplateStore } from '@/store/InteractiveTemplateStore';
import { ProductsSwitcherTempMessage } from '@/components/ProuctsSwitcherTempMessage';
import { ProductPreview } from '@/components/Message/ProductPreview';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Header } from '@/components/Interactive/SubComponents';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Props = {
    tempObj: RemoteTemplateObj;
    setFileObj: Dispatch<SetStateAction<Models.File | null>>;
    id?: String;
    onSubmit: (data: any) => void;
    messageRef: any;
}

type IconsType = {
  [key: string]: React.ReactNode;
}

const icons: IconsType = { PHONE_NUMBER: <PhoneIcon className='h-4 w-4 mr-2' />, URL: <Globe2Icon className='h-4 w-4 mr-2' />, QUICK_REPLY: <ArrowUpLeftIcon className="h-4 w-4 mr-2"/> }


const TemplatePreview = ({tempObj, setFileObj, id, onSubmit, messageRef}: Props) => {
  const [previewUi, setPreviewUI] = useState({})
  const templateModal = useTemplateModal()
  const [loadingFile] = useFileStore((state) => [
    state.loadingFile
  ])

  const [ setTempData, setTempVariables, associatedProduct, templateVariables] = useInteractiveTemplateStore((state) => [
    state.setTempData,
    state.setTempVariables,
    state.product,
    state.tempVariables
])

  // reset form values on change of preview state
  const [setFormState, setDefaultValues, setPreviewUrl] = useFormState((state) => [
    state.setFormState,
    state.setDefaultValues,
    state.setPreviewUrl
  ])
  
  let header = {}
  let body = {}
  let footer = {}
  let buttons = {}

  if (Object?.keys(previewUi).length !== 0) {
    header = previewUi?.HEADER
    body = previewUi?.BODY
    footer = previewUi?.FOOTER
    buttons = previewUi?.BUTTONS
  }

  let validator = {}
  let initialData: BodyInputsState = {}
  let fileInputLabel = ''

  if (header?.dynamic !== 0) {
    if (header?.dynamic?.type === 'file') {
      fileInputLabel = header?.dynamic?.format === "IMAGE" ? 'imageUrl'
                  : header?.dynamic?.format === "DOCUMENT" ? 'documentUrl' 
                  : header?.dynamic?.format === "VIDEO" ? "videoUrl"
                  : header?.dynamic?.format === "LOCATION" ? 'locationUrl' : ""
      const message = fileInputLabel === "imageUrl" ? 'Image'
                  : fileInputLabel === "documentUrl" ? 'Document' 
                  : fileInputLabel === "videoUrl" ? "Video"
                  : fileInputLabel === "locationUrl" ? 'location' : ""
      validator[fileInputLabel] = z.string().min(1,{ message: `${message} is required` })
      initialData[fileInputLabel] = {}
    }
    if (header?.dynamic?.type === 'text') {
      header?.dynamic?.inputs?.map((input) => {
        if (input.type === 'text')
          validator[`headerText`] = z.string().min(1,{ message: "Field is required" })
        if (input.type === 'number')
          validator[`${input?.id}`] = z.coerce.number().min(1,{ message: "Field is required" })
        initialData[`headerText`] = ""
      })
      initialData['headerText'] = ''
    }
  }

  if (body?.dynamic?.inputs?.length !== 0) {
    body?.dynamic?.inputs?.map((input) => {
      if (input.type === 'text')
        validator[`${input.id}`] = z.string().min(1,{ message: "Field is required" })
      if (input.type === 'number')
        validator[`${input.id}`] = z.coerce.number().min(1,{ message: "Field is required" })
      initialData[`${input.id}`] = ""
    })
  }

  if (buttons?.dynamic?.inputs?.length !== 0) {
    buttons?.dynamic?.inputs?.map((input) => {
      if (input.inputType === 'text')
        validator[`${input.id}`] = z.string().min(1,{ message: "Field is required" })
      if (input.inputType === 'number')
        validator[`${input.id}`] = z.coerce.number().min(1,{ message: "Field is required" })
      initialData[`${input.id}`] = ""
    })
  }

  const formSchema = z.object({
    ...validator
  })

  type TemplateMesFormValues = z.infer<typeof formSchema>

  const form = useForm<TemplateMesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  useEffect(() => {
    if (tempObj && Object.keys(tempObj).length !== 0) {
      setFormState(form)
      setDefaultValues(initialData)
      
      const { previewUI, tempData, tempVariables } = templatePreviewObj(tempObj)
      setPreviewUI(previewUI)
      setTempData(tempData)
      setTempVariables(tempVariables)
    }
    return () => {
      setPreviewUI({})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, form.formState.errors, id,  tempObj])


    return (
        <div className='h-full'>
          <div className="h-full">
          <ScrollArea className="h-full w-full rounded-md bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')] px-3">
              {Object?.keys(tempObj).length !== 0 &&
                <>
                  <h1 className='text-center'>{tempObj.name.replaceAll('_', ' ')} Preview</h1>
                  <div className='border text-left border-gray-700 rounded-md  h-auto p-2 overflow-y-auto mx-auto'>
                    <Form {...form}>
                      <form onSubmit={
                        form.handleSubmit(onSubmit)
                      }
                        id={id}
                      >
                        {templateVariables?.template?.buttons &&
                          <div className="w-full justify-between">
                            <Header title="Associate a product" variant="optional" description="You will receive a notification when your customers click a button"/>
                            <div className='flex items-center justify-between my-2'>
                              <ProductsSwitcherTempMessage/>
                              <HoverCard>
                                <HoverCardTrigger>
                                    <ShoppingBagIcon className={`h-8 w-8 ${associatedProduct ? "animate-bounce duration-10000 text-green-300": "animate-none"}`}/>
                                </HoverCardTrigger>
                                <HoverCardContent className="ml">
                                  <div className='z-50'>
                                      {associatedProduct ? 
                                          <ProductPreview product={associatedProduct}/>
                                          : "No associated jkjproduct"
                                      }
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            </div>
                          </div>
                        }
            
                        {header !== undefined &&
                          <>
                            {header?.static !== undefined &&
                              <>
                                {header?.static?.type === 'paragraph' &&
                                  <>
                                    {header?.static?.content?.format === 'TEXT' &&
                                      <h1 className='text-[18px] font-bold'>{header?.static?.content?.text}</h1>
                                    }
                                  </>
                                }
                              </>
                            }
                            {header?.dynamic !== undefined &&
                              <>
                                {header?.dynamic?.type === 'file' &&
                                  // header?.dynamic?.format === "IMAGE" &&
                                  <div className='flex items-center justify-center'>
                                    <FormField
                                      control={form.control}
                                      name={fileInputLabel}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <FileUpload
                                              value={field.value ? [field.value] : []}
                                              // disabled={}
                                              setFileObj={setFileObj}
                                              type={header?.dynamic?.format}
                                              onChange={(url) => field.onChange(url)}
                                              onRemove={() => {
                                                field.onChange("")
                                                setPreviewUrl(null)
                                              }}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                }
                                {header?.dynamic?.type === 'text' &&
                                  <>
                                    <TextDynamicHeader dynamic={header?.dynamic} form={form} />
                                  </>
                                }
                              </>
                            }
                          </>
                        }
                        {
                          body !== undefined &&
                          <>
                            {body?.static !== undefined &&
                              <>
                                {body?.static?.type === 'paragraph' &&
                                  <p className='text-left '>{body?.static?.content?.text}</p>
                                }
                              </>
                            }
      
                            {body?.dynamic !== undefined &&
                              body?.dynamic?.content !== undefined &&
                              <DynamicBody dynamic={body?.dynamic} form={form} messageRef={messageRef}/>
      
                            }
                          </>
                        }
                        {
                          footer !== undefined &&
                          <>
                            <p className='text-slate-500 text-left'>{footer?.static?.content?.text}</p>
                          </>
                        }
                        {
                          buttons !== undefined &&
      
                          <div>
                            <div className='border-b-[1px] border-gray-500'></div>
                            {(buttons?.static !== 0) &&
                              <>
                                <div>{buttons?.static?.map((btn: StaticButton, i: number) => (
                                  <button key={i} disabled className='w-full py-2 my-0 border-b-[1px] border-gray-500 flex items-center justify-center space-x-4'> <span>{icons[btn.type]}</span>{btn.text}</button>
                                ))}
                                </div>
                              </>
                            }
                            {(buttons?.dynamic !== 0) &&
                              <>
                                <div>{buttons?.dynamic?.inputs?.map((btn: StaticButton, i: number) => (
                                  <button key={i} disabled className='w-full py-2 my-0 border-b-[1px] border-gray-500 flex items-center justify-center space-x-4'> <span>{icons[btn.type]}</span>{btn.text}</button>
                                ))}
                                </div>
                                <div>
                                  <DynamicButtons dynamic={buttons?.dynamic} form={form} />
                                </div>
                              </>
                            }
                          </div>
                        }
                      
                      </form>
                    </Form>
                  </div>
                </>
              }
              <div className="mb-[50px]"/>
            </ScrollArea>
          </div>
        </div>
      )
}

export default TemplatePreview
