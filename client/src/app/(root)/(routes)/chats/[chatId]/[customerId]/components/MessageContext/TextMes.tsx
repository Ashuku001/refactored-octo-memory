import { MessageType } from "@/types"

type Props = {
    body: string
}

export function TextMesContext({ body }: Props) {
    return (
        <p className='p-2 break-words'>{body}</p>
    )
}
