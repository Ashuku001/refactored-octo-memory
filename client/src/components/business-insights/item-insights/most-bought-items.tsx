import {  useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { LargeLoadingSpinner } from "@/components/LargeLoadingSpinner";

type MostBoughtProps ={
    base_url: string,
    storeId: string
}
export const MostBought = ({base_url, storeId}: MostBoughtProps) => {
  const [imageUrl, setImageURL] = useState("");

  const fetchImage = async () => {
    try {
      const response = await fetch(`${base_url}?storeId=${storeId}`);  // Assuming endpoint is at root
      if (!response.ok) {
        throw new Error(`Error fetching image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageURL(objectURL);  // Update state with object URL
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong.")
      // Handle errors appropriately (e.g., display error message)
    }
  };
  
  useEffect(() => {
    fetchImage();
  }, [])
  console.log("THE RESPONSE", imageUrl)
  return(
    <div className="flex items-center justify-center">
      {imageUrl 
        ? 
        <Image
          fill={true}
          src={imageUrl}
          alt=""
          className="object-cover "
        />
        : <LargeLoadingSpinner />
      }
      </div>
  )
};

