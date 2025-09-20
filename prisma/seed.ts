// const prisma = new PrismaClient();
import prisma from '../src/lib/db.js';

const productsData = [
  {
    name: "Margherita Pizza",
    slug: "margherita-pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
    details: "A timeless classic, our Margherita Pizza features a light, airy crust topped with San Marzano tomato sauce, fresh mozzarella cheese, fragrant basil leaves, and a drizzle of extra-virgin olive oil.",
    price: 12.50,
    image: "/images/bestsellers/pizza.jpg",
  },
  {
    name: "Gourmet Burger",
    slug: "gourmet-burger",
    description: "Juicy beef patty with cheddar, lettuce, and special sauce.",
    details: "Our signature Gourmet Burger is made with a 1/2 pound 100% Angus beef patty, grilled to perfection. Served on a toasted brioche bun with aged cheddar cheese, crisp lettuce, and ripe tomatoes.",
    price: 15.00,
    image: "/images/bestsellers/burger.jpg",
  },
  // Thêm các sản phẩm khác nếu bạn muốn...
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of productsData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });