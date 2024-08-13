'use client'
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { CustomerSearchDocument, CustomerSearchQuery } from "@/graphql";
import { CustomerSwitcher } from "./CustomerSwitcher";
import Image from "next/image";
import { formatter } from "@/lib/currencyformat";
import { Separator } from "@/components/ui/separator";
import { columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";
import { SimilarProductFormatted, SimilarProductResponseType } from "@/types";
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { TrainingCard } from "../../components/TrainingCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SimilarProducts } from "../../components/SimilarProducts";
import {TargetCustomer} from "../../components/TargetCustomer";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import secureLocalStorage from 'react-secure-storage';

type TrainProps = {
  storeId: string;
}

export const KNNTrain = ({storeId}: TrainProps) => {
    const [training, setTraining] = useState(false)
    const merchantId = secureLocalStorage.getItem('merchantId')
    const baseUrl = "/model/collaborative/knn-model/train"

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
        toast.error("Something went wrong while training. Try again later.")
      }
      setTraining(false)
    }

    return (
      <div className="flex flex-col space-y-2">
        <TrainingCard
          onTrain={onTrain}
          training={training}
          title={"Build k-nearest neighbour model"}
          description={"This is a supervised machine learning model for classifying similar users and recommend based on similar users."}
          btnTitle={"Train k-nearest model model"}
        />
        <TestRecommendation storeId={storeId}/>
      </div>
    );
};

type TestRecommendationProps = {
  storeId: string;
}

export const TestRecommendation = ({storeId}: TestRecommendationProps) => {
  const merchantId = secureLocalStorage.getItem('merchantId')
  const [loading, setLoading] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [formattedProducts, setFormattedProducts] = useState<SimilarProductFormatted[] | null>(null)
  const [customer, setCustomer] = useState<CustomerSearchQuery["customerSearch"] | null>(null)
  const [customerSearch, {loading: queryloading, error, data}] = useLazyQuery(CustomerSearchDocument)
  const baseUrl = "/model/collaborative/knn-model/predict"
  let customers: CustomerSearchQuery["customerSearch"] = data?.customerSearch

  useEffect(() => {
    if(searchString?.length > 2){
      customerSearch({variables: {page: 0, limit:10, text:searchString}})
    } else {
      customers = []
    }
  }, [searchString, customers])

  useEffect(() => {
    const onPredict = async (customerIds: number[], k:number=5, sample:number=10) => {
      setFormattedProducts(null)
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${baseUrl}?storeId=${parseInt(storeId)}&merchantId=${merchantId}&k=${k}&sample=${sample}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerIds),
        })
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const jsonData = await response.json(); // Parse JSON response
        console.log(jsonData)
        if(jsonData["success"]?.length > 0){
          const data = jsonData["success"][0]["recommendations"].map((item: SimilarProductResponseType) => ({
            id: item?.productId,
            name: item?.name,
            price: formatter.format(item?.price),
            // category: item?.category,
            brand: item?.brand,
            description: item?.description,
            // score: similarity == "manhattan" ? item?.score : similarity == "cosine" ? item?.score * 100 : item?.score
          })) as SimilarProductFormatted[]

          setFormattedProducts(data)
          toast.success("Similar products found.", {duration: 1500})
        } else {
          setFormattedProducts(null)
          toast("Could not find recommendations for the customer. The customer seems to be new and has never made a purchase.", {duration:4000})
        }
      } catch (error) {
        toast.error("Something went wrong. Try again later.")
      } finally {
        setLoading(false)
      }
    }

    if(customer?.length) {
      onPredict([customer[0]?.id] as number)
    }
  }, [customer, storeId])

  return <Card>
          <CardHeader className="">
            <div className="flex flex-row items-center space-x-5">
              <FlaskConical size={"30"} className="text-muted-foreground"/>
              <CardTitle className="text-lg font-semibold">
                Test model
              </CardTitle>
            </div> 
            <CardDescription>
              To test the model search a customer to find similar products
            </CardDescription>
          </CardHeader>
          <CardContent >
            <div className="flex space-x-10">
              <div className="flex flex-col space-y-2">
                <CustomFormLabel title="Customer" description="Select a customer to recommend products for." variant="required" />
                <CustomerSwitcher
                  value={searchString}
                  className="w-[350px] h-10"
                  loading={loading}
                  onValueChange={setSearchString}
                  customers={customers ?? []}
                  customer={customer ? customer[0] : null}
                  setCustomer={setCustomer}
                />
              </div>
              {customer &&
                <TargetCustomer customer={customer[0]}/>
              }
            </div>
            {loading ? <div className=" flex items-center justify-center space-x-2"><LoadingSpinner /> <span className="text-blue-600 animate-pulse duration-2000 ease-in-out"> Loading recommendations...</span></div> :
              formattedProducts &&
              <SimilarProducts formattedProducts={formattedProducts} columns={columns}/>
            } 
          </CardContent>
        </Card>
}