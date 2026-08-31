"use client"

import { FormEvent, useState } from "react";
import Image from "next/image";
import style from "./ProductForm.module.scss";
import '@uploadthing/react/styles.css';
import Link from "next/link";
import { toast } from "react-toastify";
import { UploadButton } from "@/db/uploadthing";
import { ProductCreateAction } from "@/lib/ProductAction";
import { useRouter } from "next/navigation";
import { PLACEHOLDER_PRODUCT_IMAGE, PRODUCT_CATEGORIES } from "@/lib/constants";
import { ProductInputSchema } from "@/lib/schemas/product";

export default function ProductCreateForm() {
    const [url, setUrl] = useState(PLACEHOLDER_PRODUCT_IMAGE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const form = new FormData(e.currentTarget);
        // Same schema the server enforces — instant feedback without a round-trip
        const parsed = ProductInputSchema.safeParse({
            name: form.get("name"),
            price: form.get("price"),
            image: url,
            size: form.get("size"),
            material: form.get("material"),
            color: form.get("color"),
            category: form.get("category"),
        });
        if (!parsed.success) {
            toast.error(parsed.error.issues[0]?.message ?? "Please check the form", { toastId: "productForm" });
            return;
        }

        setIsSubmitting(true);
        const loading = toast.loading("Creating product…");
        try {
            const res = await ProductCreateAction(parsed.data);
            if (res.ok) {
                toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
                router.push("/admin/product");
            } else {
                toast.update(loading, { render: res.message, type: "error", autoClose: 3000, isLoading: false });
            }
        } catch {
            toast.update(loading, { render: "Something went wrong. Please try again.", type: "error", autoClose: 2500, isLoading: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={style.main}>
            <div className={style.container_upload}>
                <Image src={url} alt="image upload" width={840} height={1120} sizes="(max-width: 860px) 92vw, 420px" />
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        const file = res[0];
                        if (file) setUrl(file.ufsUrl);
                        toast.success("Image uploaded");
                    }}
                    onUploadError={(error: Error) => {
                        toast.error("Upload failed: " + error.message);
                    }}
                />
            </div>
            <div className={style.container_form}>
                <h2>New product</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className={style.container_input}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            minLength={3}
                            maxLength={64}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="₱ 00.00"
                            min={1}
                            max={100000}
                            step="0.01"
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="size">Size</label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            placeholder="small, medium, large"
                            maxLength={20}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="material">Material</label>
                        <input
                            type="text"
                            id="material"
                            name="material"
                            placeholder="cotton, polyester, leather"
                            maxLength={30}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="color">Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            placeholder="red, blue, green"
                            maxLength={30}
                            required
                        />
                    </div>
                    <div className={style.container_input}>
                        <label htmlFor="category">Select a category:</label>
                        <select id="category" name="category" required>
                            {PRODUCT_CATEGORIES.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className={style.action_button}>
                        <Link href="/admin/product" className={style.cancel}>Cancel</Link>
                        <button className={style.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Register"}</button>
                    </div>
                </form>
            </div>
        </section >
    );
}
