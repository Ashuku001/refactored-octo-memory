import { SimilarProductResponseType, SimilarProductFormatted } from "@/types";
import toast from "react-hot-toast";
import { formatter } from "@/lib/currencyformat";

type PredictProps = {
    customerIds: number[]; 
    k:number; 
    sample:number;
    baseUrl: string;
    storeId: number;
    merchantId: number;
}

export const onPredict = async ({customerIds, k, sample, baseUrl, storeId, merchantId}: PredictProps) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${baseUrl}?storeId=${parseInt(storeId)}&merchantId=${merchantId}&k=${k ?? 5}&sample=${sample ?? 10}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerIds),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonData = await response.json(); // Parse JSON response
      if(jsonData["success"]?.length > 0){
        const data = jsonData["success"][0]["recommendations"].map((item: SimilarProductResponseType) => ({
          id: item?.productId,
          name: item?.name,
          price: item?.price,
          // category: item?.category,
          brand: item?.brand,
          description: item?.description,
          // score: similarity == "manhattan" ? item?.score : similarity == "cosine" ? item?.score * 100 : item?.score
        })) as SimilarProductFormatted[]

        toast.success("Similar products found.", {duration: 1500})
        return data
      } else {
        return null
        toast("Could not find recommendations for the customer. The customer seems to be new and has never made a purchase.", {duration:4000})
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.")
    }
  }