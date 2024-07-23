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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

type TrainProps = {
  storeId: string;
}

export const ItemToItemTrain = ({storeId}: TrainProps) => {
    const [training, setTraining] = useState(false)
    const baseUrl = "/memory/collaborative/item-to-item-filter/train"

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
        toast.error("Something went wrong while training. Try again later.")
      }
      setTraining(false)
    }

    return (
      <div className="flex flex-col space-y-2">
        <TrainingCard
          onTrain={onTrain}
          training={training}
          title={"Build collaborative filter model"}
          description={"This model processes product or customer information products a customer is likely to buy."}
          btnTitle={"Train collaborative filter model"}
        />
        <TestRecommendation storeId={storeId}/>
      </div>
    );
};

type TestRecommendationProps = {
  storeId: string;
}

export const TestRecommendation = ({storeId}: TestRecommendationProps) => {
  const [loading, setLoading] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [formattedProducts, setFormattedProducts] = useState<SimilarProductFormatted[] | null>(null)
  const [customer, setCustomer] = useState<CustomerSearchQuery["customerSearch"] | null>(null)
  const [customerSearch, {loading: queryloading, error, data}] = useLazyQuery(CustomerSearchDocument)
  const baseUrl = "/memory/collaborative/item-to-item-filter/predict"
  let customers: CustomerSearchQuery["customerSearch"] = data?.customerSearch

  useEffect(() => {
    if(searchString?.length > 2){
      customerSearch({variables: {page: 0, limit:10, text:searchString}})
    } else {
      customers = []
    }
  }, [searchString])

  useEffect(() => {
    const onPredict = async (customerIds: number[], k:number=5, sample:number=10) => {
      setFormattedProducts(null)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${baseUrl}?storeId=${parseInt(storeId)}&merchantId=${2}&k=${k}&sample=${sample}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerIds),
        })
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const jsonData = await response.json(); // Parse JSON response
        const data = []
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
      }
    }

    if(customer?.length) {
      setLoading(true)
      onPredict([customer[0]?.id] as number)
      setLoading(false) 
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
                  onValueChange={setSearchString}
                  customers={customers ?? []}
                  customer={customer ? customer[0] : null}
                  setCustomer={setCustomer}
                />
              </div>
              {customer &&
                <div>
                  <h1>Target Customer</h1>
                    <p className="line-clamp-1">{(customer?.first_name && customer?.last_name)  ? customer?.first_name.trim() + " " + customer?.last_name.trim() : customer?.first_name ?? customer?.last_name ?? "No name result"}</p>
                    <p className="line-clamp-1">{customer?.phone_number ?? "No phone number result"}</p>
                    <p className="line-clamp-1">{customer?.customerSegment ?? ""}</p>
                    <p className="line-clamp-1">{customer?.incomeCategory ?? ""}</p>
                    <p className="line-clamp-1">{customer?.age ?? ""}</p>
                    <p className="line-clamp-1">{customer?.gender ?? ""}</p>
                </div>
              }
            </div>
            {loading ? <LoadingSpinner /> :
              formattedProducts &&
              <>
                <Separator />
                <div className="">
                  <h1 className="font-semibold">Top 10 similar products</h1>
                  <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                      <DataTable columns={columns} data={formattedProducts ?? []} searchKey="name" />
                  </div>
                </div>
              </>
            } 
          </CardContent>
        </Card>
}