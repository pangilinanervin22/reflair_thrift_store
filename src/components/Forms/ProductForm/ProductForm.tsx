"use client"

import { useRouter } from "next/navigation";
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
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [size, setSize] = useState(product.size);
    const [material, setMaterial] = useState(product.material);
    const [color, setColor] = useState(product.color);
    const [selectedCategory, setSelectedCategory] = useState(product.category);
    const [url, setUrl] = useState(product.image);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !price || !url || !size || !material || !color || !selectedCategory) {
            alert("Please fill in all fields!");
            return;
        }

        const productValue: ProductRequestBody = {
            name,
            price,
            image: url,
            category: selectedCategory,
            color,
            material,
            size,
        }

        console.log(product);

        const res = await UpdateProductAction(product.id, productValue);

        if (res) {
            setUrl("https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png");
            setName("");
            setPrice(0);
            setSize("");
            setMaterial("");
            setColor("");
            setSelectedCategory("");
            router.push("/admin/product");
            alert("Registration successful!");
        } else {
            alert("Registration failed!");
        }
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
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            defaultValue={name}
                            onChange={(event) => setName(event.target.value)}
                            min={5}
                            max={64}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="">Price</label>
                        <input
                            type="number"
                            placeholder="₱ 00.00"
                            defaultValue={price}
                            onChange={(event) => setPrice(Number(event.target.value))}
                            min={10}
                            max={10000}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="">Size</label>
                        <input
                            type="text"
                            placeholder="small, medium, large"
                            defaultValue={size}
                            onChange={(event) => setSize(event.target.value)}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="">Material</label>
                        <input
                            type="text"
                            placeholder="cotton, polyester, leather"
                            defaultValue={material}
                            onChange={(event) => setMaterial(event.target.value)}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="">Color</label>
                        <input
                            type="text"
                            placeholder="red, blue, green"
                            defaultValue={color}
                            onChange={(event) => setColor(event.target.value)}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="category">Select a category:</label>
                        <select id="category"
                            defaultValue={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
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



