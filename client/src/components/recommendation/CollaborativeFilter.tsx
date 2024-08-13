import { zodResolver } from "@hookform/resolvers/zod"
//@ts-ignore
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { SimilarProductResponseType, SimilarProductFormatted } from "@/types";
import { useState, useEffect } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRecommendationStore } from "@/store/RecommendationStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { onPredict } from "@/lib/recommend/collaborative";
import { DataType } from "@/hooks/useRecommendationModal";
import { useInteractiveListStore, SectionType, RowType } from "@/store/InteractiveListStore";
import LoadingSpinner from "../LoadingSpinner";

const FormSchema = z.object({
    option: z.enum(["item-to-item", "user-to-user", "k-nearest-neighbor"], {
      required_error: "You need to select a recommendation option.",
    }),
  })

type Props = {
  data: DataType
}

export function CollaborativeFilter({ data}: Props) {
    const [option, setOption] = useState("")
    const [loading, setLoading] = useState(false)
    const [formattedProducts, setFormattedProducts] = useState<SimilarProductFormatted[] | null>(null)
    const [rowsCount, sections, setRowsCount,  addSection, deleteSection, updateSectionTitle,  addRow, deleteRow, updateRowTitle, updateRowDescription, updateProduct] = useInteractiveListStore((state) => [
      state.rowsCount,
      state.sections,
      state.setRowsCount,
      state.addSection,
      state.deleteSection,
      state.updateSectionTitle,
      state.addRow,
      state.deleteRow,
      state.updateRowTitle,
      state.updateRowDescription,
      state.updateProduct,
  ]) 
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })
    let baseUrl = "/memory/collaborative"
  
    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        setOption(formData.option)
        setLoading(true)
        if(formData.option =="item-to-item"){
            baseUrl = baseUrl + "/item-to-item-filter/predict";
            const response: SimilarProductFormatted = await onPredict({
                customerIds: [parseInt(12434)], k:5, sample:10, baseUrl, storeId:1, merchantId: data.merchantId
            }) as SimilarProductFormatted
            setFormattedProducts(response)

            const sectionId = sections[0].id
            for(let i=0; i < (response.length - 1); ++i){
              const newRow = {id:  Math.floor(Math.random() * 100), title: "", description: "", product: null}
              addRow(sectionId, newRow)
              setRowsCount(+1)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
      if(formattedProducts && formattedProducts.length){
        
        if(sections.length > 1){
          sections.forEach(section => {
            deleteSection(section.id)
            setRowsCount(-section.rows.length)
          });
        }
        const sectionId = sections[0].id
        console.log(sections[0].rows)
        // if(rowsCount > 1){
        //   sections[0].rows.slice(1).reverse().forEach(row => {
        //     console.log(row.id)
        //     deleteRow(sectionId, row.id)
        //     setRowsCount(-1)
        //   })
        // }
        updateSectionTitle(sectionId, {title: "Deals just for you!"})
        const rows = (sections.find((s) => s.id == sectionId)).rows

        for(let i = 0; i < rows.length; ++i){
          const row = rows[i]
          const product = formattedProducts[i]
          console.log(product)
          if(product){
            updateRowTitle(sectionId, row.id, {title: product?.name??"".slice(0, 40)})
            updateRowDescription(sectionId, row.id, {description: product.description??"".slice(0, 40)})
            updateProduct(sectionId, row.id, {product: {id: parseInt(product.id), name: product.name, price: product.price}})
          }
        }
      }
    }, [formattedProducts])
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="option"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="k-nearest-neighbor" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        K-nearest neighbor
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="user-to-user" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        User to user filter
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="item-to-item" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Item to item filter
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" disabled={loading}>
            {loading ? <LoadingSpinner />: "Submit"}
          </Button>
        </form>
      </Form>
    )
  }
  