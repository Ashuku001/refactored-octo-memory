import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
  import { zodResolver } from "@hookform/resolvers/zod"
//@ts-ignore
import { z } from "zod"
import { Input } from "./ui/input"
import { CustomFormLabel } from "./ui/CustomFormLabel"

const FormSchema = z.object({
    phoneNumber: z.string().regex(/^(?:\d{9}|0\d{9})$/, {
        message: "Invalid Kenyan phone number. It should be exactly 9 digits."
      }),
    code: z.string().optional(),
}).passthrough();

interface FormProps {
    [key: string]: any,
}

type Props = {
    description?: string;
    variant?: "required" | "optional";
    form: any;
}

export const validateNumber = ({code, phoneNumber}: {code: string, phoneNumber: string}) => {
    let temp = ""
    code?.startsWith("+") ? temp = code.slice(1) : temp = code ?? "254"
    if(phoneNumber.length == 10 ){
        temp += phoneNumber.slice(1)
    } else if( phoneNumber.length == 9){
        temp += phoneNumber
    }
    console.log(temp)
    return temp
}

export const PhoneNumberInput = ({
    description,
    variant,
    form
}: Props) => {

    return (
        <div className="">
            <CustomFormLabel title="Phone number" description={description ?? ""} variant={variant ?? "required"} />
            <div className="flex space-x-1 mt-2">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem className="w-15">
                            <FormControl >
                                <Input
                                    disabled
                                    placeholder="+254"
                                    type="number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="focus-visible:ring-0 w-20"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl >
                                <Input
                                    id="phoneNumber"
                                    placeholder="7XXXXXXXX"
                                    type="number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="focus-visible:ring-0 flex-1"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}