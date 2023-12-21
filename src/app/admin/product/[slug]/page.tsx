import prisma from "@/db/prisma";
import ProductUpdatePage from "@/components/Forms/ProductForm/ProductForm";
import { redirect } from "next/navigation"

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

export default async function ProductEditPage({ params }: PageProps) {
  const product = await prisma.product.findFirst({
    where: {
      id: params.slug,
    },
  });

  if (!product) {
    alert("Product not found!");
    redirect("/admin/product");
  }

  return (
    <ProductUpdatePage product={product} />
  );
}
