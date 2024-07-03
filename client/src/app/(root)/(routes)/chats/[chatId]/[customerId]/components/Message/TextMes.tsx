import { MessageType } from "@/types"

type Props = {
    text: string
}

function TextMes({ text }: Props) {
    return (
        <p className='p-2 break-words'>{text}</p>
    )
}

export default TextMes