'use client'
import { useState } from 'react'
import { MessageCircleIcon, ChevronsUpDown, Check } from 'lucide-react'
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils"

import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Command, CommandList, CommandInput,  CommandItem } from '@/components/ui/command'


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ProductSwitcherProps extends PopoverTriggerProps {
}

export function MessageSwitcher({
  className,
}: ProductSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter()

    const routes = [
        // route to settings of a specific store
        {
            href: `/broadcast/template`,
            label: 'Template Message',
            active: pathname === `/broadcast/template`
        },
        {
            href: `/broadcast/list`,
            label: 'List Message',
            active: pathname === `/broadcast/list`
        },
        {
            href: `/broadcast/button`,
            label: 'Button Message',
            active: pathname === `/broadcast/button`
        },
    ]
  const [open, setOpen] = useState(false)
  
  const onMessageSelect = (message: {href: string, label: string}) => {
    router.push(message.href)
    setOpen(false);  // close store switche
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn("w-full justify-between flex", className)}
        >
          <MessageCircleIcon className='mr-2 h-4 w-4' />
          <span className='flex-1 line-clamp-1 text-left'>
            {"Select a message type"}  
          </span>
          <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity=50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 m-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Message Type..." />
            {routes?.map((route) => (
                  <CommandItem
                    key={route.href}
                    className="text-sm"
                    onSelect={() => {
                      onMessageSelect({label: route.label, href: route.href})
                    }}
                  >{route.label}
                    <Check className={cn("ml-auto h-4 w-4",
                      route.active
                        ? "opacity-100"
                        : "opacity-0"
                    )} />
                  </CommandItem>
                ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
