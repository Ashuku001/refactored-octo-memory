'use client'
import { useState, useEffect, FormEvent } from 'react';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash, ArrowLeftIcon, PlusIcon } from 'lucide-react';
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'


import { UpdateProductDocument, DeleteProductDocument, AddProductDocument, AddProdVariationDocument, GetBrandsQuery } from "@/graphql"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Checkbox } from "@/components/ui/checkbox"
import { StoreType } from "@/types"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import { ProductType, CategoryType} from '@/types'
import { useProductsStore } from '@/store/ProductsStore';
import { TipTool } from '@/components/ui/TipTool';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductVariation } from './Products/ProductVariation';
import { useAddProductStore } from '@/store/AddNewProduct';
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';
import { getVarObjects, VariationType } from '@/lib/store/addVarProductUtil';
import { useFileStore } from '@/store/FileStore';
import {ImageUpload} from '@/components/appwrite/AppWriteImageUpload'
import { ProdCombinationType } from '@/lib/store/addVarProductUtil';
import {CategoryModal} from "@/components/modals/AddCategory"
import { Textarea } from '@/components/ui/textarea';


type Props = {
  productData?: ProductType | null;
  categories?: CategoryType[] | null | undefined;
  brands: GetBrandsQuery["brands"]
}

const formSchema = z.object({
  name: z.string().min(3),
  images: z.object({ url: z.string() }).array(),
  brand: z.string().min(1),
  description: z.string().min(10),
  price: z.coerce.number().min(1),
  category: z.string().min(1),
  variantName: z.string().optional(),
  variantOptions: z.string().array().optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})

formSchema.extend({
  data: z.record(z.string(), z.string())
})

type ProductFormValue = z.infer<typeof formSchema>

const ProductForm = ({ productData, categories, brands }: Props) => {
  const [openDel, setOpenDel] = useState(false)
  const [openCat, setOpenCat] = useState(false)
  const [billboards, setBillboards] = useState([])

  const [initialData, setInitialData] = useState(productData)

  const [setProductId] = useProductsStore((state) => [state.setProductId])
  const [productVariations, varTableData, resetStore] = useAddProductStore((state) => [state.productVariations, state.varTableData, state.resetStore])

  const router = useRouter()
  const params = useParams()

  const [updateProduct, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateProductDocument)
  const [addProduct, { loading: creLoading, error: creError, data: creData }] = useMutation(AddProdVariationDocument)
  const [deleteProduct, { loading: delLoading, error: delError }] = useMutation(DeleteProductDocument)

  const title = initialData ? "Edit product" : "Create new product"
  const description = initialData ? "Edit product" : "Add a new product"
  const toastMessage = initialData ? "Product updated" : "Product created"
  const action = initialData ? "Save changes" : "Create"
  const mutation = initialData ? updateProduct : addProduct

  const form = useForm<ProductFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData, price: parseFloat(String(initialData?.price))
    } : {
      name: '',
      images: [],
      price: '',
      category: "",
      brand: "",
      description: "",
      variantName: '',
      variantOptions: [],
      isFeatured: false,
      isArchived: false,
    }
  })



  const onSubmit = (data: ProductFormValue) => {
    let tableData = varTableData.filter((item) => item.availableStock > 0)
    const prodVariations = productVariations?.reduce((acc, variation) => {
      acc = [...acc, {
        name: variation.name, 
        prodVarOptions: getVarObjects(variation.prodVarOptions)}
      ]
      return acc
    }, new Array<VariationType>)

    const prodCombinations = tableData?.reduce((acc, item) => {
      const {price, sku, availableStock, variantImage, ...rest} = item
        acc = [...acc, {
          price: parseInt(price),
          sku: sku,
          availableStock: parseInt(availableStock),
          combinationString: JSON.stringify(rest),
          variantImage: {...variantImage, storeId: parseInt(params.storeId)}
        }]


      return acc
    }, new Array<ProdCombinationType>)

    let updateData = {}
    let addData = {}

    const variables = initialData ? updateData = {
      productId: initialData.id,
      payload: {
        name: data.name,
        price: parseInt(data.price),
        description: data.description,
        isFeatured: data.isFeatured,
        isArchived: data.isArchived,
        categoryId: parseInt(categories.find(c => c.name.includes(data.category)).id),
        brandId: parseInt(brands.find(b => b.name.includes(data.brand)).id),
        prodVariations:prodVariations,
        prodCombinations:prodCombinations,
        images: data.images,
        storeId: parseInt(params.storeId)
      }
    } : addData = {
      product: {
        name: data.name,
        price: parseInt(data.price),
        description: data.description,
        isFeatured: data.isFeatured,
        isArchived: data.isArchived,
        prodVariations:prodVariations,
        prodCombinations:prodCombinations,
        categoryId: parseInt(categories.find(c => c.name.includes(data.category)).id),
        brandId: parseInt(brands.find(b => b.name.includes(data.brand)).id),
        images:data.images,
        storeId: parseInt(params.storeId)
      }
    }

    mutation({ variables })
    toast.success(toastMessage)
    router.push(`/${params.storeId}/products`)
  }

  const onDelete = async () => {
    try {
      deleteProduct({
        variables: {
          productId: initialData.id,
          storeId: parseInt(params.storeId as string)
        }
      })
      router.push(`/${params.storeId}/products`)
      setProductId(null)
      toast.success("Product deleted")
    } catch (error) {
      toast.error("Failed to delete product try again later.")
    }
  }
  const errorMessage = upError ? upError.message : creError ? creError.message : delError ? delError.message : undefined

  if(errorMessage){
    toast.error(errorMessage)
  }

  useEffect(() => {
    setInitialData(productData)
    form.reset(initialData ? {
      ...initialData, 
      price: parseFloat(String(initialData?.price)), 
      brand: initialData?.brand?.name, 
      category: initialData.category?.name ?? '',
    } : {
      name: '',
      images: [],
      price: 0.00,
      category: "",
      variantName: '',
      brand: "",
      description: "",
      variantOptions: [],
      isFeatured: false,
      isArchived: false,
    })
    resetStore()
  }, [productData, form, initialData, resetStore])

  return (
    <div className='h-full'>
      <AlertModal
        isOpen={openDel}
        onClose={() => setOpenDel(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <CategoryModal 
        isOpen={openCat}
        onClose={() => setOpenCat(false)}
      />
      <div className='flex w-full justify-end bg-muted/80 dark:bg-muted/50    px-2 py-1'>
          <div className="flex items-center space-x-5">
            <Button 
              variant={'ghost'}
              className="bg-slate-900 py-0"
              onClick={() => setProductId(null)}
            >
              <ArrowLeftIcon size={20} className='text-white'/>
            </Button>
            <div className="font-bold text-lg">
              {title}
            </div>
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
              form="productForm"
              >
                {action}
            </Button>
          </div>
      </div>
      <ScrollArea className='h-full px-2.5 w-full'>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            id="productForm" 
            className='w-full flex-flex-col space-y-4'
          >
              <CustomFormLabel title='Basic product Information' description=''/>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Name' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Product name' {...field} className=" focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Main Image' variant='required' description=''/>
                    <FormControl>
                      <ImageUpload
                        imageSize="w-[200px] mb-2 h-auto"
                        value={field.value?.map((image) => image.url)}
                        disabled={upLoading}
                        onChange={(url) => field.onChange([...field.value, { url }])}
                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Product description' variant='required' description=''/>
                    <FormControl>
                      <Textarea disabled={upLoading} placeholder='Product description' {...field} className=" focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Price' variant='required' description=''/>
                    <FormControl>
                      <Input min="0" disabled={upLoading} type='float' placeholder='9.99' {...field} className=" focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Brand' variant='optional' description=''/>
                    <div className='flex items-center space-x-1'>
                      <Select
                        disabled={upLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={initialData?.brand?.name}
                      >
                        <FormControl >
                          <SelectTrigger className='border-none ring-0 focus:ring-0'>
                            <SelectValue
                              // defaultValue={initialData?.brand?.name}
                              placeholder="Select a brand"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='h-[200px]'>
                          <ScrollArea className='h-full'>
                            {brands?.map((brand) => (
                              <SelectItem
                                key={brand.id}
                                value={brand.name}
                              >
                                {brand.name}</SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <TipTool
                        tip="Add new brand"
                        sideOffset={4}
                        className='flex items-center space-x-2 z-50 bg-secondary p-2 rounded-sm'
                        onClick={() => { setOpenCat(true) }}
                      >
                        <PlusIcon size={'20'} />
                      </TipTool>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Category' variant='required' description=''/>
                    <div className='flex items-center space-x-1'>
                      <Select
                        disabled={upLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl >
                          <SelectTrigger defaultValue={initialData?.category?.name}className='border-none ring-0 focus:ring-0'>
                            <SelectValue
                              placeholder="Select a category"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='h-[200px]'>
                          <ScrollArea className='h-full'>
                            {categories?.map(c => c.name)?.map((category) => (
                              <SelectItem
                                key={category}
                                value={category}
                              >
                                {category}</SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <TipTool
                        tip="Add new category"
                        sideOffset={4}
                        className='flex items-center space-x-2 z-50 bg-secondary p-2 rounded-sm'
                        onClick={() => { setOpenCat(true) }}
                      >
                        <PlusIcon size={'20'} />
                      </TipTool>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 loading-none">
                        <FormLabel>
                          Featured
                        </FormLabel>
                        <FormDescription>
                          This product will appear on the home page
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 loading-none">
                        <FormLabel>
                          Archived
                        </FormLabel>
                        <FormDescription>
                          This product will not appear anywhere in the store
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            <ProductVariation form={form} initialData={{prodCombinations: initialData?.prodCombinations, prodVariations: initialData?.prodVariations}}/>
          </form>
        </Form>
        <div className='mb-20'/>
      </ScrollArea>
    </div>
  )
}

export default ProductForm