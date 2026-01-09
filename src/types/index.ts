export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
}

export interface Product {
  id: string;
  brand_id: string;
  brand?: Brand;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price?: number;
  gender: 'men' | 'women' | 'unisex' | 'kids';
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_trending: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: ShippingAddress;
  payment_status: 'pending' | 'paid' | 'failed';
  payment_id?: string;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase: number;
  expires_at?: string;
  is_active: boolean;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'user' | 'admin';
}
