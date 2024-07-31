'use client'
import {  Check, PlusCircle, StoreIcon, ChevronsUpDown, XIcon } from 'lucide-react'
import {useState} from "react"
import {cn} from "@/lib/utils"
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'
import { ProductType } from '@/types'
import { Button } from '@/components/ui/button'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ProductSwitcherProps extends PopoverTriggerProps {
    children?: React.ReactNode;
    products: ProductType[];
    value: string;
    loading: boolean;
    onValueChange: (value: string) => void;
    product: ProductType | null,
    setProduct: Dispatch<SetStateAction<({
        __typename?: "Product";
        id: number;
        name: string;
        description?: string | null;
        price: any;
        category: {
            __typename?: "Category";
            name: string;
        };
        images?: Array<{
            __typename?: "Image";
            url: string;
        } | null> | null;
    } | null)[] | null | undefined>>,
}

export function ProductSwitcher({
    className,
    products,
    value,
    onValueChange,
    product,
    setProduct,
}: ProductSwitcherProps) {
    const [open, setOpen] = useState(false)

    const onProductSelect = (prod) => {
        setProduct([prod])
        onValueChange(prod?.name)
    }
  
    return (
        <Popover>
            <PopoverTrigger className={cn(className)}>
                <Button
                    variant="outline"
                    size='sm'
                    role='combobox'
                    aria-expanded={open}
                    aria-label='Select a store'
                    className={cn("w-[200px] flex justify-between", className)}
                >
                    <StoreIcon className='mr-2 h-4 w-4' />
                    <span className='flex-1 line-clamp-1 text-left'>
                        {product ? product.name : "Select a product"}
                    </span>
                    <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity=50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side={'bottom'} className='w-[400px] p-0'>
                <Command>
                    <CommandList>
                        <div className="flex items-center relative w-full">
                            <CommandInput 
                                placeholder="Search Product..."
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
                    {products?.slice(0, 4)?.map((prod: ProductType) => (
                            <Button
                                key={prod?.id}
                                variant={"ghost"}
                                onClick={() => onProductSelect(prod)}
                                className="text-sm w-full rounded-sm"
                            >
                                <p className="line-clamp-1">
                                    {prod?.name.trim()}    
                                </p>
                                <Check className={cn("ml-auto h-4 w-4",
                                prod?.id === product?.id
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
