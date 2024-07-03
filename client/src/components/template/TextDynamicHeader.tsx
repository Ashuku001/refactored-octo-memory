'use client'
import { DynamicContent, InputElement } from "@/types"
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


type Props = {
    dynamic: any;
    form: any;
}


function TextDynamicHeader({ dynamic, form }: Props) {


    return (
        <div>
            <div>{dynamic?.content?.text}</div>
            {dynamic?.inputs?.map((input: InputElement, i: number) => (
                <FormField
                    key={i}
                    control={form.control}
                    name="headerText"
                    render={({ field }) => (
                        <FormItem >
                            <div className='flex flex-col w-full'>
                                <div className="flex items-center justify-start space-x-2 w-full">
                                    <FormLabel htmlFor={input?.name}>{input?.name}</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="do-not-autofill"
                                            type={input.type}
                                            id={input?.id}
                                            name="headerText"
                                            placeholder={input.placeholder}
                                            {...field}
                                            className="bg-slate-200 dark:bg-gray-700 rounded-sm px-1 py-1 outline-none w-full flex-1 pr-2 cursor-auto mb-2"
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
            ))}
        </div>
    )
}

export default TextDynamicHeader