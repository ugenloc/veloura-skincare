import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, MapPin, Heart, LogOut, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { 
    currentUser, 
    loginUser, 
    logoutUser, 
    orders, 
    wishlist, 
    products, 
    addToCart, 
    setCurrentView, 
    formatNaira 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // If user is not logged in, show elegant auth portal
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xs space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#9C6B68] font-semibold">
              Veloura Membership
            </span>
            <h1 className="text-2xl font-serif text-[#1E1C1A]">Sign In to Your Account</h1>
            <p className="text-xs text-[#7A746E]">
              Access saved rituals, past orders, and tracking updates.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (emailInput.trim()) loginUser(emailInput.trim());
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block font-medium text-[#7A746E] mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="amina.b@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
              />
            </div>
            <div>
              <label className="block font-medium text-[#7A746E] mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="veloura2026"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Sign In to Rituals
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#7A746E] border-t border-[#F2ECE4]">
            <span>Quick test account: </span>
            <button
              onClick={() => loginUser('amina.b@example.com', 'customer')}
              className="text-[#9C6B68] font-semibold underline"
            >
              Log in as Amina Bello
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter(o => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() || o.userId === currentUser.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Account Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E2D9CE] flex items-center justify-center text-xl font-serif font-semibold text-[#1E1C1A]">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif text-[#1E1C1A]">{currentUser.name}</h1>
              {currentUser.role === 'admin' && (
                <span className="px-2 py-0.5 bg-[#F4EBE8] text-[#9C6B68] text-[10px] font-bold uppercase rounded">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-[#7A746E] mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin')}
              className="py-2 px-3.5 bg-[#FAF7F2] text-[#9C6B68] border border-[#E2D9CE] rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-[#F4EBE8]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          )}

          <button
            onClick={logoutUser}
            className="py-2 px-3.5 bg-white text-gray-600 hover:text-black border border-[#E2D9CE] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Account Tabs */}
      <div className="flex border-b border-[#EAE3DA] gap-6 text-xs font-medium">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'orders' ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold' : 'border-transparent text-[#7A746E]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({userOrders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'profile' ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold' : 'border-transparent text-[#7A746E]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Details</span>
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'addresses' ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold' : 'border-transparent text-[#7A746E]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-[#EAE3DA] text-center space-y-3">
              <Package className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-base font-serif text-[#1E1C1A]">No orders placed yet</h3>
              <p className="text-xs text-[#7A746E]">Start your clean skincare ritual today.</p>
              <button
                onClick={() => setCurrentView('shop')}
                className="py-2.5 px-6 bg-[#1E1C1A] text-white text-xs font-semibold rounded-xl hover:bg-[#9C6B68]"
              >
                Shop Formulations
              </button>
            </div>
          ) : (
            userOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-[#EAE3DA] overflow-hidden shadow-xs">
                <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#EAE3DA] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase tracking-wider block">Order ID</span>
                    <span className="font-serif font-bold text-sm text-[#1E1C1A]">{order.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase tracking-wider block">Date</span>
                    <span className="text-[#1E1C1A] font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase tracking-wider block">Total Amount</span>
                    <span className="font-semibold text-[#1E1C1A] tabular-nums">{formatNaira(order.total)}</span>
                  </div>
                  <div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold rounded-full uppercase tracking-wider">
                      {order.fulfillmentStatus.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 divide-y divide-[#F2ECE4]">
                  {order.items.map((i) => (
                    <div key={i.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={i.product.images[0]?.url}
                          alt={i.product.name}
                          className="w-10 h-10 object-cover rounded-lg bg-[#FAF7F2]"
                        />
                        <div>
                          <p className="font-serif font-medium text-[#1E1C1A]">{i.product.name}</p>
                          <p className="text-[10px] text-[#7A746E]">Qty: {i.quantity} · {formatNaira(i.unitPrice)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(i.product, 1)}
                        className="text-xs font-semibold text-[#9C6B68] hover:text-[#1E1C1A] underline"
                      >
                        Buy Again
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#FAF7F2] border-t border-[#EAE3DA] flex items-center justify-between text-xs">
                  <span className="text-[#7A746E]">Tracking: <strong>{order.trackingNumber || 'Processing'}</strong></span>
                  <button
                    onClick={() => setCurrentView('order-tracking')}
                    className="text-xs font-semibold text-[#1E1C1A] hover:text-[#9C6B68] flex items-center gap-1"
                  >
                    <span>Track Shipment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] max-w-xl space-y-4 text-xs">
          <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Account Information</h3>
          <div>
            <label className="block text-[#7A746E] font-medium mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={currentUser.name}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-[#7A746E] font-medium mb-1">Email Address</label>
            <input
              type="email"
              disabled
              defaultValue={currentUser.email}
              className="w-full px-3.5 py-2.5 bg-gray-100 border border-[#E2D9CE] rounded-xl text-xs text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-[#7A746E] font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              defaultValue={currentUser.phone || '+234 803 123 4567'}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs"
            />
          </div>
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] max-w-xl space-y-4 text-xs">
          <h3 className="text-base font-serif font-medium text-[#1E1C1A]">Primary Shipping Address</h3>
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D9] space-y-1">
            <span className="font-semibold text-sm text-[#1E1C1A] block">{currentUser.name}</span>
            <p className="text-[#7A746E]">
              14 Alexander Avenue, Ikoyi<br />
              Lagos State, Nigeria<br />
              Phone: +234 803 123 4567
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
