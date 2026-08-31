import { describe, expect, it } from "vitest";
import { ObjectIdSchema } from "./common";
import { ProductInputSchema } from "./product";
import { AccountUpdateSchema, RegisterSchema } from "./account";
import { OrderAdminUpdateSchema } from "./order";

const validProduct = {
    name: "Black T-Shirt",
    price: "500",
    image: "https://utfs.io/f/abc.png",
    size: "M",
    category: "men",
    color: "black",
    material: "cotton",
};

describe("ObjectIdSchema", () => {
    it("accepts 24 hex chars and nothing else", () => {
        expect(ObjectIdSchema.safeParse("655746332bc062b459e44332").success).toBe(true);
        expect(ObjectIdSchema.safeParse("655746332bc062b459e4433").success).toBe(false);
        expect(ObjectIdSchema.safeParse("zzzzzzzzzzzzzzzzzzzzzzzz").success).toBe(false);
    });
});

describe("ProductInputSchema", () => {
    it("coerces the price from a form string and trims text", () => {
        const parsed = ProductInputSchema.parse({ ...validProduct, name: "  Black T-Shirt  " });
        expect(parsed.price).toBe(500);
        expect(parsed.name).toBe("Black T-Shirt");
    });

    it("rejects non-positive prices, foreign image hosts and unknown categories", () => {
        expect(ProductInputSchema.safeParse({ ...validProduct, price: "-5" }).success).toBe(false);
        expect(ProductInputSchema.safeParse({ ...validProduct, price: "0" }).success).toBe(false);
        expect(ProductInputSchema.safeParse({ ...validProduct, image: "https://example.com/x.png" }).success).toBe(false);
        expect(ProductInputSchema.safeParse({ ...validProduct, category: "hats" }).success).toBe(false);
    });

    it("drops unknown keys so nothing can be mass-assigned", () => {
        const parsed = ProductInputSchema.parse({ ...validProduct, order_id: "655746332bc062b459e44332" });
        expect("order_id" in parsed).toBe(false);
    });
});

describe("RegisterSchema", () => {
    it("lower-cases the email and enforces the password length", () => {
        const parsed = RegisterSchema.parse({ name: "Ann Lee", email: "Ann@Example.com", password: "longenough" });
        expect(parsed.email).toBe("ann@example.com");
        expect(RegisterSchema.safeParse({ name: "Ann Lee", email: "ann@example.com", password: "short" }).success).toBe(false);
        expect(RegisterSchema.safeParse({ name: "A", email: "ann@example.com", password: "longenough" }).success).toBe(false);
    });
});

describe("AccountUpdateSchema", () => {
    it("accepts PH mobile numbers in either common format", () => {
        const base = { name: "Ann Lee", barangay: "Molino VI", address: "12 Sampaguita St" };
        expect(AccountUpdateSchema.safeParse({ ...base, contact: "09171234567" }).success).toBe(true);
        expect(AccountUpdateSchema.safeParse({ ...base, contact: "+639171234567" }).success).toBe(true);
        expect(AccountUpdateSchema.safeParse({ ...base, contact: "0917 123 4567" }).success).toBe(false);
        expect(AccountUpdateSchema.safeParse({ ...base, contact: "12345" }).success).toBe(false);
    });
});

describe("OrderAdminUpdateSchema", () => {
    it("requires a ship date only when marking an order as shipped", () => {
        expect(OrderAdminUpdateSchema.safeParse({ status: "shipped" }).success).toBe(false);
        expect(OrderAdminUpdateSchema.safeParse({ status: "shipped", ship_date: "2026-09-01" }).success).toBe(true);
        expect(OrderAdminUpdateSchema.safeParse({ status: "processing" }).success).toBe(true);
        expect(OrderAdminUpdateSchema.safeParse({ status: "lost" }).success).toBe(false);
        expect(OrderAdminUpdateSchema.safeParse({ status: "shipped", ship_date: "01/09/2026" }).success).toBe(false);
    });
});
