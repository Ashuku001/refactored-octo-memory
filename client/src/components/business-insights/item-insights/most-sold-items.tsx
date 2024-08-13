import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { LargeLoadingSpinner } from "@/components/LargeLoadingSpinner";

type MostSoldProps ={
    base_url: string,
    storeId: string
}
export const MostSold = ({base_url, storeId}: MostSoldProps) => {
  const [imageUrl, setImageURL] = useState("");
  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${base_url}?storeId=${storeId}`); 
        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.statusText}`);
        }
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImageURL(objectURL);
      } catch (error) {
        toast.error("Something went wrong.")
      }
    };

    fetchImage();
  }, [base_url, storeId])
  return(
    <div className="flex items-center justify-center">
      {imageUrl 
        ? 
        <Image
          fill={true}
          src={imageUrl}
          alt=""
          className="object-contain"
        />
        : <LargeLoadingSpinner />
      }
      </div>
  )
};

