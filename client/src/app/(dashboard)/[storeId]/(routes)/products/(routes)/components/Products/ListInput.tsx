import { useState, KeyboardEvent, useEffect } from 'react';
import { XIcon, XCircleIcon, } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SelectedChoices } from './SelectedChoices';

type ListInputProps = {
  form: UseFormReturn<{
      [key: string]: string[];
  }, any>;
  inputName: string;
  suggestions: string[];
  placeholder: string;
  existingInputs?: string[];
}

export function ListInput({form, inputName, suggestions, placeholder, existingInputs}: ListInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputSuggestions, setInputSuggestions] = useState<string[]>([])

  const onChange = (value: string) => {
    let newSuggestions: string[] = []
    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      newSuggestions = suggestions.sort().filter((v) => regex.test(v))
    }
    setInputSuggestions(newSuggestions)
  }

  const onSuggestionSelect = (value: string) => {
    const list = form.getValues(inputName)

    let newList: string[] | [] = []
    if(list?.find((item) => item === value)) {
      const index = list?.findIndex((item) => item === value)
      newList = list?.splice(index, 1, value)
      form.setValue(inputName, list)
    } else {
      newList = [...(list ?? []), value]
      form.setValue(inputName, newList)
    }
    setInputValue('');
    setInputSuggestions([])
    form.setFocus(inputName)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const list = form.getValues(inputName)
      let newList: string[] | [] = []
      if(list?.find((item) => item === inputValue)) {
        const index = list?.findIndex((item) => item === inputValue)
        newList = list?.splice(index, 1, inputValue)
        form.setValue(inputName, list)
      } else {
        newList = [...(list ?? []), inputValue]
        form.setValue(inputName, newList)
      }
      setInputValue('');
     
      form.setFocus(inputName)
      setInputSuggestions([])
    }
  }

  const onDelete = (deleted: string) => {
    const list = form.getValues(inputName)
      const newList = !!list?.find((item) => item === deleted)
        ? list?.filter((item) => item !== deleted)
        : [...(list ?? [])]
      form.setValue(inputName, newList)
      setInputSuggestions([])
  }

  useEffect(() => {
    form.setFocus(inputName)

  //  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.setFocus, inputName])

  return (
    
      <div className='relative flex items-center space-x-2 h-10 w-full rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
        <ScrollArea className='md:max-w-[200px] lg:max-w-[500px] py-2'>
            <ScrollBar orientation='horizontal'/>
            <ul className='flex space-x-1 items-center'>
              {form.getValues(inputName)?.length 
                ? form.getValues(inputName)?.map((item, index) => (
                    <SelectedChoices key={index} onDelete={onDelete} item={item} />
                  ))
                : existingInputs?.map((item, index) => (
                  <SelectedChoices key={index} onDelete={onDelete} item={item} />
                ))}
            </ul>
          </ScrollArea>
          <div className='relative p-1 flex-1'>
            {!!inputSuggestions.length && 
              <ul className='absolute top-12 left-0 mx-auto bg-background w-[250px] border rounded-md'>
                {inputSuggestions.map((suggestion, index) => 
                  <li 
                    key={index}
                    onClick={() => onSuggestionSelect(suggestion)}
                    className='cursor-pointer hover:bg-muted/80 w-full py-2 rounded-md pl-2'
                  >
                    {suggestion}
                  </li>
                )}
              </ul>
            }
            <Input 
              type="text"
              placeholder={placeholder}
              className={"flex h-8 w-full border-none px-1 text-sm ring-none  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
              value={inputValue}
              onChange={(event) => {setInputValue(event.target.value); onChange(event.target.value)}}
              onKeyDown={handleKeyDown}
            />
            <Button 
              variant={'ghost'}
              type='button'
              className=' rounded-lg absolute top-0 right-0'
              onClick={() => setInputValue('')}
            >
              <XCircleIcon size={20}/>
            </Button>
          </div>
      </div>
  );
}
