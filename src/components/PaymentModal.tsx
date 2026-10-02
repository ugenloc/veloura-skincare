import React, { useState } from 'react';
import { PaymentProvider } from '../types';
import { ShieldCheck, CreditCard, Landmark, Smartphone, Lock, CheckCircle2, Loader2, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (provider: PaymentProvider, txRef: string) => void;
  amount: number;
  customerEmail: string;
  formatNaira: (val: number) => string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  customerEmail,
  formatNaira,
}) => {
  const [provider, setProvider] = useState<PaymentProvider>('paystack');
  const [payMethod, setPayMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '5399 8320 1489 4021',
    expiry: '08/28',
    cvv: '812',
    pin: '1234',
  });

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate secure 2-way handshake / webhook verification
    setTimeout(() => {
      setIsProcessing(false);
      const generatedRef = `${provider}_ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      onSuccess(provider, generatedRef);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => !isProcessing && onClose()}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E8E1D9] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header with Provider Branding */}
        <div className="bg-[#1E1C1A] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C9B9A6]">
              Secure Checkout Gateway
            </span>
            <h3 className="text-xl font-serif text-[#FAF7F2]">
              {formatNaira(amount)}
            </h3>
            <p className="text-xs text-[#EAE3DA]/80 mt-0.5">{customerEmail}</p>
          </div>
          <button
            onClick={() => !isProcessing && onClose()}
            disabled={isProcessing}
            className="p-1 text-white/60 hover:text-white transition-colors"
            aria-label="Close payment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gateway Selector (Provider Agnostic Layer) */}
        <div className="p-4 bg-[#FAF7F2] border-b border-[#EAE3DA]">
          <div className="text-[11px] font-semibold text-[#7A746E] uppercase tracking-wider mb-2">
            Select Payment Engine
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setProvider('paystack')}
              className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                provider === 'paystack'
                  ? 'bg-white text-[#0BA4DB] border-[#0BA4DB] shadow-xs'
                  : 'bg-white/60 text-gray-600 border-gray-200 hover:bg-white'
              }`}
            >
              Paystack
            </button>
            <button
              type="button"
              onClick={() => setProvider('flutterwave')}
              className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                provider === 'flutterwave'
                  ? 'bg-white text-[#F5A623] border-[#F5A623] shadow-xs'
                  : 'bg-white/60 text-gray-600 border-gray-200 hover:bg-white'
              }`}
            >
              Flutterwave
            </button>
            <button
              type="button"
              onClick={() => setProvider('stripe')}
              className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                provider === 'stripe'
                  ? 'bg-white text-[#635BFF] border-[#635BFF] shadow-xs'
                  : 'bg-white/60 text-gray-600 border-gray-200 hover:bg-white'
              }`}
            >
              Stripe Global
            </button>
          </div>
        </div>

        {/* Payment Channels (Card, Transfer, USSD) */}
        <div className="p-5">
          <div className="flex border-b border-[#EAE3DA] mb-4">
            <button
              type="button"
              onClick={() => setPayMethod('card')}
              className={`pb-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
                payMethod === 'card'
                  ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold'
                  : 'border-transparent text-[#7A746E] hover:text-[#1E1C1A]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Debit / Credit Card
            </button>
            <button
              type="button"
              onClick={() => setPayMethod('transfer')}
              className={`pb-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
                payMethod === 'transfer'
                  ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold'
                  : 'border-transparent text-[#7A746E] hover:text-[#1E1C1A]'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              Bank Transfer
            </button>
            <button
              type="button"
              onClick={() => setPayMethod('ussd')}
              className={`pb-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
                payMethod === 'ussd'
                  ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold'
                  : 'border-transparent text-[#7A746E] hover:text-[#1E1C1A]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              USSD (*737#)
            </button>
          </div>

          {/* Method Content */}
          {payMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#7A746E] mb-1">
                  Card Number (Mastercard / Visa / Verve)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full pl-3 pr-10 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs font-mono tabular-nums focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                  <CreditCard className="w-4 h-4 text-[#7A746E] absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#7A746E] mb-1">
                    Valid Thru (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs font-mono text-center focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#7A746E] mb-1">
                    CVV Security
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-xs font-mono text-center focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>
              </div>
            </div>
          )}

          {payMethod === 'transfer' && (
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] text-xs space-y-2">
              <p className="text-[#1E1C1A] font-medium">Virtual Reserved NIP Account:</p>
              <div className="bg-white p-2.5 rounded-lg border border-[#E2D9CE]">
                <div className="flex justify-between py-0.5">
                  <span className="text-[#7A746E]">Bank Name:</span>
                  <span className="font-semibold text-[#1E1C1A]">Wema Bank / Titan</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#7A746E]">Account Number:</span>
                  <span className="font-mono font-bold text-[#1E1C1A] text-sm">9928174520</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#7A746E]">Account Name:</span>
                  <span className="font-medium text-[#1E1C1A]">Veloura Skincare Checkout</span>
                </div>
              </div>
              <p className="text-[10px] text-[#7A746E]">
                Payment will be detected automatically within seconds via real-time webhook.
              </p>
            </div>
          )}

          {payMethod === 'ussd' && (
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] text-xs space-y-2 text-center">
              <p className="text-[#7A746E]">Dial the code below on your registered phone:</p>
              <div className="py-2 px-4 bg-white rounded-lg border border-[#E2D9CE] inline-block font-mono font-bold text-base text-[#1E1C1A]">
                *737*000*4192#
              </div>
              <p className="text-[10px] text-[#7A746E]">GTBank · Zenith (*966#) · Access (*901#)</p>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full mt-5 py-3.5 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-75"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Secure Transaction...</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Pay {formatNaira(amount)} with {provider.toUpperCase()}</span>
              </>
            )}
          </button>

          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#7A746E]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PCI-DSS Level 1 Compliant · 256-Bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};
