import { DoorOpen, Frame, ChefHat, ArrowRight } from 'lucide-react';

const products = [
  {
    icon: DoorOpen,
    title: 'Aluminum Doors',
    description: 'Sleek, durable doors with superior insulation and modern designs.',
    features: ['Sliding Doors', 'French Doors', 'Entry Doors', 'Patio Doors'],
    imageUrl: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Frame,
    title: 'Windows',
    description: 'Energy-efficient windows that combine style and functionality.',
    features: ['Casement Windows', 'Sliding Windows', 'Bay Windows', 'Awning Windows'],
    imageUrl: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: ChefHat,
    title: 'Kitchen Solutions',
    description: 'Custom aluminum kitchen cabinets and fixtures built to perfection.',
    features: ['Cabinets', 'Countertops', 'Backsplashes', 'Storage Systems'],
    imageUrl: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium aluminum fabrication solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-gray-400 transition-all duration-500 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 from-gray-900 to-gray-600"></div>

              <div className="h-48 relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  Premium
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm text-gray-700 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
