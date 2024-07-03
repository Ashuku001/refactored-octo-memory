import Image from "next/image"
import { CustomerType } from "@/types"
import Link from "next/link"
import CustomerCellAction from '@/components/ui/CustomerCellAction';

type Props = {
    customer: CustomerType
}


function Customer({ customer }: Props) {
    return (
        <div className="flex flex-col hover:bg-muted/80 dark:hover:bg-muted/50">
            <div>
                <div className="flex items-center justify-between">
                    <Link
                        className="flex items-center w-full"
                        href={{
                            pathname: `/customers/${customer?.id}`,

                        }}
                    >
                        <div className="p-3">
                            <Image
                                src={'/profile.jpg'}
                                height={40}
                                width={40}
                                alt='P'
                            />
                        </div>
                        <div className="text-md font-sans font-normal line-clamp-1 flex flex-col space-between">
                        <h3 className="text-md font-sans font-normal line-clamp-1">
                            <p className=' font-sans text-base capitalize'>{customer?.first_name || customer?.last_name
                                ? `${customer?.first_name} ${" "}  ${customer?.last_name}`
                                : customer?.phone_number
                            }
                            </p>
                        </h3>
                            <p className='text-slate-500'>{ customer?.phone_number}</p>
                        </div>
                    </Link>
                    <CustomerCellAction data={customer}/>
                </div>
            <hr className="w-[85%] float-right bg-slate-700 dark:bg-gray-600"></hr>
            </div>
        </div>
    )
}

export default Customer