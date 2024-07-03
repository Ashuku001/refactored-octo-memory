import Image from "next/image"
import { CustomerType } from "@/types"
import Link from "next/link"
import { reactiveChatId } from "@/cache/cache"


type Props = {
    customer: CustomerType
}

function Customer({ customer }: Props) {

    return (
        <div className="flex flex-col hover:bg-muted/80 dark:hover:bg-muted/50">
            <div>
                <Link
                    className="flex items-center"
                    href={{
                        pathname: `/chats/new/${customer?.id}`,
                    }}
                    onClick={(e) => {
                        localStorage.removeItem('activeChat')
                        reactiveChatId(-100)
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
                        <p className=' font-sans text-base capitalize'>{!(customer?.first_name && customer?.last_name)
                            ? customer?.phone_number
                            : `${customer?.first_name} ${"   "}  ${customer?.last_name}`
                        }
                        </p>
                        <p className='text-slate-500'>{(customer?.first_name && customer?.last_name) ? customer?.phone_number : " "}</p>
                    </div>
                </Link>
                <hr className="w-[85%] float-right bg-slate-700 dark:bg-gray-400"></hr>
            </div>
        </div>
    )
}

export default Customer