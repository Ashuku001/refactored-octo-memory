'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateCategoryDocument, DeleteCategoryDocument, AddCategoryDocument } from "@/graphql"

import { StoreType } from "@/types"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import ImageUpload from '@/components/ui/ImageUpload'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { CategoryType } from '@/types'
import { BillboardType } from "@/types"


type Props = {
  initialData?: CategoryType | null;
  billboards?: BillboardType[];
}

const formSchema = z.object({
  name: z.string().min(3),
  billboardId: z.string().min(1)
})

type CategoryFormvalue = z.infer<typeof formSchema>

const CategoryForm = ({ initialData, billboards }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateCategory, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateCategoryDocument)
  const [addCategory, { loading: creLoading, error: creError, data: creData }] = useMutation(AddCategoryDocument)
  const [deleteCategory, { loading: delLoading, error: delError }] = useMutation(DeleteCategoryDocument)

  const title = initialData ? "Edit a category" : "Create category"
  const description = initialData ? "Edit category" : "Add a new category"
  const toastMessage = initialData ? "category updated" : "category created"
  const action = initialData ? "Save changes" : "Create"
  const mutation = initialData ? updateCategory : addCategory


  const form = useForm<CategoryFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: ''
    }
  })

  const onSubmit = async (data: CategoryFormvalue) => {

    let updateData = {}
    let addData = {}

    const variables = initialData ? updateData = {
      categoryId: initialData.id,
      payload: {
        name: data.name,
        billboardId: parseInt(data.billboardId),
      }
    } : addData = {
      category: {
        name: data.name,
        billboardId: parseInt(data.billboardId),

      }
    }

    mutation({ variables })
    if(creError) {
      toast.error(creError.message)
    } else
      toast.success(toastMessage)
      router.push(`/${params.storeId}/categories`)

  }

  const onDelete = async () => {
    try {
      deleteCategory({
        variables: {
          categoryId: initialData.id,
          storeId: parseInt(params.storeId as string)
        }
      })
      router.push(`/${params.storeId}/categories`)
      toast.success("Category deleted")
    } catch (error) {
      toast.error("Make sure you remove all products in this category")
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-3 gap-8 space-y-2 items-end'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={upLoading} placeholder='Category name' {...field} value={field.value} onValueChange={field.onChange} className="border-none focus:outline-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={upLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem
                          key={billboard.id}
                          value={billboard.id}
                        >
                          {billboard.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={upLoading} className='ml-auto mt-2' type='submit'>{action}</Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}

export default CategoryForm