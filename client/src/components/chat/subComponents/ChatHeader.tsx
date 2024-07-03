'use client'
import Image from 'next/image'
import { CustomerType } from '@/types';
import { GetCustomerInfoDocument } from '@/graphql'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

type Props = {
    customerId: number;
}

function ChatHeader({  customerId }: Props) {
    const {data} = useSuspenseQuery(GetCustomerInfoDocument, {variables: {customerId: customerId}})
    const customer = data?.customer
    return (
        <div className='flex justify-between items-center w-full cursor-pointer'>

            <div className='flex justify-between items-center space-x-4'>
                <Image
                    src={'/profile.jpg'}
                    height={45}
                    width={45}
                    className='h-[45px] w-[45px]'
                    alt='p'
                />
                <div className='flex flex-col'>
                    <p className='font-sans font-medium text-base line-clamp-1'>{(customer?.first_name || customer?.last_name)
                        ? `${customer?.first_name} ${"   "}  ${customer?.last_name}`
                        : customer?.phone_number
                    }
                    </p>
                    <p className='font-sans font-medium text-base line-clamp-1 text-slate-500'>{(customer?.first_name || customer?.last_name) ? customer?.phone_number : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
