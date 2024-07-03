"use client"
import { Suspense, useCallback, useEffect } from 'react';
import { CustomerType } from "@/types"
import { useReactiveVar } from "@apollo/client";
import { useShowSearchList } from "@/cache/cache";
import LoadingChatHeader from '@/components/LoadingChatHeader';
import Customer from './Customer';

type Props = {
    customers?: CustomerType[] | null | undefined;
}

function CustomersSearchList({ customers }: Props) {

    
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
            if (customers?.length ) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        }

        showList(customers as CustomerType[]);
    }, [customers?.length, customers, handleShow]);


    useEffect(() => {
        return () => {
            document.removeEventListener('click',
                handleShow.bind(null, !show), true);
        }
    });



    return (
        <div className={` ${useShowSearchList() ? '' : ' hidden'}  transition-all ease-in-out duration-1000 h-[79.5vh]`}>
            {customers?.length !== 0
                ? <>
                    {customers?.map((customer) => (
                        <Suspense key={customer?.id} fallback={<LoadingChatHeader />}>
                            <Customer key={customer?.id} customer={customer as CustomerType} />
                        </Suspense>
                    ))}
                </>
                : <div className="text-center">You have no customer data yet you can use the form above to add</div>
            }
        </div>
    )
}

export default CustomersSearchList