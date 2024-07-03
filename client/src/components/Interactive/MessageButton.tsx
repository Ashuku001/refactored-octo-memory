
import { PlusIcon, XCircleIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

import { useInteractiveButtonStore, ButtonType, ReplyButtonsType } from "@/store/InteractiveButtonStore";
import { Header } from "./SubComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form"

type MessageButtonsProps = {
  form: UseFormReturn<{
    [key: string]: "";
}, any, undefined>
}

export const MessageButtons:React.FC <MessageButtonsProps> = ({form}) => {
  //@ts-ignore
  const [ setReplyButtons] = useInteractiveButtonStore((state) => [
    state.setReplyButtons
  ])

  //@ts-ignore
  const  [setButtonText0, setButtonText1, setButtonText2] = useInteractiveButtonStore((state) => [
    state.setButtonText0,
    state.setButtonText1,
    state.setButtonText2,
  ])

  const [replyInputs, setInputs] = useState<ReplyButtonsType[]>([{ type: 'reply',
  reply: {
      id: '',
      title: ''
  } }])
  
  useEffect(() => {
    setReplyButtons(replyInputs)
  }, [replyInputs, setReplyButtons])

  const addButton = () => {
    if(replyInputs.length >= 3){
      toast.error("Can only add a maximum of 3 buttons")
    } else {
      const newInput: ReplyButtonsType = { type: 'reply',
                                            reply: {
                                                id: '',
                                                title: ''
                                            }}

      setInputs([...replyInputs, newInput ])
    }
  }

  const deleteButton = (index: number) => {
    form.resetField(`buttonText${index}`)
    index == 0 
      ? setButtonText0('')
      : index == 1 ? setButtonText1('')
      : index == 2 ? setButtonText2('')
      : ''
    const newInputs = [...replyInputs];
    newInputs.splice(index, 1)
    setInputs(newInputs)
  }

  return (
    <div className="p-1">
        <Header variant="required" title="Button" description="Create buttons that let customers respond to your message or take action."/>
        <Button className="mt-1" variant={'secondary'} onClick={() => {addButton()}} type="button">
          <PlusIcon className="h-4 w-4"/>
          Add a button
          (Max 3)
        </Button>
        <div className="mt-3">
          {replyInputs.map((input: ReplyButtonsType, index) => (
            <MessageButton key={index} form={form} index={index} inputsLength={replyInputs.length} deleteButton={deleteButton}/>
          ))}
        </div>
    </div>
  )
}


const selectOptions = ['BUTTON_REPLY']

type MessageButtonProps = {
  form: UseFormReturn<{
    [key: string]: "";
}, any, undefined>
deleteButton: (index: number) => void;
index: number;
inputsLength: number;
}

export const MessageButton:React.FC<MessageButtonProps> = ({form, deleteButton, inputsLength, index}) => {
  //@ts-ignore
  const [ buttonType, setButtonType, setReplyButtons] = useInteractiveButtonStore((state) => [
    state.buttonType,
    state.setButtonType,
    state.setReplyButtons
  ])
  //@ts-ignore
  const  [setButtonText0, setButtonText1, setButtonText2] = useInteractiveButtonStore((state) => [
    state.setButtonText0,
    state.setButtonText1,
    state.setButtonText2,
  ])
  return(
    <div className="flex space-x-2 items-end border-2 border-slate-400 dark:border-slate-600 rounded-sm p-2 my-2">
        <FormField
          control={form.control}
          name={`buttonType${index}`}
          render={({field}) => (
            <FormItem>
              <Select
                  value={field.value}
                  onValueChange={(value: ButtonType) =>{field.onChange(value); setButtonType(value)}}
                >
                <SelectTrigger className="w-[150px] focus:ring-0">
                  <SelectValue defaultValue={"BUTTON REPLY"} placeholder="button type" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option) => <SelectItem key={option} value={option}>{option.replace("_", " ")}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormItem>
          )}/>
        
        <div className="flex-1 flex items-center">
          <FormField
              control={form.control}
              name={`buttonText${index}`}
              render={({field}) => (
                <FormItem className="flex-1">
                  <Label >Button text</Label>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        
                          index == 0 
                            ? setButtonText0(e.target.value)
                            : index == 1 ? setButtonText1(e.target.value)
                            : index == 2 ? setButtonText2(e.target.value)
                            : ''
                        }
                       }
                      />
                    </FormControl>
                    {(index !== 0 && index === inputsLength -1 ) &&
                      <Button variant={'ghost'} size={'icon'} onClick={() => deleteButton(index)}>
                        <XIcon className="h-4 w-4"/>
                      </Button>
                    }
                  </div>
                </FormItem>
              )}
            />

        </div>
    </div>
  )
}
