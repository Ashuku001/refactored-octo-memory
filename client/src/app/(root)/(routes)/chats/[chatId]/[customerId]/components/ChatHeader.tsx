import Image from 'next/image'
import { CustomerType } from '@/types';
import { getClient } from '@/lib/graphql/ApolloClient'
import { GetCustomerInfoDocument } from '@/graphql'
import CustomerCellAction from '@/components/ui/CustomerCellAction';

type Props = {
    customerId: number;
}


async function ChatHeader({  customerId }: Props) {
    const { data } = await getClient().query({
        query: GetCustomerInfoDocument,
        variables: { customerId: customerId }
    });
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
            <div className="flex justify-between items-center">
                <div className="w-[40px] h-[40px] flex justify-center items-center ">
                    <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="#54656F" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                </div>
                <div className="w-[40px] h-[40px] flex justify-center items-center">
                    <CustomerCellAction data={customer}/>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
