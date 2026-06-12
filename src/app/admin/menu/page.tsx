import { getProducts, getCategories } from '@/app/actions/products';
import { MenuPageClient } from '@/components/admin/menu-page-client';

export default async function AdminMenuPage() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const products = productsResult.success ? productsResult.products || [] : [];
  const categories = categoriesResult.success ? categoriesResult.categories || [] : [];

  return <MenuPageClient initialProducts={products} categories={categories} />;
}
