import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { requireAdmin } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
    // Product images — admin only. The UploadButton only appears in the admin
    // product forms, but this middleware is what actually enforces it.
    imageUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const auth = await requireAdmin();
            if (!auth.ok) throw new UploadThingError({ code: "FORBIDDEN", message: "Unauthorized" });
            return { uploadedBy: auth.user.id };
        })
        .onUploadComplete(({ file }) => {
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
