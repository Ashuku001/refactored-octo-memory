'use client'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import LoadingSpinner from "../LoadingSpinner"
import { AddCustomerDocument, UpdateCustomerDocument, GetCustomersDocument, GetCustomerInfoDocument } from "@/graphql"
import { CustomerType } from "@/types"
import { DialogClose } from '@/components/ui/dialog';
import { PhoneNumberInput, validateNumber } from '@/components/PhoneNumberInput'
import { CustomFormLabel } from "@/components/ui/CustomFormLabel"
import { useParams } from "next/navigation"
import { useCustomerModal } from "@/hooks/useCustomerModal"
interface AddCustomerModalProps {
    initialData?: CustomerType | null,
}

// the schema and the validation
const formSchema = z.object({
    phoneNumber: z.string().regex(/^(?:\d{9}|0\d{9})$/, {
        message: "Invalid Kenyan phone number. It should be exactly 9 digits."
      }),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    code: z.string().optional(),
})

type CustomerFormValue = z.infer<typeof formSchema>

export const CustomerModal: React.FC<AddCustomerModalProps> = ({
    initialData,
}) => {
    const customerModal = useCustomerModal()
    const [isMounted, setIsMounted] = useState(false)
    const params = useParams()
    const [addCustomer, { loading: loadAdd, error: errorAdd, data: addData }] = useMutation(AddCustomerDocument, {refetchQueries: [
        GetCustomersDocument, // DocumentNode object parsed with gql
        'customers' // Query name
      ],})
    const [updateCustomer, { loading: loadUpdate, error: errorUpdate, data: updateData}] = useMutation(UpdateCustomerDocument, {refetchQueries: [
        GetCustomersDocument, // DocumentNode object parsed with gql
        'customers' // Query name
      ],})

    const successMessage = initialData ? "Updating customer successfuly" : "Adding customer successfully"
    const errorMessage = initialData ? "Updating customer failed" : "Adding customer failed"
    const action = initialData ? "Save changes" : "Create"
    const title = initialData ? "Update customer" : "Add customer"
    const description = initialData ? "Update details for your customer." : "Add new customer and details."
    const mutation = initialData ? updateCustomer : addCustomer

    const form = useForm<CustomerFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?
        {
            first_name: initialData.first_name ?? "",
            last_name: initialData.last_name ?? "",
            phoneNumber: initialData.phone_number?.slice(-9) ?? "",
            code: initialData.code?.slice(0, 3) ?? "254"
        } : {
            first_name: "",
            last_name: "",
            phoneNumber: "",
            code: '254',
        }
    })

    const onChange = () => {
        return !!Object.keys(form.formState.errors)?.length
    };

    const onSubmit = async (data: CustomerFormValue) => {
        if(onChange()){
            customerModal.onOpen()
            return
        }
        else {
            customerModal.onClose()
        }
        let updateData = {}
        let addData = {}
        const phoneNumber = validateNumber({code: data?.code ,phoneNumber: data.phoneNumber})

        const variables = initialData ? updateData = {
        customerId: initialData.id,
            payload: {
                phone_number: phoneNumber,
                first_name: data.first_name,
                last_name: data.last_name
            }
            } : addData = {
            customer: {
                phone_number: phoneNumber,
                first_name: data.first_name,
                last_name: data.last_name
            }
        }

        try {
            await mutation(
                {
                    variables,
                    update: (cache, { data: { updateData = initialData ?{updateCustomer} :{addCustomer} } }) => {
                        if(!!params.customerId){
                            let data = cache.readQuery({ 
                                query: GetCustomerInfoDocument, 
                                variables: { customerId: parseInt(params.customerId as string) }
                            });

                            if(!updateData || !data || !data?.customer){
                                return
                            }
            
                            if (!data?.customers?.find((msg) => msg?.id === updateData?.id)) {
                                data = Object.assign({}, data, {
                                    chat: {
                                        messages: [...data?.customers!, updateData],
                                    }
                                });
                                cache.writeQuery({
                                    query: GetCustomerInfoDocument, 
                                    data: data, 
                                    variables: { customerId: parseInt(params.customerId as string) }
                                })
                            }
                        }
                    },
                }, 
            )
            toast.success(successMessage)
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <Modal
            title={title}
            description={description}
            isOpen={customerModal.isOpen}
            onClose={customerModal.onClose}
        >
            <div>
                {loadAdd || loadUpdate
                    ? <LoadingSpinner />
                    : <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <CustomFormLabel title="First name" variant="optional" description="" />
                                        <FormControl>
                                            <Input placeholder={"First name"} {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <CustomFormLabel title="Last name" variant="optional" description="" />
                                        <FormControl>
                                            <Input placeholder={"Last name"} {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <PhoneNumberInput form={form}/>
                            <div className="pt-4 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loadAdd || loadUpdate}
                                    variant="outline"
                                    onClick={customerModal.onClose}
                                >Cancel</Button>
                                <Button type="submit" onClick={onChange} disabled={loadAdd || loadUpdate || !!Object.keys(form.formState.errors)?.length}>{action}</Button>
                            </div>
                        </form>
                    </Form>
                }
            </div>
        </Modal>
    )
}

