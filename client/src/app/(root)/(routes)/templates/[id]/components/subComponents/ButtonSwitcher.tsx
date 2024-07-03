'use client'
import { useEffect, useState } from 'react'
import { PlusIcon, ChevronsDown } from 'lucide-react'


import {cn} from "@/lib/utils"

import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Command, CommandList, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'
import { useCreateTemplateStore, buttonOptions, TypedBtn, TypedBtnColumn, QuickReplyType, OptOutType, WhatsAppType, PhoneNumberType, UrlType, CopyCodeType } from '@/store/useCreateTemplate'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ButtonSwitcherProps extends PopoverTriggerProps {

}


export function ButtonSwitcherPopover({
  className,
}: ButtonSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [addButton, buttonBoard] = useCreateTemplateStore((state) => [state.addButton, state.buttonBoard])
  const [selectedBtns, setSelectedBtns] = useState<(
    QuickReplyType | OptOutType
    | PhoneNumberType
    | UrlType
    | CopyCodeType
    | WhatsAppType
  )[] | []>([])


  const onButtonSelect = (value: TypedBtn, columnId: TypedBtnColumn) => {
    setOpen(false);  // close store switche
    addButton({value, columnId})
  }

  useEffect(() => {
    let buttons: (QuickReplyType | OptOutType | PhoneNumberType | UrlType | CopyCodeType | WhatsAppType) [] | []= []
    Array.from(buttonBoard.columns.entries())?.forEach(([id, columns]) => {
      buttons = [...buttons, ...columns.buttons]
    })
    setSelectedBtns(buttons)
  }, [buttonBoard.columns])


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn("w-[180px] bg-muted/50 dark:bg-muted/30 flex items-center space-x-2", className)}
        >
          <PlusIcon size={"20"} />
          <span className=''>
            Add a button
          </span>
          <ChevronsDown size={"20"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[180px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup heading="Quick reply buttons">
              {buttonOptions.quickReply?.map((btn, i) => (
                <CommandItem
                  disabled={btn.max <= selectedBtns.filter(selected => selected.type === btn.value as TypedBtn)?.length}
                  key={i}
                  onSelect={() => {onButtonSelect(btn.value as TypedBtn, btn.columnId as TypedBtnColumn)}}
                >
                  <div className='flex flex-col'>
                    <p>{btn.title}</p>
                    <p className='text-muted-foreground'>{btn.desc}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup className='' heading="Call to action buttons">
              {buttonOptions.callToAction?.map((btn, i) => (
                <CommandItem
                  disabled={btn.max <= selectedBtns.filter(selected => selected.type === btn.value as TypedBtn)?.length}
                  key={i}
                  onSelect={() => {onButtonSelect(btn.value as TypedBtn, btn.columnId as TypedBtnColumn)}}
                >
                  <div className='flex flex-col'>
                    <p>{btn.title}</p>
                    <p className='text-muted-foreground'>{btn.desc}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
