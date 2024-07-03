
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
import { FormControl,  FormItem } from "@/components/ui/form"
import { XIcon } from "lucide-react";

import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { QuickReplyType, OptOutType, WhatsAppType, PhoneNumberType, UrlType, CopyCodeType, useCreateTemplateStore, TypedBtnColumn, TypedBtn  } from "@/store/useCreateTemplate";
type MsgButtonProps = {
  btnIndex: number;
  columnId: TypedBtnColumn;
  button: QuickReplyType | OptOutType | PhoneNumberType | UrlType | CopyCodeType | WhatsAppType
}
export const MessageButton = ({button, btnIndex, columnId}: MsgButtonProps) => {
  const [updateButton, deleteBtn] = useCreateTemplateStore((state) => [state.updateButton, state.deleteBtn])
  return (
    <div>
      {button?.type == "COPY_CODE" && <CopyCode updateButton={updateButton} deleteBtn={deleteBtn} btnIndex = {btnIndex} columnId={columnId} button={button as CopyCodeType}/>}
      {button?.type == "QUICK_REPLY" && <QuickReplyAction updateButton={updateButton} deleteBtn={deleteBtn} btnIndex = {btnIndex} columnId={columnId} button={button as QuickReplyType}/>}
      {button?.type == "PHONE_NUMBER" && <PhoneAction updateButton={updateButton} deleteBtn={deleteBtn} btnIndex = {btnIndex} columnId={columnId} button={button as PhoneNumberType} />}
      {button?.type == "URL" && <UrlAction updateButton={updateButton} deleteBtn={deleteBtn} btnIndex = {btnIndex} columnId={columnId} button={button as UrlType}/>}
      {button?.type == "WHATSAPP" && <WhatsappAction updateButton={updateButton} deleteBtn={deleteBtn} btnIndex = {btnIndex} columnId={columnId} button={button as WhatsAppType}/>}
      {button?.type == "OPT_OUT" && <OptOutAction deleteBtn={deleteBtn} btnIndex = {btnIndex} columnId={columnId} />}
    </div>
  )
}

type UrlActionProps = {
  updateButton: ({ columnId, index, type, field, value }: {
    columnId: TypedBtnColumn;
    index: number;
    type: TypedBtn;
    field?: "TEXT" | "URL" | "PHONE_NUMBER" | "URL_TYPE" | undefined;
    value: string;
  }) => void;
  deleteBtn: ({ columnId, index }: {
    columnId: TypedBtnColumn;
    index: number;
  }) => void;
  button: UrlType;
  btnIndex: number;
  columnId: TypedBtnColumn;
}

const UrlAction = ({updateButton, deleteBtn, button, btnIndex, columnId}: UrlActionProps) => {
    const buttonsTypes = ["whatsApp", "Phone number"]
    const urlTypes = ["Static", "Dynamic"]
    return (
      <div className="flex items-center">
        <div className="flex-1 flex flex-row space-x-2 items-end bg-muted/40 rounded-sm p-2">
          {/* <FormItem>
            <Label >Type of Action</Label>
            <Select
              >
              <SelectTrigger className="w-[140px] focus:ring-0">
                <SelectValue  placeholder="button type" />
              </SelectTrigger>
              <SelectContent>
                {buttonsTypes.map((option) => <SelectItem key={option} value={option}>{option.replace("_", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormItem> */}
          <FormItem className="flex-1">
            <Label >Button text</Label>
            <FormControl>
              <Input
                value={button.text}
                onChange={(e) => updateButton({
                  columnId: columnId,
                  index: btnIndex,
                  type: button.type,
                  field: "TEXT",
                  value: e.target.value
                })}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <Label >Url type</Label>
            <Select
              >
              <SelectTrigger className="w-[150px] focus:ring-0">
                <SelectValue 
                  // onVal={(e) => updateButton({
                  //   columnId: columnId,
                  //   index: btnIndex,
                  //   type: type,
                  //   field: "URL-TYPE",
                  //   value: e.target.value
                  // })} 
                  placeholder="URL type" 
                  defaultValue={"Static"}
                />
              </SelectTrigger>
              <SelectContent>
                {urlTypes.map((option) => <SelectItem 
                key={option} 
                value={option}
              >{option.replace("_", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem className="flex-1">
            <Label >Website url</Label>
            <div className="flex items-center">
              <FormControl>
                <Input
                  value={button.url}
                  onChange={(e) => updateButton({
                    columnId: columnId,
                    index: btnIndex,
                    type: "URL",
                    field: "URL",
                    value: e.target.value
                  })}
                />
              </FormControl>
            </div>
          </FormItem>
        </div>
        <Button 
          variant={'ghost'}
          size={'icon'}
          onClick={() => {deleteBtn({columnId: columnId, index: btnIndex})}}
          type="button"
        >
          <XIcon className="h-4 w-4"/>
        </Button>
      </div>
    )
}

type PhoneActionProps = {
  updateButton: ({ columnId, index, type, field, value }: {
    columnId: TypedBtnColumn;
    index: number;
    type: TypedBtn;
    field?: "TEXT" | "URL" | "PHONE_NUMBER" | undefined;
    value: string;
  }) => void;
  deleteBtn: ({ columnId, index }: {
    columnId: TypedBtnColumn;
    index: number;
  }) => void;
  button: PhoneNumberType;
  btnIndex: number;
  columnId: TypedBtnColumn;
}

const PhoneAction = ({updateButton, deleteBtn, button, btnIndex, columnId}: PhoneActionProps) => {
    const buttonsTypes = ["whatsApp", "Phone number"]
    const urlTypes = ["Static", "Dynamic"]
    return (
      <div className="flex flex-row items-center">
        <div className="flex-1 flex flex-row space-x-2 items-end bg-muted/40 rounded-sm p-2">
          {/* <FormItem>
          <Label >Type of Action</Label>
            <Select
              >
              <SelectTrigger className="w-[140px] focus:ring-0">
                <SelectValue  placeholder="button type" />
              </SelectTrigger>
              <SelectContent>
                {buttonsTypes.map((option) => <SelectItem key={option} value={option}>{option.replace("_", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormItem> */}
          <FormItem className="flex-1">
            <Label >Button text</Label>
            <div className="flex items-center">
              <FormControl>
                <Input
                  onChange={(e) => updateButton({
                    columnId: columnId,
                    index: btnIndex,
                    type: button.type,
                    field: "TEXT",
                    value: e.target.value
                  })}
                  value={button.text}
                />
              </FormControl>
            </div>
          </FormItem>
          <FormItem>
            <Label >Country</Label>
            <Select
              >
              <SelectTrigger className="w-[150px] focus:ring-0">
                <SelectValue  placeholder="URL type" defaultValue={"Static"}/>
              </SelectTrigger>
              <SelectContent>
                {urlTypes.map((option) => <SelectItem key={option} value={option}>{option.replace("_", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem className="flex-1">
            <Label >Phone number</Label>
            <div className="flex items-center">
              <FormControl>
                <Input
                  onChange={(e) => updateButton({
                    columnId: columnId,
                    index: btnIndex,
                    type: button.type,
                    field: "PHONE_NUMBER",
                    value: e.target.value
                  })}
                  value={button.phone_number}
                />
              </FormControl>
            </div>
          </FormItem>
        </div>
        <Button 
          variant={'ghost'}
          size={'icon'}
          onClick={() => {deleteBtn({columnId: columnId, index: btnIndex})}}
          type="button"
        >
          <XIcon className="h-4 w-4"/>
        </Button>
      </div>
    )
}

type WhatsappActionProps = {
  updateButton: ({ columnId, index, type, field, value }: {
    columnId: TypedBtnColumn;
    index: number;
    type: TypedBtn;
    field?: "TEXT" | "URL" | "PHONE_NUMBER" | "URL_TYPE" | undefined;
    value: string;
  }) => void;
  deleteBtn: ({ columnId, index }: {
    columnId: TypedBtnColumn;
    index: number;
  }) => void;
  button: WhatsAppType;
  btnIndex: number;
  columnId: TypedBtnColumn;
}

  
const WhatsappAction = ({updateButton, deleteBtn, button, btnIndex, columnId}: WhatsappActionProps) => {
    const buttonsTypes = ["whatsApp", "Phone number"]
    const urlTypes = ["Static", "Dynamic"]
    return (
      <div className="flex items-center">
        <div className="flex-1 flex flex-row space-x-2 items-end bg-muted/40 rounded-sm p-2">
          {/* <FormItem>
          <Label >Type of Action</Label>
            <Select
              >
              <SelectTrigger className="w-[140px] focus:ring-0">
                <SelectValue  placeholder="button type" />
              </SelectTrigger>
              <SelectContent>
                {buttonsTypes.map((option) => <SelectItem key={option} value={option}>{option.replace("_", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormItem> */}
          <FormItem className="flex-1">
            <Label >Button text</Label>
            <div className="flex items-center">
              <FormControl>
                <Input
                  value={button.text}
                  onChange={(e) => updateButton({
                    columnId: columnId,
                    index: btnIndex,
                    type: button.type,
                    field: "TEXT",
                    value: e.target.value
                  })}
                />
              </FormControl>
            </div>
          </FormItem>
        </div>
        <Button 
          variant={'ghost'}
          size={'icon'}
          onClick={() => {deleteBtn({columnId: columnId, index: btnIndex})}}
          type="button"
        >
          <XIcon className="h-4 w-4"/>
        </Button>
      </div>
    )
  }

  
type CopyCodeProps = {
  updateButton: ({ columnId, index, type, field, value }: {
    columnId: TypedBtnColumn;
    index: number;
    type: TypedBtn;
    field?: "TEXT" | "URL" | "PHONE_NUMBER" | "URL_TYPE" | "CODE" | undefined;
    value: string;
  }) => void;
  deleteBtn: ({ columnId, index }: {
    columnId: TypedBtnColumn;
    index: number;
  }) => void;
  button: CopyCodeType;
  btnIndex: number;
  columnId: TypedBtnColumn;
}

  
const CopyCode = ({updateButton, deleteBtn, button, btnIndex, columnId}: CopyCodeProps) => {
    const buttonsTypes = ["whatsApp", "Phone number"]
    const urlTypes = ["Static", "Dynamic"]
    return (
      <div className="flex items-center">
        <div className="flex-1 flex flex-col space-y-2  bg-muted/40 rounded-sm p-2">
          <div className="flex flex-row space-x-2 items-end">
            <FormItem>
            <Label >Type of Action</Label>
              <Select
                >
                <SelectTrigger className="w-[140px] focus:ring-0">
                  <SelectValue  placeholder="button type" />
                </SelectTrigger>
                <SelectContent>
                  {buttonsTypes.map((option) => <SelectItem key={option} value={option}>{option.replace("_", " ")}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormItem>
            <FormItem className="">
              <Label >Button text</Label>
              <div className="flex items-center">
                <FormControl>
                  <Input
                    value={button.text}
                    onChange={(e) => updateButton({
                      columnId: columnId,
                      index: btnIndex,
                      type: button.type,
                      field: "TEXT",
                      value: e.target.value
                    })}
                  />
                </FormControl>
              </div>
            </FormItem>
          </div>
          <CustomFormLabel title="Add sample offer code" description="To help Meta review your template message please add an example of offer code" />
          <FormItem className="">
              <Label>Offer code</Label>
              <FormControl>
                <Input
                  value={button.code}
                  onChange={(e) => updateButton({
                    columnId: columnId,
                    index: btnIndex,
                    type: button.type,
                    field: "CODE",
                    value: e.target.value
                  })}
                />
              </FormControl>
            </FormItem>
        </div>
        <Button 
          variant={'ghost'}
          size={'icon'}
          onClick={() => {deleteBtn({columnId: columnId, index: btnIndex})}}
          type="button"
        >
          <XIcon className="h-4 w-4"/>
        </Button>
      </div>
    )
  }

type QuickReplyActionProps = {
  updateButton: ({ columnId, index, type, field, value }: {
    columnId: TypedBtnColumn;
    index: number;
    type: TypedBtn;
    field?: "TEXT" | "URL" | "PHONE_NUMBER" | "URL_TYPE"| "CODE" | undefined;
    value: string;
  }) => void;
  deleteBtn: ({ columnId, index }: {
    columnId: TypedBtnColumn;
    index: number;
  }) => void;
  button: QuickReplyType;
  btnIndex: number;
  columnId: TypedBtnColumn;
}
  
  
const QuickReplyAction = ({updateButton, deleteBtn, button, btnIndex, columnId}: QuickReplyActionProps) => {
    const buttonsTypes = ["whatsApp", "Phone number"]
    const urlTypes = ["Static", "Dynamic"]
    return (
      <div className="flex items-center">
        <div className="flex-1 flex flex-row space-x-2 items-end bg-muted/40 rounded-sm p-2">
          <FormItem>
          <Label >Type of Action</Label>
            <Select
              >
              <SelectTrigger className="w-[140px] focus:ring-0">
                <SelectValue  placeholder="button type" />
              </SelectTrigger>
              <SelectContent>
                {buttonsTypes.map((option) => <SelectItem key={option} value={option}>{option.replace("_", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem className="">
            <Label >Button text</Label>
            <div className="flex items-center">
              <FormControl>
                <Input
                  value={button.text}
                  onChange={(e) => updateButton({
                    columnId: columnId,
                    index: btnIndex,
                    type: button.type,
                    field: "TEXT",
                    value: e.target.value
                  })}
                />
              </FormControl>
            </div>
          </FormItem>
        </div>
        <Button 
          variant={'ghost'}
          size={'icon'}
          onClick={() => {deleteBtn({columnId: columnId, index: btnIndex})}}
          type="button"
        >
          <XIcon className="h-4 w-4"/>
        </Button>
      </div>
    )
}

type OptOutProps = {
  deleteBtn: ({ columnId, index }: {
    columnId: TypedBtnColumn;
    index: number;
  }) => void;
  btnIndex: number;
  columnId: TypedBtnColumn;
}
  
const OptOutAction = ({deleteBtn, btnIndex, columnId}: OptOutProps) => {
    return (
      <div className="flex items-center">
        <div className="flex-1 flex flex-row space-x-2 items-end bg-muted/40 rounded-sm p-2">
          <FormItem className="">
            <Label >Button text</Label>
            <div className="flex items-center">
              <FormControl>
                <Input
                  disabled
                  placeholder="Stop Promotions"
                />
              </FormControl>
            </div>
          </FormItem>
        </div>
        <Button 
          variant={'ghost'}
          size={'icon'}
          onClick={() => {deleteBtn({columnId: columnId, index: btnIndex})}}
          type="button"
        >
          <XIcon className="h-4 w-4"/>
        </Button>
      </div>
    )
  }