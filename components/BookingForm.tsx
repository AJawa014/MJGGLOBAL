
import React, { useState } from 'react';
import { CartItem, CustomerDetails, Order } from '../types';
import { Button, Input, SectionHeader } from './UI';
import { Receipt } from './Receipt';
import { ShieldCheck } from 'lucide-react';
import { useAppContext } from '../App';

interface BookingFormProps {
  item: CartItem;
}

export const BookingForm: React.FC<BookingFormProps> = ({ item }) => {
  const { addOrder } = useAppContext();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  
  const [details, setDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    organization: '',
    email: '',
    address: '',
    fromDestination: '',
    toDestination: ''
  });

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Processing animation
      
      setTimeout(() => {
        const newOrder: Order = {
          id: 'ORD-' + Math.floor(Math.random() * 10000),
          items: [item],
          total: item.price,
          customer: details,
          status: 'paid',
          date: new Date().toISOString(),
          trackingId: 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        };
        
        setCompletedOrder(newOrder);
        addOrder(newOrder); // Save to global context
        setStep(4);
      }, 2000);
    }, 1500);
  };

  if (step === 4 && completedOrder) {
    return <Receipt order={completedOrder} />;
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-t-4 border-[#0A84FF] animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-xl font-semibold">Processing</h3>
          <p className="text-white/50 text-sm">Securing your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#0A84FF]' : 'bg-white/10'}`} />
        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#0A84FF]' : 'bg-white/10'}`} />
        <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-[#0A84FF]' : 'bg-white/10'}`} />
      </div>

      {step === 1 ? (
        <form onSubmit={handleSubmitDetails} className="space-y-4">
          <SectionHeader title="Order Details" subtitle="Please provide booking information" />
          
          <div className="space-y-4">
            {item.category === 'drink' ? (
              // SOFT DRINKS MART FORM
              <>
                <div>
                  <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">Full Name</label>
                  <Input 
                    required 
                    placeholder="John Doe" 
                    value={details.name}
                    onChange={e => setDetails({...details, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">Phone Number</label>
                  <Input 
                    required 
                    type="tel"
                    placeholder="08012345678" 
                    value={details.phone}
                    onChange={e => setDetails({...details, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">Delivery Address</label>
                  <Input 
                    required 
                    placeholder="Street Address, City" 
                    value={details.address}
                    onChange={e => setDetails({...details, address: e.target.value})}
                  />
                </div>
              </>
            ) : (
              // CAR HIRE (GLIDE) FORM
              <>
                <div>
                  <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">Organization Name</label>
                  <Input 
                    required 
                    placeholder="Company or Individual Name" 
                    value={details.organization}
                    onChange={e => setDetails({...details, organization: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">Phone Number</label>
                  <Input 
                    required 
                    type="tel" 
                    placeholder="08012345678" 
                    value={details.phone}
                    onChange={e => setDetails({...details, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">Email</label>
                  <Input 
                    required 
                    type="email" 
                    placeholder="contact@mjgglobal.com" 
                    value={details.email}
                    onChange={e => setDetails({...details, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">Address</label>
                  <Input 
                    required 
                    placeholder="HQ Address" 
                    value={details.address}
                    onChange={e => setDetails({...details, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">From</label>
                    <Input 
                      required 
                      placeholder="Origin" 
                      value={details.fromDestination}
                      onChange={e => setDetails({...details, fromDestination: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/60 ml-1 mb-1 block">To</label>
                    <Input 
                      required 
                      placeholder="Destination" 
                      value={details.toDestination}
                      onChange={e => setDetails({...details, toDestination: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <Button type="submit" className="mt-6">
            Continue to Payment
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
           <SectionHeader title="Payment Transfer" subtitle="Secure bank transfer details" />

           <div className="glass-panel p-5 rounded-2xl space-y-4 border-l-4 border-l-[#0A84FF]">
              <div className="flex items-center gap-3 text-white/80">
                <ShieldCheck className="text-[#0A84FF]" />
                <span className="font-semibold">Bank Transfer (Naira)</span>
              </div>
              <div className="space-y-2 text-sm text-white/60 font-mono">
                <p>Bank: MJG Global Bank</p>
                <p>Account: 0011223344</p>
                <p>Sort Code: 12-34-56</p>
                <p>Ref: {item.id.toUpperCase()}-PAY</p>
              </div>
           </div>

           <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
              <span className="text-white/70">Total to Pay</span>
              <span className="text-xl font-bold">₦{item.price.toLocaleString()}</span>
           </div>

           <Button onClick={handlePayment} isLoading={loading}>
             I have made the transfer
           </Button>
           
           <button onClick={() => setStep(1)} className="w-full text-center text-sm text-white/40 hover:text-white pt-2">
             Back to Details
           </button>
        </div>
      )}
    </div>
  );
};
