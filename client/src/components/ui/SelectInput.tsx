import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { ScrollArea } from "@/components/scroll-area";
import { FormControl } from "./form";

type Props = {
    loading?: boolean
    onChange: (value: any) => void;
    value: string;
    defaultValue: string;
    options: string[];
}

export const SelectInput = ({loading, onChange, value, defaultValue, options}: Props) => {
  return (<Select
  disabled={loading}
  onValueChange={onChange}
  value={value}
  defaultValue={defaultValue}
>
  <FormControl >
    <SelectTrigger className='border-none ring-0 focus:ring-0'>
      <SelectValue
        // defaultValue={initialData?.brand?.name}
        placeholder="Select a brand"
      />
    </SelectTrigger>
  </FormControl>
  <SelectContent className='h-[200px]'>
    <ScrollArea className='h-full'>
      {options?.map((option) => (
        <SelectItem
          key={option}
          value={option}
        >
          {option}
        </SelectItem>
      ))}
    </ScrollArea>
  </SelectContent>
</Select>)
}

