'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateStripeDocument, DeleteStripeDocument, AddStripeDocument,  GetStripeQuery } from "@/graphql"

import { StoreType } from "@/types"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';

type Props = {
  initialData?: GetStripeQuery["stripe"]
}

const formSchema = z.object({
    api_key: z.string().nonempty({message: "API key required"}),
    webhook_secret: z.string().nonempty({message: "Webhool Secret is required"}),
    callback_url: z.string().nonempty({message: "Callback url is required"}),
})

type StripeFormValue = z.infer<typeof formSchema>

export const StripeForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateMpesa, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateStripeDocument)
  const [addMpesa, { loading: creLoading, error: creError, data: creData }] = useMutation(AddStripeDocument)
  const [deleteMpesa, { loading: delLoading, error: delError }] = useMutation(DeleteStripeDocument)

  const title = initialData ? "Edit stripe payment" : "Add stripe payment"
  const description = initialData ? "" : ""
  const toastMessage = initialData ? "Stripe setting updated" : "Stripe setting created"
  const action = initialData ? "Save changes" : "Add"
  const mutation = initialData ? updateMpesa : addMpesa


  const form = useForm<StripeFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      api_key: "",
      webhook_secret: "",
      callback_url: ""
    }
  })


  const onSubmit = async (data: StripeFormValue) => {
    let updateData = {}
    let addData = {}
    const error:null | string = initialData ? upError : creError
    const variables = initialData ? updateData = {
      stripeId: initialData.id,
      payload: {
        api_key: data.api_key,
        webhook_secret: data.webhook_secret, 
        callback_url: data.callback_url,
        storeId:parseInt(params.storeId)
      }
  } : addData = {
      stripe: {
        api_key: data.api_key,
        webhook_secret: data.webhook_secret, 
        callback_url: data.callback_url,
        storeId:parseInt(params.storeId)
      }
    }

    try{
      await mutation({ variables })
      toast.success(toastMessage)
      router.push(`/${params.storeId}/settings`)
    } catch(error){
      console.log(error)
      toast.error("Something went wrong")
    }
    if(error)
      toast.error(error, {duration: 4000})
  
  }

  const onDelete = async () => {
    try {
        await deleteMpesa({
            variables: {
                stripeId: initialData.id,
                storeId: parseInt(params.storeId as string)
            }
        })
        toast.success("Stripe account deleted")
        router.push(`/${params.storeId}/settings`)
    } catch (error) {
        toast.error("Something went wrong.")
    }
    
    
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className="flex items-center justify-between w-full">
        <Heading
          title={title}
          description={description}
          className='text-1xl font-medium'
        />
        {initialData &&
          <Button
            variant="destructive"
            disabled={delLoading}
            size="icon"
            onClick={() => { setOpen(true) }}
          >
            <Trash className='h-4 w-4' />
          </Button>
        }
      </div>
      <Separator className='my-2' />
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <div className='grid grid-cols-3 gap-8 space-y-3 items-end'>
            <FormField
              control={form.control}
              name="api_key"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Api key' variant='required' description=''/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Api key...' {...field} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="webhook_secret"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Webhook secret' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Webhook secret...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="callback_url"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Callback URL' variant='required' description='This is the URL where your customers make purchase.'/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Call back url...' {...field} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={upLoading} className='mr-auto mt-2' type='submit'>{action}</Button>
        </form>
      </Form>
    </>
  )
}