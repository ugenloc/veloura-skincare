import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, FulfillmentStatus, DiscountCode, SkinType, SkinConcern } from '../types';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Star, 
  AlertTriangle, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  TrendingUp, 
  Users, 
  Truck, 
  Eye, 
  Database,
  ArrowLeft
} from 'lucide-react';

interface AdminDashboardProps {
  onOpenSchemaModal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenSchemaModal }) => {
  const { 
    products, 
    categories, 
    orders, 
    reviews, 
    discountCodes, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateStock, 
    updateOrderStatus, 
    addDiscountCode, 
    toggleDiscountCode, 
    deleteDiscountCode, 
    moderateReview,
    formatNaira, 
    setCurrentView 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'discounts' | 'reviews'>('overview');

  // Search/filter states
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false);

  // New Product Form state
  const [prodForm, setProdForm] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: 15000,
    salePrice: 0,
    sku: '',
    stockQuantity: 50,
    categoryId: categories[0]?.id || 'cat-serums',
    brand: 'Veloura',
    size: '50 ml / 1.7 fl. oz.',
    texture: 'Silky cream',
    status: 'active' as 'active' | 'draft' | 'archived',
    badge: 'New Arrival' as any,
    benefits: 'Deeply hydrates and calms skin.\nStrengthens natural moisture barrier.\nSuitable for everyday use.',
    howToUse: 'Apply 3-4 drops morning and night on cleansed skin.',
    ingredients: 'Water/Aqua, Propanediol, Sodium Hyaluronate, Panthenol, Glycerin.',
    skinTypes: ['Dry', 'Normal', 'Sensitive'] as SkinType[],
    concerns: ['Hydration & Dryness', 'Skin Barrier Care'] as SkinConcern[],
    imageUrl: '/src/assets/images/product_serum_amber_1790952757165.jpg',
  });

  // New Discount Code Form state
  const [discountForm, setDiscountForm] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 10,
    minOrderValue: 15000,
    description: '',
  });

  // Calculate overview metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const lowStockCount = products.filter(p => p.stockQuantity < 20).length;
  const pendingOrdersCount = orders.filter(o => o.fulfillmentStatus === 'pending' || o.fulfillmentStatus === 'processing').length;
  const totalCustomers = new Set(orders.map(o => o.customerEmail)).size;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim() || !prodForm.sku.trim()) return;

    const categoryObj = categories.find(c => c.id === prodForm.categoryId);

    addProduct({
      name: prodForm.name,
      slug: prodForm.slug || prodForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription: prodForm.shortDescription,
      description: prodForm.description,
      price: Number(prodForm.price),
      salePrice: prodForm.salePrice > 0 ? Number(prodForm.salePrice) : undefined,
      sku: prodForm.sku,
      stockQuantity: Number(prodForm.stockQuantity),
      categoryId: prodForm.categoryId,
      categoryName: categoryObj ? categoryObj.name : 'Skincare',
      brand: 'Veloura',
      size: prodForm.size,
      texture: prodForm.texture,
      status: prodForm.status,
      badge: prodForm.badge || undefined,
      benefits: prodForm.benefits.split('\n').filter(b => b.trim()),
      howToUse: prodForm.howToUse,
      ingredients: prodForm.ingredients,
      skinTypes: prodForm.skinTypes,
      concerns: prodForm.concerns,
      images: [
        { id: `img-${Date.now()}`, url: prodForm.imageUrl, alt: prodForm.name, isPrimary: true }
      ],
      isFeatured: true,
    });

    setIsAddProductOpen(false);
  };

  const handleCreateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountForm.code.trim()) return;

    addDiscountCode({
      code: discountForm.code,
      type: discountForm.type,
      value: Number(discountForm.value),
      minOrderValue: Number(discountForm.minOrderValue),
      description: discountForm.description || `${discountForm.code} discount offer`,
      active: true,
    });

    setIsAddDiscountOpen(false);
    setDiscountForm({ code: '', type: 'percentage', value: 10, minOrderValue: 15000, description: '' });
  };

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.fulfillmentStatus !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return o.orderNumber.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredProductsList = products.filter(p => {
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2] pb-20">
      {/* Admin Top Navigation */}
      <div className="bg-[#1E1C1A] text-white px-4 sm:px-8 py-4 flex items-center justify-between border-b border-[#38332E]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1.5 text-xs text-[#A69E95] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Storefront</span>
          </button>
          <div className="h-4 w-px bg-[#38332E]" />
          <h1 className="font-serif text-lg tracking-wider text-[#FAF7F2]">
            VELOURA <span className="text-xs uppercase font-sans tracking-widest text-[#C9B9A6] ml-2 font-normal">Staff Admin Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {onOpenSchemaModal && (
            <button
              onClick={onOpenSchemaModal}
              className="py-1.5 px-3 bg-[#2A2724] hover:bg-[#38332E] text-xs text-[#EAE3DA] rounded-lg border border-[#453F39] flex items-center gap-1.5 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-[#C9B9A6]" />
              <span>SQL DDL Schema</span>
            </button>
          )}
          <span className="text-xs text-[#8EB897] flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Studio DB
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white rounded-3xl border border-[#EAE3DA] p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'overview' ? 'bg-[#1E1C1A] text-white font-semibold' : 'text-[#7A746E] hover:bg-[#FAF7F2] hover:text-[#1E1C1A]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'products' ? 'bg-[#1E1C1A] text-white font-semibold' : 'text-[#7A746E] hover:bg-[#FAF7F2] hover:text-[#1E1C1A]'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Products Catalog</span>
              </span>
              <span className="text-[10px] tabular-nums font-mono opacity-80">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'orders' ? 'bg-[#1E1C1A] text-white font-semibold' : 'text-[#7A746E] hover:bg-[#FAF7F2] hover:text-[#1E1C1A]'
              }`}
            >
              <span className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Orders & Fulfillment</span>
              </span>
              {pendingOrdersCount > 0 && (
                <span className="px-1.5 py-0.5 bg-[#9C6B68] text-white text-[10px] font-bold rounded-full">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'inventory' ? 'bg-[#1E1C1A] text-white font-semibold' : 'text-[#7A746E] hover:bg-[#FAF7F2] hover:text-[#1E1C1A]'
              }`}
            >
              <span className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Inventory & Stock</span>
              </span>
              {lowStockCount > 0 && (
                <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                  {lowStockCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('discounts')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'discounts' ? 'bg-[#1E1C1A] text-white font-semibold' : 'text-[#7A746E] hover:bg-[#FAF7F2] hover:text-[#1E1C1A]'
              }`}
            >
              <span className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>Discount Codes</span>
              </span>
              <span className="text-[10px] tabular-nums font-mono opacity-80">{discountCodes.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'reviews' ? 'bg-[#1E1C1A] text-white font-semibold' : 'text-[#7A746E] hover:bg-[#FAF7F2] hover:text-[#1E1C1A]'
              }`}
            >
              <span className="flex items-center gap-3">
                <Star className="w-4 h-4" />
                <span>Reviews Moderation</span>
              </span>
              <span className="text-[10px] tabular-nums font-mono opacity-80">{reviews.length}</span>
            </button>
          </aside>

          {/* Main Work Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in-50">
                {/* 4 Top KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-white rounded-3xl border border-[#EAE3DA] shadow-xs">
                    <span className="text-[11px] text-[#7A746E] uppercase tracking-wider block">Total Sales</span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1C1A] mt-1 tabular-nums">
                      {formatNaira(totalRevenue)}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+18.4% this month</span>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-3xl border border-[#EAE3DA] shadow-xs">
                    <span className="text-[11px] text-[#7A746E] uppercase tracking-wider block">Total Orders</span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1C1A] mt-1 tabular-nums">
                      {orders.length}
                    </h3>
                    <span className="text-[11px] text-[#7A746E] block mt-2">
                      {pendingOrdersCount} awaiting dispatch
                    </span>
                  </div>

                  <div className="p-5 bg-white rounded-3xl border border-[#EAE3DA] shadow-xs">
                    <span className="text-[11px] text-[#7A746E] uppercase tracking-wider block">Active Customers</span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1C1A] mt-1 tabular-nums">
                      {totalCustomers || 48}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#7A746E] mt-2">
                      <Users className="w-3.5 h-3.5" />
                      <span>Melanin skincare devotees</span>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-3xl border border-[#EAE3DA] shadow-xs">
                    <span className="text-[11px] text-[#7A746E] uppercase tracking-wider block">Low Stock Alerts</span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#9C6B68] mt-1 tabular-nums">
                      {lowStockCount}
                    </h3>
                    <span className="text-[11px] text-amber-600 block mt-2">
                      Requires batch formulation
                    </span>
                  </div>
                </div>

                {/* Recent Orders Overview Table */}
                <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
                    <div>
                      <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Recent Customer Orders</h3>
                      <p className="text-xs text-[#7A746E]">Real-time orders processed via Paystack/Flutterwave.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-[#9C6B68] hover:text-[#1E1C1A]"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#F2ECE4] text-[#7A746E] uppercase tracking-wider">
                          <th className="pb-2.5 font-semibold">Order</th>
                          <th className="pb-2.5 font-semibold">Customer</th>
                          <th className="pb-2.5 font-semibold">Total</th>
                          <th className="pb-2.5 font-semibold">Payment</th>
                          <th className="pb-2.5 font-semibold">Status</th>
                          <th className="pb-2.5 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2ECE4]">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#FAF7F2]">
                            <td className="py-3 font-mono font-medium text-[#1E1C1A]">{ord.orderNumber}</td>
                            <td className="py-3 text-[#1E1C1A]">{ord.customerName}</td>
                            <td className="py-3 font-semibold tabular-nums text-[#1E1C1A]">{formatNaira(ord.total)}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {ord.paymentStatus}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="capitalize text-xs font-medium text-[#7A746E]">
                                {ord.fulfillmentStatus.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="text-xs text-[#9C6B68] hover:text-[#1E1C1A] font-semibold underline"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTS CATALOG */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#F2ECE4]">
                    <div>
                      <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Skincare Catalog Management</h3>
                      <p className="text-xs text-[#7A746E]">Create, edit, or archive formulations in your store.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search product, SKU..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs"
                        />
                      </div>
                      <button
                        onClick={() => setIsAddProductOpen(true)}
                        className="py-2 px-4 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Product</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Catalog Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#F2ECE4] text-[#7A746E] uppercase tracking-wider">
                          <th className="pb-3 font-semibold">Product</th>
                          <th className="pb-3 font-semibold">SKU</th>
                          <th className="pb-3 font-semibold">Category</th>
                          <th className="pb-3 font-semibold">Price</th>
                          <th className="pb-3 font-semibold">Inventory</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2ECE4]">
                        {filteredProductsList.map((prod) => (
                          <tr key={prod.id} className="hover:bg-[#FAF7F2]">
                            <td className="py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.images[0]?.url}
                                  alt={prod.name}
                                  className="w-10 h-10 object-cover rounded-lg bg-[#FAF7F2]"
                                />
                                <div>
                                  <p className="font-serif font-medium text-sm text-[#1E1C1A] line-clamp-1">{prod.name}</p>
                                  <span className="text-[10px] text-[#7A746E]">{prod.size}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 font-mono text-[11px] text-[#7A746E]">{prod.sku}</td>
                            <td className="py-3 text-[#1E1C1A]">{prod.categoryName}</td>
                            <td className="py-3 font-semibold tabular-nums text-[#1E1C1A]">
                              {formatNaira(prod.salePrice ?? prod.price)}
                            </td>
                            <td className="py-3">
                              <span className={`font-semibold tabular-nums ${prod.stockQuantity < 20 ? 'text-amber-600' : 'text-emerald-700'}`}>
                                {prod.stockQuantity} units
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => deleteProduct(prod.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 rounded"
                                  title="Archive/Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#F2ECE4]">
                    <div>
                      <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Order Fulfillment Manager</h3>
                      <p className="text-xs text-[#7A746E]">Process customer shipments and dispatch tracking details.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="py-2 px-3 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs"
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Search order #, customer..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="py-2 px-3 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#F2ECE4] text-[#7A746E] uppercase tracking-wider">
                          <th className="pb-3 font-semibold">Order ID</th>
                          <th className="pb-3 font-semibold">Customer & Destination</th>
                          <th className="pb-3 font-semibold">Items</th>
                          <th className="pb-3 font-semibold">Total Amount</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2ECE4]">
                        {filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#FAF7F2]">
                            <td className="py-3 font-mono font-bold text-[#1E1C1A]">{ord.orderNumber}</td>
                            <td className="py-3">
                              <p className="font-semibold text-[#1E1C1A]">{ord.customerName}</p>
                              <p className="text-[10px] text-[#7A746E]">{ord.shippingAddress.city}, {ord.shippingAddress.state}</p>
                            </td>
                            <td className="py-3 text-[#7A746E]">{ord.items.length} items</td>
                            <td className="py-3 font-semibold tabular-nums text-[#1E1C1A]">{formatNaira(ord.total)}</td>
                            <td className="py-3">
                              <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF7F2] border border-[#E8E1D9] text-[#1E1C1A]">
                                {ord.fulfillmentStatus.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="py-1 px-3 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-lg text-xs font-semibold"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: INVENTORY */}
            {activeTab === 'inventory' && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 shadow-xs space-y-4">
                  <div className="pb-3 border-b border-[#F2ECE4]">
                    <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Real-Time Stock Inventory</h3>
                    <p className="text-xs text-[#7A746E]">Directly update stock levels to prevent overselling.</p>
                  </div>

                  <div className="space-y-3">
                    {products.map((prod) => (
                      <div key={prod.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]?.url}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-xl bg-white shrink-0"
                          />
                          <div>
                            <h4 className="font-serif font-medium text-sm text-[#1E1C1A]">{prod.name}</h4>
                            <p className="text-[11px] text-[#7A746E]">SKU: {prod.sku} · {prod.size}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                          <span className={`font-semibold tabular-nums ${prod.stockQuantity < 20 ? 'text-amber-600' : 'text-emerald-700'}`}>
                            {prod.stockQuantity} in stock
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateStock(prod.id, prod.stockQuantity - 1)}
                              className="px-2 py-1 bg-white border border-[#E2D9CE] rounded-lg text-xs font-bold hover:bg-gray-50"
                            >
                              -1
                            </button>
                            <button
                              onClick={() => updateStock(prod.id, prod.stockQuantity + 5)}
                              className="px-2 py-1 bg-white border border-[#E2D9CE] rounded-lg text-xs font-bold hover:bg-gray-50 text-emerald-700"
                            >
                              +5
                            </button>
                            <button
                              onClick={() => updateStock(prod.id, prod.stockQuantity + 25)}
                              className="px-2 py-1 bg-[#1E1C1A] text-white rounded-lg text-xs font-bold hover:bg-[#9C6B68]"
                            >
                              +25 Batch
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: DISCOUNTS */}
            {activeTab === 'discounts' && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
                    <div>
                      <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Promotional Discount Codes</h3>
                      <p className="text-xs text-[#7A746E]">Manage checkout promotions and minimum bag thresholds.</p>
                    </div>
                    <button
                      onClick={() => setIsAddDiscountOpen(true)}
                      className="py-2 px-3.5 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Discount</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {discountCodes.map((d) => (
                      <div key={d.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D9] flex flex-col justify-between space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-sm tracking-wider text-[#1E1C1A] bg-white px-2.5 py-1 rounded-md border border-[#E2D9CE]">
                            {d.code}
                          </span>
                          <button
                            onClick={() => toggleDiscountCode(d.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              d.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {d.active ? 'Active' : 'Paused'}
                          </button>
                        </div>

                        <p className="text-[#7A746E] leading-relaxed">{d.description}</p>

                        <div className="pt-2 border-t border-[#E8E1D9] flex items-center justify-between text-[11px] text-[#7A746E]">
                          <span>Min Spend: {formatNaira(d.minOrderValue)}</span>
                          <button
                            onClick={() => deleteDiscountCode(d.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: REVIEWS MODERATION */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 shadow-xs space-y-4">
                  <div className="pb-3 border-b border-[#F2ECE4]">
                    <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Customer Reviews Moderation</h3>
                    <p className="text-xs text-[#7A746E]">Verify user testimonials before publishing to product pages.</p>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((r) => {
                      const prod = products.find(p => p.id === r.productId);
                      return (
                        <div key={r.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D9] text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-[#1E1C1A]">{r.userName}</span>
                              <span className="text-[#7A746E] ml-2">({r.userEmail})</span>
                              <span className="text-[11px] text-[#9C6B68] block mt-0.5">Product: {prod?.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#C7995A]">
                              {[...Array(r.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          </div>

                          <h4 className="font-semibold text-[#1E1C1A]">{r.title}</h4>
                          <p className="text-[#7A746E] leading-relaxed">{r.content}</p>

                          <div className="pt-2 border-t border-[#E8E1D9] flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-emerald-700">{r.status}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => moderateReview(r.id, 'approved')}
                                className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[10px] font-semibold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => moderateReview(r.id, 'rejected')}
                                className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-md text-[10px] font-semibold"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MANAGE ORDER MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#EAE3DA] z-10 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
              <div>
                <span className="text-[10px] text-[#7A746E] uppercase tracking-wider">Managing Order</span>
                <h3 className="text-base font-serif font-bold text-[#1E1C1A]">{selectedOrder.orderNumber}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-[#1E1C1A] mb-1">Update Fulfillment Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['processing', 'shipped', 'delivered'] as FulfillmentStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateOrderStatus(selectedOrder.id, st, trackingInput || selectedOrder.trackingNumber)}
                      className={`py-2 px-2 text-xs rounded-lg border capitalize font-semibold ${
                        selectedOrder.fulfillmentStatus === st
                          ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
                          : 'bg-[#FAF7F2] text-[#1E1C1A] border-[#E8E1D9]'
                      }`}
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1E1C1A] mb-1">Courier Tracking Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. GIG-EXP-992144"
                    defaultValue={selectedOrder.trackingNumber || ''}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl font-mono text-xs"
                  />
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, selectedOrder.fulfillmentStatus, trackingInput)}
                    className="px-3 py-2 bg-[#1E1C1A] text-white rounded-xl font-semibold"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl space-y-1">
                <span className="font-semibold text-[#1E1C1A] block">Customer Delivery Details</span>
                <p className="text-[#7A746E]">
                  {selectedOrder.customerName} ({selectedOrder.customerEmail})<br />
                  Phone: {selectedOrder.customerPhone}<br />
                  {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#1E1C1A] block mb-2">Order Items</span>
                <div className="divide-y divide-[#F2ECE4]">
                  {selectedOrder.items.map((i) => (
                    <div key={i.id} className="py-2 flex justify-between">
                      <span>{i.product.name} (x{i.quantity})</span>
                      <span className="font-semibold tabular-nums">{formatNaira(i.unitPrice * i.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsAddProductOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EAE3DA] z-10 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
              <h3 className="text-lg font-serif font-medium text-[#1E1C1A]">Create New Formulation</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#1E1C1A] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Veloura Botanical Barrier Essence"
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E1C1A] mb-1">Price (₦ Naira)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1E1C1A] mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    value={prodForm.stockQuantity}
                    onChange={(e) => setProdForm({ ...prodForm, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E1C1A] mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    placeholder="VEL-BTM-09"
                    value={prodForm.sku}
                    onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1E1C1A] mb-1">Category</label>
                  <select
                    value={prodForm.categoryId}
                    onChange={(e) => setProdForm({ ...prodForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1E1C1A] mb-1">Short Product Descriptor</label>
                <input
                  type="text"
                  required
                  placeholder="One sentence summary for catalog cards"
                  value={prodForm.shortDescription}
                  onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E1C1A] mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl font-semibold uppercase tracking-wider"
              >
                Publish Formulation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE DISCOUNT MODAL */}
      {isAddDiscountOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsAddDiscountOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#EAE3DA] z-10 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
              <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Create Discount Code</h3>
              <button onClick={() => setIsAddDiscountOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDiscount} className="space-y-3">
              <div>
                <label className="block font-semibold text-[#1E1C1A] mb-1">Promo Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH15"
                  value={discountForm.code}
                  onChange={(e) => setDiscountForm({ ...discountForm, code: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E1C1A] mb-1">Type</label>
                  <select
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Naira (₦)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#1E1C1A] mb-1">Value</label>
                  <input
                    type="number"
                    required
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({ ...discountForm, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1E1C1A] mb-1">Minimum Order Value (₦)</label>
                <input
                  type="number"
                  value={discountForm.minOrderValue}
                  onChange={(e) => setDiscountForm({ ...discountForm, minOrderValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl font-semibold uppercase tracking-wider"
              >
                Create Promo Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
