import { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS } from './data';
import { Product } from './types';
import { Sheet } from './components/Sheet';
import { Button } from './components/UI';
import { BookingForm } from './components/BookingForm';
import Admin from './pages/Admin';
import { ShoppingBag, Car, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Page Components ---

const Home = () => (
  <div className="p-6 space-y-8 pt-12 min-h-screen pb-24">
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
        Zest & Glide
      </h1>
      <p className="text-white/50 text-lg">Premium essentials for your journey.</p>
    </div>

    <div className="grid gap-6">
      <Link to="/mart" className="group relative h-64 rounded-[32px] overflow-hidden glass-panel transition-transform active:scale-95">
        <img 
          src="https://picsum.photos/800/600?random=10" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 text-[#0A84FF] mb-2">
            <ShoppingBag size={20} />
            <span className="font-semibold uppercase tracking-wider text-xs">Zest Mart</span>
          </div>
          <h2 className="text-3xl font-bold">Refuel.</h2>
          <p className="text-white/60 mt-1 line-clamp-2">Artisanal soft drinks and botanicals sourced from around the globe.</p>
        </div>
      </Link>

      <Link to="/glide" className="group relative h-64 rounded-[32px] overflow-hidden glass-panel transition-transform active:scale-95">
        <img 
          src="https://picsum.photos/800/600?random=11" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Car size={20} />
            <span className="font-semibold uppercase tracking-wider text-xs">Glide</span>
          </div>
          <h2 className="text-3xl font-bold">Move.</h2>
          <p className="text-white/60 mt-1 line-clamp-2">Luxury electric vehicles available on demand.</p>
        </div>
      </Link>
    </div>
  </div>
);

const ProductGrid = ({ category, title }: { category: 'drink' | 'vehicle', title: string }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const items = MOCK_PRODUCTS.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-black p-6 pb-24">
      <div className="flex items-center justify-between mb-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} Premium Selections</p>
        </div>
        <Link to="/" className="p-3 bg-white/10 rounded-full hover:bg-white/20">
          <Zap size={20} className={category === 'vehicle' ? "text-purple-400" : "text-[#0A84FF]"} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedProduct(item)}
            className="glass-panel p-4 rounded-3xl flex gap-4 items-center cursor-pointer active:scale-[0.98] transition-all group"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 relative flex-shrink-0">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
               {!item.inStock && (
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-white border border-white/30 px-2 py-1 rounded">Sold Out</span>
                 </div>
               )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold leading-tight mb-1">{item.name}</h3>
              <p className="text-white/50 text-xs line-clamp-2 mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                 <span className="text-[#0A84FF] font-semibold">${item.price}</span>
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0A84FF] transition-colors">
                   <ChevronRight size={16} />
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Sheet */}
      <Sheet isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name}>
        {selectedProduct && (
          <div className="space-y-6">
            <div className="h-64 rounded-3xl overflow-hidden relative mb-6">
              <img src={selectedProduct.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4">
                 <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>
                 <p className="text-xl text-[#0A84FF] font-semibold">${selectedProduct.price}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed text-lg">{selectedProduct.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {selectedProduct.details.map((detail, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                    {detail}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              {selectedProduct.inStock ? (
                <BookingForm item={{ ...selectedProduct, quantity: 1 }} />
              ) : (
                <Button disabled className="opacity-50">Out of Stock</Button>
              )}
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
};

// --- Main App Component ---

const BottomNav = () => {
  const location = useLocation();
  if (location.pathname === '/admin') return null;

  const NavItem = ({ to, icon: Icon, label }: any) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`flex flex-col items-center justify-center space-y-1 transition-colors ${isActive ? 'text-[#0A84FF]' : 'text-white/40'}`}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around pb-4 z-30">
      <NavItem to="/" icon={Zap} label="Home" />
      <NavItem to="/mart" icon={ShoppingBag} label="Mart" />
      <NavItem to="/glide" icon={Car} label="Glide" />
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <div className="antialiased text-white selection:bg-[#0A84FF] selection:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mart" element={<ProductGrid category="drink" title="Zest Mart" />} />
          <Route path="/glide" element={<ProductGrid category="vehicle" title="Glide" />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  );
}