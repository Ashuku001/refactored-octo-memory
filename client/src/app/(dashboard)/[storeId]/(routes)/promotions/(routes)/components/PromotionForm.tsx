'use client'
import {useState, useEffect} from 'react';
import { useParams } from 'next/navigation';

import { ScrollArea } from "@/components/ui/scroll-area";
import AlertModal from '@/components/modals/AlertModal';
import { PromotionTypes, usePromotionStore } from '@/store/PromotionsStore';
import { TipTool } from '@/components/ui/TipTool';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Trash } from 'lucide-react';
import { CouponObj, DiscountObj } from '@/lib/createMap/PromotionsGroup';
import DiscountForm from './DiscountForm';
import CouponForm from './CouponForm';
import { GetStoreDocument } from '@/graphql';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

type Props = {
    type: PromotionTypes,
}
export function PromotionForm({type}: Props) {
  const params = useParams()
  const [openDel, setOpenDel] = useState(false)
  const [setPromotionType, initialData] = usePromotionStore((state) => [state.setPromotionType, state.initialData])

  const delLoading = false
  const upLoading = false
  const onDelete = () => {}

  const title = initialData ? `Edit ${type?.toLowerCase()} promotion` : `Create new ${type?.toLowerCase()} promotion`
  const action = initialData ? "Save changes" : "Create"

  const {data} = useSuspenseQuery(
    GetStoreDocument,
    {variables: {storeId: parseInt(params.storeId as string), }, fetchPolicy: "no-cache"} ,
 )
 
  return (
      <div className='h-full'>
          <AlertModal
              isOpen={openDel}
              onClose={() => setOpenDel(false)}
              onConfirm={onDelete}
              loading={delLoading}
          />
          <div className='flex w-full justify-end bg-muted/80 dark:bg-muted/50    px-2 py-1'>
          <div className="flex items-center space-x-5">
            <Button 
              variant={'ghost'}
              className="bg-slate-900 py-0"
              onClick={() => setPromotionType(null)}
            >
              <ArrowLeftIcon size={20} className='text-white'/>
            </Button>
            <div className="font-bold text-lg">
              {title}
            </div>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            {initialData &&
              <div className=" px-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 py-2 rounded-md text-sm">
                <TipTool
                  tip="Delete promotion"
                  sideOffset={4}
                  className='flex items-center space-x-2 z-50'
                  onClick={() => { setOpenDel(true) }}
                >
                  <div className='text-md font-semibold'>Delete</div>
                  <Trash className='h-4 w-4' />
                </TipTool>
              </div>
              } 
              <Button 
                disabled={upLoading}
                className="py-0 px-2"
                type='submit'
                form="promotionForm"
              >
                {action}
              </Button>
            </div>
        </div>
        <ScrollArea className='h-full px-2 w-full py-2 pb-[40px]'>
          {type?.toLowerCase() == "discount" && <DiscountForm initialData={initialData as DiscountObj}/>}
          {type?.toLowerCase() == "coupon" && <CouponForm initialData={initialData as CouponObj}/>}
          <div className='mb-[50px]'/>
        </ScrollArea>
      </div>
  )
}
