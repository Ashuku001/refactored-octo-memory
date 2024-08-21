'use client'
import { useState, useEffect } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'
import { SelectInput } from '@/components/ui/SelectInput'
import { UpdateBrandDocument, DeleteBrandDocument, AddBrandDocument, GetBrandsDocument, AddBrandMutation, GetCustomerQuery } from "@/graphql"
import { ArrowLeftIcon } from 'lucide-react'
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
import { TipTool } from '@/components/ui/TipTool'
import { useCustomer } from '@/hooks/useCustomer'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

type Props = {
  initialData?: GetCustomerQuery["customer"] | null
}

const formSchema = z.object({
  first_name: z.string().nonempty({message: "First name is required"}),
  last_name: z.string().nonempty({message: "Last name is required"}),
  phoneNumber: z.string().regex(/^(?:\d{9}|0\d{9})$/, {
    message: "Invalid Kenyan phone number. It should be exactly 9 digits."
  }),
  code: z.string().optional(),
  age: z.number(),
  gender: z.string().nonempty({message: "Gender is required"}),
  incomeCategory: z.string().optional(),
  customerSegment: z.string().optional(),
  occupation: z.string().optional(),
  joinDate: z.string().optional(),
  status: z.string().optional()
})

type CustomerFormValue = z.infer<typeof formSchema>

const CustomerForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID
  const [setCustomerId] = useCustomer((state) => [state.setCustomerId])
  const customerSegOptions = ["corporate", "small", "middle", "individual"]
  const genderOptions = ["male", "female", "not_sure"]
  const incomeOptions = ["high", "low", "middle"]
  const occupationOptions = ["student", "employed", "self_employed"]
  const statusOptions = ["new", "high_rated", "medium_rated", "low_rated"]

  const [updateBrand, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateBrandDocument, {
      update(cache, { data: { updateBrand } }) {
        const data = cache.readQuery({ query: GetBrandsDocument, variables: { storeId: parseInt(params.storeId) } });
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

  const title = initialData ? "Edit a customer" : "Create customer"
  const description = initialData ? "Edit customer" : "Add a new customer"
  const toastMessage = initialData ? "Customer updated" : "Customer created"
  const action = initialData ? "Save changes" : "Create"
  const mutation = initialData ? updateBrand : addBrand


  const form = useForm<CustomerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {...initialData, phoneNumber: initialData?.phone_number?.slice(-9), 
                                    code: initialData?.phone_number?.slice(0,3),
                                    first_name: initialData?.first_name ?? "",
                                    last_name: initialData?.last_name ?? "", 
                                    age: initialData?.age ?? "",
                                    gender: initialData?.gender ?? "",
                                    incomeCategory: initialData?.incomeCategory ?? "",
                                    customerSegment: initialData?.customerSegment ?? "",
                                    occupation: initialData?.occupation ?? "",
                                    joinDate: initialData?.joinDate ?? "",
                                    status: initialData?.status ?? "",
    } || {
      first_name: "",
      last_name: "", 
      phoneNumber: "",
      code: "+254",
      age: "",
      gender: "",
      incomeCategory: "",
      customerSegment: "",
      occupation: "",
      joinDate: "",
      status: "",
    }
  })

  const onSubmit = async (data: CustomerFormValue) => {
    let updateData = {}
    let addData = {}
    const phoneNumber = validateNumber({code: data?.code ,phoneNumber: data.phoneNumber})

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
      <div className="flex w-full justify-end bg-muted/80 dark:bg-muted/50    px-2 py-1">
        <div className="flex items-center space-x-5">
          <Button 
            variant={'ghost'}
            className="bg-slate-900 py-0"
            onClick={() => setCustomerId(null)}
          >
            <ArrowLeftIcon size={20} className='text-white'/>
          </Button>
          <Heading 
            title={title}
            description={description}
          />
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          {initialData &&
            <div className=" px-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 py-2 rounded-md text-sm">
              <TipTool
                tip="Delete product"
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
            disabled={upLoading}
            className="py-0 px-2"
            type='submit'
            form="customerForm"
            >
              {action}
          </Button>
        </div>
      </div>
      <Separator />
      <ScrollArea className='h-full px-2'>
        <Form {...form}>
          <form
            id="customerForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <h1 className="font-bold text-lg text-muted-foreground">Customer information</h1>
            <div className='grid grid-cols-3 gap-5 space-y-3 items-end'>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='First Name' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='First Name...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Last Name' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Last Name...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PhoneNumberInput form={form}/>
            </div>
            <Separator className='mt-2'/>
            <h1 className="font-bold text-lg my-2 text-muted-foreground">Demographic description</h1>
            <div className='grid grid-cols-3 gap-5 items-end'>
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Age' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Age...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Gender' variant='required' description=''/>
                    <Select
                      disabled={upLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={initialData?.occupation}
                    >
                      <FormControl >
                        <SelectTrigger className='border-none ring-0 focus:ring-0'>
                          <SelectValue
                            placeholder="Select gender"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='h-[200px]'>
                        <ScrollArea className='h-full'>
                          {genderOptions?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="incomeCategory"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Income category' variant='optional' description=''/>
                    <Select
                      disabled={upLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={initialData?.occupation}
                    >
                      <FormControl >
                        <SelectTrigger className='border-none ring-0 focus:ring-0'>
                          <SelectValue
                            placeholder="Select income category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='h-[200px]'>
                        <ScrollArea className='h-full'>
                          {incomeOptions?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerSegment"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Customer segment' variant='optional' description=''/>
                    <Select
                      disabled={upLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={initialData?.customerSegment}
                    >
                      <FormControl >
                        <SelectTrigger className='border-none ring-0 focus:ring-0'>
                          <SelectValue
                            placeholder="Select a segment"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='h-[200px]'>
                        <ScrollArea className='h-full'>
                          {customerSegOptions?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Occupation' variant='optional' description=''/>
                    <Select
                      disabled={upLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={initialData?.occupation}
                    >
                      <FormControl >
                        <SelectTrigger className='border-none ring-0 focus:ring-0'>
                          <SelectValue
                            placeholder="Select an occuption"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='h-[200px]'>
                        <ScrollArea className='h-full'>
                          {occupationOptions?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className='mt-2'/>
            <h1 className="font-bold text-lg my-2 text-muted-foreground">Location</h1>
            <div className='grid grid-cols-3 gap-5 items-end'>
              <FormField
                control={form.control}
                name="loc_name"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Location name' variant='optional' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Location name e.g., Nairobi CBD...' {...field} className="focus-visible:ring-0" />
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
                    <CustomFormLabel title='Location address' variant='optional' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Location address e.g., kenyatta avenue...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className='mt-2'/>
            <h1 className="font-bold text-lg my-2 text-muted-foreground">Rating</h1>
            <div className='grid grid-cols-3 gap-5 items-end'>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Status' variant='optional' description=''/>
                    <Select
                      disabled={upLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={initialData?.occupation}
                    >
                      <FormControl >
                        <SelectTrigger className='border-none ring-0 focus:ring-0'>
                          <SelectValue
                            placeholder="Select status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='h-[200px]'>
                        <ScrollArea className='h-full'>
                          {statusOptions?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loyalty"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Loyalty Points' variant='optional' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Loyalty Points...' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <Separator className='my-2'/>
        <div className='mb-20'/>
      </ScrollArea>
    </div>
  )
}

export default CustomerForm