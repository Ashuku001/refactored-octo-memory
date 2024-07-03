import { DynamicContent, InputElement } from "@/types"

type Props = {
    dynamic: DynamicContent
}


function TextDynamicHeader({ dynamic }: Props) {


    return (
        <div>
            <div>{dynamic?.content?.text}</div>
            {dynamic?.inputs?.map((input: InputElement, i: number) => (
						<input key={i} type={input.type} placeholder={input.placeholder} className="bg-slate-200 dark:bg-gray-700 rounded-sm px-1 py-1 outline-none w-full flex-1 pr-2 cursor-auto mb-2" />
					))}
        </div>
    )
}

export default TextDynamicHeader