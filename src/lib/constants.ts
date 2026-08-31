export const SITE_NAME = "ReFlair";
export const SITE_URL = "https://reflair-thrift-store.vercel.app";

/** Flat delivery fee in PHP, added to every order (also shown at checkout and in the admin). */
export const SHIPPING_FEE = 50;

export const PRODUCT_CATEGORIES = ["men", "women", "shoes"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Image a new product starts with before an upload. Shared by many products, so it is never deleted from UploadThing. */
export const PLACEHOLDER_PRODUCT_IMAGE =
    "https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png";

/** One-line description used for metadata, Open Graph and JSON-LD. */
export const SITE_DESCRIPTION =
    "A one-of-each archive of pre-loved fashion — women, men and shoes, sourced once and sold once. Delivering in Bacoor, Cavite.";
