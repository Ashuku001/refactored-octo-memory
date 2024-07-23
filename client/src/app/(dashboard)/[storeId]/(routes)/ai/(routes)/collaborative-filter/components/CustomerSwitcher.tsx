'use client'
import {  Check, PlusCircle, StoreIcon, ChevronsUpDown, XIcon } from 'lucide-react'
import {useState} from "react"
import {cn} from "@/lib/utils"
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'
import { CustomerType } from '@/types'
import { Button } from '@/components/ui/button'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface CustomerSwitcherProps extends PopoverTriggerProps {
    children?: React.ReactNode;
    customers: CustomerType[];
    value: string;
    onValueChange: (value: string) => void;
    customer: CustomerType | null,
    setCustomer: Dispatch<SetStateAction<({
        __typename?: "Customer";
        id: number;
        first_name?: string | null;
        last_name?: string | null;
        customerSegment?: string | null;
        incomeCategory?: string | null;
        phone_number: string;
    } | null)[] | null | undefined>>,
}

export function CustomerSwitcher({
    className,
    customers,
    value,
    onValueChange,
    customer,
    setCustomer,
}: CustomerSwitcherProps) {
    const [open, setOpen] = useState(false)

    const onCustomerSelect = (cus) => {
        setCustomer([cus])
        onValueChange([
            (cus?.first_name && cus?.last_name)  ? cus?.first_name.trim() + " " + cus?.last_name.trim() : cus?.first_name ?? cus?.last_name
            + " " + cus?.phone_number
        ])
    }
  
    return (
        <Popover>
            <PopoverTrigger className='w-full'>
                <Button
                    variant="outline"
                    size='sm'
                    role='combobox'
                    aria-expanded={open}
                    aria-label='Select a customer'
                    className={cn(" flex justify-between", className)}
                >
                    <StoreIcon className='mr-2 h-4 w-4' />
                    <span className='flex-1 line-clamp-1 text-left'>
                        {customer ? (customer?.first_name && customer?.last_name)  ? 
                                    customer?.first_name.trim() + " " + customer?.last_name.trim() : customer?.first_name ?? customer?.last_name ?? "No Name"
                                    + " " + customer?.phone_number : "Select a customer"}
                    </span>
                    <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity=50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side={'bottom'} className='w-[400px] p-0' onOpenAutoFocus={() => {console.log('focused')}}>
                <Command>
                    <CommandList>
                        <div className="flex items-center relative w-full">
                            <CommandInput 
                                placeholder="Search customer..."
                                value={value}
                                onValueChange={onValueChange}
                                className='w-[350px] flex-1 pr-6'
                            />
                            <Button
                                variant={"ghost"}
                                size={"icon"} 
                                className='absolute w-10 h-10 right-0'
                                onClick={() => onValueChange("")}
                            >
                                <XIcon size={"20"}/>
                            </Button>
                        </div>
                    </CommandList>
                </Command>
                <div>
                    {customers?.slice(0, 4)?.map((cus: CustomerType) => (
                            <Button
                                key={cus?.id}
                                variant={"ghost"}
                                onClick={() => onCustomerSelect(cus)}
                                className="text-sm w-full rounded-sm"
                            >
                                <p className="line-clamp-1">
                                    {(cus?.first_name && cus?.last_name)  ? cus?.first_name.trim() + " " + cus?.last_name.trim() : cus?.first_name ?? cus?.last_name}
                                    {" "}{cus?.phone_number}
                                </p>
                                <Check className={cn("ml-auto h-4 w-4",
                                cus?.id === customer?.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )} />
                            </Button>
                        ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
