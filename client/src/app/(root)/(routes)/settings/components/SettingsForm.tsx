'use client'
import { useMutation } from "@apollo/client"
import { AddSettingDocument, GetSettingQuery } from "@/graphql"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { CustomFormLabel } from "@/components/ui/CustomFormLabel"
import { PhoneNumberInput, validateNumber } from "@/components/PhoneNumberInput"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import AlertModal from "@/components/modals/AlertModal"
import Heading from "@/components/ui/Heading"
import { Trash } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TipTool } from "@/components/ui/TipTool"
import toast from "react-hot-toast"

const formSchema = z.object({
  app_id: z.string().nonempty({message: "App id is required"}),
  access_token: z.string().nonempty({message: "Access token is required"}),
  app_secret: z.string().nonempty({message: "App secret is required"}),
  business_account_id: z.string().nonempty({message: "Business account id is required"}),
  phone_number_id: z.string().nonempty({message: "phone number id is required"}),
  api_version: z.string().nonempty({message: "Api version is required"}),
  webhook_verification_token: z.string().nonempty({message: "webhook verification token is required"}),
  phoneNumber: z.string().nonempty({message: "Recipient test phone number is required"}),
  code: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>
type SettingFormProps = {
    initialData: GetSettingQuery['setting']
}
function SettingsForm({
    initialData
}: SettingFormProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [addSettings] = useMutation(AddSettingDocument)
    const action = initialData ? "Update settings" : "Add settings"
    const title = initialData ? "Update settings" : "Add settings"
    const toastMessage = initialData ? "Updating settings successful" : "Adding settings successful"
    const description = initialData ? "Update WhatsApp business API settings" : "Add new WhatsApp business API settings"
    const form = useForm<FormValues>({
        defaultValues: initialData ? {...initialData, 
            phoneNumber: initialData?.phone_number?.slice(-9), 
            code: initialData?.phone_number?.slice(0,3),
        } : {
        app_id: "",
        access_token: "",
        app_secret: "",
        business_account_id: "",
        phone_number_id: "",
        api_version: "",
        webhook_verification_token: "",
        phoneNumber: "",
        code: "254",
        }
    })

    const onSubmit = async (data: FormValues) => {
        console.log(data)
        const phoneNumber = validateNumber({code: data?.code, phoneNumber: data.phoneNumber})
        const variables = {
        setting: {
            callBack_url: "",
            access_token: data.access_token,
            app_id: data.app_id,
            app_secret: data.app_secret,
            business_account_id: data.business_account_id,
            phone_number_id: data.phone_number_id,
            api_version: data.api_version,
            webhook_verification_token: data.webhook_verification_token,
            phone_number: phoneNumber,
        }
        }

        try{
            await addSettings({
            variables: variables
            })
            toast.success(toastMessage)
            router.push(`/settings`)
        } catch {
            toast.error("Something went wrong.")
        }
    }

  const onDelete = async () => {
    // try {
    //     deleteBrand({
    //         variables: {
    //             brandId: initialData.id,
    //             storeId: parseInt(params.storeId as string)
    //         }
    //     })
    //     router.push(`/${params.storeId}/brands`)
    //     toast.success("Brand deleted")
    // } catch (error) {
    //     toast.error("Something went wrong.")
    // }
    }

  return (
    <div className="">
        <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={false}
        />
        <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50   px-2  py-1">
            <Heading
                title={title}
                description={description}
            />
            <div className='ml-auto flex items-center space-x-4'>
                {initialData &&
                <div className=" px-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 py-2 rounded-md text-sm">
                    <TipTool
                    tip="Delete settings"
                    sideOffset={4}
                    className='flex items-center space-x-2 z-50'
                    onClick={() => { setOpen(true) }}
                    >
                    <div className='text-md font-semibold'>Delete</div>
                    <Trash className='h-4 w-4' />
                    </TipTool>
                </div>
                }
                <Button 
                    disabled={false}
                    className="py-0 px-2"
                    type='submit'
                    form="settingForm"
                >
                    {action}
                </Button>
            </div>
        </div>
        <Separator className="my-2"/>
        <ScrollArea className="px-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="settingForm" className="grid grid-cols-2 gap-5 px-10 dark:bg-[#09090B]">
                    <FormField
                        control={form.control}
                        name="app_id"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="App ID" variant="required" description=" " />
                                <FormControl>
                                    <Input placeholder={"App ID..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="access_token"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="Access token" variant="required" description="" />
                                <FormControl>
                                    <Input placeholder={"Access token..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="app_secret"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="App secret" variant="required" description="" />
                                <FormControl>
                                    <Input placeholder={"App secret..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="business_account_id"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="Business Account ID" variant="required" description="" />
                                <FormControl>
                                    <Input placeholder={"Business Account ID..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number_id"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="Phone number ID" variant="required" description="" />
                                <FormControl>
                                    <Input placeholder={"Phone number ID..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="api_version"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="Api version" variant="required" description="" />
                                <FormControl>
                                    <Input placeholder={"Api version..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="webhook_verification_token"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="Webhook verification token" variant="required" description="" />
                                <FormControl>
                                    <Input placeholder={"Webhook verification token..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PhoneNumberInput form={form} description="Test phone number for you WhatsApp business API settings."/>
                </form>
            </Form>
            <Separator className="my-2" />
        </ScrollArea>
    </div>
  )
}

export default SettingsForm