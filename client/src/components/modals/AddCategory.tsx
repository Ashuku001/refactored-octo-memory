'use client'
import { useState, useEffect } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { AddCategoryDocument } from "@/graphql"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { BillboardType } from "@/types"
import { Modal } from '@/components/ui/modal';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GetBillboardsDocument } from '@/graphql';
import { format } from "date-fns"
import LoadingSpinner from '@/components/LoadingSpinner';
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(3),
  billboardId: z.string().min(1)
})

type CategoryFormvalue = z.infer<typeof formSchema>

export const CategoryModal = ({ isOpen, onClose }: Props) => {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const params = useParams() 

  const {data: billboardData} = useSuspenseQuery(
    GetBillboardsDocument, 
    {variables: {storeId: parseInt(params.storeId)}}
    )
  const billboards = billboardData?.billboards?.map((item) => ({
    id: item?.id,
    label: item?.label,
    createdAt: format(new Date(item?.updatedAt), "MMM do, yy")
  }))

  const [addCategory, { loading, error: creError, data: creData }] = useMutation(AddCategoryDocument)

  const title = "Create category"
  const description = "Add a new category"
  const toastMessage = "category created"
  const action = "Create"
  const mutation = addCategory


  const form = useForm<CategoryFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      billboardId: ''
    }
  })

  const onSubmit = async (data: CategoryFormvalue) => {

    let addData = {}
    const variables =  addData = {
      category: {
        name: data.name,
        billboardId: parseInt(billboards.find(b => b.label.includes(data.billboardId)).id),
      }
    }
    mutation({ variables })
    if(creError) {
      toast.error("Something went wrong while creating category")
    } else{
        toast.success(toastMessage)
        onClose()
    }
  }

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    };
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-2'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                <CustomFormLabel title="Name" description="" variant="required"/>
                  <FormControl>
                    <Input disabled={loading} placeholder='Category name' {...field} value={field.value} onValueChange={field.onChange} className="" />
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
                  <CustomFormLabel title="Billboard" description="" variant="required"/>
                  <Select
                    disabled={loading}
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
                          value={billboard.label}
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
          <Button disabled={loading}  className='self-end mt-2' type='submit'>
            {loading ? <LoadingSpinner/> : action}
        </Button>
        </form>
      </Form>
    </Modal>
  )
}
