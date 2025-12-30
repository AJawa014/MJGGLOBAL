
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS } from './data';
import { Product, Order } from './types';
import { Sheet } from './components/Sheet';
import { Button } from './components/UI';
import { BookingForm } from './components/BookingForm';
import Admin from './pages/Admin';
import { ShoppingBag, Car, ChevronRight, Zap, Search, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Global Context for State Management ---
interface AppContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Product) => void;
  toggleStock: (id: string) => void;
  addOrder: (order: Order) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// --- Components ---

const Home = () => {
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [trackId, setTrackId] = useState('');

  return (
    <div className="h-screen w-full flex flex-col p-6 pb-24 overflow-hidden bg-black text-white">
        {/* Header Section - Fixed Height */}
        <div className="flex-none mb-6 pt-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                MJGGLOBAL
            </h1>
            <p className="text-white/50 text-sm font-medium tracking-wide">Premium essentials for your journey.</p>
        </div>

        {/* Dashboard Grid - Fills remaining space */}
        <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-4 min-h-0">
            {/* Soft Drinks Mart - Large Vertical Card (Left) */}
            <Link to="/mart" className="col-span-1 row-span-2 relative rounded-[32px] overflow-hidden glass-panel group cursor-pointer active:scale-95 transition-all">
                <img 
                  src="https://picsum.photos/800/600?random=10" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                    <div className="w-8 h-8 rounded-full bg-[#0A84FF]/20 flex items-center justify-center mb-3 backdrop-blur-md">
                        <ShoppingBag size={16} className="text-[#0A84FF]" />
                    </div>
                    <h2 className="text-2xl font-bold leading-none mb-1">Mart.</h2>
                    <p className="text-xs text-white/60 font-medium">Refreshments</p>
                </div>
            </Link>

            {/* Car Hire - Large Vertical Card (Right) */}
            <Link to="/glide" className="col-span-1 row-span-2 relative rounded-[32px] overflow-hidden glass-panel group cursor-pointer active:scale-95 transition-all">
                 <img 
                  src="https://picsum.photos/800/600?random=11" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-3 backdrop-blur-md">
                        <Car size={16} className="text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold leading-none mb-1">Glide.</h2>
                    <p className="text-xs text-white/60 font-medium">Luxury Travel</p>
                </div>
            </Link>

            {/* Track Order - Bottom Left */}
            <button 
                onClick={() => setIsTrackOpen(true)}
                className="col-span-1 row-span-1 glass-panel rounded-[32px] p-5 flex flex-col justify-between active:scale-95 transition-all hover:bg-white/10 text-left group"
            >
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Search size={16} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Track</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Order Status</p>
                </div>
            </button>

            {/* Legal - Bottom Right */}
            <button 
                onClick={() => setIsLegalOpen(true)}
                className="col-span-1 row-span-1 glass-panel rounded-[32px] p-5 flex flex-col justify-between active:scale-95 transition-all hover:bg-white/10 text-left group"
            >
                <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-400 group-hover:bg-gray-500 group-hover:text-white transition-colors">
                    <Shield size={16} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Legal</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Terms & Privacy</p>
                </div>
            </button>
        </div>

        {/* Track Sheet */}
        <Sheet isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} title="Track Order">
            <div className="space-y-4">
                <p className="text-white/60">Enter your tracking ID to see the status of your order.</p>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Tracking ID</label>
                    <div className="flex gap-2">
                        <input 
                           value={trackId}
                           onChange={(e) => setTrackId(e.target.value)}
                           placeholder="TRK-XXXXXXXX" 
                           className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-[#0A84FF] outline-none font-mono"
                        />
                    </div>
                </div>
                <Button onClick={() => alert(`Tracking Feature: Order ${trackId || 'N/A'} is currently in transit.`)}>
                    Track Shipment
                </Button>
            </div>
        </Sheet>

        {/* Legal Sheet */}
        <Sheet isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} title="Legal & Privacy">
            <div className="space-y-6 text-white/70 leading-relaxed">
                <section>
                    <h4 className="text-white font-bold mb-2">Terms of Service</h4>
                    <p className="text-sm">By using MJGGLOBAL, you agree to our premium service terms. All soft drink purchases are final. Vehicle rentals require a valid ID and security deposit.</p>
                </section>
                <section>
                    <h4 className="text-white font-bold mb-2">Privacy Policy</h4>
                    <p className="text-sm">We value your privacy. Your data is encrypted and used solely for order processing and service improvement. We do not share data with third parties.</p>
                </section>
                <section>
                    <h4 className="text-white font-bold mb-2">Liability</h4>
                    <p className="text-sm">MJGGLOBAL is not liable for delays caused by traffic or weather conditions. Drink responsibly.</p>
                </section>
                <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/30 text-center">© 2024 MJGGLOBAL. All rights reserved.</p>
                </div>
            </div>
        </Sheet>
    </div>
  );
};

const ProductGrid = ({ category, title }: { category: 'drink' | 'vehicle', title: string }) => {
  const { products } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const items = products.filter(p => p.category === category);

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
                 <span className="text-[#0A84FF] font-semibold">₦{item.price.toLocaleString()}</span>
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
                 <p className="text-xl text-[#0A84FF] font-semibold">₦{selectedProduct.price.toLocaleString()}</p>
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
      <NavItem to="/glide" icon={Car} label="Cars" />
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);

  const addProduct = (product: Product) => setProducts([...products, product]);
  
  const toggleStock = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    ));
  };

  const addOrder = (order: Order) => setOrders([order, ...orders]);

  return (
    <AppContext.Provider value={{ products, orders, addProduct, toggleStock, addOrder }}>
      <HashRouter>
        <div className="antialiased text-white selection:bg-[#0A84FF] selection:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mart" element={<ProductGrid category="drink" title="Soft Drinks Mart" />} />
            <Route path="/glide" element={<ProductGrid category="vehicle" title="Car Hire" />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <BottomNav />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}
