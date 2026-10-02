import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, FulfillmentStatus } from '../types';
import { Search, CheckCircle2, Clock, Truck, Package, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

const STAGES: { key: FulfillmentStatus; label: string; desc: string }[] = [
  { key: 'pending', label: 'Order Placed', desc: 'Order received and logged in system' },
  { key: 'processing', label: 'Formulating & Packing', desc: 'Handcrafted fresh in Lagos studio' },
  { key: 'shipped', label: 'Dispatched to Courier', desc: 'Departed from central distribution hub' },
  { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'With local doorstep driver' },
  { key: 'delivered', label: 'Delivered', desc: 'Successfully received by customer' },
];

export const OrderTrackingPage: React.FC = () => {
  const { orders, getOrderByNumber, formatNaira, setCurrentView } = useStore();

  const [orderQuery, setOrderQuery] = useState('VEL-849201');
  const [emailQuery, setEmailQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => orders[0] || null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!orderQuery.trim()) {
      setErrorMessage('Please enter a valid order number.');
      return;
    }

    const found = getOrderByNumber(orderQuery.trim());
    if (found) {
      if (emailQuery.trim() && found.customerEmail.toLowerCase() !== emailQuery.toLowerCase().trim() && !found.customerPhone.includes(emailQuery.trim())) {
        setErrorMessage('Order number found, but the email or phone does not match our records.');
        return;
      }
      setSearchedOrder(found);
    } else {
      setErrorMessage(`No order found matching "${orderQuery}". Please check your order reference.`);
      setSearchedOrder(null);
    }
  };

  const getStageIndex = (status: FulfillmentStatus): number => {
    const map: Record<FulfillmentStatus, number> = {
      pending: 0,
      processing: 1,
      shipped: 2,
      out_for_delivery: 3,
      delivered: 4,
      cancelled: -1,
    };
    return map[status] ?? 1;
  };

  const currentStageIndex = searchedOrder ? getStageIndex(searchedOrder.fulfillmentStatus) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#9C6B68] font-semibold">
          Real-Time Tracking
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
          Track Your Veloura Delivery
        </h1>
        <p className="text-xs sm:text-sm text-[#7A746E] max-w-md mx-auto leading-relaxed">
          Enter your order reference number (e.g. VEL-849201) to view fulfillment updates, courier tracking, and estimated arrival.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] shadow-xs max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#7A746E] mb-1">Order Reference Number</label>
              <input
                type="text"
                required
                placeholder="VEL-849201"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl font-mono uppercase focus:outline-hidden focus:border-[#1E1C1A]"
              />
            </div>
            <div>
              <label className="block font-medium text-[#7A746E] mb-1">Email or Phone (Optional)</label>
              <input
                type="text"
                placeholder="amina.b@example.com"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>Search Tracking Updates</span>
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Sample Order Pills */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-[11px] text-[#7A746E]">
          <span>Quick test reference:</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setOrderQuery('VEL-849201');
                const o = getOrderByNumber('VEL-849201');
                if (o) setSearchedOrder(o);
              }}
              className="text-[#9C6B68] underline hover:text-[#1E1C1A]"
            >
              VEL-849201 (Shipped)
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setOrderQuery('VEL-849102');
                const o = getOrderByNumber('VEL-849102');
                if (o) setSearchedOrder(o);
              }}
              className="text-[#9C6B68] underline hover:text-[#1E1C1A]"
            >
              VEL-849102 (Delivered)
            </button>
          </div>
        </div>
      </div>

      {/* Tracking Result View */}
      {searchedOrder && (
        <div className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-xs space-y-6">
          {/* Header */}
          <div className="p-6 bg-[#FAF7F2] border-b border-[#EAE3DA] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A746E]">Package Status</span>
              <h2 className="text-xl font-serif font-bold text-[#1E1C1A] capitalize mt-0.5">
                {searchedOrder.fulfillmentStatus.replace(/_/g, ' ')}
              </h2>
              <p className="text-xs text-[#7A746E] mt-0.5">
                Tracking ID: <strong className="font-mono text-[#1E1C1A]">{searchedOrder.trackingNumber || 'Pending Courier Dispatch'}</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#7A746E] block">Carrier Partner</span>
              <span className="text-xs font-semibold text-[#1E1C1A]">GIG Logistics Priority Air</span>
              <span className="text-[11px] text-emerald-700 block mt-0.5">Estimated: {searchedOrder.deliveryMethod.estimatedDays}</span>
            </div>
          </div>

          {/* Interactive Progress Timeline */}
          <div className="p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7A746E] mb-6">
              Fulfillment Journey
            </h3>

            {/* Stepper bar */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#EAE3DA] -z-0 hidden sm:block" />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                {STAGES.map((s, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={s.key} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                          isCompleted
                            ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
                            : 'bg-white text-gray-300 border-[#E8E1D9]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>

                      <div className="text-left sm:text-center">
                        <span className={`text-xs block font-serif ${isCurrent ? 'font-bold text-[#1E1C1A]' : 'font-medium text-[#7A746E]'}`}>
                          {s.label}
                        </span>
                        <span className="text-[10px] text-[#A69E95] hidden sm:block mt-0.5">
                          {s.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Timeline Events */}
          <div className="p-6 pt-0 border-t border-[#F2ECE4] space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7A746E] mt-4">
              Milestone Activity Log
            </h3>
            <div className="space-y-3">
              {searchedOrder.timeline.map((event, idx) => (
                <div key={idx} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] text-xs flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-[#1E1C1A]">{event.label}</span>
                    {event.note && (
                      <p className="text-[11px] text-[#7A746E] mt-0.5">{event.note}</p>
                    )}
                  </div>
                  <span className="text-[11px] text-[#7A746E] whitespace-nowrap shrink-0">
                    {event.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Items In Package */}
          <div className="p-6 bg-[#FAF7F2] border-t border-[#EAE3DA]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7A746E] mb-3">
              Items in this shipment ({searchedOrder.items.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {searchedOrder.items.map((i) => (
                <div key={i.id} className="p-2.5 bg-white rounded-xl border border-[#EAE3DA] flex items-center gap-3 text-xs">
                  <img
                    src={i.product.images[0]?.url}
                    alt={i.product.name}
                    className="w-10 h-10 object-cover rounded-lg bg-[#FAF7F2]"
                  />
                  <div className="flex-1 truncate">
                    <p className="font-serif font-medium text-[#1E1C1A] truncate">{i.product.name}</p>
                    <p className="text-[10px] text-[#7A746E]">Qty: {i.quantity} · {formatNaira(i.unitPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
