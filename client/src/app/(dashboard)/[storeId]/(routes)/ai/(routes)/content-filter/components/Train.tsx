'use client'
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ProductSearchDocument, ProductSearchQuery } from "@/graphql";
import { ProductSwitcher } from "./ProductSwitcher";
import Image from "next/image";
import { formatter } from "@/lib/currencyformat";
import { Separator } from "@/components/ui/separator";
import { columns } from "../../components/Columns";
import { DataTable } from "@/components/ui/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SimilarProductFormatted, SimilarProductResponseType } from "@/types";
import { TrainingCard } from "../../components/TrainingCard";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { SimilarProducts } from "../../components/SimilarProducts";
import { TargetProduct } from "../../components/TargetProduct";
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import secureLocalStorage from 'react-secure-storage';

type TrainProps = {
  storeId: string;
}

export const Train = ({storeId}: TrainProps) => {
    const [training, setTraining] = useState(false)
    const baseUrl = "/memory/content/tfidf/train"
    const merchantId = secureLocalStorage.getItem('merchantId')

    const onTrain = async () => {
      setTraining(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${baseUrl}?storeId=${storeId}&merchantId=${merchantId}`, {
          method: 'GET', // Assuming a GET request (adjust if necessary)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const jsonData = await response.json(); // Parse JSON response
        toast.success(jsonData.success, {duration: 1500})
      } catch (error) {
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
        <TestRecommendation storeId={storeId} merchantId={merchantId}/>
      </div>
    );
};

type TestRecommendationProps = {
  storeId: string;
  merchantId: string;
}

export const TestRecommendation = ({storeId}: TestRecommendationProps) => {
  const [searchString, setSearchString] = useState("")
  const merchantId = secureLocalStorage.getItem('merchantId')
  const [loading, setLoading] = useState(false)
  const [formattedProducts, setFormattedProducts] = useState<SimilarProductFormatted[] | null>(null)
  const [product, setProduct] = useState<ProductSearchQuery["productSearch"] | null>(null)
  const [similarity, setSimilarity] = useState("Cosine")
  const similarityOptions = ["Cosine",  "Manhattan"]
  const [productSearch, {loading: queryloading, error, data}] = useLazyQuery(ProductSearchDocument)
  const [products, setProducts] = useState<ProductSearchQuery["productSearch"] | []>(data?.productSearch ?? [])
  const baseUrl = "/memory/content/tfidf/predict"

  useEffect(() => {
    if(searchString.length > 2){
      productSearch({variables: {page: 0, limit:10, text:searchString, storeId: parseInt(storeId)}})
    } else {
      setProducts([])
    }
  }, [searchString, storeId, setProducts, productSearch])

  useEffect(() => {
    if(data?.productSearch){
      setProducts(data?.productSearch)
    }
  }, [data?.productSearch, setProducts])

  useEffect(() => {
    const onPredict = async (productId: number, similarity: string) => {
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${baseUrl}?storeId=${storeId}&merchantId=${merchantId}&productId=${productId}&similarity=${similarity}`, {
          method: 'GET', // Assuming a GET request (adjust if necessary)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const jsonData = await response.json(); // Parse JSON response
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
        toast.error("Something went wrong. Try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    if(product?.length) {
      if(!similarity){
        toast("Select similarity first before selecting a product", {duration: 2000})
      } else{
        onPredict(product[0]?.id as number, similarity.toLowerCase())
      }
    } 
  }, [product, similarity, storeId, merchantId])

  return <Card>
          <CardHeader className="">
            <div className="flex flex-row items-center space-x-5">
              <FlaskConical size={"30"} className="text-muted-foreground"/>
              <CardTitle className="text-lg font-semibold">
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
                <div className="flex flex-col space-y-2">
                  <CustomFormLabel title="Similarity measure" description="A function that checks similarity of products. Defaults to Cosine" variant="required" />
                  <Select
                    onValueChange={(value) => setSimilarity(value)}
                    value={similarity}
                    defaultValue="Cosine"
                  >
                    <SelectTrigger className=' focus:ring-0 w-[350px]'>
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
                </div>
                <div className="flex flex-col space-y-2">
                  <CustomFormLabel title="Product" description="Select a product to find similar products." variant="required" />
                  <ProductSwitcher
                    className="w-[350px] h-10"
                    value={searchString}
                    onValueChange={setSearchString}
                    products={products ?? []}
                    product={product ? product[0] : null}
                    setProduct={setProduct}
                  />
                </div>
              </div>
              {product?.length && 
                <TargetProduct product={product[0]}/>
              }
            </div>
            {loading ? <div className=" flex items-center justify-center space-x-2"><LoadingSpinner /> <span className="text-blue-600 animate-pulse duration-2000 ease-in-out"> Loading recommendations...</span></div> :
            formattedProducts &&
              <SimilarProducts columns={columns} formattedProducts={formattedProducts}/>
            } 
          </CardContent>
        </Card>
}