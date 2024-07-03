'use client'
import { useState } from 'react'
import { GiftIcon, ChevronsUpDown, Check, PlusCircle } from 'lucide-react'


import {cn} from "@/lib/utils"
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Command, CommandList, CommandInput,  CommandGroup, CommandItem } from '@/components/ui/command'
import { usePromotionStore, PromotionTypes } from '@/store/PromotionsStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from "lucide-react"

export function PromotionSwitcher() {

  const [setPromotionType, setInitialData,  promotionType] = usePromotionStore((state) => [state.setPromotionType, state.setInitialData, state.promotionType])

  const available = ["Coupon", "Discount"]

  const formattedItems = [
  "Coupon",
  "Free gifts",
  "Discount",
  "Free shipping",
  "Upsell special",
  "Member referral",
  "Free trial",
  "Give away",
  "Buy one get one free",
  "Loyalty",
  "Bundle",
  "Tiered discount",
  "Subscription",
  "Flash sale",
  "Competition",
  "Donation",
  "Cash back"]

  const [open, setOpen] = useState(false)

  const onPromotionSelect = (promotion: PromotionTypes) => {
    setOpen(false);  // close promotion switche
    setInitialData(null)
    setPromotionType(null)
    setPromotionType(promotion)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role='combobox'
          aria-expanded={open}
          aria-label='Select a promotion'
          className={cn("w-[170px] flex items-center ")}
        >
          <GiftIcon size={"20"} />
          <span className='flex-1 line-clamp-1 text-center'>
            {promotionType ? promotionType :  "Add new promotion"}
          </span>
          <Plus size={"20"}/>
          <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity=50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[250px] p-0 h-full'>
            <Command className=''>
                <CommandInput placeholder="Search Promotions type..." />
                <CommandList className='h-[400px]'>
                    <ScrollArea className='h-full'>
                        <CommandGroup heading="Add new promotion">
                        {formattedItems.map((promotion) => (
                            <CommandItem
                              key={promotion}
                              disabled={!available.includes(promotion)}
                              onSelect={() => onPromotionSelect(promotion as PromotionTypes)}
                              className="text-sm"
                            >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            {promotion}
                            <Check className={cn("ml-auto h-4 w-4",
                                promotionType === promotion
                                ? "opacity-100"
                                : "opacity-0"
                            )} />
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </ScrollArea>
                </CommandList>
            </Command>
      </PopoverContent>
    </Popover>
  )
}