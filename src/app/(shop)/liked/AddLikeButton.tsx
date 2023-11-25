"use client"
import { useCartStore } from '@/app/(shop)/cart/cart'
import type { Product } from '@prisma/client'
import React from 'react'
import { useLikeStore } from './cart';

interface AddLikeButtonProps {
    product: Product;
    title: string;
    className?: string;
}

export default function AddLikeButton({ product, className, title }: AddLikeButtonProps) {
    const { addProduct, product: storeProduct, removeProduct } = useLikeStore();

    const find = storeProduct.some((item) => item.id === product.id);
    const buttonContent = find ? "LIKED" : title;

    return (
        <button className={className || ""} onClick={() => {
            if (find)
                removeProduct(product)
            else
                addProduct(product)


            console.log(product, "passed [product]");
            console.log(find, "find");
        }}>
            {buttonContent.toUpperCase()}
        </button>
    )
}