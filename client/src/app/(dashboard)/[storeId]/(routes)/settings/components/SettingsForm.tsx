'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateStoreDocument, DeleteStoreDocument } from "@/graphql"

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

interface Props {
  initialData: StoreType
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
    defaultValues: initialData
  })

  const onSubmit = async (data: SettingsFormvalue) => {
    updateStore({
      variables: {
        storeId: initialData.id,
        payload: data
      }
    })
    toast.success("Store updated")
  }

  const onDelete = async () => {
    try {
      deleteMutation({ variables: { storeId: initialData.id } })
      router.push("/")
      toast.success("Store deleted")
    } catch (error) {
      toast.error("Make sure you remove products and categories first")
    }
  }

  return (
    <div className='h-full'>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className="flex items-center justify-between w-full">
        <Heading
          title="Settings"
          description="Manage Store"
        />
        <Button
          variant="destructive"
          disabled={delLoading}
          size="icon"
          onClick={() => { setOpen(true) }}
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <ScrollArea className='h-full px-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-3 gap-8 space-y-2'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={updLoading} placeholder='Store name' {...field} className="border-none focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={updLoading} className='ml-auto mt-2' type='submit'>Save changes</Button>
          </form>
        </Form>
        <Separator className='mb-2'/>
        <ApiAlert 
          title="NEXT_PUBLIC_API_URL" 
          description={`${origin}/api/${params.storeId}`} 
          variant='public'/>
      </ScrollArea>
    </div>
  )
}

export default SettingsForm