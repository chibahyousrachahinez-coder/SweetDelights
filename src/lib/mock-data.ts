export interface MockProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
}

export const mockCategories: MockCategory[] = [
  { id: '1', name: 'Cakes', slug: 'cakes' },
  { id: '2', name: 'Cupcakes', slug: 'cupcakes' },
  { id: '3', name: 'Pastries', slug: 'pastries' },
  { id: '4', name: 'Desserts', slug: 'desserts' },
];

export const mockProducts: MockProduct[] = [
  {
    id: 1,
    name: 'Strawberry Dream Cake',
    slug: 'strawberry-dream-cake',
    description: 'A heavenly three-layer vanilla sponge cake topped with fresh strawberries and whipped cream frosting.',
    price: 4500,
    stock: 15,
    images: ['/images/products/strawberry-cake.png'],
    category: { id: '1', name: 'Cakes', slug: 'cakes' },
  },
  {
    id: 2,
    name: 'Chocolate Fudge Cake',
    slug: 'chocolate-fudge-cake',
    description: 'Rich, moist chocolate layers with decadent fudge frosting. A chocolate lover\'s paradise.',
    price: 4200,
    stock: 12,
    images: ['/images/products/chocolate-cupcake.png'],
    category: { id: '1', name: 'Cakes', slug: 'cakes' },
  },
  {
    id: 3,
    name: 'Red Velvet Romance',
    slug: 'red-velvet-romance',
    description: 'Classic red velvet cake with cream cheese frosting, perfect for special occasions.',
    price: 4800,
    stock: 8,
    images: ['/images/products/strawberry-cake.png'],
    category: { id: '1', name: 'Cakes', slug: 'cakes' },
  },
  {
    id: 4,
    name: 'Vanilla Bean Bliss',
    slug: 'vanilla-bean-bliss',
    description: 'Elegant vanilla cake made with real Madagascar vanilla beans and buttercream.',
    price: 3900,
    stock: 20,
    images: ['/images/products/strawberry-cake.png'],
    category: { id: '1', name: 'Cakes', slug: 'cakes' },
  },
  {
    id: 5,
    name: 'Pink Sprinkle Cupcake',
    slug: 'pink-sprinkle-cupcake',
    description: 'Adorable vanilla cupcake with pink buttercream and rainbow sprinkles.',
    price: 399,
    stock: 50,
    images: ['/images/products/pink-cupcake.png'],
    category: { id: '2', name: 'Cupcakes', slug: 'cupcakes' },
  },
  {
    id: 6,
    name: 'Chocolate Dream Cupcake',
    slug: 'chocolate-dream-cupcake',
    description: 'Double chocolate cupcake with rich chocolate ganache swirl.',
    price: 449,
    stock: 45,
    images: ['/images/products/chocolate-cupcake.png'],
    category: { id: '2', name: 'Cupcakes', slug: 'cupcakes' },
  },
  {
    id: 7,
    name: 'Key Lime Cupcake',
    slug: 'key-lime-cupcake',
    description: 'Refreshing lime cupcake with tangy lime cream cheese frosting.',
    price: 429,
    stock: 35,
    images: ['/images/products/lime-cupcake.png'],
    category: { id: '2', name: 'Cupcakes', slug: 'cupcakes' },
  },
  {
    id: 8,
    name: 'Caramel Swirl Cupcake',
    slug: 'caramel-swirl-cupcake',
    description: 'Buttery vanilla cupcake drizzled with homemade caramel sauce.',
    price: 469,
    stock: 40,
    images: ['/images/products/pink-cupcake.png'],
    category: { id: '2', name: 'Cupcakes', slug: 'cupcakes' },
  },
  {
    id: 9,
    name: 'Butter Croissant',
    slug: 'butter-croissant',
    description: 'Flaky, buttery French croissant made with premium European butter.',
    price: 350,
    stock: 30,
    images: ['/images/products/strawberry-cake.png'],
    category: { id: '3', name: 'Pastries', slug: 'pastries' },
  },
  {
    id: 10,
    name: 'Almond Danish',
    slug: 'almond-danish',
    description: 'Sweet danish pastry filled with almond cream and topped with sliced almonds.',
    price: 420,
    stock: 25,
    images: ['/images/products/strawberry-cake.png'],
    category: { id: '3', name: 'Pastries', slug: 'pastries' },
  },
  {
    id: 11,
    name: 'Tiramisu Cup',
    slug: 'tiramisu-cup',
    description: 'Individual tiramisu cups with layers of espresso-soaked ladyfingers and mascarpone.',
    price: 650,
    stock: 18,
    images: ['/images/products/chocolate-cupcake.png'],
    category: { id: '4', name: 'Desserts', slug: 'desserts' },
  },
  {
    id: 12,
    name: 'Crème Brûlée',
    slug: 'creme-brulee',
    description: 'Classic French custard with a perfectly caramelized sugar crust.',
    price: 750,
    stock: 12,
    images: ['/images/products/strawberry-cake.png'],
    category: { id: '4', name: 'Desserts', slug: 'desserts' },
  },
];

export function getProducts(categorySlug?: string, search?: string): MockProduct[] {
  let filtered = [...mockProducts];
  
  if (categorySlug) {
    filtered = filtered.filter(p => p.category.slug === categorySlug);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
}

export function getCakes(): MockProduct[] {
  return mockProducts.filter(p => p.category.slug === 'cakes');
}

export function getCupcakes(): MockProduct[] {
  return mockProducts.filter(p => p.category.slug === 'cupcakes');
}
