import { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase, Product, Category, TABLES } from '../lib/supabase';

interface ProductsPageProps {
  onProductClick: (slug: string) => void;
  categorySlug?: string;
}

export default function ProductsPage({ onProductClick, categorySlug }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || 'all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
  }, [categorySlug]);

  async function loadData() {
    setLoading(true);

    const [categoriesResult, productsResult] = await Promise.all([
      supabase.from(TABLES.CATEGORIES).select('*').order('name'),
      supabase.from(TABLES.PRODUCTS).select('*').order('sort_order')
    ]);

    if (categoriesResult.data) setCategories(categoriesResult.data);
    if (productsResult.data) setProducts(productsResult.data);

    setLoading(false);
  }

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => {
        const category = categories.find(c => c.id === p.category_id);
        return category?.slug === selectedCategory;
      });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our complete range of premium aluminum fabrication solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.slug
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-gray-400 transition-all duration-500 hover:shadow-2xl cursor-pointer"
                onClick={() => onProductClick(product.slug)}
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {product.is_featured && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
                    {product.price_range && (
                      <p className="text-gray-200 text-sm">{product.price_range}</p>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium group-hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
