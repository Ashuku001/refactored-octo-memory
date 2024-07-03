import { EditIcon, TagsIcon, TrashIcon } from "lucide-react"
import { toast as sonner } from "sonner";
import { Button } from "@/components/ui/button"
import { useAddProductStore, ProdVariationType} from '@/store/AddNewProduct';
import { UseFormReturn } from 'react-hook-form';
import { Dispatch, SetStateAction} from "react";

type SavedVariationProps = {
  variation: ProdVariationType;
}

export function SavedVariation({variation}: SavedVariationProps) {
  //@ts-ignore
  const [removeVariation] = useAddProductStore((state) => [state.removeVariation])
  return (
    <div className="flex  items-center space-x-4 p-2  text-muted-foreground w-full">
      <div className="flex items-center space-x-2 ">
        <TagsIcon size={20}/>
        <span>{variation?.name}</span>:
      </div>
      <div className="">
        ( {variation.prodVarOptions?.map((option, i) => <span key={i}>{option}{(i+1) !== variation.prodVarOptions.length ? ", ": ""}</span>)} )
      </div>
      <div className='flex items-center space-x-1'>
        {/* <Button
          type="button"
          size={'icon'}
          onClick={() => {}}
          variant={'ghost'}
          className="ml-auto h-6 w-6"
        >
          <EditIcon />
        </Button> */}
        <Button
          type="button"
          size={'icon'}
          onClick={() => {removeVariation(variation.id); sonner.success("Variation removed.");}}
          variant={'ghost'}
          className="ml-auto h-6 w-6"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}

