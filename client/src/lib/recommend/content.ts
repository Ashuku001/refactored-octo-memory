import { SimilarProductFormatted, SimilarProductResponseType } from "@/types";
import toast from "react-hot-toast";

type onPredictProps = {
  productId: number;
  similarity: string;
  storeId: number;
  merchantId: number;
}

export const onPredict = async ({productId, similarity, storeId, merchantId}: onPredictProps) => {
  const baseUrl = "/memory/content/tfidf/predict"
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
    toast.success("Similar products found.", {duration: 1500})
    return data
  } catch (error) {
    toast.error("Something went wrong. Try again later.")
  }
}