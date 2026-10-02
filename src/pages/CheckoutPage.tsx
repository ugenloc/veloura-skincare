import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentModal } from '../components/PaymentModal';
import { DeliveryOption, PaymentProvider, ShippingAddress } from '../types';
import { DELIVERY_OPTIONS } from '../data/seedData';
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  Check, 
  Truck, 
  CreditCard, 
  ShoppingBag, 
  AlertCircle 
} from 'lucide-react';

const NIGERIAN_STATES = [
  'Lagos', 'Abuja FCT', 'Rivers', 'Oyo', 'Kano', 'Ogun', 'Kaduna', 
  'Enugu', 'Delta', 'Edo', 'Anambra', 'Akwa Ibom', 'Ondo', 'Imo', 
  'Abia', 'Plateau', 'Kwara', 'Cross River', 'Other States'
];

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    appliedDiscount, 
    formatNaira, 
    createOrder, 
    setCurrentView,
    currentUser,
    showToast,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    fullName: currentUser?.name || 'Amina Bello',
    email: currentUser?.email || 'amina.b@example.com',
    phone: currentUser?.phone || '+234 803 123 4567',
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: currentUser?.name || 'Amina Bello',
    email: currentUser?.email || 'amina.b@example.com',
    phone: currentUser?.phone || '+234 803 123 4567',
    country: 'Nigeria',
    state: 'Lagos',
    city: 'Ikoyi',
    address: '14 Alexander Avenue, Ikoyi',
    deliveryNotes: '',
  });

  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('paystack');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Shipping threshold check
  const freeShipping = cartSubtotal >= 30000;
  const effectiveShippingPrice = freeShipping ? 0 : selectedDelivery.price;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + effectiveShippingPrice);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto text-[#7A746E]">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-serif text-[#1E1C1A]">Your shopping bag is empty</h2>
        <p className="text-xs text-[#7A746E]">Add items before proceeding to secure checkout.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="py-2.5 px-6 bg-[#1E1C1A] text-white text-xs font-semibold rounded-xl hover:bg-[#9C6B68]"
        >
          Browse Skincare Essentials
        </button>
      </div>
    );
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }
    setErrorMessage('');
    setShippingAddress(prev => ({
      ...prev,
      fullName: customerInfo.fullName,
      email: customerInfo.email,
      phone: customerInfo.phone,
    }));
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state) {
      setErrorMessage('Please fill in your complete delivery street address.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleStep3Submit = () => {
    setErrorMessage('');
    setStep(4);
  };

  const handleInitiatePayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (provider: PaymentProvider, txRef: string) => {
    setIsPaymentModalOpen(false);
    
    // Create actual order with server-calculated totals
    const finalDeliveryOption = {
      ...selectedDelivery,
      price: effectiveShippingPrice
    };

    const newOrder = createOrder({
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      shippingAddress,
      deliveryMethod: finalDeliveryOption,
      paymentProvider: provider,
    });

    showToast(`Order #${newOrder.orderNumber} successfully placed!`, 'success');
    setCurrentView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EAE3DA] mb-8">
        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs font-semibold text-[#7A746E] hover:text-[#1E1C1A] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Boutique</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#7A746E]">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium text-[#1E1C1A]">256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-7 space-y-6">
          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs pb-4 border-b border-[#EAE3DA]">
            <div className={`pb-2 border-b-2 font-medium ${step >= 1 ? 'border-[#1E1C1A] text-[#1E1C1A]' : 'border-transparent text-[#7A746E]'}`}>
              1. Contact
            </div>
            <div className={`pb-2 border-b-2 font-medium ${step >= 2 ? 'border-[#1E1C1A] text-[#1E1C1A]' : 'border-transparent text-[#7A746E]'}`}>
              2. Address
            </div>
            <div className={`pb-2 border-b-2 font-medium ${step >= 3 ? 'border-[#1E1C1A] text-[#1E1C1A]' : 'border-transparent text-[#7A746E]'}`}>
              3. Delivery
            </div>
            <div className={`pb-2 border-b-2 font-medium ${step >= 4 ? 'border-[#1E1C1A] text-[#1E1C1A]' : 'border-transparent text-[#7A746E]'}`}>
              4. Payment
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: CUSTOMER INFO */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-4">
              <div>
                <h3 className="text-base font-serif font-medium text-[#1E1C1A]">
                  Customer Contact Information
                </h3>
                <p className="text-xs text-[#7A746E] mt-0.5">
                  Guest checkout enabled. We’ll send your order receipt and tracking updates here.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#7A746E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Bello"
                  value={customerInfo.fullName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#7A746E] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="amina@example.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#7A746E] mb-1">Phone Number (WhatsApp updates)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Continue to Delivery Address
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DELIVERY ADDRESS */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-medium text-[#1E1C1A]">
                    Delivery Destination
                  </h3>
                  <p className="text-xs text-[#7A746E] mt-0.5">Where should we deliver your skincare package?</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#7A746E] hover:text-[#1E1C1A] underline"
                >
                  Edit Contact
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#7A746E] mb-1">Country</label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#7A746E] mb-1">State / Province</label>
                  <select
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                  >
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#7A746E] mb-1">City / Neighborhood</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ikoyi, Lekki Phase 1, Garki 2, GRA Ikeja"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#7A746E] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14 Alexander Avenue, Flat 3B"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#7A746E] mb-1">Courier Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Leave with gate security / call upon arrival"
                  value={shippingAddress.deliveryNotes || ''}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, deliveryNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#7A746E] hover:text-[#1E1C1A]"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Continue to Delivery Speed
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: DELIVERY METHOD */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-medium text-[#1E1C1A]">
                    Select Delivery Courier Method
                  </h3>
                  <p className="text-xs text-[#7A746E] mt-0.5">Dispatched from our climate-controlled fulfillment hub.</p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#7A746E] hover:text-[#1E1C1A] underline"
                >
                  Edit Address
                </button>
              </div>

              <div className="space-y-3">
                {DELIVERY_OPTIONS.map((opt) => {
                  const isSelected = selectedDelivery.id === opt.id;
                  const priceToDisplay = freeShipping && opt.id === 'standard' ? 'FREE' : formatNaira(opt.price);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedDelivery(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FAF7F2] border-[#1E1C1A] shadow-xs ring-1 ring-[#1E1C1A]'
                          : 'bg-white border-[#E8E1D9] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Truck className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-[#9C6B68]' : 'text-gray-400'}`} />
                        <div>
                          <div className="text-xs font-semibold text-[#1E1C1A]">{opt.name}</div>
                          <div className="text-[11px] text-[#7A746E] mt-0.5">{opt.description}</div>
                          <div className="text-[10px] text-emerald-700 font-medium mt-1">
                            Estimated: {opt.estimatedDays}
                          </div>
                        </div>
                      </div>

                      <div className="text-right font-semibold text-xs tabular-nums text-[#1E1C1A]">
                        {priceToDisplay}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#7A746E] hover:text-[#1E1C1A]"
                >
                  ← Back to Address
                </button>
                <button
                  onClick={handleStep3Submit}
                  className="py-3 px-6 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT SELECTION */}
          {step === 4 && (
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-medium text-[#1E1C1A]">
                    Payment Engine
                  </h3>
                  <p className="text-xs text-[#7A746E] mt-0.5">
                    Select your preferred processor. All transactions are PCI-DSS secured.
                  </p>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="text-xs text-[#7A746E] hover:text-[#1E1C1A] underline"
                >
                  Edit Delivery
                </button>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border cursor-pointer border-[#1E1C1A] bg-[#FAF7F2]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentProvider"
                      checked={selectedProvider === 'paystack'}
                      onChange={() => setSelectedProvider('paystack')}
                      className="accent-[#1E1C1A]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#1E1C1A]">Paystack (Recommended in Nigeria)</div>
                      <div className="text-[11px] text-[#7A746E]">Verve, Mastercard, Visa, Direct Bank Transfer & USSD</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#0BA4DB] tracking-wider">Fast</span>
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border cursor-pointer border-[#E8E1D9] hover:bg-[#FAF7F2]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentProvider"
                      checked={selectedProvider === 'flutterwave'}
                      onChange={() => setSelectedProvider('flutterwave')}
                      className="accent-[#1E1C1A]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#1E1C1A]">Flutterwave Africa</div>
                      <div className="text-[11px] text-[#7A746E]">Cards, Mobile Money, Barter & African currencies</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#F5A623] tracking-wider">Multi-Currency</span>
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border cursor-pointer border-[#E8E1D9] hover:bg-[#FAF7F2]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentProvider"
                      checked={selectedProvider === 'stripe'}
                      onChange={() => setSelectedProvider('stripe')}
                      className="accent-[#1E1C1A]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#1E1C1A]">Stripe Global</div>
                      <div className="text-[11px] text-[#7A746E]">International cards, Apple Pay & USD conversion</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#635BFF] tracking-wider">Global</span>
                </label>
              </div>

              {/* Complete Order CTA */}
              <div className="pt-2">
                <button
                  onClick={handleInitiatePayment}
                  className="w-full py-4 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay {formatNaira(grandTotal)}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-4 shadow-xs sticky top-24">
          <h3 className="text-base font-serif font-medium text-[#1E1C1A] pb-3 border-b border-[#F2ECE4]">
            Order Summary ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg bg-[#FAF7F2] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-medium text-[#1E1C1A] truncate">{item.product.name}</p>
                  <p className="text-[11px] text-[#7A746E]">Qty: {item.quantity} · {item.product.size}</p>
                </div>
                <span className="font-semibold tabular-nums text-[#1E1C1A]">
                  {formatNaira((item.product.salePrice ?? item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F2ECE4] space-y-2 text-xs text-[#7A746E]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#1E1C1A] font-semibold tabular-nums">{formatNaira(cartSubtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#9C6B68]">
                <span>Discount ({appliedDiscount?.code})</span>
                <span className="tabular-nums font-semibold">-{formatNaira(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-[#1E1C1A] font-medium tabular-nums">
                {freeShipping ? 'FREE (Nationwide Threshold)' : formatNaira(selectedDelivery.price)}
              </span>
            </div>

            <div className="flex justify-between text-base font-serif font-semibold text-[#1E1C1A] pt-3 border-t border-[#F2ECE4]">
              <span>Total Due</span>
              <span className="tabular-nums">{formatNaira(grandTotal)}</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF7F2] rounded-xl text-[11px] text-[#7A746E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Server recalculation verified · No hidden customs or surcharges</span>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal Simulator */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={grandTotal}
        customerEmail={customerInfo.email}
        formatNaira={formatNaira}
      />
    </div>
  );
};
