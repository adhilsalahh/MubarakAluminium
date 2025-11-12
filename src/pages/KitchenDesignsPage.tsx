import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Maximize2, Loader2 } from 'lucide-react';
import { supabase, KitchenDesign, TABLES } from '../lib/supabase';

interface KitchenDesignsPageProps {
  onBack: () => void;
}

export default function KitchenDesignsPage({ onBack }: KitchenDesignsPageProps) {
  const [designs, setDesigns] = useState<KitchenDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<KitchenDesign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDesigns();
  }, []);

  async function loadDesigns() {
    setLoading(true);

    const { data } = await supabase
      .from(TABLES.KITCHEN_DESIGNS)
      .select('*')
      .order('sort_order');

    if (data) {
      setDesigns(data);
      if (data.length > 0) {
        setSelectedDesign(data[0]);
      }
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

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Kitchen Design Layouts</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our professional kitchen design options. Each layout is expertly crafted to maximize functionality and style for your space.
          </p>
        </div>

        {designs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No kitchen designs available.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {designs.map(design => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesign(design)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedDesign?.id === design.id
                      ? 'bg-gray-900 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  {design.name}
                </button>
              ))}
            </div>

            {selectedDesign && (
              <div className="space-y-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="aspect-video rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl">
                      <img
                        src={selectedDesign.image_url}
                        alt={selectedDesign.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {selectedDesign.gallery_images && selectedDesign.gallery_images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {selectedDesign.gallery_images.map((image, idx) => (
                          <div
                            key={idx}
                            className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <img
                              src={image}
                              alt={`${selectedDesign.name} example ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        {selectedDesign.name}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {selectedDesign.description}
                      </p>
                    </div>

                    {selectedDesign.dimensions && (
                      <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md">
                        <div className="flex items-center space-x-3 mb-2">
                          <Maximize2 className="w-5 h-5 text-gray-900" />
                          <h3 className="text-lg font-bold text-gray-900">Typical Dimensions</h3>
                        </div>
                        <p className="text-gray-700">{selectedDesign.dimensions}</p>
                      </div>
                    )}

                    {selectedDesign.features && selectedDesign.features.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Design Features</h3>
                        <div className="space-y-3">
                          {selectedDesign.features.map((feature, idx) => (
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

                    {selectedDesign.advantages && selectedDesign.advantages.length > 0 && (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 shadow-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Advantages</h3>
                        <div className="space-y-3">
                          {selectedDesign.advantages.map((advantage, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              </div>
                              <span className="text-gray-700 leading-relaxed">{advantage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                      Request Custom Design
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
