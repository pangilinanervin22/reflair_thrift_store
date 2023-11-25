import { create } from "zustand";
import type { Product } from "@prisma/client";
import { persist, createJSONStorage } from "zustand/middleware";

type LikeState = {
    product: Product[];
    // closeModal: () => void;
    addProduct: (content: Product) => void;
    removeProduct: (content: Product) => void;
};

const store = create<LikeState>()(
    persist((set) => ({
        product: [],
        // closeModal: () => set({ isOpen: false, content: null }),
        addProduct: (content: Product) => {
            set((state) => {
                if (state.product.find((item) => item.id === content.id))
                    return state;

                const temp = [...state.product, content];
                return { product: temp };
            });
        },
        removeProduct: (content: Product) => {
            set((state) => {
                const filter = state.product.filter((item) => item.id !== content.id);
                const temp = [...filter];

                return { product: temp };
            });
        }
    }),
        {
            name: "Storage", // unique name
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    ));

export const useLikeStore = () => store((state) => state);