"use client"

import { FormEvent, useState } from "react";
import Image from "next/image";
import style from "./ProductForm.module.scss";
import Link from "next/link";
import { ProductUpdateAction } from "@/lib/ProductAction";
import type { Product } from "@prisma/client";
import { ProductRequestBody } from "@/app/api/product/route";
import { UploadButton } from "@/db/uploadthing";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface PageProps {
    product: Product;
}

export default function ProductForm({ product }: PageProps) {
    const { name, price, size, material, color, category } = product;
    const [url, setUrl] = useState(product.image);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isSubmitting)
            return; // If already submitting, prevent additional submissions

        setIsSubmitting(true);
        const loading = toast.loading("Product is pending");

        const { name, price, size, material, color, category } = e.target as typeof e.target & {
            name: { value: string };
            price: { value: number };
            size: { value: string };
            material: { value: string };
            color: { value: string };
            category: { value: string };
        };

        if (!name || !price || !url || !size || !material || !color || !category) {
            alert("Please fill in all fields!");
            return;
        }

        const productValue: ProductRequestBody = {
            name: name.value,
            price: Number(price.value),
            image: url,
            category: category.value,
            color: color.value,
            material: material.value,
            size: size.value,
        }

        // action here
        const res = await ProductUpdateAction(product.id, productValue);
        if (res?.ok) {
            toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
            router.push("/admin/product");
        }
        else if (res?.error) {
            toast.update(loading, { render: res.message, type: "error", autoClose: 2000, isLoading: false });
        }

        setIsSubmitting(false);; // Reset isSubmitting flag after submission
    }

    return (
        <section className={style.main}>
            <div className={style.container_upload}>
                <Image src={url} alt="image upload" width={1920} height={1080} />
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                        setUrl(String(res[0].url))
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>
            <div className={style.container_form}>
                <h2>Edit Product</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className={style.container_input}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter name"
                            defaultValue={name}
                            min={5}
                            max={64}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            placeholder="₱ 00.00"
                            defaultValue={price}
                            min={10}
                            max={10000}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="size">Size</label>
                        <input
                            type="text"
                            id="size"
                            placeholder="small, medium, large"
                            defaultValue={size}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="material">Material</label>
                        <input
                            type="text"
                            id="material"
                            placeholder="cotton, polyester, leather"
                            defaultValue={material}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="color">Color</label>
                        <input
                            type="text"
                            id="color"
                            placeholder="red, blue, green"
                            defaultValue={color}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="category">Select a category:</label>
                        <select id="category"
                            defaultValue={category}
                            required
                        >
                            <option value={"men"}>men</option>
                            <option value={"women"}>women</option>
                            <option value={"shoes"}>shoes</option>
                        </select>
                    </div>
                    <div className={style.action_button}>
                        <Link href="/admin/product"><button className={style.cancel}>Cancel</button></Link>
                        <button className={style.submit} type="submit">Register</button>
                    </div>
                </form>
            </div>
        </section >
    );
}



