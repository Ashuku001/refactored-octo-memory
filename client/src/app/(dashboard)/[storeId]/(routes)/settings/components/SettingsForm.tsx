'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash, SettingsIcon, CreditCardIcon } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateStoreDocument, DeleteStoreDocument, GetStoreQuery, GetMpesaQuery } from "@/graphql"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { StoreType } from "@/types"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import ApiAlert from "@/components/ui/api.alert"
import useOrigin from '@/hooks/useOrigin'
import { ScrollArea } from '@/components/ui/scroll-area';
import { CustomFormLabel } from '@/components/ui/CustomFormLabel'
import {MpesaForm} from "./MpesaForm"
import { TipTool } from '@/components/ui/TipTool'
interface Props {
  initialData: {
    store: GetStoreQuery["store"]
    mpesa: GetMpesaQuery["mpesa"] | null
  }
}

const formSchema = z.object({
  name: z.string().min(3)
})

type SettingsFormvalue = z.infer<typeof formSchema>


const SettingsForm: React.FC<Props> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const origin = useOrigin()
  const params = useParams()


  const [updateStore, { loading: updLoading, error: upError, data }] = useMutation(UpdateStoreDocument)
  const [deleteMutation, { loading: delLoading, error: delError }] = useMutation(DeleteStoreDocument)

  const form = useForm<SettingsFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData.store
  })

  const onSubmit = async (data: SettingsFormvalue) => {
    updateStore({
      variables: {
        storeId: initialData.store.id,
        payload: data
      }
    })
    toast.success("Store updated")
  }

  const onDelete = async () => {
    try {
      deleteMutation({ variables: { storeId: initialData.store.id } })
      router.push("/")
      toast.success("Store deleted")
    } catch (error) {
      toast.error("Make sure you remove products and categories first")
    }
  }

  return (
    <div className='h-full pl-2'>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className="flex items-center justify-between w-full pr-2">
        <Heading
          title="Settings"
          description="Manage Store"
        />
        <TipTool
          tip='Delete Store'
          sideOffset={1}
          onClick={() => { setOpen(true) }}
        >
          <Trash size={'40'} className='bg-red-800 rounded-md p-2' />
        </TipTool>
      </div>
      <Separator className='my-2' />
      <ScrollArea className='h-full pr-2'>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Store settings
            </CardTitle>
            <SettingsIcon className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-3 gap-8 space-y-2'>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <CustomFormLabel title='Name' variant='required' description='' />
                        <FormControl>
                          <Input disabled={updLoading} placeholder='Store name' {...field} className="border focus:outline-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={updLoading} className='ml-auto mt-2' type='submit'>Save changes</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Separator className='my-2'/>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              M-Pesa payment settings
            </CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <MpesaForm initialData={initialData.mpesa}/>
          </CardContent>
        </Card>
        <Separator className='my-2'/>
        <ApiAlert 
          title="NEXT_PUBLIC_API_URL" 
          description={`${origin}/api/${params.storeId}`} 
          variant='public'/>
      </ScrollArea>
    </div>
  )
}

export default SettingsForm