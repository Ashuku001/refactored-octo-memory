'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from "next/navigation";
import { MostSold } from "./item-insights/most-sold-items";
import { Key } from "lucide-react";
import { MostBought } from "./item-insights/most-bought-items";
import { MostFrequentlyBought } from "./item-insights/most-frequently-bought";

export const SalesInsights = () => {
  const params = useParams()
  const storeId = params.storeId
  const tabs = [
    {
      key: 1,
      head: "Most sold items",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/most-sold-items`,
    },
    {
      key: 2, 
      head: "Most bought items",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/most-bought-items`
    },
    {
      key: 3,
      head: "Most frequently bought",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/most-frequently-bought`
    },
    {
      key: 4,
      head: "first choice",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/first-choice`
    },
    {
      key: 5,
      head: "Sales by hour",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/sales-by-hour`
    },
    {
      key: 6,
      head: "Sales by day",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/sales-by-day`
    },
    {
      key: 7,
      head: "Sales by month",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/sales-by-month`
    }
  ]


  return (
    <Tabs defaultValue={tabs[0]?.head} className="h-full relative rounded-sm mt-1 px-1">
        <TabsList className="h-8 sticky top-0 right-0 w-full flex justify-start z-40">
            {tabs?.map((tab, i) => 
            <TabsTrigger
                value={tab.head}
                key={i}
                className='px-2 '
            >
                {tab.head}
            </TabsTrigger>
                )} 
        </TabsList>
        <ScrollArea className='mt-1 h-full bg-gradient-to-b from-muted/20 to-muted/50'>
            {tabs?.map((tab, i) => (
                <TabsContent key={i} value={tab.head} className={'flex-1 h-full'}>
                    {tab.key == 1 && <MostSold base_url={tab.url} storeId={storeId.toString()}/>}
                    {tab.key == 2 && <MostBought base_url={tab.url} storeId={storeId.toString()}/>}
                    {tab.key == 3 && <MostFrequentlyBought base_url={tab.url} storeId={storeId.toString()}/>}
                    {tab.key == 5 && <MostFrequentlyBought base_url={tab.url} storeId={storeId.toString()}/>}
                    {tab.key == 6 && <MostFrequentlyBought base_url={tab.url} storeId={storeId.toString()}/>}
                    {tab.key == 7 && <MostFrequentlyBought base_url={tab.url} storeId={storeId.toString()}/>}
                </TabsContent>
            ))}
            <div className="pb-20"/>
        </ScrollArea>
    </Tabs>
  );
};
