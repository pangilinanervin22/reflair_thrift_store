/** A table row: any object; fields are read by string path. */
export type Row = object;

export const getField = (row: Row, path: string): unknown => (row as Record<string, unknown>)[path];

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

function compareValues(x: unknown, y: unknown): number {
    if (typeof x === "number" && typeof y === "number") return x - y;
    if (x instanceof Date && y instanceof Date) return x.getTime() - y.getTime();
    if (typeof x === "boolean" && typeof y === "boolean") return Number(x) - Number(y);
    return collator.compare(String(x), String(y));
}

/**
 * Returns a sorted copy (the input is never mutated). Strings compare
 * case-insensitively with natural number ordering ("item 2" < "item 10"),
 * numbers and dates numerically. null/undefined always sort last, whichever
 * direction is requested, so a nullable column never throws.
 */
export default function sortPath<T extends Row>(array: readonly T[], path: string, ascending: boolean): T[] {
    return [...array].sort((a, b) => {
        const x = getField(a, path);
        const y = getField(b, path);
        const xMissing = x === null || x === undefined;
        const yMissing = y === null || y === undefined;
        if (xMissing || yMissing) return xMissing && yMissing ? 0 : xMissing ? 1 : -1;
        const cmp = compareValues(x, y);
        return ascending ? cmp : -cmp;
    });
}
