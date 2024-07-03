import { Check, Clock3, CheckCheck } from 'lucide-react'
type Props = {
    status: string | null
}

function Status({ status }: Props) {
    return (
        <span className={`${status === "read" ? 'text-blue-700' : 'text-slate-500'} flex`} >
            {status === "read" || status === "delivered"
                ?
                <>
                    <CheckCheck className='h-5 w-5' />
                </>
                :
                status === 'sent'
                    ?
                    <Check className='h-5 w-5' />
                    :
                    <Clock3 className='h-5 w-5' />
            }
        </span>
    )
}

export default Status
