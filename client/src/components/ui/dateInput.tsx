import React from "react";
import { FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {format} from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { CustomFormLabel } from "./CustomFormLabel";

export interface DateInputType {
    startDate: Date;
    endDate: Date;
    validTo: Date;
    validFrom: Date;
    date: Date;
    [key: string]: Date;
}

export type DateInputFormType = UseFormReturn<DateInputType, any, DateInputType>

type DateInputProps = {
    form: DateInputFormType
    inputName: "startDate" | "endDate" | "validFrom" | "validTo" | "date";
    placeholder: string;
    variant: "required" | "optional" | undefined;
    className?: string;
    greaterThan?: Date;
}
export const DateInput = ({form, inputName, placeholder, variant, className, greaterThan}: DateInputProps) => {
  const today = new Date()
  const yesterday = new Date()
  return ( 
    <FormField
        control={form.control}
        name={inputName}
        render={({ field }) => (
            <FormItem className="flex flex-col">
              <CustomFormLabel
                title={placeholder}
                description=""
                variant={variant}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-[240px] ", className,
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      if(greaterThan){
                        return date < greaterThan
                      }
                      return date < new Date(yesterday.setDate(today.getDate() - 1))
                    }
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
        )}
    />)
};
