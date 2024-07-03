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
import { AddCustomerDocument, UpdateCustomerDocument, GetCustomersDocument } from "@/graphql"
import { CustomerType } from "@/types"
import { DialogClose } from '@/components/ui/dialog';

interface AddCustomerModalProps {
    initialData?: CustomerType | null,
    isOpen: boolean;
    onClose: () => void;
}

// the schema and the validation
const formSchema = z.object({
    phone_number: z.string().min(12).max(12),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
})

type CustomerFormValue = z.infer<typeof formSchema>

export const CustomerModal: React.FC<AddCustomerModalProps> = ({
    initialData,
    isOpen,
    onClose,
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const [addCustomer, { loading: loadAdd, error: errorAdd, data: addData }] = useMutation(AddCustomerDocument, {refetchQueries: [
        GetCustomersDocument, // DocumentNode object parsed with gql
        'customers' // Query name
      ],})
    const [updateCustomer, { loading: loadUpdate, error: errorUpdate, data: updateData}] = useMutation(UpdateCustomerDocument, {refetchQueries: [
        GetCustomersDocument, // DocumentNode object parsed with gql
        'customers' // Query name
      ],})

    const successMessage = initialData ? "Updated customer successfuly" : "Added customer successfully"
    const errorMessage = initialData ? "Updated customer failed" : "Added customer failed"
    const action = initialData ? "Save changes" : "Create"
    const title = initialData ? "Update customer" : "Add customer"
    const description = initialData ? "Update details for your customer." : "Add new customer and details."
    const mutation = initialData ? updateCustomer : addCustomer


    const form = useForm<CustomerFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?
        {
            first_name: initialData.first_name,
            last_name: initialData.last_name,
            phone_number: initialData.phone_number
        } : {
            first_name: "",
            last_name: "",
            phone_number: ""
        }
    })


    const onSubmit = async (data: CustomerFormValue) => {
        let updateData = {}
        let addData = {}

        const variables = initialData ? updateData = {
        customerId: initialData.id,
            payload: {
                phone_number: data.phone_number,
                first_name: data.first_name,
                last_name: data.last_name
            }
            } : addData = {
            customer: {
                phone_number: data.phone_number,
                first_name: data.first_name,
                last_name: data.last_name
            }
        }
        try {
            mutation(
                {
                    variables,
                    // update: (cache, { data: { updateData = initialData ?{updateCustomer} :{addCustomer} } }) => {
                    //     let data = cache.readQuery({ query: GetCustomersDocument, });
                    //     if(!updateData || !data || (!data?.customers && !data?.customers?.length)){
                    //         return
                    //     }
        
                    //     if (!data?.customers?.find((msg) => msg?.id === updateData?.id)) {
                    //         data = Object.assign({}, data, {
                    //             chat: {
                    //                 messages: [...data?.customers!, updateData],
                    //             }
                    //         });
                    //         cache.writeQuery({ query: GetCustomersDocument, data: data });
                    //     }
                    // },
                    // optimisticResponse: {
                    //     __typename: 'RootMutation',
                    //     updateData: {
                    //         __typename: "Message",
                    //         id: Math.round(Math.random() * -1000000),
                    //         type: "TEXT",
                    //         from_customer: false,
                    //         timestamp: "...",
                    //         createdAt: "...",
                    //         text: {
                    //             __typename: "TextMessage",
                    //             body: textInput
                    //         }
                    //     }
                    // },
                }, 
            )
            toast.success(successMessage)
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (open: boolean) => {
        console.log("FORM STATE ERRORS", form.formState.errors)
        if(!open){
            onClose();
        }
    };

    useEffect(() => {
        if (errorAdd || errorUpdate)
            toast.error(errorMessage)
    }, [errorAdd, errorMessage, errorUpdate])

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
            isOpen={isOpen}
            onClose={onChange}
        >
            <div>
                <div className="space-y-4 pb-4">
                    {loadAdd || loadUpdate
                        ? <LoadingSpinner />
                        : <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} >
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
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
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Last name"} {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Whatsapp phone number</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Whatsapp phone number"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-4 space-x-2 flex items-center justify-end w-full">
                                    <Button
                                        disabled={loadAdd || loadUpdate}
                                        variant="outline"
                                        onClick={onClose}
                                    >Cancel</Button>
                                    <Button type="submit" onClick={onClose} disabled={loadAdd || loadUpdate}>{action}</Button>
                                </div>
                            </form>
                        </Form>
                    }
                </div>
            </div>
        </Modal>
    )
}

