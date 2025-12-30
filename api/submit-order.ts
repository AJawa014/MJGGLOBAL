// This represents a Vercel Serverless Function
// Located at /api/submit-order

import { VercelRequest, VercelResponse } from '@vercel/node';

// In a real app, you would import database clients here (e.g., Supabase, MongoDB)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { items, customer, total } = req.body;

    if (!items || !customer || !total) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate fake IDs
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const trackingId = `TRK-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

    // Here you would essentially:
    // 1. Validate stock
    // 2. Process Payment (Stripe/LemonSqueezy)
    // 3. Save to DB

    const order = {
      id: orderId,
      items,
      customer,
      total,
      trackingId,
      status: 'paid',
      date: new Date().toISOString()
    };

    return res.status(200).json({ success: true, order });

  } catch (error) {
    console.error('Order Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}