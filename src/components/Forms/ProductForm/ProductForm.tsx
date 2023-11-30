"use client"

import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import style from "./ProductForm.module.scss";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";
import { UpdateProductAction } from "@/lib/ProductAction";
import type { Product } from "@prisma/client";
import { ProductRequestBody } from "@/app/api/product/route";

interface PageProps {
    product: Product;
}

export default function ProductForm({ product }: PageProps) {
    const { name, price, size, material, color, category } = product;
    const [url, setUrl] = useState(product.image);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { name, price, size, material, color, category } = e.target as typeof e.target & {
            name: { value: string };
            price: { value: number };
            size: { value: string };
            material: { value: string };
            color: { value: string };
            category: { value: string };
        };

        console.log(name.value, price.value, url, size.value, material.value, color.value, category.value);


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

        console.log(product);
        await UpdateProductAction(product.id, productValue);
    };

    return (
        <section className={style.main}>
            <div className={style.container_upload}>
                <Image src={url} alt="image upload" width={1920} height={1080} />
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
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



