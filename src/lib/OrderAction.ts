'use server'

import prisma from "@/db/prisma";
import { Account, OrderStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function OrderCreateAction(account: Account, array_product_id: string[],) {
    try {
        const findAccount = await prisma.account.findUnique({
            where: {
                id: account.id
            },
            include: {
                order: {
                    include: {
                        product: true
                    }
                },
                cart: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!findAccount)
            return { message: "Account not found", error: true }
        if (!findAccount.address || !findAccount.barangay || !findAccount.city)
            return { message: "Please complete your address", error: true }

        const array_product = await prisma.product.findMany({
            where: {
                order: null,
                id: {
                    in: array_product_id
                },
            }
        });

        if (array_product.length === 0)
            return { message: "Product not found", error: true }

        const total_price = array_product.reduce((acc, curr) => acc + curr.price, 0);
        console.log(total_price);

        // disconnect product from cart and like
        await Promise.all([
            prisma.cart.update({
                where: {
                    account_id: findAccount.id
                },
                data: {
                    product: {
                        disconnect: array_product.map((product) => {
                            return { id: product.id }
                        })
                    }
                }
            }),
            prisma.like.update({
                where: {
                    account_id: findAccount.id
                },
                data: {
                    product: {
                        disconnect: array_product.map((product) => {
                            return { id: product.id }
                        })
                    }
                }
            })
        ]);

        const order = await prisma.order.create({
            data: {
                total_price: total_price + 50,
                name: findAccount.name,
                address: findAccount.address,
                barangay: findAccount.barangay,
                city: findAccount.city,
                product: {
                    connect: array_product_id.map((id) => {
                        return { id: id }
                    })
                },
                account: {
                    connect: {
                        id: findAccount.id
                    }
                }
            }
        });

        if (!order)
            return { message: "Order error occurred", error: true }

        return { message: "Order created", ok: true }
    } catch (error) {
        return { message: "Order error occurred", error: error }
    } finally {
        revalidatePath('/cart');
        revalidatePath('/admin/order');
    }
}

export async function OrderDeleteAction(order_id: string) {
    try {
        const currentOrder = await prisma.order.findFirst({
            where: {
                id: order_id
            },
            include: {
                product: true,
            }
        });

        if (!currentOrder)
            return { message: "Order not found", error: true }
        console.log(currentOrder.city, 'currentOrder');

        if (currentOrder.product.length !== 0)
            await Promise.all([
                currentOrder.product.map(async (product) => {
                    await prisma.product.update({
                        where: {
                            id: product.id
                        },
                        data: {
                            order: {
                                disconnect: true
                            }
                        }
                    })
                })
            ]);

        await prisma.order.delete({
            where: {
                id: currentOrder.id
            },

        });

        return { message: "Order deleted", ok: true }
    } catch (error) {
        return { message: "Order error occurred", error: error }
    } finally {
        revalidatePath('/admin/order');
    }
}

interface OrderUpdateData {
    address?: string;
    barangay?: string;
    city?: string;
    status?: string;

}

export async function OrderUpdateAction(order_id: string, data: any) {
    try {
        const order = await prisma.order.update({
            where: {
                id: order_id
            },
            data: {
                ...data
            }
        });

        if (!order)
            return { message: "Order not found", error: true }

        return { message: "Order updated", ok: true }
    } catch (error) {
        return { message: "Order error occurred", error: error }
    }
}

export async function OrderUpdateStatusAction(order_id: string, status: OrderStatus) {
    try {
        const order = await prisma.order.update({
            where: {
                id: order_id
            },
            data: {
                order_status: status
            }
        });

        if (!order)
            return { message: "Order not found", error: true }

        return { message: "Order updated", ok: true }
    } catch (error) {
        return { message: "Order error occurred", error: error }
    } finally {
        revalidatePath('/admin/order');
    }
}