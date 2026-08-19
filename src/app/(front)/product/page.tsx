import FeaturesProduct from "@/components/features-product";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// http://localhost:3000/product
export default async function ProductPage() {
  const products = await prisma.product.findMany();
  
  // แปลง Decimal → number ก่อนส่งให้ Client Component
  const serializedProducts = products.map((p) => ({
    ...p,
    price: Number(p.price), // Decimal → number
  }))

  return (
    <main>
      {/* { products.length> 0 && JSON.stringify(products) } */}
      {
        products.length > 0 && <FeaturesProduct products={serializedProducts} />
      }
    </main>
  );
}