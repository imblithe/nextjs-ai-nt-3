const { PrismaClient } = require('./generated/prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
require('dotenv').config();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function checkImages() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
      },
    });

    console.log('Total Products:', products.length);
    products.forEach(p => {
      console.log(`Product ID ${p.id} (${p.name}): ${p.images.length} images`);
      if (p.images.length === 0) {
        console.log('  -> MISSING IMAGE');
      }
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

checkImages();
