import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    imageUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
        .middleware((req) => {
            return { userId: "2" };
        })
        .onUploadComplete(({ metadata, file }) => {
            return file.url;
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;