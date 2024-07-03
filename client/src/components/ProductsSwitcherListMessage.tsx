'use client'
import { useState } from 'react'
import { StoreIcon, ChevronsUpDown, Check, PlusCircle } from 'lucide-react'


import {cn} from "@/lib/utils"
import { GetAllProductsDocument } from '@/graphql';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'

import { useProductModal } from '@/hooks/useProductModal';
import { useInteractiveListStore, RowType } from '@/store/InteractiveListStore';


export type ProductType = {
  id: number;
  name: string;
  price: string;
}

export type StoreType = {
  id: number;
  name: string;
  products: ProductType[]
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ProductSwitcherProps extends PopoverTriggerProps {
  sectionId: number;
  row: RowType
}

export function ProductsSwitcherListMessage({
  className,
  sectionId,
  row
}: ProductSwitcherProps) {
  const [open, setOpen] = useState(false)
  const { data  } =  useSuspenseQuery( GetAllProductsDocument)
  //@ts-ignore
  const stores:  StoreType[] = data.allProducts as StoreType[]
  const productModal = useProductModal();
  // @ts-ignore
  const [updateProduct] = useInteractiveListStore((state) => [
    state.updateProduct,
  ])
  
  const onProductSelect = (product: { id: number, price: string, name: string }) => {
    setOpen(false);  // close store switche
    if(product.id){
      updateProduct(sectionId, row.id, {product: product})
    } else {
      updateProduct(sectionId, row.id, {product: null})
    }
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
          className={cn("w-[200px] justify-between flex", className)}
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          <span className='flex-1 line-clamp-1 text-left'>
            {row.product ? row.product.name : "Select a product"}
          </span>
          <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity=50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Product..." />
            <CommandEmpty>No product found.</CommandEmpty>
            {stores?.map((store: StoreType, ) => (
              <CommandGroup key={store.id} heading={store.name}>
                {!store.products.length ?
                <p className='font-light text-[12px] text-center'>No products in this store</p>
                : 
                store.products?.map((product: ProductType) => (
                  <CommandItem
                    key={product?.id}
                    onSelect={() => onProductSelect(product)}
                    className="text-sm"
                  >
                    {product.name}
                    <Check className={cn("ml-auto h-4 w-4",
                      row.product?.id === product.id
                        ? "opacity-100"
                        : "opacity-0"
                    )} />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  productModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Product
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
