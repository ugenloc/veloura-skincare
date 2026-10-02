export type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Normal' | 'Sensitive';

export type SkinConcern = 
  | 'Hydration & Dryness' 
  | 'Skin Barrier Care' 
  | 'Blemish & Oil Balance' 
  | 'Dullness & Radiance' 
  | 'Sensitive & Redness' 
  | 'Uneven Tone';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number; // in NGN (Nigerian Naira)
  salePrice?: number;
  sku: string;
  stockQuantity: number;
  categoryId: string;
  categoryName: string;
  brand: string;
  size: string;
  texture: string;
  status: 'active' | 'draft' | 'archived';
  badge?: 'Best Seller' | 'New Arrival' | 'Limited Edition' | 'Award Winner';
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  benefits: string[];
  howToUse: string;
  ingredients: string;
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  deliveryNotes?: string;
}

export type DeliveryMethodId = 'standard' | 'express_lagos' | 'priority_nationwide';

export interface DeliveryOption {
  id: DeliveryMethodId;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
}

export type PaymentProvider = 'paystack' | 'flutterwave' | 'stripe';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type FulfillmentStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface OrderTimelineEvent {
  status: FulfillmentStatus | PaymentStatus;
  label: string;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  discountCode?: string;
  total: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  paymentProvider: PaymentProvider;
  transactionReference: string;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryOption;
  trackingNumber?: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10% or 2000 for ₦2,000
  minOrderValue: number;
  usageLimit?: number;
  usageCount: number;
  expiresAt?: string;
  active: boolean;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  savedAddresses?: ShippingAddress[];
  createdAt: string;
}

export interface RoutinePreset {
  skinType: SkinType;
  primaryConcern: SkinConcern;
  title: string;
  description: string;
  morningSteps: { step: string; product: Product }[];
  eveningSteps: { step: string; product: Product }[];
}
