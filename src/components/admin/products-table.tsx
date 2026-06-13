'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Loader2 } from 'lucide-react';
import { deleteProduct } from '@/app/actions/products';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  costPrice?: number;
  stock: number;
  categoryId: string;
  imageUrl?: string | null;
  category: {
    name: string;
  };
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export function ProductsTable({ products, onEdit }: ProductsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deleteProduct(id);
    
    if (result.success) {
      router.refresh();
    }
    
    setDeletingId(null);
    setShowDeleteConfirm(null);
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-12 text-center">
        <p className="text-muted-foreground">No products found. Add your first product!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-pink-50/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-100">
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-pink-50/30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl">🧁</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                    {product.category.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  ${(product.price / 100).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-700'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 hover:bg-pink-100 rounded-lg transition-all duration-200 active:scale-95"
                    >
                      <Edit2 className="w-4 h-4 text-pink-600" />
                    </button>
                    
                    {showDeleteConfirm === product.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-1"
                        >
                          {deletingId === product.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Confirm'
                          )}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 active:scale-95"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowDeleteConfirm(product.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200 active:scale-95"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
