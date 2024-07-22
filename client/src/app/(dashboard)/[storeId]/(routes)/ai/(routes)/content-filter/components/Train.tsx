'use client'
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ProductSearchDocument, ProductSearchQuery } from "@/graphql";
import { ProductSwitcher } from "./ProductSwitcher";
import { useProductSwitcher } from "@/hooks/useProductSwitcher";
import Image from "next/image";
import { formatter } from "@/lib/currencyformat";
import { Separator } from "@/components/ui/separator";
import { columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";
import { SimilarProductFormatted, SimilarProductResponseType } from "@/types";
import { TrainingCard } from "./TrainingCard";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

type TrainProps = {
  storeId: string;
}

export const Train = ({storeId}: TrainProps) => {
    const [training, setTraining] = useState(false)
    const baseUrl = "/memory/content/tfidf/train"

    const onTrain = async () => {
      setTraining(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${baseUrl}?storeId=${storeId}&merchantId=${2}`, {
          method: 'GET', // Assuming a GET request (adjust if necessary)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const jsonData = await response.json(); // Parse JSON response
        toast.success(jsonData.success, {duration: 1500})
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Something went wrong. Try again later.")
      }
      setTraining(false)
    }

    return (
      <div className="flex flex-col space-y-2">
        <TrainingCard
          onTrain={onTrain}
          training={training}
          title={"Build content filter model"}
          description={"This model processes product description and finds similar products based on description. Press Train button to train the model."}
          btnTitle={"Train content filter model"}
        />
        <TestRecommendation storeId={storeId}/>
      </div>
    );
};

type TestRecommendationProps = {
  storeId: string;
}

export const TestRecommendation = ({storeId}: TestRecommendationProps) => {
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState("")
  const [formattedProducts, setFormattedProducts] = useState<SimilarProductFormatted[] | null>(null)
  const [product, setProduct] = useState<ProductSearchQuery["productSearch"] | null>(null)
  const productSwitcher  = useProductSwitcher()
  const [similarity, setSimilarity] = useState("")
  const similarityOptions = ["Cosine", "Euclidean", "Manhattan"]
  const [productSearch, {loading, error, data}] = useLazyQuery(ProductSearchDocument)
  let products: ProductSearchQuery["productSearch"] = data?.productSearch

  const baseUrl = "/memory/content/tfidf/predict"
  const onPredict = async (productId: number, similarity: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${baseUrl}?storeId=${storeId}&merchantId=${2}&productId=${productId}&similarity=${similarity}`, {
        method: 'GET', // Assuming a GET request (adjust if necessary)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonData = await response.json(); // Parse JSON response
      console.log(jsonData)
      const data = jsonData["similar_products"].map((item: SimilarProductResponseType) => ({
        id: item?.value.productId,
        name: item?.value.name,
        price: formatter.format(item?.value.price),
        category: item?.value.category,
        brand: item?.value.brand,
        description: item?.description,
        score: similarity == "manhattan" ? item?.score : similarity == "cosine" ? item?.score * 100 : item?.score
      })) as SimilarProductFormatted[]
      setFormattedProducts(data)
      toast.success("Similar products found.", {duration: 1500})
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Something went wrong. Try again later.")
    }
  }

  useEffect(() => {
    if(searchString.length > 2){
      productSearch({variables: {page: 0, limit:10, text:searchString, storeId: parseInt(storeId)}})
    } else {
      products = []
    }
  }, [searchString])

  useEffect(() => {
    if(products && products.length){
      productSwitcher.onOpen()
    } else productSwitcher.onClose()
  }, [products, searchString])

  useEffect(() => {
    if(similarity){
      if(product?.length) {
        onPredict(product[0]?.id as number, similarity.toLowerCase())
      } 
    } else {
      toast("Select similarity first before selecting a product", {duration: 2000})
    }
    
  }, [product])

  return <Card>
          <CardHeader className="">
            <div className="flex flex-row items-center space-x-5">
              <FlaskConical size={"30"} className="text-muted-foreground"/>
              <CardTitle className="text-md font-semibold">
                Test model
              </CardTitle>
            </div> 
            <CardDescription>
              To test the model search a product to find similar products
            </CardDescription>
          </CardHeader>
          <CardContent >
            <div className="flex space-x-5">
              <div className="flex flex-col space-y-2">
                <Select
                  onValueChange={(value) => setSimilarity(value)}
                  value={similarity}
                >
                  <SelectTrigger className=' focus:ring-0'>
                  <SelectValue
                      placeholder="Select similarity"
                      className="font-bold"
                  />
                  </SelectTrigger>
                  <SelectContent>
                      {similarityOptions?.map((option) => (
                      <SelectItem
                          key={option}
                          value={option}
                      >
                          {option}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <ProductSwitcher
                  value={searchString}
                  onValueChange={setSearchString}
                  products={products ?? []}
                  product={product ? product[0] : null}
                  setProduct={setProduct}
                />
              </div>
              {product?.length && 
                <div className="flex space-x-2">
                  <Image
                    src={product[0]?.images[0]?.url ?? "/default-product.png"}
                    height={100}
                    width={100}
                    alt=""
                    className="object-cover w-[100px] h-[100px] rounded-md"
                  />
                  <div>
                    <p className="line-clamp-1">{product[0]?.name}</p>
                    <p className="line-clamp-1">{formatter.format(product[0]?.price)}</p>
                    <p className="line-clamp-1">{product[0]?.category.name}</p>
                    <p className="line-clamp-2">{product[0]?.description}</p>
                  </div>
                </div>
              }
            </div>
            {formattedProducts &&
              <div className="mt-2">
                <Separator />
                <h1 className="font-semibold">Top 10 similar products</h1>
                <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                    <DataTable columns={columns} data={formattedProducts ?? []} searchKey="name" />
                </div>
              </div>
            } 
          </CardContent>
        </Card>
}