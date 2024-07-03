import { ProdVariationType } from "@/store/AddNewProduct";

type ImageType = {
    link:string
}
export interface CombinationObj {
    [key:string]: string | ImageType | number;
    variantImage: ImageType;
    price: string;
    sku: string;
    availableStock: number;
}

export interface ColumnDefObj    {
    accessorKey: string,
    header: string,
    size: number,
    enableSorting:boolean,
    cell: any
}

export const generateCombinations = async ([...arrays]):  Promise<Array<string[]>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/combinations/products`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(arrays)
    })

    const result = await response.json()
    return result
}


export const getCombinationObjects = (combinations: Array<string[]>, variations: ProdVariationType[], mainSKU:string, price: string) => {
    const keys = variations.reduce((acc, item: ProdVariationType) => {
        acc = [...acc, item.name]
        return acc
    }, new Array<string>)

    const columns = computeCols(keys)

    const combObjects = combinations.reduce((acc, combination: string[]) => {
        let object = computedObj(keys, combination, mainSKU, price)
        // object = {...object, }
        if(object){
            acc = [
                    ...acc,
                    object
            ]
        }
        return acc
    }, new Array<CombinationObj>)

    return {combObjects, columns}
}

export const computedObj = (keys: string[], values: string[], mainSKU: string,  price: string): CombinationObj | false => {
    let sku = mainSKU
    let object: CombinationObj = {
        variantImage: {link: ''},
        price: price,
        sku: '',
        availableStock: 0,
    }
    if(keys.length !== values.length) return false
    else {
        keys.forEach((key: string, i: number) => {
            object[key.toString().toLowerCase()] = values[i]
        })
    }
    for(let i = 0; i < values.length; i++){
        sku = sku.concat('-', values[i].slice(0, 3).toUpperCase())
        if(i === 2) break
    }
    object = {...object, sku: sku}
    return object
}

export const computeSKU = (mainSKU: string) => {

}

export const computeCols = (keys: string[]): ColumnDefObj[] => {
    let columns = keys.reduce((acc, key: string) => {
        acc = [...acc, {
            accessorKey: key.toLowerCase(),
            header: key,
            size: 5,
            enableSorting:false,
            // @ts-ignore
            cell: (props) => props.getValue()
        }]
        return acc
    }, new Array<ColumnDefObj>)

    return columns
}