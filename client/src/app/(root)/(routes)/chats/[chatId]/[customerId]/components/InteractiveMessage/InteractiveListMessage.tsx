import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation';
import toast from "react-hot-toast"
import { useMutation } from '@apollo/client';

import { AddInteractiveListMessageDocument } from '@/graphql';
import { SidePanel } from "@/components/ui/SidePanel"
import { useInteractiveListModal } from "@/hooks/useInteractiveList"
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { MessageHeader } from "@/components/Interactive/List/MessageHeader";
import { Input } from "@/components/ui/input";
import { MessageBody } from "@/components/Interactive/MessageBody";
import { MessageFooter } from "@/components/Interactive/MessageFooter";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageButton } from '@/components/Interactive/List/MessageButton';
import { useInteractiveListStore, SectionType} from "@/store/InteractiveListStore";
import { MessagePreviewList } from '@/components/Interactive/List/MessagePreviewList';
import { FormattedInteractiveListData } from "@/types";
import {getInteractiveListObj} from '@/lib/generateTemplatePreview/getInteractiveListObj';
import { MessageListSections } from '@/components/Interactive/List/MessageListSection';


export const InteractiveListPanel = () =>{
  const interactiveListModal = useInteractiveListModal()
  //@ts-ignore
  const [headerType, setHeaderText, setBodyText, setFooterText, listLoading, setLoading, storeSections] = useInteractiveListStore((state) => [
    state.headerType,
    state.setHeaderText,
    state.setBodyText,
    state.setFooterText,
    state.listLoading,
    state.setLoading,
    state.sections,
  ])

  const initialData: {[key: string]: ''} = {
    headerType: '',
    headerText: '',
    bodyText: '',
    actionButtonText: '',
    footerText: '',
  }

  const [addInteractiveButtonMessage] = useMutation(AddInteractiveListMessageDocument)

  const params = useParams()

  const form = useForm({
    defaultValues: initialData
  })

  const onSubmit = (data: any) => {
    setLoading(true)
    let formattedData: FormattedInteractiveListData = {}
    if(data.headerType === 'TEXT'){
      if(data.headerText.length > 0){
        formattedData['header'] = {
          type: 'text',
          text: data.headerText
        }
      } else {
        toast.error("Header of type TEXT can not be empty.")
        setLoading(false)
        throw new Error()
      }
    }

    if(data?.bodyText?.length > 0){
      formattedData['body'] = {
        text: data.bodyText
      }
    } else {
      toast.error("Body text is required")
      setLoading(false)
      throw new Error()
    }

    if(data?.actionButtonText?.length > 0 ){
      formattedData['button'] = data?.actionButtonText
    } else {

      toast.error("Button text for call to action is required.")
      setLoading(false)
      throw new Error()
    }

    if(data?.footerText?.length > 0){
      formattedData['footer'] = {
        text: data.footerText
      }
    }

    if(storeSections?.length > 0) {
      let formattedSections = []
      storeSections.forEach((section, sIndex) => {
        let formattedSection = {
          title: section.title,
          rows: []
        }

        if(section.title){
          section.rows.forEach((row, rIndex) => {
            let formattedRow = {
              id: `section-${sIndex}-row-${rIndex}`,
              title: row.title,
              description: row.description,
              productId: row?.product?.id
            }

            if(!formattedRow.title || formattedRow.title.length <= 0){
              toast.error(`Title for row ${rIndex + 1} at section ${sIndex + 1} is empty. Please add text or delete the row or section. `, {duration: 7000})
              setLoading(false)
              throw new Error()
            }
            if(!formattedRow.description || formattedRow.description.length <= 0){
              toast.error(`Description for row ${rIndex + 1} at section ${sIndex + 1} is empty. Please add text or delete the row or section. `, {duration: 7000})
              setLoading(false)
              throw new Error()
            }
            formattedSection.rows.push(formattedRow)
          })
        } else {
          toast.error(`Section ${sIndex + 1} does not have a title. Please add a title or delete`)
          setLoading(false)
          throw new Error()
        }

        formattedSections.push(formattedSection)
      })

      formattedData['sections'] = formattedSections
      
    } else { 
      toast.error("Must include at least 1 section with a title and at least 1 row per section with a title and description", {
        duration: 6000,
      })
      setLoading(false)
      throw new Error()
    }


    const {template, tempVariables} = getInteractiveListObj(formattedData, 2)


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
    setLoading(false)
    interactiveListModal.onClose()
  }

  return (
    <SidePanel
        title="Interactive list message"
        description="Create a product list and associate with products in your store."
        isOpen={interactiveListModal.isOpen}
        onClose={interactiveListModal.onClose}
        className ='w-full lg:w-[80%] h-[90vh] fixed mx-auto my-auto'
        side={'bottom'}
    >
      <Separator className="my-1 w-80 mx-auto"/>
      <div className="flex flex-row overflow-hidden h-full">
        <div className="h-full w-[60%] ">
          <h1 className="text-center  font-semibold">Edit Message</h1>
          <ScrollArea className="h-full w-full rounded-md border-r p-4">
            <div className="h-full w-full flex flex-col space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <MessageHeader form={form}>
                    <>
                      {headerType === "TEXT" && 
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
                  <MessageButton form={form}/>
                  <MessageListSections form={form} />
                  <div className="flex justify-end">
                    <Button type='submit'>
                      Send
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="mb-20">
            </div>
          </ScrollArea>
        </div>
        <div className="h-full flex-1">
          <h1 className="text-center font-semibold py-1">Message preview</h1>
          <ScrollArea className="h-full w-full rounded-md  p-4 bg-[url('/chat-room-bg-light.svg')] dark:bg-[url('/chat-room-bg-dark.svg')]">
            <div className="h-full w-full flex flex-col items-center">
              <MessagePreviewList/>
            </div>
            <div className="mb-20"/>
          </ScrollArea>
        </div>
      </div>
    </SidePanel>
  )
}