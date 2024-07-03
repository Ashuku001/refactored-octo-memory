import Image from "next/image"
import { useState, useEffect } from "react"
import {ImageUpload} from '@/components/appwrite/AppWriteImageUpload'
import {  FormField, FormItem,  FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

// @ts-ignore
export function ImageCell({getValue, row, column, table, form}) {
  let initialValue = getValue()?.link || ''
  const [link, setLink] = useState(initialValue)
  const {updateData} = table.options.meta
  useEffect(() => {
    setLink(initialValue)
  }, [initialValue])
  return (
      <div>
          {link ?
          <div className={'h-auto max-h-50 w-[100px] max-w-full relative '}>
            <div className='z-10 absolute top-1 right-1'>
                <Button type='button' onClick={() => updateData(row.index, column.id, {link: ""})} variant="destructive" size={'icon'}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Image
                className='object-cover w-full rounded-sm'
                alt='image'
                src={link}
                width={70}
                height={70}
            />
          </div>
      : 
      <>
          <FormField
              control={form.control}
              name={`image${row.index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      // disabled={upLoading}
                      onChange={(url) => {
                        field.onChange(url)
                        updateData(row.index, column.id, {link: url});
                      }}
                      onRemove={(url) => field.onChange("")}
                      imageSize="h-auto min-h-[100px] w-[100px] max-w-full max-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      </>
          }
    </div>
  )
}
