import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { ReactNode } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {FileUpload, FilePrevObj} from "@/components/appwrite/newFileUpload";
import { FormItem, FormControl } from "@/components/ui/form";
import { OnAddCompParams } from "../EditTemplate";

export interface OnAddHeaderParams extends OnAddCompParams {}

type OptionsType = {
  title: string;
  value: any;
}
interface MessageHeaderProps {
  value: string;
  options: OptionsType[];
  onAddHeader: ({type, format}: OnAddHeaderParams) => void;
  children: ReactNode;
}

export function MessageHeader({value, options, onAddHeader, children}: MessageHeaderProps) {
  return (
    <div className="p-1">
        <CustomFormLabel variant="optional" title="Header" description="Add a title or choose which type of media you will use for this header"/>
            <FormItem>
              <Select
                value={value}
                onValueChange={(value) => {onAddHeader({type: "HEADER", format: value} as OnAddHeaderParams);}}
              >
                <SelectTrigger className="w-[150px] focus:ring-0">
                  <SelectValue defaultValue={"NONE"} placeholder="Header Type" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option, i) => <SelectItem key={i} value={option.value}>{option.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormItem>
        <div className="mt-3">
          {children}
        </div>
    </div>
  )
}

type MediaOptionsType = {
  title: string;
  value: string
}
export type MediaType = "DOCUMENT" | "VIDEO" | "IMAGE" | "LOCATION" | string

export type MediaGroupProps = {
  options: MediaOptionsType[],
  mediaType: MediaType;
  
  disabled: boolean;
  inlinePreview: boolean;
  file: FilePrevObj | undefined;
  
  onAddHeader: ({type, format}: OnAddHeaderParams) => void
  setFile: (file: FilePrevObj) => void;
  removeFile: () => void;
}

export const MediaGroup = ({
  options,
  mediaType,
  disabled,
  inlinePreview,
  file,

  onAddHeader,
  setFile,
  removeFile
}: MediaGroupProps) => {
  
  return (
    <div className='flex flex-col space-y-2'>
      <FormItem>
        <RadioGroup
          value={mediaType}
          onValueChange={(value: MediaType) => {onAddHeader({type: "HEADER", format: value} as OnAddHeaderParams)}}
          className="flex space-x-2"
        >
          {options?.map((option, i) => 
            <div key={i} className="border-1 ">
              <Label 
                htmlFor={option.title} 
                className=" bg-slate-500/20 rounded-lg p-3 w-30 h-30 flex space-x-2 justify-center items-center">{"  "}
                <RadioGroupItem value={option.value} id={option.value}  /><span>{option.title}</span></Label>
            </div>
          )}
        </RadioGroup>
      </FormItem>
      {!!mediaType.length && 
          <FormItem>
            <FormControl>
              <div className=" bg-muted/50 dark:bg-muted/30 p-1">
                <CustomFormLabel title="Sample for header content" description="To help us review your content, provide examples of the variables or media in the header. Do not include any customer information. Cloud API hosted by Meta reviews templates and variable parameters to protect the security and integrity of our services." />
                <FileUpload
                  disabled={disabled}
                  type={mediaType}
                  inlinePreview={inlinePreview}
                  file={file}
                  onRemove={removeFile}
                  setFile={setFile}
                />
              </div>
            </FormControl>
          </FormItem>
      }
    </div>
  )
}