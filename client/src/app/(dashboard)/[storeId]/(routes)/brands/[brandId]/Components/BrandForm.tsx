'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateBrandDocument, DeleteBrandDocument, AddBrandDocument, GetBrandsDocument, AddBrandMutation, GetBrandQuery } from "@/graphql"

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
import { PhoneNumberInput, validateNumber } from '@/components/PhoneNumberInput'

type Props = {
  initialData?: GetBrandQuery["brand"] | null
}

const formSchema = z.object({
  name: z.string().nonempty({message: "Brand's name is required"}),
  description: z.string().nonempty({message: "Brand's description is required"}),
  phoneNumber: z.string().regex(/^(?:\d{9}|0\d{9})$/, {
    message: "Invalid Kenyan phone number. It should be exactly 9 digits."
  }),
  code: z.string().optional(),
  industry: z.string().nonempty({message: "Brand's industry is required"}),
  loc_name: z.string().nonempty({message: "Brand's location name is required"}),
  loc_address: z.string().nonempty({message: "Brand's address is required"}),
  loc_latitude: z.string().optional(),
  loc_longitude: z.string().optional(),
  loc_url: z.string().optional(),
  joinDate: z.string().optional(), 
})

type BrandFormValue = z.infer<typeof formSchema>

const BrandForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateBrand, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateBrandDocument, {
      update(cache, { data: { updateBrand } }) {
        const data = cache.readQuery({ query: GetBrandsDocument, variables: { storeId: parseInt(params.storeId) } });
        console.log(data)
        const updatedItems = data.brands.map(item =>
          item.id === updateBrand.id ? updateBrand : item
        );
        cache.writeQuery({
          query: GetBrandsDocument,
          data: { brands: updatedItems },
          variables: {storeId: parseInt(params.storeId)}
        });
      },
    }
  )
  const [addBrand, { loading: creLoading, error: creError, data: creData }] = useMutation(AddBrandDocument)
  const [deleteBrand, { loading: delLoading, error: delError }] = useMutation(DeleteBrandDocument)

  const title = initialData ? "Edit a brand" : "Create brand"
  const description = initialData ? "Edit brand" : "Add a new brand"
  const toastMessage = initialData ? "Brand updated" : "Brand created"
  const action = initialData ? "Save changes" : "Create"
  const mutation = initialData ? updateBrand : addBrand


  const form = useForm<BrandFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {...initialData, phoneNumber: 
                                    initialData?.phoneNumber?.slice(-9), 
                                    code: initialData?.phoneNumber?.slice(0,3),
                                    loc_latitude: initialData?.loc_latitude ?? "",
                                    loc_longitude: initialData?.loc_longitude ?? "",
                                    loc_url: initialData?.loc_url ?? "",
    } || {
      name: "",
      joinDate: "", 
      description: "",
      phoneNumber: "",
      code: "+254",
      industry: "",
      loc_name: "",
      loc_address: "",
      loc_latitude: "",
      loc_longitude: "",
      loc_url: "",
    }
  })


  const onSubmit = async (data: BrandFormValue) => {
    let updateData = {}
    let addData = {}
    const phoneNumber = validateNumber({code: data?.code ,phoneNumber: data.phoneNumber})


    console.log(">>>>>>>>>PHONE NUMBER>>>>>", phoneNumber)
    const variables = initialData ? updateData = {
      brandId: initialData.id,
      payload: {
          name: data.name,
          joinDate: initialData.joinDate,
          description: data.description,
          phoneNumber: phoneNumber,
          industry: data.industry,
          loc_name: data.loc_name,
          loc_address: data.loc_address,
          loc_latitude: data?.loc_latitude,
          loc_longitude: data?.loc_longitude,
          loc_url: data?.loc_url,
          storeId:parseInt(params.storeId)
      }
  } : addData = {
      brand: {
        name: data.name,
          joinDate: new Date(),
          description: data.description,
          phoneNumber: phoneNumber,
          industry: data.industry,
          loc_name: data.loc_name,
          loc_address: data.loc_address,
          loc_latitude: data?.loc_latitude,
          loc_longitude: data?.loc_longitude,
          loc_url: data?.loc_url,
          storeId:parseInt(params.storeId)
      }
    }

    try{
      mutation({ variables })
      toast.success(toastMessage)
      router.push(`/${params.storeId}/brands`)
    } catch(error){
      toast.error("Something went wrong")
    }
  }

  const onDelete = async () => {
    try {
        deleteBrand({
            variables: {
                brandId: initialData.id,
                storeId: parseInt(params.storeId as string)
            }
        })
        router.push(`/${params.storeId}/brands`)
        toast.success("Brand deleted")
    } catch (error) {
        toast.error("Something went wrong.")
    }
}

  return (
    <div className="h-full w-full">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50 rounded-md  px-2  py-1">
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
      <ScrollArea className='h-full px-2'>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <h1 className="font-bold text-lg">Brand information</h1>
            <div className='grid grid-cols-3 gap-8 space-y-3 items-end'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Brand Name' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Brand name...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Industry' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Industry the brand is in...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PhoneNumberInput form={form}/>
            </div>
            <div className="mt-3"> 
              <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <CustomFormLabel title='Description' variant='required' description=''/>
                      <FormControl>
                        <Textarea disabled={upLoading} placeholder='Brand description...' {...field} className="focus-visible:ring-0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Separator className='my-3'/>
            <h1 className="font-bold text-lg">Brand location</h1>
            <div className='grid grid-cols-3 gap-8 items-end'>
              <FormField
                control={form.control}
                name="loc_name"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Location name' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Location name e.g., kenyatta avenue...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loc_address"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Location address' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Location address e.g, Nairobi CBD...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loc_latitude"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Location latitude' variant='optional' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Location latitude...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loc_longitude"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Location longitude' variant='optional' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Location longitude...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={upLoading} className='mr-auto mt-2' type='submit'>{action}</Button>
          </form>
        </Form>
        <div className="pb-[100px]" />
      </ScrollArea>
    </div>
  )
}

export default BrandForm