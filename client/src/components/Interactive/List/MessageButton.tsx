
import { UseFormReturn } from "react-hook-form";
import { Header } from "@/components/Interactive/SubComponents";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { useInteractiveListStore } from '@/store/InteractiveListStore';

type MessageButtonProps = {
  form: UseFormReturn<{
    [key: string]: "";
}, any, undefined>
}

export const MessageButton:React.FC <MessageButtonProps> = ({form}) => {
    //@ts-ignore
    const [setActionButtonText] = useInteractiveListStore((state) => [
      state.setActionButtonText,
    ])

  return (
    <div className="p-1">
        <Header variant="required" title="Button" description="Add a button that let your customer perform an action e.g., Make an order"/>
        <div className="mt-3">
        <FormField
              control={form.control}
              name={`actionButtonText`}
              render={({field}) => (
                <FormItem className="flex-1">
                  <Label className="text-[14px]">Call to action button text</Label>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        placeholder="button text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setActionButtonText(e.target.value)
                        }
                       }
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
        </div>
    </div>
  )
}

