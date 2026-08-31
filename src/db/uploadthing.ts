import { generateUploadButton } from "@uploadthing/react";

import type { OurFileRouter } from "../app/api/uploadthing/core";

// The only upload UI the app uses (admin product forms).
export const UploadButton = generateUploadButton<OurFileRouter>();
