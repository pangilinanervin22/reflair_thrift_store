import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/db/prisma";
import ProductUpdatePage from "@/components/Forms/ProductForm/ProductForm";
import { ObjectIdSchema } from "@/lib/schemas/common";

export const metadata: Metadata = { title: "Edit product" };

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductEditPage({ params }: PageProps) {
  const { slug } = await params;
  if (!ObjectIdSchema.safeParse(slug).success) notFound();

  const product = await prisma.product.findUnique({ where: { id: slug } });
  if (!product) notFound();

  return (
    <ProductUpdatePage product={product} />
  );
}
