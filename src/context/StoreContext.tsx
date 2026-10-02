import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Review, 
  DiscountCode, 
  User, 
  Category, 
  DeliveryOption, 
  FulfillmentStatus, 
  PaymentProvider,
  ShippingAddress,
  SkinType,
  SkinConcern
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_REVIEWS, 
  INITIAL_DISCOUNTS, 
  INITIAL_ORDERS, 
  DELIVERY_OPTIONS 
} from '../data/seedData';

export type AppView = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'routine-builder' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'order-tracking' 
  | 'account' 
  | 'wishlist' 
  | 'about' 
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProductSlug: string | null;
  navigateToProduct: (slug: string) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (category: string | null) => void;
  selectedConcernFilter: string | null;
  setSelectedConcernFilter: (concern: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  appliedDiscount: DiscountCode | null;
  discountAmount: number;
  selectedDelivery: DeliveryOption;
  setSelectedDelivery: (option: DeliveryOption) => void;
  cartTotal: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Products
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, review: { userName: string; userEmail: string; rating: number; title: string; content: string }) => void;
  moderateReview: (reviewId: string, status: 'approved' | 'rejected') => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: ShippingAddress;
    deliveryMethod: DeliveryOption;
    paymentProvider: PaymentProvider;
  }) => Order;
  updateOrderStatus: (orderId: string, status: FulfillmentStatus, trackingNumber?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;

  // Discounts
  discountCodes: DiscountCode[];
  addDiscountCode: (discount: Omit<DiscountCode, 'id' | 'usageCount'>) => void;
  toggleDiscountCode: (id: string) => void;
  deleteDiscountCode: (id: string) => void;

  // Auth / User
  currentUser: User | null;
  loginUser: (email: string, role?: 'customer' | 'admin') => void;
  logoutUser: () => void;
  isAdmin: boolean;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Helpers
  formatNaira: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [selectedConcernFilter, setSelectedConcernFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Drawers
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('veloura_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(() => {
    const saved = localStorage.getItem('veloura_discount');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('veloura_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // State entities
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('veloura_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('veloura_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('veloura_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(() => {
    const saved = localStorage.getItem('veloura_discounts');
    return saved ? JSON.parse(saved) : INITIAL_DISCOUNTS;
  });
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // User & Auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('veloura_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-guest-1',
      name: 'Amina Bello',
      email: 'amina.b@example.com',
      phone: '+234 803 123 4567',
      role: 'customer',
      createdAt: '2026-09-01'
    };
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('veloura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('veloura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('veloura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('veloura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('veloura_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('veloura_discounts', JSON.stringify(discountCodes));
  }, [discountCodes]);

  useEffect(() => {
    if (appliedDiscount) {
      localStorage.setItem('veloura_discount', JSON.stringify(appliedDiscount));
    } else {
      localStorage.removeItem('veloura_discount');
    }
  }, [appliedDiscount]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('veloura_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('veloura_user');
    }
  }, [currentUser]);

  // Helpers
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatNaira = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
  };

  const navigateToProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stockQuantity <= 0) {
      showToast(`${product.name} is currently out of stock`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      const effectivePrice = product.salePrice ?? product.price;

      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (nextQty > product.stockQuantity) {
          showToast(`Only ${product.stockQuantity} items in stock`, 'info');
          return prev.map((item) =>
            item.productId === product.id ? { ...item, quantity: product.stockQuantity } : item
          );
        }
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: nextQty } : item
        );
      } else {
        const newItem: CartItem = {
          id: `ci-${Date.now()}`,
          productId: product.id,
          product,
          quantity: Math.min(quantity, product.stockQuantity),
          unitPrice: effectivePrice,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${product.name}" to your bag`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Item removed from your bag', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cart.find((i) => i.productId === productId);
    if (item && item.product.stockQuantity < quantity) {
      showToast(`Only ${item.product.stockQuantity} units available`, 'info');
      return;
    }

    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return acc + price * item.quantity;
  }, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedDiscount.value) / 100);
    } else {
      discountAmount = appliedDiscount.value;
    }
    // Cap discount at subtotal
    discountAmount = Math.min(discountAmount, cartSubtotal);
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + selectedDelivery.price);

  const applyPromoCode = (codeStr: string): { success: boolean; message: string } => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = discountCodes.find((d) => d.code.toUpperCase() === cleanCode && d.active);

    if (!found) {
      return { success: false, message: 'Invalid or inactive promo code.' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Requires minimum bag value of ${formatNaira(found.minOrderValue)}.`,
      };
    }

    setAppliedDiscount(found);
    showToast(`Promo code "${found.code}" applied!`, 'success');
    return { success: true, message: `Promo applied: ${found.description}` };
  };

  const removePromoCode = () => {
    setAppliedDiscount(null);
    showToast('Promo code removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      const productName = product ? product.name : 'Product';

      if (exists) {
        showToast(`Removed "${productName}" from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${productName}" to wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const id = `veloura-${newProd.slug || Date.now()}`;
    const product: Product = {
      ...newProd,
      id,
      rating: 5.0,
      reviewCount: 0,
    };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" created`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product archived / removed', 'info');
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockQuantity: Math.max(0, newStock) } : p))
    );
    showToast('Inventory updated', 'success');
  };

  // Reviews
  const addReview = (
    productId: string,
    reviewData: { userName: string; userEmail: string; rating: number; title: string; content: string }
  ) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName: reviewData.userName,
      userEmail: reviewData.userEmail,
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      verifiedPurchase: true,
      status: 'approved',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const productRevs = [newRev, ...reviews.filter((r) => r.productId === productId && r.status === 'approved')];
          const avg = productRevs.reduce((acc, r) => acc + r.rating, 0) / productRevs.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewCount: productRevs.length,
          };
        }
        return p;
      })
    );

    showToast('Thank you for your review! It has been posted.', 'success');
  };

  const moderateReview = (reviewId: string, status: 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
    showToast(`Review marked as ${status}`, 'info');
  };

  // Orders
  const createOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: ShippingAddress;
    deliveryMethod: DeliveryOption;
    paymentProvider: PaymentProvider;
  }): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `VEL-${randomNum}`;
    const orderId = `ord-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      userId: currentUser?.id,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee: orderData.deliveryMethod.price,
      discount: discountAmount,
      discountCode: appliedDiscount?.code,
      total: cartTotal,
      paymentStatus: 'paid', // verified by payment simulator
      fulfillmentStatus: 'processing',
      paymentProvider: orderData.paymentProvider,
      transactionReference: `${orderData.paymentProvider}_ref_${Date.now()}`,
      shippingAddress: orderData.shippingAddress,
      deliveryMethod: orderData.deliveryMethod,
      trackingNumber: `VEL-TRK-${randomNum}`,
      timeline: [
        {
          status: 'paid',
          label: 'Order Placed & Payment Verified',
          timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        },
        {
          status: 'processing',
          label: 'Order transferred to Veloura Fulfillment Studio',
          timestamp: 'Just now',
          note: 'Carefully formulating and packing your fresh skincare essentials.'
        }
      ],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // Deduct stock quantities safely
    setProducts((prev) =>
      prev.map((prod) => {
        const cartMatch = cart.find((c) => c.productId === prod.id);
        if (cartMatch) {
          return {
            ...prod,
            stockQuantity: Math.max(0, prod.stockQuantity - cartMatch.quantity),
          };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: FulfillmentStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const statusLabels: Record<FulfillmentStatus, string> = {
            pending: 'Order pending review',
            processing: 'Processing in fulfillment studio',
            shipped: 'Handed to courier for delivery',
            out_for_delivery: 'Out for final doorstep delivery',
            delivered: 'Package delivered to recipient',
            cancelled: 'Order cancelled and processed',
          };

          const newTimelineEvent = {
            status,
            label: statusLabels[status],
            timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
            note: trackingNumber ? `Tracking number updated: ${trackingNumber}` : undefined,
          };

          return {
            ...order,
            fulfillmentStatus: status,
            trackingNumber: trackingNumber || order.trackingNumber,
            timeline: [...order.timeline, newTimelineEvent],
            updatedAt: new Date().toISOString(),
          };
        }
        return order;
      })
    );
    showToast(`Order status updated to ${status}`, 'success');
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);
  const getOrderByNumber = (orderNumber: string) =>
    orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase());

  // Discounts
  const addDiscountCode = (newCode: Omit<DiscountCode, 'id' | 'usageCount'>) => {
    const codeObj: DiscountCode = {
      ...newCode,
      id: `disc-${Date.now()}`,
      usageCount: 0,
      code: newCode.code.toUpperCase(),
    };
    setDiscountCodes((prev) => [codeObj, ...prev]);
    showToast(`Discount code ${codeObj.code} created!`, 'success');
  };

  const toggleDiscountCode = (id: string) => {
    setDiscountCodes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    );
  };

  const deleteDiscountCode = (id: string) => {
    setDiscountCodes((prev) => prev.filter((d) => d.id !== id));
    showToast('Discount code deleted', 'info');
  };

  // Auth
  const loginUser = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email,
      role,
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(user);
    showToast(`Signed in as ${user.name} (${role})`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Signed out successfully', 'info');
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductSlug,
        navigateToProduct,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedConcernFilter,
        setSelectedConcernFilter,
        searchQuery,
        setSearchQuery,
        cart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedDiscount,
        discountAmount,
        selectedDelivery,
        setSelectedDelivery,
        cartTotal,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        reviews,
        addReview,
        moderateReview,
        orders,
        currentOrder,
        setCurrentOrder,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByNumber,
        discountCodes,
        addDiscountCode,
        toggleDiscountCode,
        deleteDiscountCode,
        currentUser,
        loginUser,
        logoutUser,
        isAdmin,
        toasts,
        showToast,
        removeToast,
        formatNaira,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
