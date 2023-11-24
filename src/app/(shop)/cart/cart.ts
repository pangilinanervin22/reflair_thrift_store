import { create } from "zustand";
import type { Product } from "@prisma/client";
import { persist, createJSONStorage } from "zustand/middleware";

type ModalState = {
    product: Product[];
    // closeModal: () => void;
    addProduct: (content: Product) => void;
};

const store = create<ModalState>()(
    persist((set) => ({
        product: [],
        // closeModal: () => set({ isOpen: false, content: null }),
        addProduct: (content: Product) => {
            set((state) => {
                if (state.product.find((item) => item.id === content.id))
                    return state;

                const awit = [...state.product, content];
                return { product: awit };
            });
        },
    }),
        {
            name: "AccountData", // unique name
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    ));

export const useCartStore = () => store((state) => state);