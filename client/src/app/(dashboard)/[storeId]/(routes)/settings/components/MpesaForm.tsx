'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateMpesaDocument, DeleteMpesaDocument, AddMpesaDocument, AddMpesaMutation, GetMpesaQuery } from "@/graphql"

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
  initialData?: GetMpesaQuery["mpesa"]
}

const formSchema = z.object({
    consumer_key: z.string().nonempty({message: "Consumer key required"}),
    consumer_secret: z.string().nonempty({message: "Consumer secret is required"}),
    pass_key: z.string().nonempty({message: "Pass key is required"}),
    business_shortcode: z.string().nonempty({message: "Business shortcode is required"}),
    account_reference: z.string().nonempty({message: "Account reference is required"}),
    transaction_desc: z.string().nonempty({message: "Transaction_desc is required"}),
    callback_url: z.string().nonempty({message: "Callback url is required"}),
})

type MpesaFormValue = z.infer<typeof formSchema>

export const MpesaForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateMpesa, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateMpesaDocument)
  const [addMpesa, { loading: creLoading, error: creError, data: creData }] = useMutation(AddMpesaDocument)
  const [deleteMpesa, { loading: delLoading, error: delError }] = useMutation(DeleteMpesaDocument)

  const title = initialData ? "Edit mpesa payment" : "Add mpesa payment"
  const description = initialData ? "Edit M-Pesa settings" : "Add a new M-Pesa settings"
  const toastMessage = initialData ? "M-Pesa setting updated" : "M-Pesa setting created"
  const action = initialData ? "Save changes" : "Add"
  const mutation = initialData ? updateMpesa : addMpesa


  const form = useForm<MpesaFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      consumer_key: "",
      consumer_secret: "", 
      pass_key: "",
      business_shortcode: "",
      account_reference: "",
      transaction_desc: "",
      callback_url: ""
    }
  })


  const onSubmit = async (data: MpesaFormValue) => {
    let updateData = {}
    let addData = {}
    const error:null | string = initialData ? upError : creError
    const variables = initialData ? updateData = {
      mpesaId: initialData.id,
      payload: {
        consumer_key: data.consumer_key,
        consumer_secret: data.consumer_secret, 
        pass_key: data.pass_key,
        business_shortcode: data.business_shortcode,
        account_reference: data.account_reference,
        transaction_desc: data.transaction_desc,
        callback_url: data.callback_url,
        storeId:parseInt(params.storeId)
      }
  } : addData = {
      mpesa: {
        consumer_key: data.consumer_key,
        consumer_secret: data.consumer_secret, 
        pass_key: data.pass_key,
        business_shortcode: data.business_shortcode,
        account_reference: data.account_reference,
        transaction_desc: data.transaction_desc,
        callback_url: data.callback_url,
        storeId:parseInt(params.storeId)
      }
    }

    try{
      await mutation({ variables })
      toast.success(toastMessage)
      router.push(`/${params.storeId}/settings`)
    } catch(error){
      toast.error("Something went wrong")
    }
    if(error)
      toast.error(error, {duration: 4000})
  
  }

  const onDelete = async () => {
    try {
        await deleteMpesa({
            variables: {
                mpesaId: initialData.id,
                storeId: parseInt(params.storeId as string)
            }
        })
        toast.success("Mpesa account deleted")
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
      <Separator />
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <div className='grid grid-cols-3 gap-8 space-y-3 items-end'>
            <FormField
              control={form.control}
              name="consumer_key"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Consumer key' variant='required' description=''/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Consumer key...' {...field} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consumer_secret"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Consumer secret' variant='required' description=''/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Consumer secret...' {...field} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pass_key"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Pass key' variant='required' description=''/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Pass key...' {...field} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="business_shortcode"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Business shortcode' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Business shortcode...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="account_reference"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Account reference' variant='required' description=''/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Account reference...' {...field} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transaction_desc"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Transaction description' variant='required' description=''/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Transaction description...' {...field} className="focus-visible:ring-0" />
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
                  <CustomFormLabel title='Callback URL' variant='required' description='This is the URL where your customers make purchase'/>
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