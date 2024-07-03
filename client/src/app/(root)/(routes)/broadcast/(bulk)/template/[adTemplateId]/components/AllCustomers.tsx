import {useState, useEffect} from 'react';
import { ChevronsUpDown, ContactIcon, PlusCircleIcon, CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { addDays, format } from "date-fns"

import { CustomerType } from "@/types"
import NoResults from '@/components/ui/No-Results';
import Customer from './Customer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import {Calendar} from "@/components/ui/calendar"
import { SubHeading } from '@/components/ui/SubHeading';
import { Input } from '@/components/ui/input';
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { TemplateAdFormvalue, SelectedCustomerType } from './TemplateForm';
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';

type AllCustomersProps = {
    customers: CustomerType[];
    form: UseFormReturn<{
        [key: string]: "";
    }, any, undefined>;
    onSubmit: (data: TemplateAdFormvalue) => Promise<void>;
    templateDataCheck: boolean
}

export function AllCustomers({customers, form, onSubmit, templateDataCheck}: AllCustomersProps) {
    const [open, setOpen] = useState(false)
    const [selectAll, setSelectAll] = useState(true)
    const [date, setDate] = useState<Date>()
    const sortOptions = [{id: "createdAt", name: "Created At"}, {id: "new", name: 'New'}]
    const schedules = [{id: "08", name: "8: 00AM"}, {id: "10", name: "10: 00AM"}, {id: "12", name: "12: 00 noon"}, {id: "13", name: "1: 00PM"}, {id: "14", name: "2: 00PM"}, {id: "16", name: "4: 00PM"}, {id: "20", name: "8: 00PM"}]

    const handleChange = (checkedCustomer: SelectedCustomerType) => {
        const {selectedCustomers: customers} = form.getValues()
      
        const newIds = !!customers?.find((cus) => cus.id === checkedCustomer.id)
                        ? customers?.filter((customer) => customer.id !== checkedCustomer.id)
                        : [...(customers ?? []), checkedCustomer];

        return newIds
    }

    const handleSelectAll = () => {
        setSelectAll(!selectAll)
        if(selectAll){
            const allCustomers = customers?.reduce((acc, customer) => {
            acc.push({id: customer.id, phone_number: customer.phone_number})
                return acc
            }, new Array<SelectedCustomerType>)

            form.setValue('selectedCustomers', allCustomers)
        } else {
            form.setValue('selectedCustomers', [])
        }
    }

    return (
        <div className='flex flex-col h-full bg-gradient-to-b from-muted/20 to-muted/50 px-2'>
            <Form {...form} className='h-full'>
                <form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col space-y-3'>
                    <FormField
                        control={form.control}
                        name="sort"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title='Sort' variant='optional' description='Choose a customer segment to target.'/>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                    <SelectTrigger className='focus:ring-0'>
                                        <SelectValue
                                            defaultValue={field.value}
                                            placeholder="Select type of sorting."
                                        />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {sortOptions?.map((sort) => (
                                        <SelectItem
                                            key={sort.id}
                                            value={sort.id}
                                        >
                                        {sort.name}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="selectedCustomers"
                        render={({ field }) => (
                        <FormItem>
                            <CustomFormLabel title='Select customers' variant='required' description=''/>
                            <FormLabel></FormLabel>
                            <Popover open={open} onOpenChange={setOpen} className="h-full relative">
                                <PopoverTrigger asChild className='py-4 h-10'>
                                    <Button
                                        variant="outline"
                                        size='sm'
                                        role='combobox'
                                        aria-expanded={open}
                                        aria-label='Select a store'
                                        className={cn("w-full flex justify-between")}
                                    >
                                        <ContactIcon className='mr-2 h-4 w-4' />
                                         {form.getValues().selectedCustomers.length ? `Selected customers (${form.getValues().selectedCustomers.length})` : "Select Customer Contacts" }
                                        <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity=50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-[300px] md:w-[350px] lg:w-[350px] p-0 h-[55vh] relative'>
                                    <Command className='w-full h-full'>
                                        <ScrollArea className='w-full h-full'>
                                            <CommandInput placeholder="Search Contact..." className='sticky top-0'/>
                                            <CommandEmpty className='flex items-center justify-center'><NoResults/></CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem>
                                                    <div className='w-full flex items-center space-x-2 py-2'>
                                                        <Input 
                                                            type='checkbox'
                                                            className='h-4 w-4 p-0'
                                                            value={selectAll}
                                                            checked={!selectAll}
                                                            onChange={handleSelectAll}
                                                        />
                                                        <p className="text-[12px] font-sans text-base">Select All</p>
                                                    </div>
                                                </CommandItem>
                                                {customers?.map((customer: ProductType) => (
                                                <CommandItem
                                                    key={customer.id}
                                                    className=" w-full"
                                                >
                                                    <div className='w-full flex items-center space-x-2'>
                                                        <Input 
                                                            type='checkbox' 
                                                            className='h-4 w-4 p-0'
                                                            {...field}
                                                            value={customer.id}
                                                            onChange={() => field.onChange(handleChange({id: customer.id, phone_number: customer.phone_number}))}
                                                            checked={!!form.getValues().selectedCustomers?.find((cus) => cus.id === customer.id)}
                                                        />
                                                        <Customer key={customer.id} customer={customer}/>
                                                    </div>
                                                </CommandItem>
                                                ))}
                                            </CommandGroup>  
                                        </ScrollArea>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="w-full">
                        <CustomFormLabel title="Schedule" description='When to start the campaign' variant='optional' />
                        <div className='flex items-center w-full space-x-2'>
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className='w-[40%]'>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="w-[40%]"
                                    >
                                        <FormControl>
                                        <SelectTrigger className='focus:ring-0'>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select time"
                                            />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='w-full'>
                                        {schedules?.map((schedule) => (
                                            <SelectItem
                                                key={schedule.id}
                                                value={schedule.id}
                                                className='capitalize flex justify-between w-full'
                                                >
                                                    <span>{schedule.name}</span>
                                            </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex-1 w-[60%]">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "flex-1 text-left font-normal w-full",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar 
                                                mode="single" 
                                                selected={field.value} 
                                                onSelect={field.onChange}
                                                initialFocus
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='flex justify-end bg-muted/80 dark:bg-muted/50 mt-4 rounded-md'>
                        <Button
                            disabled={templateDataCheck}
                            type='submit'
                            className='dark:text-blue-900 dark:hover:bg-blue-200  hover:bg-blue-900 focus:outline-none '
                        >
                            Create campaign
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

