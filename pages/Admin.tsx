import { useState } from 'react';
import { MOCK_PRODUCTS } from '../data';
import { Product } from '../types';
import { Button, SectionHeader } from '../components/UI';
import { Edit2, Package, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');

  const toggleStock = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="w-10" />
      </div>

      <div className="flex p-1 bg-white/10 rounded-xl mb-8">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'inventory' ? 'bg-[#0A84FF] shadow-lg' : 'text-white/50'}`}
        >
          Inventory
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'orders' ? 'bg-[#0A84FF] shadow-lg' : 'text-white/50'}`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <SectionHeader title="Manage Items" />
            <Button variant="glass" className="w-auto px-4 py-2 !rounded-lg text-xs flex items-center gap-2">
              <Plus size={14} /> Add New
            </Button>
          </div>
          
          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover bg-white/5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-white/50">${product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleStock(product.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${product.inStock ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}
                  >
                    {product.inStock ? 'In Stock' : 'Stock Out'}
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full text-white/70">
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-white/30">
          <Package size={48} className="mb-4 opacity-50" />
          <p>No active orders</p>
        </div>
      )}
    </div>
  );
}