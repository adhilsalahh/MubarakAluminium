import { useState } from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AL</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AlumiFab</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Products', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase()
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

      <Hero />
      <ProductShowcase />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
