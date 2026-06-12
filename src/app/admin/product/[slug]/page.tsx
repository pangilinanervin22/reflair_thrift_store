import prisma from "@/db/prisma";
import ProductUpdatePage from "@/components/Forms/ProductForm/ProductForm";
import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return {
    title: "Product: " + slug,
    description: "Product: " + slug,
  };
}

export default async function ProductEditPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: slug,
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
