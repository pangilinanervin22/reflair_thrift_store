'use server'

import prisma from "@/db/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function OrderCreateAction(email: string, array_product_id: string[],) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: email
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

        if (!account)
            return { message: "Account not found", error: true }
        if (!account.address || !account.barangay || !account.city)
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
                    account_id: account.id
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
                    account_id: account.id
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
                total_price,
                name: account.name,
                address: account.address,
                barangay: account.barangay,
                city: account.city,
                product: {
                    connect: array_product_id.map((id) => {
                        return { id: id }
                    })
                },
                account: {
                    connect: {
                        id: account.id
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

// export async function GetAllOrdersAction(email: string) {
//     try {
//         const account = await prisma.account.findUnique({
//             where: {
//                 email: email
//             },
//             include: {
//                 order: {
//                     include: {
//                         product: true
//                     }
//                 }
//             }
//         });

//         const orders = await prisma.order.findUnique({
//             where: {
//                 id: account?.order[0].id
//             },
//             include: {
//                 product: true
//             }
//         });

//         console.log(account?.order, orders, orders?.product.length);

//         if (!account)
//             return { message: "Account not found", error: true }

//         return { orders: account.order, ok: true };
//     } catch (error) {
//         console.log(error);
//         return { message: "Error occurred while retrieving orders", error: error }
//     }
// }