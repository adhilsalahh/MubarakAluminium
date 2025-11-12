import { useState } from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import KitchenDesignsPage from './pages/KitchenDesignsPage';

type View = 'home' | 'products' | 'product-detail' | 'kitchen-designs' | 'about' | 'contact';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleProductClick = (slug: string) => {
    setSelectedProductSlug(slug);
    setCurrentView('product-detail');
  };

  const handleCategoryClick = (categorySlug: string) => {
    if (categorySlug === 'kitchen') {
      setCurrentView('kitchen-designs');
    } else {
      setSelectedCategory(categorySlug);
      setCurrentView('products');
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCategory(undefined);
  };

  const handleNavigateProducts = () => {
    setCurrentView('products');
    setSelectedCategory(undefined);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'products':
        return <ProductsPage onProductClick={handleProductClick} categorySlug={selectedCategory} />;
      case 'product-detail':
        return <ProductDetailPage productSlug={selectedProductSlug} onBack={handleNavigateProducts} />;
      case 'kitchen-designs':
        return <KitchenDesignsPage onBack={handleNavigateProducts} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <ProductShowcase onCategoryClick={handleCategoryClick} />
            <About />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={handleNavigateHome}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AL</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AlumiFab</span>
            </button>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Products', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'Products') {
                      handleNavigateProducts();
                    } else {
                      setCurrentView(item.toLowerCase() as View);
                    }
                  }}
                  className={`text-sm font-medium transition-colors ${
                    currentView === item.toLowerCase()
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {renderContent()}
      <Footer />
    </div>
  );
}

export default App;
