"use client";

import { useState } from 'react';
import Image from 'next/image';
import { UploadButton } from '@/db/uploadthing';

export default function ProductPage() {
    const [url, setUrl] = useState("https://utfs.io/f/000e8cee-9ec1-4459-8167-fbf1eb58d511-5xautr.jpg");


    return (
        <main >
            <Image src={url} alt="dress" width={200} height={200} />
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                    // Do something with the response
                    console.log("test", res[0].url);
                    console.log(res);
                    console.table(res);
                    setUrl(String(res[0].url))

                    // setUrl(res.url)
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </main>
    );
}