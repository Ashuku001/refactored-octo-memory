import { ProductSearchQuery } from "@/graphql";
import { formatter } from "@/lib/utils";
import Image from "next/image";

type ProductType = {
  id: number;
  name: string;
  description?: string | null;
  price: any;
  category: {
      name: string;
  };
  images: Array<{
      url: string;
  } | null>;
}

type Props = {
    product: ProductType
}

export const TargetProduct = ({product}: Props) => {
  return (
  <div className="flex space-x-2">
    <Image
      src={product?.images[0]?.url ?? "/default-product.png"}
      height={100}
      width={100}
      alt=""
      className="object-cover w-[100px] h-[100px] rounded-md"
    />
    <div>
      <p className="line-clamp-1">{product?.name}</p>
      <p className="line-clamp-1">{formatter.format(product?.price)}</p>
      <p className="line-clamp-1">{product?.category.name}</p>
      <p className="line-clamp-2">{product?.description}</p>
    </div>
  </div>);
};