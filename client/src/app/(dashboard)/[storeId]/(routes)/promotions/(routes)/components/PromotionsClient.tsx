'use client'
import {Suspense} from 'react';

import PromotionsTabs from "./PromotionsTabs"
import { ClientResizable } from "./ResizableClient"
import LoadingSpinner from '@/components/LoadingSpinner';
import {PromotionForm} from './PromotionForm';
import { PromotionColumnMapObj } from '@/lib/createMap/PromotionsGroup';
import { usePromotionStore } from '@/store/PromotionsStore';
import { cn } from '@/lib/utils';


type PromotionsClientProps = {
    promotions: PromotionColumnMapObj[]
}


export function PromotionsClient({promotions}: PromotionsClientProps) {
  const [promotionType] = usePromotionStore((state) => [state.promotionType])

  return (
    <div className='h-full'>
      <ClientResizable
          minSizeLeft={35}
          minSizeRight={60}
          left={
            <PromotionsTabs
              promotions={promotions ?? []} 
            />
          }
          right={
            promotionType ?
            <div className={cn("h-full", promotionType ? "animate-in" : "animate-out")}>
              <Suspense fallback={ <div className='flex flex-col items-center justify-center py-20 w-full h-full'><LoadingSpinner/></div>}>
                <PromotionForm type={promotionType} />
              </Suspense>
            </div>
            : undefined
          }
      />
    </div>
  )
}
