import {parse as dateParser} from "date-fns";
import { KeyboardEvent, useEffect} from "react";
import {  z } from "zod";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

import { Form, FormField, FormItem,  FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { DiscountObj } from "@/lib/createMap/PromotionsGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateInput, DateInputFormType } from "@/components/ui/dateInput";
import { Checkbox } from "@/components/ui/checkbox";
import { AddDiscountDocument, UpdateDiscountDocument, DiscountType, PromotionType, AddDiscountMutationVariables, UpdateDiscountMutationVariables, GetPromotionsDocument } from "@/graphql";
import { useMutation } from "@apollo/client";
import { usePromotionStore } from "@/store/PromotionsStore";

type FormProps = {
    initialData: DiscountObj | null;
}
const formSchema = z.object({
    name: z.string().min(2),
    startDate: z.date({required_error: "Valid from date is required"}),
    endDate: z.date({required_error: "Valid to date is required"}),
    description: z.string().optional(),
    discountType: z.string({required_error: "Discount type is required"}).min(1), 
    discountValue: z.number({required_error: "Discount value is requred"}).min(1),
    active: z.boolean().default(false)!
})

type FormValues = z.infer<typeof formSchema>

const DiscountForm = ({initialData}: FormProps) => {
    const params = useParams()
    const discountTypes = ["percent", "fixed"]
    const [setPromotionType] = usePromotionStore((state) => [state.setPromotionType])
    const [addDiscount] = useMutation(AddDiscountDocument)
    const [updateDiscount] = useMutation(UpdateDiscountDocument)

    const toastMessage = initialData ? `Dicount promotion updated` : `Discount promotion created`
    
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            discountValue: parseFloat(initialData.discountValue.toString()),
            startDate: dateParser(initialData.startDate , "MMM do, yy", new Date()),
            endDate: dateParser(initialData.endDate , "MMM do, yy", new Date())
        } : {
            name: "discount",
            active: false
        }
    })


    const onSubmit = (data: FormValues) => {
        let temp = {
            storeId: parseInt(params.storeId as string),
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
            discountType: data.discountType,
            discountValue: data.discountValue,
            active: data.active
        }

        try {
            if(initialData){
                const variables = {
                    promotionId: initialData.id,
                    payload: temp
                } as unknown as UpdateDiscountMutationVariables
                updateDiscount({variables})
            } else {
                const variables = {
                    discount: temp
                } as unknown as AddDiscountMutationVariables
                addDiscount({
                    variables, 
                    optimisticResponse: {
                        addDiscount: {
                            __typename: "Promotion",
                            id: Math.round(Math.random() * -1000000),
                            name: data.name as unknown as PromotionType,
                            startDate: data.startDate,
                            endDate: data.endDate,
                            description: data.description,
                            discountType: data.discountType as unknown as DiscountType,
                            active: data.active,
                            discountValue: data.discountValue,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }
                    },
                    // @ts-ignore
                    update: (store, {data: {addDiscount}}) => {
                        let data = store.readQuery({query: GetPromotionsDocument, variables: {storeId: parseInt(params.storeId as string)} });
                        const newDiscount = {...addDiscount, coupon: null}
                        
                        if(data?.promotions?.slice(-1)[0]?.id !== addDiscount.id){
                            data = {...data, promotions: [...data?.promotions!, newDiscount]}
                            
                            store.writeQuery({query: GetPromotionsDocument, data, variables: {storeId: parseInt(params.storeId as string)} })
                        }
                    }
                })
            }
            toast.success(toastMessage)
            setPromotionType(null)
        } catch (error) {
            console.log( error)
            toast.error(`Something went wrong.`)
        }
    }
    useEffect(() => {

    }, [])
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onKeyPress={(e: KeyboardEvent<HTMLFormElement>) => { e.key === 'Enter' && e.preventDefault(); }}
                id="promotionForm" 
                className='w-full flex-flex-col space-y-4'
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <CustomFormLabel title='Name' description='' variant="required"/>
                        <FormControl>
                            <Input  disabled={true} {...field} className=" focus:outline-none" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <CustomFormLabel title='Description' description='' variant="optional"/>
                        <FormControl>
                            <Input {...field} className=" focus:outline-none" placeholder={`A description about the promotion...`}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                    <FormItem>
                        <CustomFormLabel title='Discount type' description='percent or fixed discount' variant="required"/>
                        <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                        <FormControl >
                          <SelectTrigger className='border-none ring-0 focus:ring-0'>
                            <SelectValue
                              placeholder="Select discount type"
                            />
                          </SelectTrigger>
                        </FormControl>
                            <SelectContent>
                            {discountTypes?.map((type) => (
                                <SelectItem
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                    <FormItem>
                        <CustomFormLabel title='Discount Value' description='' variant="required"/>
                        <FormControl>
                            <Input  
                                type="number" 
                                min={0}
                                value={parseFloat(field.value?.toString())}
                                onChange={e => {field.onChange(parseFloat(e.target.value))}}
                                className=" focus:outline-none"
                                placeholder={form.getValues().discountType == "fixed" ? "Value of your discount." : "Percentage of your discount."} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4'>
                            <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            </FormControl>
                            <div className="space-y-1 loading-none">
                            <CustomFormLabel title="Active" description="This promotion will be redeamable by customers"/>
                            </div>
                      </FormItem>
                    )}
                />
                <div className="flex items-center space-x-4">
                    <DateInput form={form as unknown as DateInputFormType} inputName="startDate" placeholder="Valid from" variant="required"/>
                    <DateInput form={form as unknown as DateInputFormType} inputName="endDate" placeholder="Valid to" variant="required" greaterThan={form.getValues().startDate ? new Date((new Date).setDate((form.getValues().startDate).getDate())) : new Date((new Date).setDate((new Date).getDate()))}/>
                </div>
            </form>
        </Form>
    );
};

export default DiscountForm;
