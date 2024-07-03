import { Customer360OrderObj,  } from "@/types";
import {Promotion as RawPromotionType, GetPromotionsQuery} from "@/graphql"
import { format} from "date-fns";
import { formatter } from "@/lib/currencyformat"

export interface PromotionBase {
  id: number;
  name: string;
  description: string;
  discountType: string;
}

export interface DiscountObj extends PromotionBase {
  active: boolean;
  discountValue: number;
  createdAt: string;
  startDate: string;
  endDate: string;
}

export interface CouponObj extends PromotionBase {
  coupon: {
    id: number;
    code: string;
    validFrom: string;
    validTo: string;
    discount: number;
    active: boolean;
    createdAt: string;
  };
}

export interface PromotionType {
  discounts: DiscountObj[];
  coupons: CouponObj[];
}


export type TypedColumn = "discount" | "coupon";
export interface PromotionColumnMapObj {
  tab: TypedColumn;
  promotions: DiscountObj[] | CouponObj[];
}

export const promotionsGroup = async (
  promotions: GetPromotionsQuery["promotions"],
): PromotionColumnMapObj[] => {
  let confirmedOrders = [];

  const columns = promotions.reduce((acc, promotion) => {
    if (!acc.get(promotion.name)) {
      acc.set(promotion.name, {
        tab: promotion.name,
        promotions: [],
      });
    }

    if (promotion.name == "coupon") {
      acc.get(promotion.name).promotions.push({
        id: promotion.id,
        name: promotion.name,
        discountType: promotion.discountType,
        description: promotion.description,
        coupon: {
          ... promotion.coupon,
          validFrom:  format(new Date(promotion.coupon?.validFrom), "MMM do, yy"),
          validTo: format(new Date(promotion.coupon?.validTo), "MMM do, yy"),
          discount: promotion.coupon?.discount,
          createdAt: format(
            new Date(promotion?.coupon?.createdAt),
            "MMM do, yy"
          ),
        },
      });
    } else if (promotion.name == "discount") {
      acc.get(promotion.name).promotions.push({
        ...promotion,
        createdAt: format(new Date(promotion?.createdAt), "MMM do, yy"),
        discountValue: promotion.discountValue,
        startDate: format(new Date(promotion.startDate ), "MMM do, yy"),
        endDate: format(new Date(promotion.endDate ), "MMM do, yy"),
      });
    }
    return acc;
  }, new Map<TypedColumn, PromotionColumnMapObj>());


  const entries = Array.from(columns);
  const groupedPromotions: PromotionColumnMapObj[] = entries?.map((column) => {
    return column[1];
  });

  return groupedPromotions
};
