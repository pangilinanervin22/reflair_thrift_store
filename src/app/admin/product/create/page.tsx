"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import style from "./page.module.scss";
import { UploadButton } from "@/utils/uploadthing";
import { ProductRequestBody } from "@/app/api/product/route";
import Link from "next/link";
import { CreateProductAction } from "@/lib/ProductAction";


export default function ProductCreatePage() {
    const [url, setUrl] = useState("https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png");

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

        if (!name || !price || !url || !size || !material || !color || !category) {
            alert("Please fill in all fields!");
            return;
        }

        const product: ProductRequestBody = {
            name: name.value,
            price: price.value,
            image: url,
            category: category.value,
            color: color.value,
            material: material.value,
            size: size.value,
        }

        try {
            await CreateProductAction(product);
            alert("Successful create a product!");
            router.push("/admin/product");
        } catch (error) {
            alert("Update failed!");
        }
    };

    return (
        <main className={style.main}>
            <section className={style.container_upload}>
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
            </section>
            <section className={style.container_form}>
                <h2>Create Product</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className={style.container_input}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter name"
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
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="size">Material</label>
                        <input
                            type="text"
                            id="size"
                            placeholder="cotton, polyester, leather"
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="color">Color</label>
                        <input
                            type="text"
                            id="color"
                            placeholder="red, blue, green"
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="category">Select a category:</label>
                        <select id="category" defaultValue={"men"}
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
            </section>
        </main >
    );
}



