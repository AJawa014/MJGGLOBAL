
import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from './UI';
import { Order } from '../types';
import { Download, CheckCircle } from 'lucide-react';

interface ReceiptProps {
  order: Order;
}

export const Receipt: React.FC<ReceiptProps> = ({ order }) => {
  const isVehicle = order.items[0].category === 'vehicle';

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    // Header / Brand
    doc.setFillColor(10, 10, 10); // Dark header bg
    doc.rect(0, 0, 210, 40, 'F');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text('MJGGLOBAL', 20, 28);
    
    y = 50;

    // Title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('OFFICIAL RECEIPT', 20, y);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Ref: ${order.id.toUpperCase()}`, 150, y);
    y += 10;
    
    // Details Grid
    doc.setDrawColor(230);
    doc.line(20, y, 190, y);
    y += 10;

    // Left Column (Bill To)
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('BILL TO:', 20, y);
    y += 6;
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    
    if (isVehicle) {
      doc.text(order.customer.organization || "N/A", 20, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.text(order.customer.email || "", 20, y);
      y += 5;
      doc.text(order.customer.phone || "", 20, y);
    } else {
      doc.text(order.customer.name || "N/A", 20, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.text(order.customer.phone || "", 20, y);
    }
    
    y += 5;
    doc.text(order.customer.address, 20, y);

    // Right Column (Journey/Order Details)
    y -= 16;
    doc.setTextColor(150);
    doc.text('DETAILS:', 120, y);
    y += 6;
    doc.setTextColor(0);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 120, y);
    y += 5;
    doc.text(`Tracking ID: ${order.trackingId}`, 120, y);
    
    if (isVehicle) {
      y += 5;
      doc.text(`From: ${order.customer.fromDestination}`, 120, y);
      y += 5;
      doc.text(`To: ${order.customer.toDestination}`, 120, y);
    }

    y += 20;

    // Items Table Header
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y, 170, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.text('Description', 25, y + 7);
    doc.text('Qty', 140, y + 7);
    doc.text('Amount', 170, y + 7);
    y += 15;

    // Items
    doc.setFont("helvetica", "normal");
    order.items.forEach(item => {
      doc.text(item.name, 25, y);
      doc.text(item.quantity.toString(), 140, y);
      doc.text(`N${(item.price * item.quantity).toLocaleString()}`, 170, y);
      y += 10;
    });

    // Total
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`TOTAL: N${order.total.toLocaleString()}`, 170, y);

    // Footer
    y = 270;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Thank you for choosing MJGGLOBAL.', 105, y, { align: 'center' });
    doc.text('mjgglobal.com', 105, y + 5, { align: 'center' });

    doc.save(`Receipt-${order.trackingId}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Booking Confirmed</h2>
        <p className="text-white/60">Thank you for your order.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl w-full max-w-sm space-y-4">
        <div className="space-y-1 pb-4 border-b border-white/10">
           <p className="text-xs text-white/40 uppercase tracking-widest">{isVehicle ? 'Organization' : 'Customer'}</p>
           <p className="font-medium text-lg">{isVehicle ? order.customer.organization : order.customer.name}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">Tracking ID</span>
          <span className="font-mono text-[#0A84FF] font-bold">{order.trackingId}</span>
        </div>
        
        {isVehicle && (
          <div className="grid grid-cols-2 gap-4 text-sm">
             <div>
               <span className="text-white/50 block text-xs">From</span>
               <span>{order.customer.fromDestination}</span>
             </div>
             <div>
               <span className="text-white/50 block text-xs">To</span>
               <span>{order.customer.toDestination}</span>
             </div>
          </div>
        )}

        <div className="flex justify-between items-center text-sm pt-2">
          <span className="text-white/50">Total Paid</span>
          <span className="font-bold text-lg">₦{order.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <Button onClick={downloadPDF} variant="primary" className="flex items-center justify-center gap-2">
          <Download size={18} /> Download Official Receipt
        </Button>
        <Button onClick={() => window.location.reload()} variant="glass" className="flex items-center justify-center gap-2">
           Return Home
        </Button>
      </div>
    </div>
  );
};
