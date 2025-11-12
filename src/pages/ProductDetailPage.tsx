import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Ruler, Wrench, Shield, Loader2 } from 'lucide-react';
import { supabase, Product, TABLES } from '../lib/supabase';

interface ProductDetailPageProps {
  productSlug: string;
  onBack: () => void;
}

export default function ProductDetailPage({ productSlug, onBack }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    loadProduct();
  }, [productSlug]);

  async function loadProduct() {
    setLoading(true);

    const { data } = await supabase
      .from(TABLES.PRODUCTS)
      .select('*')
      .eq('slug', productSlug)
      .maybeSingle();

    if (data) {
      setProduct(data);
      setSelectedImage(data.image_url);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const allImages = [product.image_url, ...(product.gallery_images || [])];

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === image
                        ? 'border-gray-900 shadow-md scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              {product.price_range && (
                <div className="text-2xl font-semibold text-gray-700 mb-4">
                  {product.price_range}
                </div>
              )}
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.long_description}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border-2 border-gray-200">
                <Ruler className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700">Custom Sizes</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border-2 border-gray-200">
                <Wrench className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700">Professional Install</div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border-2 border-gray-200">
                <Shield className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700">10 Year Warranty</div>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
