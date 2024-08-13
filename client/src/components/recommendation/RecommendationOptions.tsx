import { zodResolver } from "@hookform/resolvers/zod"
//@ts-ignore
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRecommendationStore } from "@/store/RecommendationStore"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const FormSchema = z.object({
    option: z.enum(["content-filter", "collaborative-filter", "model-based-filter", "deep-learning-filter"], {
      required_error: "You need to select a recommendation option.",
    }),
  })

type Props = {
  loading?: boolean
}

export function RecommendationOption({loading}: Props) {
    const [setOption] = useRecommendationStore((state) => [ state.setOption])
    // const [addPaymentMethod] = useCart((state) => [state.addPaymentMethod])
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })
  
    function onSubmit(data: z.infer<typeof FormSchema>) {
        setOption(data.option)
    }
  
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
                        <RadioGroupItem value="content-filter" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Content filter
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="collaborative-filter" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Collaborative filter
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="model-based-filter" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Machine learning based filter
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="deep-learning-filter" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Deep learning filter
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>Submit</Button>
        </form>
      </Form>
    )
  }
  