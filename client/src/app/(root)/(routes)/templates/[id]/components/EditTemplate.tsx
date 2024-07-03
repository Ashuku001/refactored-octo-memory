'use client'
import { PlusIcon } from "lucide-react";
import { useEffect, useState, Dispatch, SetStateAction} from "react";
import { useForm } from "react-hook-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormItem } from "@/components/ui/form"
import { MessageBody } from "@/components/Interactive/MessageBody";
import { MessageFooter } from "@/components/Interactive/MessageFooter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessagePreview } from "./MessagePreview";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFileStore } from "@/store/FileStore";
import { MessageHeader, MediaGroup } from "./subComponents/MessageHeader";
import { ComponentObject, ComponentType, HeaderFormat,  useCreateTemplateStore, QuickReplyType, OptOutType, WhatsAppType, PhoneNumberType, UrlType, CopyCodeType  } from "@/store/useCreateTemplate";
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { InputVariable } from "./subComponents/InputVariable";
import { MessageButtons } from "./subComponents/MessageButtons";

const headerOptions = [
  {
    title: "None",
    value: "NONE",
  },
  {
    title: "Text",
    value: "TEXT"
  },
  {
    title: "Media",
    value: "MEDIA"
  },
]

const mediaOptions = [
  {
    title: "Image",
    value: "IMAGE",
  },
  {
    title: "Document",
    value: "DOCUMENT"
  },
  {
    title: "Video",
    value: "VIDEO"
  },
]

type AddVariableParams = {
  to: "BODY" | "HEADER";
  text: string;
}
type OnChangeParams = {
  to: "BODY" | "HEADER";
  value: string;
}

export interface OnAddCompParams {type: ComponentType, format?: HeaderFormat}

const submitable = (components: (HeaderObj | BodyObj | FooterObj)[] | []) => {
  let submit: boolean = false
  components?.map((comp) => {
    if(comp.type === "HEADER"){
      if(comp.format === "TEXT"){
        submit = !!comp?.text?.length
        if(comp.example){
          comp?.example?.header_text?.map((item) => {
            submit = !!item?.length
          })
        }
      }
    } else {
      submit = true
    }

    if(comp?.type === "BODY") {
      submit = !!comp?.text?.length
      if(comp.example){
        comp?.example?.body_text?.map((item) => {
          submit = !!item?.length
        })
      }
    }

  })

  return submit
}

type EditTemplateProps = {
  enableSubmit: Dispatch<SetStateAction<boolean>>
}

function EditTemplate({enableSubmit}: EditTemplateProps) {
    const form = useForm()
    const [selectedBtns, setSelectedBtns] = useState<(
      QuickReplyType | OptOutType
      | PhoneNumberType
      | UrlType
      | CopyCodeType
      | WhatsAppType
    )[] | []>([])
    const [headerType, mediaType, headerText, bodyText, footerText, file, language, components, buttonBoard,setHeaderType, setMediaType, setFile, removeFile, addComponent, updateComponent, removeComponent, addVariable, updateVariable] = useCreateTemplateStore((state) => [
      state.headerType,
      state.mediaType,
      state.headerText,
      state.bodyText,
      state.footerText,
      state.file,
      state.language,
      state.components,
      state.buttonBoard,
      state.setHeaderType,
      state.setMediaType,
      state.setFile,
      state.removeFile,
      state.addComponent,
      state.updateComponent,
      state.removeComponent,
      state.addVariable,
      state.updateVariable
    ])

    //@ts-ignore
    const [ loadingFile] = useFileStore((state) => [
      state.loadingFile,
    ])

    useEffect(() => {
      let buttons: (QuickReplyType | OptOutType | PhoneNumberType | UrlType | CopyCodeType | WhatsAppType) [] | []= []
      Array.from(buttonBoard.columns.entries())?.forEach(([id, columns]) => {
        buttons = [...buttons, ...columns.buttons]
      })
      setSelectedBtns(buttons)
    }, [buttonBoard.columns])

    useEffect(() => {
      const submit = submitable(components)
      enableSubmit(submit)
    }, [components, enableSubmit])

    useEffect(() => {
      let submit: boolean = false
      selectedBtns?.map((btn) => {
        submit = !!btn.text.length
        if (btn.type === "QUICK_REPLY") {
        } else if (btn.type === "URL") {
          // @ts-ignore
          submit = !!btn?.url
        } else if (btn.type === "PHONE_NUMBER") {
          // @ts-ignore
          submit = !!btn?.phone_number!
        } else if (btn.type === "WHATSAPP") {
        } else if (btn.type === "COPY_CODE") {
          // @ts-ignore
          submit = !!btn?.code!
        } else if (btn.type === "OPT_OUT") {

        }
      })
    }, [enableSubmit, selectedBtns])

    console.log(components)
    console.log(selectedBtns)
    const onSubmit = () => {

    }

    const onAddComponent = ({type, format}: OnAddCompParams) => {
      let component: ComponentObject | {} = {}
      if(type === "HEADER"){
        if(format === "TEXT" || format === "NONE" || format === "MEDIA" ){
          setHeaderType(format!)
        }
        if(format === "TEXT"){
          removeComponent("HEADER")
          component = {
            ...component,
            type: type,
            format: format,
            text: "",
          }
          addComponent(component as ComponentObject)
        } else if (format !== "MEDIA" && format !== "NONE"){
          setMediaType(format!)
          if (format === "LOCATION") {
            component = {
              ...component,
              type: type,
              format: format,
            }
          } else {
            component = {
              ...component,
              type: type,
              format: format,
              example: {
                header_handle: ""
              }
            }
          }
          removeComponent("HEADER")
          addComponent(component as ComponentObject)
        } else if (format === "MEDIA" || format === "NONE") {
          removeComponent("HEADER")
        }
      } else if(type === "FOOTER"){
        component = {
          ...component,
          type: type,
          text: ""
        }
        addComponent(component as ComponentObject)
      }
    }

    return (
      <div className="h-full">
        <div className="flex flex-row overflow-hidden h-full">
          <div className="h-full flex-1">
            <ScrollArea className="h-full w-full rounded-md border-r p-2">
              <div className="h-full w-full flex flex-col space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <MessageHeader
                      value = {headerType}
                      options = {headerOptions}
                      onAddHeader={onAddComponent}
                    >
                      <div>
                        {headerType === 'TEXT' &&
                          <div>
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1">
                                  <Input
                                  // @ts-ignore
                                      value={components.find((c) => (c.type === "HEADER" && c.format === "TEXT"))!.text!}
                                      onChange={(e) => updateComponent({to: "HEADER", value: e.target.value})}
                                      placeholder="Enter text header"
                                  />
                                  <Button
                                    variant={'ghost'}
                                    type="button"
                                    // @ts-ignore
                                    disabled={components.find(c => (c.type === "HEADER" && c.format === "TEXT"))?.example?.header_text?.length <= 1}
                                    className="flex items-center space-x-2 w-fit ml-auto"
                                    onClick={() => addVariable({to: "HEADER"})}
                                  >
                                    <PlusIcon size={"20"} /> Add Variable
                                  </Button>
                                </div>
                              </FormControl>
                            </FormItem>
                            {/* @ts-ignore */}
                            {!!components.find(c => (c.type === "HEADER" && c.format === "TEXT"))?.example?.header_text?.length &&
                              <div  className="bg-muted/50 dark:bg-muted/30  p-1">
                                <CustomFormLabel title="Samples for header content" description="To help us review your content, provide examples of the variables or media in the header. Do not include any customer information. Cloud API hosted by Meta reviews templates and variable parameters to protect the security and integrity of our services."/>
                                {/* @ts-ignore */}
                                {components.find(c => (c.type === "HEADER" && c.format === "TEXT"))?.example?.header_text?.map((item, i) =>
                                  <InputVariable
                                    key={i}
                                    to="HEADER"
                                    value={item}
                                    index={i}
                                    onChange={updateVariable}
                                  /> 
                                )}
                              </div>
                            }
                          </div>
                        }
                        {headerType === "MEDIA" &&
                          <MediaGroup
                            options={mediaOptions}
                            mediaType={mediaType}
                            inlinePreview={false}
                            file={file}
                            setFile={setFile}
                            onAddHeader={onAddComponent}
                            removeFile={removeFile} 
                            disabled={false}                           />
                        }
                      </div>
                    </MessageHeader>
                    <MessageBody>
                      <div>
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1">
                            <Textarea
                            // @ts-ignore
                              value={components.find((c) => (c.type === "BODY"))!.text!}
                              onChange={(e) => updateComponent({to: "BODY", value: e.target.value})}
                              placeholder={`Enter text in ${language?.title}`}
                              className="focus-visible:ring-0"
                            />
                            <Button
                              variant={'ghost'}
                              type="button"
                              className="flex items-center space-x-2 w-fit ml-auto"
                              onClick={() => addVariable({to: "BODY"})}
                            >
                              <PlusIcon size={"20"} /> Add variable
                            </Button>
                            </div>
                            </FormControl>
                        </FormItem>
                        {/* @ts-ignore */}
                        {!!components.find(c => (c.type === "BODY"))?.example?.body_text?.length &&
                              <div className="flex flex-col space-y-3 bg-muted/50 dark:bg-muted/30  p-1">
                                <CustomFormLabel title="Samples for header content" description="To help us review your content, provide examples of the variables or media in the header. Do not include any customer information. Cloud API hosted by Meta reviews templates and variable parameters to protect the security and integrity of our services."/>
                                <div className="flex flex-col space-y-2">   
                                  {/* @ts-ignore */}
                                  {components.find(c => (c.type === "BODY"))?.example?.body_text?.map((item, i) =>
                                    <InputVariable
                                      key={i}
                                      to="BODY"
                                      value={item}
                                      index={i}
                                      onChange={updateVariable}
                                    /> 
                                  )}
                                </div>
                              </div>
                            }
                      </div>
                    </MessageBody>
                    <MessageFooter>
                        <FormItem>
                          <FormControl>
                          <Input
                            // @ts-ignore
                            value={components.find((c) => (c.type === "FOOTER" ))!?.text! ?? ""}
                            onChange={(e) => {updateComponent({to: "FOOTER", value: e.target.value})}}
                            placeholder="Enter footer text" className='focus-visible:ring-0'
                            onFocus={() => {
                              if(components.findIndex((c) => (c.type === "FOOTER")) < 0){
                                onAddComponent({type: "FOOTER"})
                              }
                            }}
                            onBlur={() => {
                              // @ts-ignore
                              if(components.find((c) => (c.type === "FOOTER"))?.text!.length <= 0){
                                removeComponent("FOOTER")
                              }
                            }}
                          />
                          </FormControl>
                        </FormItem>
                    </MessageFooter>
                    <MessageButtons/>
                  </form>
                </Form>
              </div>
              <div className="mb-20"/>
            </ScrollArea>
          </div>
          <div className="h-full max-w-[350px]">
            <h1 className="text-center font-semibold py-1">Message preview</h1>
            <ScrollArea className="h-full w-full rounded-md  p-4 bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')]">
              <div className="h-full w-full flex flex-col items-center">
                <MessagePreview
                  // @ts-ignore
                  header={{type: headerType, value: headerType === "TEXT"
                    ? headerText  
                    : headerType === "MEDIA" 
                    ?  {...file, mediaType: mediaType} 
                    : undefined
                  }}
                  body = {bodyText}
                  footer={footerText}
                  buttons={selectedBtns}
                />
              </div>
              <div className="mb-20"/>
            </ScrollArea>
          </div>
        </div>
        
      </div>
    )
}

export default EditTemplate
