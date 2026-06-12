import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@sweetdelights.com' },
    update: {},
    create: {
      email: 'admin@sweetdelights.com',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created: admin@sweetdelights.com / admin123');

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'cakes' },
      update: {},
      create: {
        name: 'Cakes',
        slug: 'cakes',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cupcakes' },
      update: {},
      create: {
        name: 'Cupcakes',
        slug: 'cupcakes',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'pastries' },
      update: {},
      create: {
        name: 'Pastries',
        slug: 'pastries',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'desserts' },
      update: {},
      create: {
        name: 'Desserts',
        slug: 'desserts',
      },
    }),
  ]);

  const [cakes, cupcakes, pastries, desserts] = categories;

  const products = [
    {
      name: 'Strawberry Dream Cake',
      slug: 'strawberry-dream-cake',
      description:
        'A heavenly three-layer vanilla sponge cake filled with fresh strawberry cream and topped with hand-picked strawberries. Perfect for celebrations and romantic occasions.',
      price: 38800,
      costPrice: 23280, // 40% margin
      stock: 10,
      images: ['/images/cakes/strawberry-dream.jpg'],
      categoryId: cakes.id,
    },
    {
      name: 'Chocolate Paradise',
      slug: 'chocolate-paradise',
      description:
        'Indulgent Belgian chocolate cake with layers of dark chocolate ganache and chocolate mousse. A true paradise for chocolate lovers.',
      price: 35900,
      costPrice: 21540, // 40% margin
      stock: 15,
      images: ['/images/cakes/chocolate-paradise.jpg'],
      categoryId: cakes.id,
    },
    {
      name: 'Vanilla Rose Wedding Cake',
      slug: 'vanilla-rose-wedding-cake',
      description:
        'Elegant three-tier wedding cake with delicate vanilla sponge, rose-infused buttercream, and hand-crafted sugar roses. A stunning centerpiece for your special day.',
      price: 45000,
      costPrice: 27000, // 40% margin
      stock: 5,
      images: ['/images/cakes/vanilla-rose-wedding.jpg'],
      categoryId: cakes.id,
    },
    {
      name: 'Lemon Blueberry Delight',
      slug: 'lemon-blueberry-delight',
      description:
        'Refreshing lemon cake with layers of blueberry compote and lemon curd, finished with a light cream cheese frosting.',
      price: 32500,
      costPrice: 19500, // 40% margin
      stock: 12,
      images: ['/images/cakes/lemon-blueberry.jpg'],
      categoryId: cakes.id,
    },
    {
      name: 'Red Velvet Cupcakes',
      slug: 'red-velvet-cupcakes',
      description:
        'Classic red velvet cupcakes with signature cream cheese frosting and red velvet crumbles. Box of 6.',
      price: 2499,
      costPrice: 1499, // 40% margin
      stock: 30,
      images: ['/images/cupcakes/red-velvet.jpg'],
      categoryId: cupcakes.id,
    },
    {
      name: 'Vanilla Bean Cupcakes',
      slug: 'vanilla-bean-cupcakes',
      description:
        'Light and fluffy vanilla cupcakes made with real Madagascar vanilla beans, topped with silky vanilla buttercream. Box of 6.',
      price: 1999,
      costPrice: 1199, // 40% margin
      stock: 40,
      images: ['/images/cupcakes/vanilla-bean.jpg'],
      categoryId: cupcakes.id,
    },
    {
      name: 'Chocolate Truffle Cupcakes',
      slug: 'chocolate-truffle-cupcakes',
      description:
        'Rich chocolate cupcakes with a molten chocolate center, topped with dark chocolate ganache and a chocolate truffle. Box of 6.',
      price: 2799,
      costPrice: 1679, // 40% margin
      stock: 25,
      images: ['/images/cupcakes/chocolate-truffle.jpg'],
      categoryId: cupcakes.id,
    },
    {
      name: 'Salted Caramel Cupcakes',
      slug: 'salted-caramel-cupcakes',
      description:
        'Buttery caramel cupcakes filled with homemade salted caramel, topped with caramel buttercream and sea salt flakes. Box of 6.',
      price: 2399,
      costPrice: 1439, // 40% margin
      stock: 35,
      images: ['/images/cupcakes/salted-caramel.jpg'],
      categoryId: cupcakes.id,
    },
    {
      name: 'French Croissants',
      slug: 'french-croissants',
      description:
        'Authentic French butter croissants with 27 layers of laminated dough. Crispy on the outside, soft and buttery inside. Box of 4.',
      price: 1599,
      costPrice: 959, // 40% margin
      stock: 50,
      images: ['/images/pastries/croissants.jpg'],
      categoryId: pastries.id,
    },
    {
      name: 'Pain au Chocolat',
      slug: 'pain-au-chocolat',
      description:
        'Flaky chocolate croissants with two bars of dark Belgian chocolate. Freshly baked every morning. Box of 4.',
      price: 1899,
      costPrice: 1139, // 40% margin
      stock: 45,
      images: ['/images/pastries/pain-au-chocolat.jpg'],
      categoryId: pastries.id,
    },
    {
      name: 'Almond Danish',
      slug: 'almond-danish',
      description:
        'Buttery danish pastry filled with homemade almond frangipane and topped with sliced almonds and pearl sugar. Box of 3.',
      price: 1499,
      costPrice: 899, // 40% margin
      stock: 30,
      images: ['/images/pastries/almond-danish.jpg'],
      categoryId: pastries.id,
    },
    {
      name: 'French Macarons Box',
      slug: 'french-macarons-box',
      description:
        'Assorted French macarons in 6 flavors: Rose, Pistachio, Chocolate, Vanilla, Raspberry, and Lemon. Box of 12.',
      price: 2899,
      costPrice: 1739, // 40% margin
      stock: 20,
      images: ['/images/desserts/macarons.jpg'],
      categoryId: desserts.id,
    },
    {
      name: 'Tiramisu Cup',
      slug: 'tiramisu-cup',
      description:
        'Classic Italian tiramisu with layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa. Individual serving.',
      price: 899,
      costPrice: 539, // 40% margin
      stock: 40,
      images: ['/images/desserts/tiramisu.jpg'],
      categoryId: desserts.id,
    },
    {
      name: 'Crème Brûlée',
      slug: 'creme-brulee',
      description:
        'Silky vanilla custard with a perfectly caramelized sugar crust. Made with Madagascar vanilla and farm-fresh eggs.',
      price: 799,
      costPrice: 479, // 40% margin
      stock: 35,
      images: ['/images/desserts/creme-brulee.jpg'],
      categoryId: desserts.id,
    },
    {
      name: 'Carrot Cake',
      slug: 'carrot-cake',
      description:
        'Moist carrot cake with crushed pineapple, toasted walnuts, and warm spices, layered with tangy cream cheese frosting.',
      price: 34900,
      costPrice: 20940, // 40% margin
      stock: 8,
      images: ['/images/cakes/carrot-cake.jpg'],
      categoryId: cakes.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
