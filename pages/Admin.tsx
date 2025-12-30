
import { useState } from 'react';
import { Product, Category } from '../types';
import { Button, Input, SectionHeader } from '../components/UI';
import { Package, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

export default function Admin() {
  const { products, orders, toggleStock, addProduct } = useAppContext();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Product State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'drink',
    description: '',
    image: 'https://picsum.photos/400/600',
    details: [],
    inStock: true
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      category: newProduct.category as Category,
      price: Number(newProduct.price),
      description: newProduct.description || '',
      image: newProduct.image || '',
      details: newProduct.details || [],
      inStock: true
    });
    setShowAddForm(false);
    setNewProduct({ name: '', price: 0, category: 'drink', description: '', image: 'https://picsum.photos/400/600' });
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
            <SectionHeader title="Manage Items" subtitle="Products & Vehicles" />
            <Button 
              variant="glass" 
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-auto px-4 py-2 !rounded-lg text-xs flex items-center gap-2"
            >
              <Plus size={14} /> {showAddForm ? 'Cancel' : 'Add New'}
            </Button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddProduct} className="glass-panel p-4 rounded-2xl space-y-4 mb-6 border border-[#0A84FF]/30">
              <h3 className="font-bold text-[#0A84FF]">Add New Item</h3>
              <Input 
                placeholder="Item Name" 
                value={newProduct.name} 
                onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
              />
              <div className="flex gap-4">
                <Input 
                  type="number" 
                  placeholder="Price (Naira)" 
                  value={newProduct.price || ''} 
                  onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value)})} 
                />
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 text-white"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                >
                  <option value="drink">Soft Drink</option>
                  <option value="vehicle">Vehicle</option>
                </select>
              </div>
              <Input 
                placeholder="Description" 
                value={newProduct.description} 
                onChange={e => setNewProduct({...newProduct, description: e.target.value})} 
              />
              <Button type="submit">Save Item</Button>
            </form>
          )}
          
          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover bg-white/5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-white/50">₦{product.price.toLocaleString()}</p>
                  <span className="text-[10px] uppercase tracking-wider opacity-50">{product.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleStock(product.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${product.inStock ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}
                  >
                    {product.inStock ? 'In Stock' : 'Stock Out'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <SectionHeader title="Recent Orders" subtitle="Track all bookings" />
          
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-white/30">
              <Package size={48} className="mb-4 opacity-50" />
              <p>No active orders yet</p>
            </div>
          ) : (
             <div className="space-y-4">
               {orders.map(order => {
                 const isVehicle = order.items[0].category === 'vehicle';
                 return (
                   <div key={order.id} className="glass-panel p-5 rounded-2xl space-y-3">
                     <div className="flex justify-between items-start">
                       <div>
                         <span className="text-[#0A84FF] font-mono text-xs font-bold">{order.trackingId}</span>
                         <h3 className="font-bold text-lg">{isVehicle ? order.customer.organization : order.customer.name}</h3>
                       </div>
                       <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg uppercase font-bold">Paid</span>
                     </div>
                     
                     <div className="text-sm text-white/60 space-y-1 border-t border-white/5 pt-2">
                        <p>Item: {order.items[0].name}</p>
                        {isVehicle ? (
                          <>
                            <p>Phone: {order.customer.phone}</p>
                            <p>From: {order.customer.fromDestination}</p>
                            <p>To: {order.customer.toDestination}</p>
                          </>
                        ) : (
                          <p>Phone: {order.customer.phone}</p>
                        )}
                        <p className="pt-1 text-white font-semibold">Total: ₦{order.total.toLocaleString()}</p>
                     </div>
                   </div>
                 );
               })}
             </div>
          )}
        </div>
      )}
    </div>
  );
}
