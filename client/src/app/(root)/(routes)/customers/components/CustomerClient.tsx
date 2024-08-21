'use client'
import {Suspense} from 'react';
import CustomerList from './CustomerList';
import { CustomerClientResizable } from "./ResizableClient"
import { CustomerColumn } from "./Columns";
import { CustomerDetail } from './CustomerDetail';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCustomer } from '@/hooks/useCustomer';

type CustomerClientProps = {
    customers: CustomerColumn[]
}

export function CustomerClient({customers}: CustomerClientProps) {
    const [customerId] = useCustomer(state => [state.customerId])
    
    return (
        <div className='h-full'>
            <CustomerClientResizable
                minSizeLeft={30}
                minSizeRight={40}
                left={
                    <CustomerList
                        customers={customers as CustomerColumn[]} 
                    />
                }
                right={
                    customerId ? 
                    <Suspense fallback={ <div className='flex flex-col items-center justify-center py-20 w-full'><LoadingSpinner/></div>}>
                        <CustomerDetail/>
                    </Suspense>
                    : undefined
                }
            />
        </div>
    )
}

