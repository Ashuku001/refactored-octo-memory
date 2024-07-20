import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {Home} from './components/Home';

function page() {
  const tabs = [
    {
      key: 1,
      head: "Home",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/most-sold-items`,
    },
    {
      key: 2, 
      head: "Train",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/most-bought-items`
    },
    {
      key: 3,
      head: "Recommend",
      url: `${process.env.NEXT_PUBLIC_FASTAPI_URL}/store/sales/most-frequently-bought`
    },
  ]

  return( 
  <div className="w-full h-full py-2 px-1 bg-gradient-to-b  from-muted/20 to-muted/50">
    <Tabs defaultValue={tabs[0]?.head} className="h-full relative rounded-sm">
        <TabsList className="h-8 sticky top-0 right-0 w-full flex justify-start z-40">
            {tabs?.map((tab, i) => 
            <TabsTrigger
                value={tab.head}
                key={i}
                className=''
            >
                {tab.head}
            </TabsTrigger>
                )} 
        </TabsList>
        <ScrollArea className='mt-1 px-1 h-full bg-gradient-to-b from-muted/20 to-muted/50'>
            {tabs?.map((tab, i) => (
                <TabsContent key={i} value={tab.head} className={'flex-1 h-full'}>
                    {tab.head == "Home" && <Home />}
                </TabsContent>
            ))}
            <div className="pb-20"/>
        </ScrollArea>
    </Tabs>
  </div>);
}

export default page;
