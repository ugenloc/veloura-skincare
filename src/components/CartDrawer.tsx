import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    discountAmount, 
    appliedDiscount, 
    applyPromoCode, 
    removePromoCode, 
    selectedDelivery,
    cartTotal,
    formatNaira, 
    setCurrentView,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = 30000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput);
    if (!result.success) {
      setPromoError(result.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveForLater = (productId: string) => {
    if (!isInWishlist(productId)) {
      toggleWishlist(productId);
    }
    removeFromCart(productId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#EAE3DA]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE3DA] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1E1C1A]" />
              <h2 className="text-base sm:text-lg font-serif font-medium text-[#1E1C1A]">
                Your Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-gray-500 hover:text-black rounded-lg transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-4 bg-[#F5EFEB] border-b border-[#E8E1D9] text-xs">
            {remainingForFree > 0 ? (
              <p className="text-[#1E1C1A] mb-2 font-medium">
                Add <span className="font-semibold text-[#9C6B68]">{formatNaira(remainingForFree)}</span> more for Complimentary Delivery
              </p>
            ) : (
              <p className="text-emerald-700 font-semibold mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Unlocked: Complimentary Nationwide Delivery!
              </p>
            )}
            <div className="w-full bg-[#E2D9CE] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#9C6B68] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F0EAE1] flex items-center justify-center text-[#7A746E] mb-4">
                  <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-serif text-[#1E1C1A] mb-1">Your bag is waiting</h3>
                <p className="text-xs text-[#7A746E] max-w-xs mb-6 leading-relaxed">
                  Discover botanical hydration, gentle cleansers, and soothing barrier treatments for your ritual.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('shop');
                  }}
                  className="py-2.5 px-6 bg-[#1E1C1A] text-white text-xs font-semibold rounded-xl hover:bg-[#9C6B68] transition-colors"
                >
                  Explore Skincare Essentials
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const primaryImage = item.product.images[0]?.url;
                const unitPrice = item.product.salePrice ?? item.product.price;
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div 
                    key={item.id} 
                    className="p-3 bg-white rounded-xl border border-[#EAE3DA] flex gap-3 shadow-xs"
                  >
                    <img
                      src={primaryImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-lg bg-[#F6F2EC] shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-serif font-medium text-[#1E1C1A] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-gray-400 hover:text-red-600 p-0.5"
                            aria-label={`Remove ${item.product.name} from bag`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#7A746E] mt-0.5">{item.product.size}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E8E1D9] rounded-lg bg-[#FAF7F2] px-1 py-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums text-[#1E1C1A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-semibold tabular-nums text-[#1E1C1A]">
                            {formatNaira(itemTotal)}
                          </span>
                          <button
                            onClick={() => handleSaveForLater(item.productId)}
                            className="block text-[10px] text-[#7A746E] hover:text-[#9C6B68] underline mt-0.5"
                          >
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#EAE3DA] space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#7A746E]" />
                  <input
                    type="text"
                    placeholder="Discount code (e.g. VELOURA10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-lg text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#FAF7F2] hover:bg-[#EAE3DA] text-[#1E1C1A] text-xs font-semibold rounded-lg border border-[#E2D9CE] transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-red-600">{promoError}</p>
              )}

              {appliedDiscount && (
                <div className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-[#F4EBE8] rounded-lg text-[#9C6B68]">
                  <span>Code Applied: <strong>{appliedDiscount.code}</strong> (-{formatNaira(discountAmount)})</span>
                  <button onClick={removePromoCode} className="text-xs font-bold hover:text-black">
                    ✕
                  </button>
                </div>
              )}

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-[#7A746E] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1E1C1A] font-semibold tabular-nums">{formatNaira(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#9C6B68]">
                    <span>Discount</span>
                    <span className="tabular-nums font-semibold">-{formatNaira(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-[#1E1C1A] font-medium tabular-nums">
                    {cartSubtotal >= freeDeliveryThreshold ? 'FREE' : formatNaira(selectedDelivery.price)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1E1C1A] pt-2 border-t border-[#F2ECE4]">
                  <span>Total</span>
                  <span className="tabular-nums text-base">{formatNaira(cartTotal)}</span>
                </div>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#7A746E]">
                Encrypted & Secure 256-bit checkout via Paystack / Flutterwave
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
