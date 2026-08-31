import CategorySkeleton from "../_components/CategorySkeleton";
import { CATEGORY_COPY } from "../_components/categoryCopy";

export default function Loading() {
    return <CategorySkeleton title={CATEGORY_COPY.men.title} />;
}
