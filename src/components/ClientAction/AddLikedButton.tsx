import { useCartStore } from '@/app/(shop)/cart/cart'
import type { Product } from '@prisma/client'
import React from 'react'

interface AddLikedButtonProps {
    product: Product;
    title: string;
    className?: string;
}

export default function AddLikedButton({ product, className, title }: AddLikedButtonProps) {
    const { addProduct, product: w } = useCartStore();

    return (
        <button className={className || ""} onClick={() => {
            addProduct(product)
            console.log(w, "hello");

        }}>{title}</button>
    )
}