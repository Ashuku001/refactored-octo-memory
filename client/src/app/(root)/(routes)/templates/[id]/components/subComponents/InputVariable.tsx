import {  FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { UpdateVarParams } from "@/store/useCreateTemplate";
import { ChangeEvent, useState } from "react";

type InputVariableProps = {
    to: "HEADER" | "BODY" | "BUTTON";
    index: number;
    value: string;
    onChange: ({ to, index, value }: UpdateVarParams) => void;
}
export function InputVariable({to, index, value, onChange}:InputVariableProps) {
    const [inputVal, setValue] = useState(value)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onChange({to, index: index, value:e.target.value})
    }

    return (
        <FormItem>
            <FormControl>
                <div className="flex items-center space-x-2">
                    <FormLabel >
                        {`{{${index + 1}}}`}
                    </FormLabel>
                    <Input
                        value={inputVal}
                        onChange={handleChange}
                        placeholder={`Enter content for {{${index + 1}}}`}
                    />
                </div>
            </FormControl>
            </FormItem>
    )
}

