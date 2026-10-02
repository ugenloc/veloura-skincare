import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check, Heart, Shield, Sparkles, Droplets, Database } from 'lucide-react';

interface FooterProps {
  onOpenSchemaModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSchemaModal }) => {
  const { setCurrentView, setSelectedCategoryFilter, setSelectedConcernFilter } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput('');
    }
  };

  const navigateTo = (view: any, cat: string | null = null, concern: string | null = null) => {
    setSelectedCategoryFilter(cat);
    setSelectedConcernFilter(concern);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1C1A] text-[#FAF7F2] pt-14 pb-24 md:pb-12 border-t border-[#38332E]">
      {/* Trust & Quality Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#38332E]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2A2724] flex items-center justify-center text-[#C9B9A6] shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#FAF7F2]">
                Lipid Barrier Science
              </h4>
              <p className="text-[11px] text-[#A69E95] mt-0.5">
                Ceramide 3:1:1 physiological ratio
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2A2724] flex items-center justify-center text-[#C9B9A6] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#FAF7F2]">
                Tested on Melanin Skin
              </h4>
              <p className="text-[11px] text-[#A69E95] mt-0.5">
                Guaranteed zero white cast or irritation
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2A2724] flex items-center justify-center text-[#C9B9A6] shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#FAF7F2]">
                Clean & Cruelty-Free
              </h4>
              <p className="text-[11px] text-[#A69E95] mt-0.5">
                No parabens, phthalates or drying alcohols
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2A2724] flex items-center justify-center text-[#C9B9A6] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#FAF7F2]">
                Fast Tracked Delivery
              </h4>
              <p className="text-[11px] text-[#A69E95] mt-0.5">
                Across Lagos, Abuja & all 36 States
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand & Newsletter Section (Span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-serif tracking-[0.2em] font-normal text-[#FAF7F2]">
              VELOURA
            </h3>
            <p className="text-xs text-[#A69E95] leading-relaxed max-w-sm">
              Skincare for your everyday ritual. Thoughtfully formulated botanical and clinical essentials created to make everyday skincare feel simple, intentional, and deeply restorative.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] mb-1.5">
                Join the Veloura List
              </h4>
              <p className="text-[11px] text-[#A69E95] mb-3">
                Receive fresh formulation announcements, skincare tips, and private discounts.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-[#2A2724] border border-[#453F39] rounded-xl text-xs text-[#8EB897]">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the ritual. Check your inbox for your 10% welcome note.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-[#2A2724] border border-[#453F39] rounded-xl text-xs text-white placeholder:text-[#7A746E] focus:outline-hidden focus:border-[#C9B9A6]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#FAF7F2] text-[#1E1C1A] hover:bg-[#9C6B68] hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2] mb-3">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A69E95]">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  All Formulations
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'cat-serums')} className="hover:text-white transition-colors">
                  Serums & Actives
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'cat-cleansers')} className="hover:text-white transition-colors">
                  Gentle Cleansers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'cat-moisturizers')} className="hover:text-white transition-colors">
                  Barrier Creams
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'cat-body')} className="hover:text-white transition-colors">
                  Botanical Body Oils
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'cat-sun-protection')} className="hover:text-white transition-colors">
                  Invisible Mineral SPF
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Rituals & Help */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2] mb-3">
              Rituals & Support
            </h4>
            <ul className="space-y-2 text-xs text-[#A69E95]">
              <li>
                <button onClick={() => navigateTo('routine-builder')} className="hover:text-white transition-colors">
                  Custom Routine Builder
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-white transition-colors">
                  Track Your Package
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'Skin Barrier Care')} className="hover:text-white transition-colors">
                  Barrier Repair Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Delivery & Returns Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  FAQs & Skincare Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand & Dev */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2] mb-3">
              Boutique & Team
            </h4>
            <ul className="space-y-2 text-xs text-[#A69E95]">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Veloura
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-[#C9B9A6] hover:text-white transition-colors font-medium">
                  Staff Admin Dashboard
                </button>
              </li>
              {onOpenSchemaModal && (
                <li>
                  <button 
                    onClick={onOpenSchemaModal} 
                    className="flex items-center gap-1.5 text-[#C9B9A6] hover:text-white transition-colors"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>PostgreSQL DDL Schema</span>
                  </button>
                </li>
              )}
              <li className="pt-2 text-[11px] text-[#7A746E]">
                Lagos Studio: Victoria Island, Lagos, Nigeria
              </li>
              <li className="text-[11px] text-[#7A746E]">
                care@veloura.co
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2A2724] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A746E] gap-4">
        <p>© 2026 Veloura Skincare Ltd. All rights reserved. Beauty, thoughtfully curated.</p>
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo('about')} className="hover:text-white">Privacy Policy</button>
          <span>·</span>
          <button onClick={() => navigateTo('about')} className="hover:text-white">Terms of Ritual</button>
          <span>·</span>
          <span className="text-[#A69E95]">Prices in NGN (₦)</span>
        </div>
      </div>
    </footer>
  );
};
