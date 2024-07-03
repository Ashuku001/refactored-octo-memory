'use client'
import { useState } from 'react'
import { Store as StoreIcon, ChevronsUpDown, Check, PlusCircle } from 'lucide-react'
import {cn} from "@/lib/utils"
import { useParams, useRouter } from 'next/navigation'


import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { useStoreModal } from '@/hooks/useStoreModal';
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'

import { StoreType } from "@/types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: StoreType[];
}

function StoreSwitcher({
  className,
  items = []
}: StoreSwitcherProps) {

  const storeModal = useStoreModal();
  const params = useParams()
  const router = useRouter()


  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item.id
  }))


  // the store that has been
  const currentStore = formattedItems?.find((item) => item.value == params.storeId);

  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false);  // close store switche
    router.push(`/${store.value}`); // show the store
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className='ml-2 '>
          <Button
            variant="outline"
            size='sm'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a store'
            className={cn("w-[200px] justify-between ", className)}
          >
            <StoreIcon className='mr-2 h-4 w-4' />
            <span className='flex-1 line-clamp-1 text-left'>
              {currentStore?.label}
            </span>
            <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      <PopoverContent className='w-[200px]  p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="store">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  {store.label}
                  <Check className={cn("ml-auto h-4 w-4",
                    currentStore?.value === store.value
                      ? "opacity-100"
                      : "opacity-0"
                  )} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher