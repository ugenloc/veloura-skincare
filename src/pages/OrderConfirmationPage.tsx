import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, ShoppingBag, ExternalLink } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, setCurrentView, formatNaira } = useStore();

  if (!currentOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-serif text-[#1E1C1A]">No active order session</h2>
        <p className="text-xs text-[#7A746E]">If you recently completed a purchase, check your email or tracking page.</p>
        <button
          onClick={() => setCurrentView('order-tracking')}
          className="py-2.5 px-6 bg-[#1E1C1A] text-white text-xs font-semibold rounded-xl hover:bg-[#9C6B68]"
        >
          Track an Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Editorial Confirmation Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-100 shadow-xs">
          <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#9C6B68] font-semibold">
          Order Confirmed & Paid
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
          Thank you for shopping with Veloura.
        </h1>
        <p className="text-xs sm:text-sm text-[#7A746E] max-w-md mx-auto leading-relaxed">
          Your payment has been verified. We have sent a complete receipt to <strong className="text-[#1E1C1A]">{currentOrder.customerEmail}</strong>.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-xs">
        {/* Header bar */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#EAE3DA] flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-[#7A746E] uppercase tracking-wider block">Order Reference</span>
            <span className="text-base sm:text-lg font-serif font-bold text-[#1E1C1A] tracking-wider">
              {currentOrder.orderNumber}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-semibold rounded-full uppercase tracking-wider">
              Payment Confirmed
            </span>
            <span className="text-xs text-[#7A746E]">
              {new Date(currentOrder.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Purchased Items */}
        <div className="p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7A746E]">
            Ordered Formulations
          </h3>
          <div className="divide-y divide-[#F2ECE4]">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-xl bg-[#FAF7F2] shrink-0"
                  />
                  <div>
                    <h4 className="font-serif font-medium text-sm text-[#1E1C1A]">{item.product.name}</h4>
                    <p className="text-[11px] text-[#7A746E]">Qty: {item.quantity} · {item.product.size}</p>
                  </div>
                </div>
                <span className="font-semibold tabular-nums text-[#1E1C1A]">
                  {formatNaira(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Math */}
          <div className="pt-4 border-t border-[#F2ECE4] space-y-1.5 text-xs text-[#7A746E]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#1E1C1A] font-semibold tabular-nums">{formatNaira(currentOrder.subtotal)}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-[#9C6B68]">
                <span>Discount ({currentOrder.discountCode || 'Applied'})</span>
                <span className="tabular-nums font-semibold">-{formatNaira(currentOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Courier ({currentOrder.deliveryMethod.name})</span>
              <span className="text-[#1E1C1A] font-medium tabular-nums">
                {currentOrder.shippingFee === 0 ? 'FREE' : formatNaira(currentOrder.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-[#1E1C1A] pt-2 border-t border-[#F2ECE4]">
              <span>Total Paid</span>
              <span className="tabular-nums">{formatNaira(currentOrder.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Details Footer */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#EAE3DA] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#9C6B68] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1E1C1A] block mb-0.5">Shipping Address</span>
              <p className="text-[#7A746E]">
                {currentOrder.shippingAddress.fullName}<br />
                {currentOrder.shippingAddress.address}<br />
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}, {currentOrder.shippingAddress.country}<br />
                Phone: {currentOrder.shippingAddress.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Truck className="w-4 h-4 text-[#9C6B68] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1E1C1A] block mb-0.5">Fulfillment & Tracking</span>
              <p className="text-[#7A746E]">
                Status: <strong className="text-[#1E1C1A] capitalize">{currentOrder.fulfillmentStatus}</strong><br />
                Courier: GIG Express / Dedicated Logistics<br />
                Estimated window: {currentOrder.deliveryMethod.estimatedDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => setCurrentView('order-tracking')}
          className="w-full sm:w-auto py-3.5 px-8 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>Track Order Status</span>
        </button>

        <button
          onClick={() => setCurrentView('shop')}
          className="w-full sm:w-auto py-3.5 px-8 bg-white hover:bg-[#FAF7F2] text-[#1E1C1A] border border-[#E2D9CE] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};
