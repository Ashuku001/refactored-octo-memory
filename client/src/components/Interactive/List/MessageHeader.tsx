
import { useInteractiveListStore, HeaderType } from "@/store/InteractiveListStore";
import { Header } from "@/components/Interactive/SubComponents";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  UseFormReturn } from "react-hook-form";
import {  FormField, FormItem } from '@/components/ui/form';
import { useEffect } from 'react';



const selectOptions = ['NONE', 'TEXT']
type MessageHeaderProps = {
  form: UseFormReturn<{
    [key: string]: "";
}, any, undefined>
  children: React.ReactNode
}

export const MessageHeader:React.FC <MessageHeaderProps> = ({children, form}) => {
  //@ts-ignore
  const [ headerType, setHeaderType, setHeaderText] = useInteractiveListStore((state) => [
    state.headerType,
    state.setHeaderType,
    state.setHeaderText
  ])

  useEffect(() => {
  
    if(headerType !== 'TEXT') {
      form.resetField('headerText')
      setHeaderText('')
    }
  },[form, headerType, setHeaderText])

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
