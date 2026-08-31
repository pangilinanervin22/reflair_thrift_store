import Image from "next/image"
import styles from './Report.module.scss'
import { formatPeso } from "@/utils/formatPrice";

export interface RecentProductItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

// Server component: the page already hands us the five newest unsold pieces.
export default function RecentProduct({ products }: { products: RecentProductItem[] }) {
    return (
        <div className={styles.trend}>
            <h2>Latest pieces</h2>
            <div className={styles.container_product}>
                {products.map((product) => (
                    <div key={product.id} className={styles.product}>
                        <Image src={product.image} alt={product.name} width={100} height={100} sizes="100px" />
                        <div>
                            <p>{product.name}</p>
                            <p>{formatPeso(product.price)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
