import prisma from "@/db/prisma";
import Image from "next/image";

import style from "./page.module.scss";
import ProductUpdatePage from "@/components/Forms/ProductForm";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: "Product: " + params.slug,
    description: "Product: " + params.slug,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await prisma.product.findFirst({
    where: {
      id: params.slug,
    },
  });

  if (!product) {
    // redirect to 404 or a custom error page
    return;
  }

  return (
    <ProductUpdatePage product={product} />
  );
}
