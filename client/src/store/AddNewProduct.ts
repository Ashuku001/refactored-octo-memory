import { create } from "zustand";
import { produce } from 'immer';
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

import { SizeType, ColorType, CategoryType } from "@/types";


export type ProdVariationType = {
  id: number;
  name: string;
  prodVarOptions: string[];
  
};

export interface StateProps {
  productVariations: ProdVariationType[];
  varTableData: any;
}

export interface SettersProps {
  addVariation: (variation: ProdVariationType) => void;
  removeVariation: (variationId: number) => void;
  updateVariation: (variationId: number, variation: ProdVariationType) => void;
  addData: (data: any) => void;
}

export const useAddProductStore = create(
  persist<StateProps & SettersProps>(
    (set, get) => ({
      productVariations: [],
      varTableData: {},

      addVariation: (variation: ProdVariationType) => {
        set({ productVariations: [...get().productVariations, variation] });
      },
      removeVariation: (variationId: number, variation: ProdVariationType) => {
        set({
          productVariations: [
            ...get().productVariations.filter(
              (item) => item.id !== variationId
            ),
          ],
        });
      },
      updateVariation: (variationId: number, variation: ProdVariationType) => {
        set(
          produce((draft) => {
            const index = draft.productVariations.findIndex(
              (variation: ProdVariationType) => variation.id === variationId
            );
            if(index >= 0) {
                draft.productVariations.splice(index, 1, variation)
                console.log(draft.productVariations)
            }
          })
        );
      },
      addData: (data: any) => {
        set({varTableData:data})
      },

      resetStore: () => {
        set({
          productVariations: [],
          varTableData: {},
        })
      }
    }),
 
    {
      name: "addProduct-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
