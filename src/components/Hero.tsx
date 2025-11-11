import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Premium Aluminum
              <span className="block text-gray-700">Fabrication</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your space with expertly crafted aluminum doors, windows, and kitchen solutions. Quality that lasts a lifetime.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                <span>View Products</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 shadow-sm hover:shadow-md">
                Get Quote
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Modern aluminum door" className="h-48 w-full object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300" />
                <img src="https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Window installation" className="h-32 w-full object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="space-y-4 pt-8">
                <img src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Modern kitchen" className="h-32 w-full object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300" />
                <img src="https://images.pexels.com/photos/1082220/pexels-photo-1082220.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Aluminum frames" className="h-48 w-full object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
