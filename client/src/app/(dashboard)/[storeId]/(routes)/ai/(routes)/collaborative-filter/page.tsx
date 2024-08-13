import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {Home} from './components/Home';
import { UserToUserTrain } from './components/UserToUser';
import { ItemToItemTrain } from './components/ItemToItem';
import { KNNTrain } from './components/KNN';
import secureLocalStorage from 'react-secure-storage';

type Props = {
  params: {
      storeId: string
  }
}

function page({params: {storeId}}: Props) {
  const merchantId = secureLocalStorage.getItem('merchantId')
  const tabs = [
    {
      key: 1,
      head: "Home",
    },
    {
      key: 2, 
      head: "User to user train",
    },
    {
      key: 3, 
      head: "Item to item train",
    },
    {
      key: 4, 
      head: "k-nearest neighbour",
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
                    {tab.key == 1 && <Home />}
                    {tab.key == 2 && <UserToUserTrain storeId={storeId} merchantId={merchantId as string}/>}
                    {tab.key == 3 && <ItemToItemTrain storeId={storeId} merchantId={merchantId as string}/>}
                    {tab.key == 4 && <KNNTrain storeId={storeId} merchantId={merchantId as string}/>}
                </TabsContent>
            ))}
            <div className='mb-20'/>
        </ScrollArea>
    </Tabs>
  </div>);
}

export default page;
