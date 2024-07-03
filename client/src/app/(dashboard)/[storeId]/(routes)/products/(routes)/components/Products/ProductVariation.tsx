import { Dispatch, SetStateAction, useEffect, useState, Suspense } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {  PlusIcon, TrashIcon } from 'lucide-react';
import { toast as sonner } from "sonner"
import toast from 'react-hot-toast';

import { ListInput } from './ListInput';
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';
import { Button } from '@/components/ui/button';
import { useAddProductStore, ProdVariationType} from '@/store/AddNewProduct';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { SavedVariation } from './SavedVariation';
import { Separator } from '@/components/ui/separator';
import { generateCombinations } from '@/lib/store/productCombination';
import { CombinationTable } from './CombinationTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ProdVariationObject, ProdCombinationObject} from '@/types';
interface VariationObject {
    name: string,
    options: string[]
}

type ProductVariationProps = {
    form: UseFormReturn<{
        [key: string]: string[] | string;
    }, any, undefined>;
    initialData: {
        prodVariations: ProdVariationObject[];
        prodCombinations: ProdCombinationObject[];
    };
}

export const ProductVariation = ({form, initialData}: ProductVariationProps) => {
    const [savedVariations, setSavedVariations] = useState<ProdVariationType[]>([])
    const [notSavedVariations, setNotSavedVariations] = useState<ProdVariationType[]>([])
    const [combinations, setCombinations] = useState<Array<string[]>>([])
    const [loadingComb, setLoadingCom] = useState(false)
    //@ts-ignore
    const  [productVariations, addVariation] = useAddProductStore((state) => [state.productVariations, state.addVariation])

    const onAddVariation = () => {
        addVariation({
            // @ts-ignore
            id: Math.floor(Math.random() * 100),
            name: "",
            // @ts-ignore
            prodVarOptions: []
        })
    }

    const onCombination = async () => {
        let variations: VariationObject[] = []
        savedVariations?.forEach((variation) => {
            variations = [...variations, {name: variation.name, options: variation.prodVarOptions}]
        })
        
        let result: Array<string[]> = []
        try {
            setLoadingCom(true)
            result = await generateCombinations(variations)
        } catch (error) {
            toast.error("Could not retrieve product combinations")
        }
        setCombinations(result)
        setLoadingCom(false)
    }

    useEffect(() => {
        const saved: ProdVariationType[]= productVariations.filter((variation: ProdVariationType) => !!variation.prodVarOptions.length)
        const notSaved: ProdVariationType[]= productVariations.filter((variation: ProdVariationType) => variation.prodVarOptions.length === 0)
        if(saved.length){
            setSavedVariations(saved)
        } else {
            setSavedVariations([])
        }
        if(notSaved.length){
            setNotSavedVariations(notSaved)
        } else {
            setNotSavedVariations([])
        }
    },[productVariations])
    return (
        <>
            <div className='flex flex-col'>
                <CustomFormLabel title={"Product Options"} variant={"optional"} description={"Variations allow you to sell different variations of the same product. e.g., a product can have different colors"}/>
                <div className='border rounded-sm bg-gradient-to-b  from-muted/20 to-muted/50'>
                    {savedVariations?.length > 0 && savedVariations?.map((variation: ProdVariationType) =>
                        <div key={variation?.id} >
                            <SavedVariation variation={variation} />
                            <Separator />
                        </div>
                    )}
                    {notSavedVariations?.map((variation: ProdVariationType) => 
                        <VariationOption key={variation?.id} form={form} variation={variation} setNotSavedVariations={setNotSavedVariations}/>
                    )}
                    <Button
                        variant={'ghost'}
                        disabled={notSavedVariations?.length > 0}
                        onClick={() => onAddVariation()}
                        type='button'
                        className='flex justify-start  space-x-2 items-center w-fit p-0 px-2 text-blue-300'
                    >
                        <PlusIcon size={20}/>
                        <span>Add Option set</span>
                    </Button>
                </div>
            </div>
            {(savedVariations?.length > 0 || initialData?.prodCombinations?.length > 0) &&
                <Button
                    variant={'ghost'}
                    disabled={notSavedVariations?.length > 0}
                    onClick={() => onCombination()}
                    type='button'
                    className='flex justify-start space-x-2 items-center p-0 px-2 text-blue-300'
                >
                    <PlusIcon size={20}/>
                    <span>Create Product Combinations</span>
                </Button>
            }
            <Separator className='my-5' />
            {loadingComb 
            ? <div className="flex flex-col items-center space-y-2">
                <LoadingSpinner />
                <p className="animate-bounce duration-10000 text-blue-600">Loading Combination</p>
            </div>
            : 
                <CombinationTable combinations={combinations ?? []} form={form} initialData={initialData}/>
            }
        </>
    )
}

type VariationOptionProps = {
    form: UseFormReturn<{
        [key: string]: string[] | string;
    }, any, undefined>;
    variation: ProdVariationType;
    setNotSavedVariations: Dispatch<SetStateAction<ProdVariationType[]>>
}
export const VariationOption = ({form, variation, setNotSavedVariations}: VariationOptionProps) => {
    //@ts-ignore
    const  [removeVariation, updateVariation] = useAddProductStore((state) => [state.removeVariation, state.updateVariation])

    const onDone = () => {
        const variantName = form.getValues('variantName')
        const variantOptions = form.getValues('variantOptions')
        if(!variantName){
            toast.error("Variant name is required")
        } else if (!variantOptions.length){
            toast.error("At least one variant option is required. Add an option and press enter.",
            {
                duration: 3000
            })
        } else {
            updateVariation(variation.id, 
                {
                    // @ts-ignore
                    id: variation.id,
                    name:  variantName,
                    prodVarOptions: variantOptions
            })
            setNotSavedVariations([])
            form.setValue('variantOptions', [])
            form.setValue('variantName', "")
            sonner.success("Variation created.");
        }
    }
    const onRemoveVariation = () => {
            removeVariation(variation.id)
            setNotSavedVariations([])
            form.setValue('variantOptions', [])
            form.setValue('variantName', "")
            sonner.success("Variation removed.");
    }
    useEffect(() => {
        if(variation.name){
            form.setValue('variantName', variation.name)
        }
    }, [form, variation.name])

    return (
        <div className='border-2 p-2 bg-gradient-to-b  from-muted/20 to-muted/50'>
            <div className='flex justify-end items-center'>
                <div className='flex items-center space-x-2'>
                <Button 
                    size={'icon'} 
                    variant={'destructive'}
                    type='button'
                    onClick={() => onRemoveVariation()}
                >
                    <TrashIcon size={20}/>
                </Button>
                <Button
                    type='button'
                    variant={'outline'}
                    onClick={() => onDone()}
                >
                    Done
                </Button>
                </div>
            </div>
            <div className="flex items-start space-x-2">
                <FormField
                    control={form.control}
                    name={`variantName`}
                    render={({field}) => (
                        <FormItem
                            className='w-[20%] max-w-[150px]'
                        >
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        value={field.value}
                                        defaultValue={variation.name}
                                        placeholder='Variant Name'
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    /> 
                                </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`variantOptions`}
                    render={({field}) => (
                        <FormItem
                                className='flex-1'
                            >
                                <FormLabel>Options</FormLabel>
                                <FormControl>
                                    <ListInput
                                    //@ts-ignore
                                        form={form} 
                                        inputName="variantOptions" 
                                        suggestions={['Color', 'Size', 'Model']}
                                        // existingInputs={variation.prodVarOptions}
                                        placeholder="Add variant options"
                                    />
                                </FormControl>
                                <FormDescription>Seperate different options by pressing return key</FormDescription>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

