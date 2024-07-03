import { KeyboardEvent } from "react";
import {parse as dateParser} from "date-fns";
import { Form, FormField, FormItem,  FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CouponObj } from "@/lib/createMap/PromotionsGroup";
import { z } from "zod";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateInput, DateInputFormType } from "@/components/ui/dateInput";
import { Checkbox } from "@/components/ui/checkbox";
import { AddCouponDocument, UpdateCouponDocument, AddCouponMutationVariables, UpdateCouponMutationVariables } from "@/graphql";
import { usePromotionStore } from "@/store/PromotionsStore";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

type FormProps = {
    initialData: CouponObj | null;
}
const formSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    discountType: z.string().min(2),
    code: z.string().min(3),
    validFrom: z.date({required_error: "Valid from date is required"}),
    validTo: z.date({required_error:  "Valid to date is required"}),
    discount: z.number({required_error:  "Discount value is required"}).min(1),
    active: z.boolean().default(false)
})

type FormValues = z.infer<typeof formSchema>

const CouponForm = ({initialData}: FormProps) => {
    const params = useParams()
    const discountTypes = ["percent", "fixed"]
    const [setPromotionType] = usePromotionStore((state) => [state.setPromotionType])
    const [addCoupon] = useMutation(AddCouponDocument)
    const [updateCoupon] = useMutation(UpdateCouponDocument)

    const toastMessage = initialData ? `Coupon promotion updated` : `Coupon promotion created`

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            description:initialData.description,
            discountType: initialData.discountType,
            code: initialData.coupon.code,
            validFrom: dateParser(initialData.coupon.validFrom , "MMM do, yy", new Date()),
            validTo: dateParser(initialData.coupon.validTo , "MMM do, yy", new Date()),
            discount: initialData.coupon.discount.toString().split(" ")[0] as unknown as number,
            active: initialData.coupon.active,
        } : {
            name: "coupon",
            description: "",
            discountType: "",
            code: "",
            active: false,
        }
    })

    const onSubmit = (data: FormValues) => {
        let temp = {
            storeId: parseInt(params.storeId as string),
            name: data.name,
            description: data.description,
            discountType: data.discountType,
            discountValue: data.discount,
            coupon: {
                code: data.code,
                validFrom: data.validFrom,
                validTo: data.validTo,
                discount: data.discount,
                active: data.active
            }
        }

        try {
            if(initialData){
                const variables = {
                    promotionId: initialData.id,
                    payload: {
                        ...temp,
                        coupon: {
                            ...temp.coupon,
                            id: initialData.coupon.id
                        }
                    }
                } as unknown as UpdateCouponMutationVariables
                updateCoupon({variables})
            } else {
                const variables = {
                    promotion: temp
                } as unknown as AddCouponMutationVariables
                addCoupon({variables})
            }
            toast.success(toastMessage)
            setPromotionType(null)
        } catch (error) {
            console.log( error)
            toast.error(`Something went wrong.`)
        }
    }

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
                    name="code"
                    render={({ field }) => (
                    <FormItem>
                        <CustomFormLabel title='Coupon Code' description='' variant="required"/>
                        <FormControl>
                            <Input placeholder="Coupon code.."  {...field} className=" focus:outline-none" />
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
                    name="discount"
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
                    <DateInput form={form as unknown as DateInputFormType} inputName="validFrom" placeholder="Valid from" variant="required"/>
                    <DateInput form={form as unknown as DateInputFormType} inputName="validTo" placeholder="Valid to" variant="required"/>
                </div>
            </form>
        </Form>
    );
};

export default CouponForm;
