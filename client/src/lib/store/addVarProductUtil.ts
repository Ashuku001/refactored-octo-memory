type  OptionType = {
  value: string
}
export type VariationType = {
  name: string;
  prodVarOptions: OptionType[]
}

type ImageType = {
  link: string
}

export type ProdCombinationType = {
  price: number;
  sku: string;
  availableStock: number
  variantImage: ImageType
}

export const getVarObjects = (variations: string[]) => {
  const options = variations.reduce((acc, variation) => {
    acc = [...acc, {value: variation}]
    return acc
  }, new Array<OptionType>)
  return options
}