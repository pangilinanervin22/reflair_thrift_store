// One-off backfill for the 2026-08-31 schema bundle. Idempotent — only touches
// documents where the new field is still unset. Dry run by default.
//
//   node --env-file=.env scripts/backfill.mjs            # report what would change
//   node --env-file=.env scripts/backfill.mjs --apply    # write
//
// Run it AFTER `npx prisma db push` (which creates the new indexes) and after
// deploying the code that writes these fields for new orders.
//
// MongoDB notes: `{ field: { isSet: false } }` finds documents where an optional
// scalar is missing (a plain `null` filter does not). Json fields don't support
// isSet, so `items` is located with a raw `$exists` query instead.
import { PrismaClient } from "@prisma/client";

const apply = process.argv.includes("--apply");
const prisma = new PrismaClient();
const SHIPPING_FEE = 50;

const objectIdTime = (id) => new Date(parseInt(id.slice(0, 8), 16) * 1000);
const report = (label, n) => console.log(`${apply ? "updated" : "would update"} ${n} ${label}`);
const missing = (value) => value === null || value === undefined;

try {
    // 1. Products: normalise "unset" order_id to an explicit null so scalar
    //    filters (the checkout claim) see every available piece.
    const unsetOrderId = await prisma.product.count({ where: { order_id: { isSet: false } } });
    if (apply && unsetOrderId) await prisma.product.updateMany({ where: { order_id: { isSet: false } }, data: { order_id: null } });
    report("product(s) with order_id unset -> null", unsetOrderId);

    // 2. Products: updatedAt = createdAt where unset.
    const productsNoUpdated = await prisma.product.findMany({ where: { updatedAt: { isSet: false } }, select: { id: true, createdAt: true } });
    if (apply) for (const p of productsNoUpdated) await prisma.product.update({ where: { id: p.id }, data: { updatedAt: p.createdAt } });
    report("product(s) updatedAt", productsNoUpdated.length);

    // 3. Orders: shipping fee, contact (from the account), item snapshot (from the
    //    linked products — empty for orders whose pieces were already released), updatedAt.
    const rawMissingItems = await prisma.order.findRaw({ filter: { items: { $exists: false } }, options: { projection: { _id: 1 } } });
    const missingItemIds = rawMissingItems.map((doc) => doc._id.$oid);
    const orders = await prisma.order.findMany({
        where: {
            OR: [
                { shipping_fee: { isSet: false } },
                { contact: { isSet: false } },
                { updatedAt: { isSet: false } },
                ...(missingItemIds.length ? [{ id: { in: missingItemIds } }] : []),
            ],
        },
        include: {
            account: { select: { contact: true } },
            product: { select: { id: true, name: true, price: true, image: true, size: true } },
        },
    });
    let touched = 0;
    for (const order of orders) {
        const data = {};
        if (missing(order.shipping_fee)) data.shipping_fee = SHIPPING_FEE;
        if (missing(order.contact)) data.contact = order.account?.contact ?? null;
        if (missingItemIds.includes(order.id)) data.items = order.product.map(({ id, name, price, image, size }) => ({ id, name, price, image, size }));
        if (missing(order.updatedAt)) data.updatedAt = order.ship_date ?? order.order_date;
        if (!Object.keys(data).length) continue;
        touched += 1;
        if (apply) await prisma.order.update({ where: { id: order.id }, data });
    }
    report("order(s) (shipping_fee / contact / items / updatedAt)", touched);

    // 4. Accounts: createdAt from the ObjectId timestamp, updatedAt = createdAt.
    const accounts = await prisma.account.findMany({
        where: { OR: [{ createdAt: { isSet: false } }, { updatedAt: { isSet: false } }] },
        select: { id: true, createdAt: true },
    });
    for (const account of accounts) {
        const createdAt = account.createdAt ?? objectIdTime(account.id);
        if (apply) await prisma.account.update({ where: { id: account.id }, data: { createdAt, updatedAt: createdAt } });
    }
    report("account(s) createdAt / updatedAt", accounts.length);

    if (!apply) console.log("Dry run - nothing written. Re-run with --apply to write.");
} finally {
    await prisma.$disconnect();
}
