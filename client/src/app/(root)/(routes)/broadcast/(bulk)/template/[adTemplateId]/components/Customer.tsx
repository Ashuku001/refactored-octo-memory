import Image from "next/image"
import { CustomerType } from "@/types"
import Link from "next/link"
import CustomerCellAction from '@/components/ui/CustomerCellAction';

type Props = {
    customer: CustomerType
}


function Customer({ customer }: Props) {
    return (
        <div className="flex flex-col hover:bg-muted/80 dark:hover:bg-muted/50 w-full">
            <div className='w-full'>
                <div className="flex items-center justify-between">
                    <div className='flex space-x-2'>
                        <div className="flex items-center justify-center">
                            <Image
                                src={'/profile.jpg'}
                                height={30}
                                width={30}
                                alt=''
                            />
                        </div>
                        <div className="font-sans line-clamp-1 flex flex-col ">
                            <p className='text-[12px] text-base capitalize line-clamp-1'>{customer?.first_name || customer?.last_name
                                ? `${customer?.first_name} ${" "}  ${customer?.last_name}`
                                : customer?.phone_number
                            }
                            </p>
                            <p className='text-slate-500 text-[12px]'>{ customer?.phone_number}</p>
                        </div>
                    </div>
                    <CustomerCellAction data={customer}/>
                </div>
            <hr className="w-[90%] float-right bg-slate-700 dark:bg-gray-600"></hr>
            </div>
        </div>
    )
}

export default Customer