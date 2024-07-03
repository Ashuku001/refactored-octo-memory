'use client'
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { CouponObj, DiscountObj, PromotionColumnMapObj } from "@/lib/createMap/PromotionsGroup"
import { PromotionSwitcher } from "./PromotionSwitcher";
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CouponCards } from "./CouponCards";
import { DiscountCards } from "./DiscountCards";
import { usePromotionStore } from "@/store/PromotionsStore";

type Props = {
    promotions: PromotionColumnMapObj[] | []
}

const PromotionsTabs = ({ promotions }: Props) => {
    const [setPromotionType] = usePromotionStore((state) => [state.setPromotionType])

    // useEffect(() => {
    //     document.addEventListener('click', () =>  setPromotionType(null), true);
    //     return () => {
    //         document.removeEventListener('click', () =>  setPromotionType(null), true);
    //     };
    // }, [setPromotionType])

    return (
        <div className=' h-full'>
            <div className='flex items-center sticky top-0 justify-end bg-muted/80 dark:bg-muted/50  px-2 py-1 shadow-sm dark:shadow-slate-500'>
                <div className="font-bold text-lg">
                    Promotions {promotions?.length}
                </div>
                <div className="ml-auto  px-2">
                    <PromotionSwitcher />
                </div>
            </div>
                <Tabs defaultValue={promotions[0]?.tab} className="h-full relative rounded-sm mt-1 px-1">
                    <TabsList className="h-8 sticky top-0 right-0 w-full flex justify-start">
                        {promotions?.map((board, i) => 
                        <TabsTrigger
                            value={board.tab}
                            key={i}
                            className='px-5 '
                        >
                            {board.tab} ( {board?.promotions?.length ?? 0} )
                        </TabsTrigger>
                            )} 
                    </TabsList>
                    <ScrollArea className='h-full px-1 pl-1 mt-1 bg-gradient-to-b from-muted/20 to-muted/50'>
                        {promotions?.map((board, i) => (
                            <TabsContent key={i} value={board.tab} className={'flex-1'}>
                                {board.tab == "coupon" && <CouponCards coupons={board.promotions as CouponObj[]} />}
                                {board.tab == "discount" && <DiscountCards discounts={board.promotions as DiscountObj[]} />}
                            </TabsContent>
                        ))}
                        <div className="pb-20"/>
                    </ScrollArea>
                </Tabs>
        </div>
    )
}

export default PromotionsTabs