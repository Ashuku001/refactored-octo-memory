import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { InputElement } from "@/types";

type Props = {
	dynamic: any;
	form: any;
}

function DynamicButtons({dynamic, form}: Props) {
  return (
    <div>
      {dynamic?.inputs?.map((input:InputElement, i) => (
        <div key={i} className=" mb-2">
        <FormField
            control={form.control}
            name={input?.name}
            render={({ field }) => (
                <FormItem >
                    <div className='flex flex-col w-full'>
                        <div className="flex items-center space-x-2 w-full">
                            <FormLabel htmlFor={input?.name}>{input?.label}</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete="do-not-autofill"
                                    type={input.inputType}
                                    name={input?.name}
                                    placeholder={input?.placeholder}
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
    </div>
      ))}
    </div>
  )
}

export default DynamicButtons
