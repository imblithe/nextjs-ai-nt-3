import prisma from './src/lib/prisma';

async function checkImages() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  console.log('Total Products:', products.length);
  products.forEach(p => {
    console.log(`Product ID ${p.id} (${p.name}): ${p.images.length} images`);
  });
}

checkImages().catch(console.error);
