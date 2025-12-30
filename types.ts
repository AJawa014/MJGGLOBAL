
export type Category = 'drink' | 'vehicle';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  details: string[]; // Specs or ingredients
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  address: string;
  // Mart Specific
  name?: string;
  phone?: string;
  // Glide Specific
  organization?: string;
  email?: string;
  fromDestination?: string;
  toDestination?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerDetails;
  status: 'pending' | 'paid' | 'delivered';
  date: string;
  trackingId: string;
}

export type CheckoutStep = 'details' | 'payment' | 'processing' | 'receipt';
