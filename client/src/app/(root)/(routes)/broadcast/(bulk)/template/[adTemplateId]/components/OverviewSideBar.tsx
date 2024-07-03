import Image from "next/image"
import { format } from 'date-fns';
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MarketResponseObj } from "@/types";
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGroupedResponse } from '@/lib/createMap/marketResponseGroup';
import { DataTable } from '@/components/ui/DataTable';
import { columns } from './Columns';
import {MenuIcon} from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useBulkNav } from '@/hooks/useSideNav';
import { TipTool } from '@/components/ui/TipTool';

export type AdTemplateOverviewProps ={
    adTemplate: {
        name: string;
        adTempProduct: {
            name: string;
            price: string;
            images: {
                url: string; 
                id: number;
            }[];
        };
        
        adTempMessage: {
          id: number;
          interactive: {
              template: {
                  buttons: {
                      text: string
                  }[];
              };
          };
        };

        adTempResponses: {
            id: number;
            cusTempLead: {
              id
              phone_number: string;
              first_name: string;
              last_name: string;
            },
            mesTempLead: {
              id: number;
              createdAt: string;
              chat: {
                id: number;
              };
              mesTempReply: {
                text: string
              }
            }
        }[] 
    }
}


export function OverviewSideBar({adTemplate}: AdTemplateOverviewProps) {
  const bulkNav = useBulkNav()
  const tabs: string[] = adTemplate?.adTempMessage?.interactive?.template?.buttons?.map((btn) => {return btn.text})
  const responses: MarketResponseObj = adTemplate.adTempResponses?.map((response) => (
    {
    customer: {
      id: response.cusTempLead.id,
      name: response.cusTempLead?.first_name + ` ${response.cusTempLead?.last_name}`,
      phone: response.cusTempLead.phone_number,
    },
    chatId: response.mesTempLead.chat.id,
    response: response.mesTempLead.mesTempReply.text.length > 100 ?  response.mesTempLead.mesTempReply.text.slice(0, 100) + "..." : response.mesTempLead.mesTempReply.text,
    createdAt: format(new Date(response.mesTempLead.createdAt), "MMM do, yy")
  }
  ))

  const newResponses = getGroupedResponse(responses, tabs)

  return (
    <div className="flex flex-col w-full h-full">
      <div className='flex space-x-2'>
        <TipTool 
            tip='Ad template menu'
            onClick={() => bulkNav.onOpen()}
        >
            <MenuIcon size="25" className="hover:bg-slate-600"/>
        </TipTool>
        <Heading 
          title={`${adTemplate?.name?.replaceAll("_", ' ')} template performance`} 
          description="Response and click throughs from your bulk template message."
        />
      </div>
      <Separator />
      <div className="pt-2 pb-2">
        <h1 className="text-xl font-semibold">Associated product</h1>
        <div className="flex items-center space-x-5">
          <div className="w-[200px]">
            <p className="font-semibold line-clamp-1">{adTemplate.adTempProduct?.name}</p>
            <p className="font-semibold line-clamp-1"> <span>Ksh </span>{adTemplate.adTempProduct?.price}</p>
          </div>
          <div className="flex-1">
            <ScrollArea className='w-full'>
              <ScrollBar orientation="horizontal" />
              <div className="flex items-center space-x-5">
                  {adTemplate.adTempProduct?.images?.map((image) =>
                        <Image  key={image.id} width={200} height={200} src={image?.url} alt="" className="w-[100px] h-auto max-h-[120px] object-cover rounded-md"/>
                  )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      <Tabs defaultValue={newResponses[0]?.tab} className="h-full flex-1 bg-gradient-to-b from-muted/20 to-muted/50 rounded-sm">
          <TabsList>
              {newResponses?.map((board, i) => 
              <TabsTrigger
                  value={board.tab}
                  key={i}
                  className='px-5'
              >
                  {board.tab} ( {board?.customers?.length} )
              </TabsTrigger>
                )} 
          </TabsList>
          {newResponses?.map((board, i) => (
            <TabsContent key={i} value={board.tab} className={'h-full '}>
                <DataTable columns={columns} data={board.customers} searchKey="name" />
            </TabsContent>
            ))}
      </Tabs>
    </div>
  )
}
