export default function paginate<T>(array: readonly T[], currentPage: number, pageSize = array.length): T[] {
    const start = currentPage * pageSize;
    return array.slice(start, start + pageSize);
}
