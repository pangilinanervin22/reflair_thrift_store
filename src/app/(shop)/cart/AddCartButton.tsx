"use client"
import { useCartStore } from '@/app/(shop)/cart/cart'
import type { Product } from '@prisma/client'
import React from 'react'

interface AddCartButtonProps {
    product: Product;
    title: string;
    className?: string;
}

export default function AddCartButton({ product, className, title }: AddCartButtonProps) {
    const { addProduct, product: storeProduct, removeProduct } = useCartStore();

    const find = storeProduct.some((item) => item.id === product.id);
    const buttonContent = find ? "ADDED TO CART" : title;

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