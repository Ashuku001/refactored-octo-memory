'use client'

import * as z from "zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { useEffect } from "react"

import { AddStoreDocument } from "@/graphql"

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "@/components/ui/modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import LoadingSpinner from "../LoadingSpinner"
import { useProductModal } from "@/hooks/useProductModal"

// the schema and the validation
const formSchema = z.object({
    name: z.string().min(3)
})

export const ProductsModal = () => {
    const productModal = useProductModal()
    const [addStore, { loading, error, data }] = useMutation(AddStoreDocument)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (values.name.length > 2) {
            try {
                const variables = {
                    store: values
                }
                addStore({ variables })
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (data) {
        console.log(data)
        window.location.assign(`/${data.addStore?.id}`) // redreict to that link
    }


    useEffect(() => {
        if (error)
            toast.error(error?.message)
    }, [error])

    return (
        <Modal
            title="Add a new product"
            description="Add a product and select a store in which to add."
            isOpen={productModal.isOpen}
            onClose={productModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4 h-40">
                    {loading
                        ? <LoadingSpinner />
                        : <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Online Store" {...field} disabled={loading}></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-4 space-x-2 flex items-center justify-end w-full">
                                    <Button
                                        disabled={loading}
                                        variant="outline"
                                        onClick={productModal.onClose}
                                    >Cancel</Button>
                                    <Button type="submit" disabled={loading}>Create</Button>
                                </div>
                            </form>
                        </Form>
                    }
                </div>
            </div>
        </Modal>
    )
}

