"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import style from "./page.module.scss";
import { UploadButton } from "@/utils/uploadthing";
import { ProductRequestBody } from "@/app/api/product/route";


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<any>();
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('men');
    const [url, setUrl] = useState("https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png");

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !price || !url || !size || !material || !color || !selectedCategory) {
            alert("Please fill in all fields!");
            return;
        }

        const product: ProductRequestBody = {
            name,
            price,
            image: url,
            category: selectedCategory,
            color,
            material,
            size,
        }

        console.log(product);

        const res = await fetch("/api/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (res.ok) {
            setUrl("https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png");
            setName("");
            setPrice("");
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
                    <div >
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            onChange={(event) => setName(event.target.value)}
                            min={5}
                            max={64}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Price</label>
                        <input
                            type="number"
                            placeholder="₱ 00.00"
                            onChange={(event) => setPrice(Number(event.target.value))}
                            min={10}
                            max={10000}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Size</label>
                        <input
                            type="text"
                            placeholder="small, medium, large"
                            onChange={(event) => setSize(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Material</label>
                        <input
                            type="text"
                            placeholder="cotton, polyester, leather"
                            onChange={(event) => setMaterial(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Color</label>
                        <input
                            type="text"
                            placeholder="red, blue, green"
                            onChange={(event) => setColor(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Select a category:</label>
                        <select id="category" defaultValue={"men"}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value={"men"}>men</option>
                            <option value={"women"}>women</option>
                            <option value={"shoes"}>shoes</option>
                        </select>
                    </div>
                    <div className={style.action_button}>
                        <button className={style.cancel}>Cancel</button>
                        <button className={style.submit} type="submit">Register</button>
                    </div>
                </form>
            </section>
        </main >
    );
}



