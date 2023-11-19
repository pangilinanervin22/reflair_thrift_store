import { PrismaClient } from "@prisma/client";

class PrismaSingleton {
    private static instance: PrismaClient;

    private constructor() {
        // Initialize the PrismaClient only once
        PrismaSingleton.instance = new PrismaClient();
    }

    public static getInstance(): PrismaClient {
        if (!PrismaSingleton.instance) {
            // Create a new instance if it doesn't exist
            PrismaSingleton.instance = new PrismaClient();
        }

        return PrismaSingleton.instance;
    }
}

const prisma = PrismaSingleton.getInstance();

export default prisma;

