interface PostProduct {
    id?: string;
    name: string;
    price: number;
    image: string;
    size: string;
    category: string;
    color: string;
    material: string;
    tags?: string[];
    status?: ProductStatus;
}

enum ProductStatus {
    "available",
    "unavailable",
}