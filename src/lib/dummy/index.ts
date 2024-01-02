'use server'

import { ProductCreateAction } from "../ProductAction"
import { faker } from '@faker-js/faker';
import { OrderCreateAction } from "../OrderAction";

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

function createDummyProduct(): PostProduct {
    // const randomCategory = faker.helpers.arrayElement(['women', 'men', 'shoes']);
    return {
        id: faker.database.mongodbObjectId(),
        name: "Dummy Product",
        price: Number(faker.commerce.price()),
        image: "https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png",
        size: "medium",
        category: "men",
        color: "black",
        material: faker.commerce.productMaterial(),
        tags: [],
    }
}

export async function CreateDummyProduct() {

    const listDummyProduct: PostProduct[] = [
        createDummyProduct(),
        createDummyProduct(),
    ];

    await Promise.all(listDummyProduct.map(async (product) => {
        await ProductCreateAction(product);
    }));

    const res = await OrderCreateAction("SampleDummy@gmail.com", listDummyProduct.map((product) => product.id || ""));
    console.log(res);
}
