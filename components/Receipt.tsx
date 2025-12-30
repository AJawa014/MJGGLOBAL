import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from './UI';
import { Order } from '../types';
import { Download, CheckCircle } from 'lucide-react';

interface ReceiptProps {
  order: Order;
}

export const Receipt: React.FC<ReceiptProps> = ({ order }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(10, 132, 255); // SF Blue
    doc.text('Zest & Glide', 105, y, { align: 'center' });
    y += 15;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Receipt #${order.id.toUpperCase().slice(0, 8)}`, 105, y, { align: 'center' });
    y += 10;
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 105, y, { align: 'center' });
    y += 20;

    // Customer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Customer: ${order.customer.name}`, 20, y);
    y += 6;
    doc.text(`Email: ${order.customer.email}`, 20, y);
    y += 15;

    // Items
    doc.setDrawColor(200);
    doc.line(20, y, 190, y);
    y += 10;
    
    order.items.forEach(item => {
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${item.name} x${item.quantity}`, 20, y);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 190, y, { align: 'right' });
      y += 8;
    });

    y += 5;
    doc.line(20, y, 190, y);
    y += 15;

    // Total
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${order.total.toFixed(2)}`, 190, y, { align: 'right' });

    doc.save(`Receipt-${order.id}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Payment Successful</h2>
        <p className="text-white/60">Your order has been confirmed.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl w-full max-w-sm space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">Tracking ID</span>
          <span className="font-mono text-[#0A84FF]">{order.trackingId}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/50">Amount Paid</span>
          <span className="font-bold">${order.total.toFixed(2)}</span>
        </div>
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-center text-white/40">
            A confirmation email has been sent to {order.customer.email}
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <Button onClick={downloadPDF} variant="primary" className="flex items-center justify-center gap-2">
          <Download size={18} /> Download Receipt
        </Button>
        <Button onClick={() => window.location.reload()} variant="glass" className="flex items-center justify-center gap-2">
           Return Home
        </Button>
      </div>
    </div>
  );
};