'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateBillboardDocument, DeleteBillboardDocument, AddBillboardDocument, GetBillboardsDocument } from "@/graphql"
import { ScrollArea } from '@/components/ui/scroll-area'
import { StoreType } from "@/types"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import { BillboardType } from '@/types'
import {ImageUpload} from '@/components/appwrite/AppWriteImageUpload'
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';

type Props = {
  initialData?: BillboardType | null
}

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string().array()
})

type BillboardFormvalue = z.infer<typeof formSchema>

const BillboardForm = ({ initialData }: Props) => {
  const [fileObj, setFileObj] = useState<Models.File | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateBillboard, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateBillboardDocument,
    //   {
    //   update(cache, { data: { updateItem } }) {
    //     const data = cache.readQuery({ query: GetBillboardsDocument, variables: { storeId: parseInt(params.storeId) } });
    //     console.log(">>>..", data)
    //     const updatedItems = billboards.map(item =>
    //       item.id === updateItem.id ? updateItem : item
    //     );
    //     cache.writeQuery({
    //       query: GetBillboardsDocument,
    //       data: { billboards: updatedItems },
    //       variables: { storeId: parseInt(params.storeId) } 
    //     });
    //   },
    // }
  )
  const [addBillboard, { loading: creLoading, error: creError, data: creData }] = useMutation(AddBillboardDocument)
  const [deleteBillboard, { loading: delLoading, error: delError }] = useMutation(DeleteBillboardDocument)

  const title = initialData ? "Edit a billboard" : "Create billboard"
  const description = initialData ? "Edit billboard" : "Add a new billboard"
  const toastMessage = initialData ? "Billboard updated" : "Billboard created"
  const action = initialData ? "Save changes" : "Create"
  const mutation = initialData ? updateBillboard : addBillboard

  const form = useForm<BillboardFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues: {...initialData, imageUrl: initialData ? [initialData?.imageUrl ] : []} || {
      label: '',
      imageUrl: []
    }
  })


  const onSubmit = async (data: BillboardFormvalue) => {
    let updateData = {}
    let addData = {}

    const variables = initialData ? updateData = {
      billboardId: initialData.id,
      payload: {
        imageUrl: data.imageUrl[0],
        label: data.label,
        storeId: parseInt(params.storeId)
      }
    } : addData = {
      billboard: {
        label: data.label,
        imageUrl: data.imageUrl[0],
        storeId: parseInt(params.storeId)
      }
    }

    try{
      await mutation({ variables })
      toast.success(toastMessage)
      router.push(`/${params.storeId}/billboards`)
    } catch(error){
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const onDelete = async () => {
    try {
        deleteBillboard({
            variables: {
                billboardId: initialData.id,
                storeId: parseInt(params.storeId as string)
            }
        })
        router.push(`/${params.storeId}/billboards`)
        toast.success("billboard deleted")
    } catch (error) {
        toast.error("Make sure you remove all categories using this billboard")
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
      <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50   px-2  py-2">
        <Heading
          title={title}
          description={description}
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
      <Separator className=""/>
      <ScrollArea className="h-full w-full px-2">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel title='Main Image' variant='required' description=''/>
                <FormControl>
                  <ImageUpload
                    imageSize="w-[200px] mb-2 h-auto"
                    value={field?.value?.map((image) => image)}
                    disabled={upLoading || !!form.getValues("imageUrl")?.length}
                    onChange={(url) => {
                      field.onChange([...field.value, url])
                    }}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8 space-y-2 items-end'>
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <CustomFormLabel title='Label' variant='required' description=''/>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Billboard label' {...field} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={upLoading} className='mr-auto mt-2' type='submit'>{action}</Button>
        </form>
      </Form>
      <Separator />
      </ScrollArea>
    </div>
  )
}

export default BillboardForm