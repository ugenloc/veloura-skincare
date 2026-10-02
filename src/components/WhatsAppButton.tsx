import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    // Standard direct link to WhatsApp for skincare customer advice
    const text = encodeURIComponent("Hello Veloura Skincare! I need help selecting the right routine for my skin.");
    window.open(`https://wa.me/2348030000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 z-40">
      {isOpen && (
        <div className="mb-3 p-4 bg-white rounded-2xl shadow-xl border border-[#E8E1D9] max-w-xs animate-in slide-in-from-bottom-3 text-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-xs text-[#1E1C1A] tracking-wider uppercase">Veloura Skin Advisor</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#7A746E] leading-relaxed mb-3">
            Questions about our formulations or need a tailored routine for your skin? Our beauty consultants in Lagos are online.
          </p>
          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2.5 px-3 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-[#1E1C1A] text-[#FAF7F2] hover:bg-[#9C6B68] flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Contact Customer Care via WhatsApp"
        title="Chat with Skincare Advisor"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
};
