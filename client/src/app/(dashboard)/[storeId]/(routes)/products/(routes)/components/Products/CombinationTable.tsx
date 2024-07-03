import { useEffect, useState } from "react"
import CustomDataTable from "@/components/Table/CustomTable"
import { ImageCell } from "@/components/Table/ImageCell"
import {  useAddProductStore } from "@/store/AddNewProduct"
import { ColumnDefObj, CombinationObj, getCombinationObjects, } from "@/lib/store/productCombination"
import { CustomFormLabel } from "@/components/ui/CustomFormLabel"
import EditableCell from "@/components/Table/EditableCell"
import { UseFormReturn } from "react-hook-form"
import { ProdVariationObject, ProdCombinationObject } from "@/types"
import { computeCols } from '@/lib/store/productCombination';

interface VariationTyps {
    [key:string]: string
}

type CombinationTableProps = {
    combinations: Array<string[]>;
    form: UseFormReturn<{
        [key: string]: string[] | string;
    }, any, undefined>;
    initialData: {
        prodVariations: ProdVariationObject[];
        prodCombinations: ProdCombinationObject[];
    };
}

export const CombinationTable = ({combinations, form, initialData}: CombinationTableProps) => {
    const [data, setData] = useState<CombinationObj[]>([])
    const [columns, setColumns] = useState<ColumnDefObj[]>([])
    const [searchKey, setSearchKey] = useState<string>('')
    const [searchKeyOptions, setSearchKeyOptions] = useState<string[]>([])
    // @ts-ignore
    const  [productVariations, addData] = useAddProductStore((state) => [state.productVariations, state.addData])

    useEffect(() => {
        let extraColumns: ColumnDefObj[] = []
        if(initialData?.prodCombinations?.length > 0){
            const data = initialData?.prodCombinations?.reduce((acc, item) => {
                let {combinationString, ...rest} = item
                combinationString = JSON.parse(combinationString)
                rest = {...rest, ...combinationString}
                acc = [...acc, rest]
                return acc
            }, new Array<CombinationObj>)

            if(initialData?.prodCombinations[0]?.combinationString){
                const keys = Object.keys(JSON.parse(initialData?.prodCombinations[0]?.combinationString))
                extraColumns = computeCols(keys)
            }
            setData(data)


        } else {
            const trackInventory = true
            let mainSKU = ''
            if(trackInventory){
                const productName = form.getValues('name')?.slice(0, 3).toString().toUpperCase()
                mainSKU = mainSKU.concat(productName)
                mainSKU = mainSKU.concat('-CAT')
            }
            const price = form.getValues('price').toString()
            const {combObjects, columns: colsDef} = getCombinationObjects(combinations, productVariations, mainSKU, price)
            if(combObjects.length){
                setData(combObjects)
            }
            extraColumns = colsDef
        }

        const accessorKeys = extraColumns?.reduce((acc, col) => {
            acc = [...acc, col.accessorKey]
            return acc
        }, new Array<string>)
        setSearchKeyOptions(accessorKeys)

        setColumns([
            {
                accessorKey: "variantImage",
                header: "Variant Image",
                size:100,
                enableSorting:false,
                // @ts-ignore
                cell: (props) => <ImageCell {...props} form={form}/> 
            },
            ...extraColumns,
            {
                accessorKey: "sku",
                header: "SKU",
                size:100,
                enableSorting:false,
                // @ts-ignore
                cell: (props) => props.getValue() ? props.getValue() : '---' 
            },
            {
                accessorKey: "availableStock",
                header: "Stock",
                size:100,
                enableSorting:false,
                // @ts-ignore
                cell: (props) => <EditableCell {...props} form={form} name={'stock'}/> 
            },
            {
                accessorKey: "price",
                header: "Price",
                size:100,
                enableSorting:false,
                // @ts-ignore
                cell: (props) => <EditableCell {...props} form={form} name={'price'}/> 
            },
        ])
    
        
        return () => {
            setData([])
            setColumns([])
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[combinations, form.getValues().name, productVariations])


    useEffect(() => {
        addData(data)
    }, [addData, data])

    return (
    <>
        {!!data.length &&
            <>

                <CustomFormLabel title={"Variants"} description={"For variant that is not available, set its stock value to zero it will not appear anywhere in you catalogue"}/>
                <CustomDataTable 
                    data={data} 
                    setData={setData} 
                    columns={columns} 
                    paginate={false}

                    searchKey={!!searchKey.length ? searchKey : searchKeyOptions[0]}
                    setSearchKey={setSearchKey}
                    searchKeyOptions={searchKeyOptions}
                />
            </>
        }
    </>
    )
}