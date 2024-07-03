
import { useInteractiveButtonStore, HeaderType, MediaType } from "@/store/InteractiveButtonStore";

import { Header } from "./SubComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import FileUpload from "@/components/appwrite/AppWriteFileUpload";
import { useEffect } from 'react';
import toast from "react-hot-toast";



const selectOptions = ['NONE', 'TEXT', 'MEDIA']
type MessageHeaderProps = {
  form: UseFormReturn<{
    [key: string]: "";
}, any, undefined>
  children: React.ReactNode
}

export const MessageHeader:React.FC <MessageHeaderProps> = ({children, form}) => {
  //@ts-ignore
  const [ headerType, setHeaderType, setFilePreview, setFileForButtonMessage, setHeaderText] = useInteractiveButtonStore((state) => [
    state.headerType,
    state.setHeaderType,
    state.setFilePreview,
    state.setFileObj,
    state.setHeaderText
  ])

  useEffect(() => {
    if(headerType!=="MEDIA"){
      try{
        form.resetField('mediaType')
        form.resetField('DOCUMENT')
        form.resetField('IMAGE')
        form.resetField('VIDEO')
        setFilePreview(null)
        setFileForButtonMessage(null)
      } catch(error) {
        toast.error("Something went wrong.")
      }
    } 
    if(headerType !== 'TEXT') {
      form.resetField('headerText')
      setHeaderText('')
    }
  },[form, headerType, setFileForButtonMessage, setFilePreview, setHeaderText])

  return (
    <div className="p-1">
        <Header variant="optional" title="Header" description="Add a title or choose which type of header you will use for this header"/>
        <FormField
          control={form.control}
          name="headerType"
          render={({field}) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={(value: HeaderType) => {setHeaderType(value); field.onChange(value)}}
              >
                <SelectTrigger className="w-[150px] focus:ring-0">
                  <SelectValue defaultValue={"NONE"} placeholder="Header Type" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormItem>
          )}/>
        
        <div className="mt-3">
          {children}
        </div>
    </div>
  )
}

// ###########################################MEDIA GROUP ###########################

const mediaOptions = ["IMAGE" , "DOCUMENT"  , "VIDEO"]
type MediaGroupProps = {
  form: UseFormReturn<{
    [key: string]: "";
}, any, undefined>
}

export const MediaRadioGroup: React.FC<MediaGroupProps> = ({form}) => {

  //@ts-ignore
  const [mediaType, setMediaType, setFileObj, headerType, setFilePreview] = useInteractiveButtonStore((state) => [
    state.mediaType,
    state.setMediaType,
    state.setFileObj,
    state.headerType,
    state.setFilePreview
  ])
  useEffect(() => {
    mediaOptions.forEach((option) => {
      if(mediaType !== option){
        setFilePreview(null)
        setFileObj(null)
      }
    })
  }, [mediaType, setFileObj, setFilePreview])

  return (
    <div className='flex flex-col space-y-2'>
      <FormField
        control={form.control}
        name="mediaType"
        render={({field}) => (
        <FormItem>
          <RadioGroup
            value={field.value}
            onValueChange={(value: MediaType) => {setMediaType(value); field.onChange(value)}}
            className="flex space-x-2"
          >
            {mediaOptions.map((option) => 
              <div key={option} className="border-1 ">
                <Label htmlFor={option} className=" bg-slate-500/20 rounded-lg p-3 w-30 h-30 flex space-x-2 justify-center items-center">{"  "}<RadioGroupItem value={option} id={option}  /><span>{option}</span></Label>
              </div>
            )}
          </RadioGroup>
        </FormItem>)}
      />
      {headerType === "MEDIA" && 
      <FormField
        control={form.control}
        name={mediaType}
        // @ts-ignore
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FileUpload
                value={field.value ? [field.value] : []}
                // disabled={}
                setFileObj={setFileObj}
                type={mediaType}
                onChange={(url) => field.onChange(url)}
                onRemove={() => {
                  field.onChange("")
                  setFileObj(null)
                }}
              />
            </FormControl>
          </FormItem>
        )}
        />
      }
    </div>
  )
}