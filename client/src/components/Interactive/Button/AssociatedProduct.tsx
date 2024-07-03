
import { Header } from '@/components/Interactive/SubComponents';
import {  UseFormReturn } from "react-hook-form";
import {  FormField, FormItem } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useInteractiveButtonStore } from '@/store/InteractiveButtonStore';
import { Label } from '@/components/ui/label';

type AssociatedProductProps = {
  children: React.ReactNode;
  form: UseFormReturn<{
    [key: string]: "";
}, any, undefined>
}

export const AssociatedProduct: React.FC<AssociatedProductProps> =  ({children, form}) => {
  //@ts-ignore
  const [hasProduct, setHasProduct] = useInteractiveButtonStore((state) => [
    state.hasPrdouct,
    state.setHasProduct,
  ])
  
  return( 
    <div className="p-1">

        <Header 
            variant="optional"
            title="Associated product"
            description="Add a product you want to associate to this button message so that when your customers react to the message you get a notification in your store dashbord."
        />
              <FormField
        control={form.control}
        name="hasProduct"
        render={({field}) => (
        <FormItem>
          <RadioGroup
            value={field.value}
            onValueChange={(value: string) => {setHasProduct(value); field.onChange(value)}}
            className="flex space-x-2"
          >
              <div className="border-1 ">
                <Label  className=" bg-slate-500/20 rounded-lg p-3 w-30 h-30 flex space-x-2 justify-center items-center">
                <RadioGroupItem value={""} onClick={() => setHasProduct(!hasProduct)}/>
               </Label>
              </div>
          </RadioGroup>
        </FormItem>)}
      />

        <div className='mt-3'>
          {children}
        </div>
    </div>
  )
};
