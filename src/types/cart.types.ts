import type { RefrigeratorProduct } from './refrigerator.types';

export interface CartItem {
  product: RefrigeratorProduct;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'credit_card';
  notes?: string;
}

export interface Order extends CheckoutFormData {
  id: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  createdAt: Date;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  fullName: string;
  phone: string;
  confirmPassword: string;
}
