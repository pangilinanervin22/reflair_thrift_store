"use client"

import { useCartStore } from '@/app/(shop)/cart/cart'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface AddCartButtonProps {
    product: any;
    title: string;
    className?: string;
}

export default function AddCartButton({ product, className, title }: AddCartButtonProps) {
    const { addProduct, product: storeProduct, removeProduct } = useCartStore();
    const find = storeProduct.some((item) => item.id === product.id);
    const { status }: any = useSession();
    const router = useRouter();

    return (
        <button className={className || ""} onClick={() => {
            console.log(status);
            if (status === "unauthenticated") {
                toast.error("Please login to add to cart");
                router.push("/login");
                return;
            }

            if (find)
                removeProduct(product)
            else
                addProduct(product)
        }}>
            {find ? "ADDED TO CART" : "ADD TO CART"}
        </button>
    )
}