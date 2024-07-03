import {create} from 'zustand'
import { ListSectionsType } from '@/types';
export interface ListMessageState {
    sections: ListSectionsType[];
    setListMessageSections: (sections: ListSectionsType[]) => void
}

export const useMessageStore = create<ListMessageState>((set) => ({

    // Section
    sections: [],
    setListMessageSections: (sections: ListSectionsType[]) => {
        set({sections})
    },

}))