'use client'
import { useState, useEffect } from 'react'
import {getClient} from '@/lib/graphql/ApolloClient'
import { Store as StoreIcon, ChevronsUpDown, Check, PlusCircle } from 'lucide-react'
import {useQuery} from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'

import {cn} from "@/lib/utils"
import { listTemplates } from '@/lib/message-helper/getRemoteTemplates'
import {GetSettingDocument} from '@/graphql'
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { useStoreModal } from '../hooks/useStoreModal'
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'
import { StoreType } from "@/types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TemplateSwitcherProps extends PopoverTriggerProps {
  items: StoreType[];
}

function TemplateSwitcher({
  className,
  items = []
}: TemplateSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams()
  const router = useRouter()
  const [templates, setTemplates] = useState([])

  const { data, loading, error } = useQuery(GetSettingDocument)
  const setting = data?.setting

  let formattedItems = templates?.map((item) => ({
    label: item.name.replaceAll('_', " "),
  }))

  // the store that has been
  const currentStore = formattedItems?.find((item) => item.value == params.storeId);

  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false);  // close store switche
    router.push(`/${store.value}`); // show the store
  }

  useEffect(() => {
    const getTemplates = async () => {

        const result = await listTemplates(setting as SettingType)
        setTemplates(result)
        return
    }
    getTemplates()
}, [loading, setting])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a template'
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className='mr-2 h-4 w-4 line-clamp-1' />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity=50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Template..." />
            <CommandEmpty>No template found.</CommandEmpty>
            <CommandGroup heading="templates">
              {formattedItems?.map((store) => (
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
                Create Template
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher