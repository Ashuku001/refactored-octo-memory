import { ChatType, CustomerType } from "@/types";
import ChatSearchComponent from "./ChatSearchComponent";
import { useReactiveVar } from "@apollo/client";
import { useShowSearchList } from "@/cache/cache";
import { useEffect, useCallback, Suspense } from 'react'
import LoadingChatHeader from '@/components/LoadingChatHeader';
import ChatComponent from './ChatComponent';
import {useState} from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Customer from './Customer';

type Props = {
    customers?: (CustomerType)[] | null | undefined;
    chats?: (ChatType)[] | null;
}

function CustomersList({ customers, chats }: Props) {
    let activeChat = useState<number>(-100)

    const show = useReactiveVar(useShowSearchList)
    let content = null

    const handleShow = useCallback((show: boolean) => {
        if (show) {
            document.addEventListener('click',
                handleShow.bind(null, !show), true);
        } else {
            document.removeEventListener('click',
                handleShow.bind(null, !show), true);
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useShowSearchList(show);
    }, [])

    useEffect(() => {
        const showList = (customers: CustomerType[]) => {
            if (customers?.length || chats?.length) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        }

        showList(customers as CustomerType[]);
    }, [customers?.length, chats?.length, customers, handleShow]);


    useEffect(() => {
        return () => {
            document.removeEventListener('click',
                handleShow.bind(null, !show), true);
        }
    });


    if (customers || chats) {
        content = 
        <div className="h-full overflow-hidden">
            <ScrollArea className="h-full">
                <div >
                    
                    {chats?.length !== 0 &&
                        <div>
                            <h1 className="fond-bold text-center text-slate-400 text-[18px]">Chats</h1>
                            {chats?.map((chat) => (
                                <Suspense key={chat?.id} fallback={<LoadingChatHeader />}>
                                    <ChatComponent chat={chat} activeChat={activeChat}/>
                                </Suspense>
                            ))}
                        </div>
                    }
                </div>
                <div>
                    {customers?.length !== 0 &&
                        <div className="flex flex-col mt-4">
                            <h1 className="fond-bold text-center text-slate-400 text-[18px]">Customers</h1>
                            {customers?.map((customer) => (
                                <Suspense key={customer?.id} fallback={<LoadingChatHeader />}>
                                    <Customer customer={customer} />
                                </Suspense>
                            ))}
                        </div>
                    }
                </div>
            </ScrollArea>
        </div>
    }

    return (
        // <div className={` ${useShowSearchList() ? 'translate-y-0' : '-translate-y-full'} ease-in-out duration-300`}>
        <div className={` ${useShowSearchList() ? '' : ' hidden'} z-30 transition-all ease-in-out duration-1000 h-[70vh]`}>
            {content}
        </div>
    )
}

export default CustomersList