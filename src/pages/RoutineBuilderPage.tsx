import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SkinType, SkinConcern, Product } from '../types';
import { 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Check, 
  ArrowRight, 
  ShoppingBag, 
  RotateCcw 
} from 'lucide-react';

export const RoutineBuilderPage: React.FC = () => {
  const { products, addToCart, formatNaira, setIsCartDrawerOpen, applyPromoCode, navigateToProduct } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType>('Dry');
  const [selectedGoal, setSelectedGoal] = useState<SkinConcern>('Hydration & Dryness');

  const skinTypes: { type: SkinType; desc: string }[] = [
    { type: 'Dry', desc: 'Skin feels tight, flakes occasionally, or absorbs creams instantly' },
    { type: 'Combination', desc: 'Oily T-zone (forehead, nose) with normal or dry cheeks' },
    { type: 'Oily', desc: 'Excess sebum across face by midday, prone to enlarged pores' },
    { type: 'Sensitive', desc: 'Easily reactive, flushes red, prone to stinging with harsh actives' },
    { type: 'Normal', desc: 'Balanced moisture, rare breakouts, smooth overall barrier' },
  ];

  const goals: { goal: SkinConcern; title: string; desc: string }[] = [
    { goal: 'Hydration & Dryness', title: 'Deep Plumping Hydration', desc: 'Quench dehydrated layers and restore bounce' },
    { goal: 'Skin Barrier Care', title: 'Barrier Comfort & Recovery', desc: 'Strengthen depleted lipid mantle with ceramides' },
    { goal: 'Dullness & Radiance', title: 'Healthy Luminous Glow', desc: 'Restore vitality and soften lackluster tone' },
    { goal: 'Blemish & Oil Balance', title: 'Pore Clarifying & Sebum Balance', desc: 'Refine skin texture without flaking' },
    { goal: 'Sensitive & Redness', title: 'Calm & Redness Relief', desc: 'Gentle, soothing botanical comfort' },
  ];

  // Logic to curate 3 core products for AM and PM based on selections
  const cleanser = products.find(p => p.categoryId === 'cat-cleansers') || products[1];
  
  const serum = products.find(p => {
    if (selectedGoal === 'Blemish & Oil Balance') return p.slug === 'clarifying-elixir';
    if (selectedGoal === 'Sensitive & Redness') return p.slug === 'calming-mist' || p.slug === 'hydration-serum';
    return p.slug === 'hydration-serum';
  }) || products[0];

  const amProtection = products.find(p => p.slug === 'mineral-spf') || products[7];
  
  const pmMoisturizer = products.find(p => {
    if (selectedSkinType === 'Dry' || selectedGoal === 'Skin Barrier Care') return p.slug === 'ceramide-barrier-cream';
    if (selectedGoal === 'Dullness & Radiance') return p.slug === 'glow-body-oil' || p.slug === 'night-elixir';
    return p.slug === 'ceramide-barrier-cream';
  }) || products[2];

  const routineProducts = [cleanser, serum, amProtection, pmMoisturizer].filter(
    (item, index, self) => self.findIndex(i => i.id === item.id) === index
  );

  const bundleTotal = routineProducts.reduce((sum, p) => sum + (p.salePrice ?? p.price), 0);
  const bundleDiscounted = Math.round(bundleTotal * 0.85); // 15% bundle savings

  const handleAddEntireRoutine = () => {
    routineProducts.forEach(prod => {
      addToCart(prod, 1);
    });
    // Apply promo code automatically
    applyPromoCode('VELOURA10');
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EBE8] text-[#9C6B68] rounded-full text-xs font-semibold tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Ritual Matcher</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
          Build Your Everyday Ritual
        </h1>
        <p className="text-xs sm:text-sm text-[#7A746E] max-w-lg mx-auto leading-relaxed">
          Skincare should be thoughtful and simple. Answer 2 questions to generate your custom morning and evening skincare ritual.
        </p>
      </div>

      {/* Wizard Progress Stepper */}
      <div className="flex items-center justify-center gap-4 text-xs font-medium text-[#7A746E]">
        <button
          onClick={() => setStep(1)}
          className={`flex items-center gap-2 pb-1 border-b-2 transition-colors ${
            step === 1 ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold' : 'border-transparent'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E2D9CE] flex items-center justify-center text-[11px]">1</span>
          <span>Skin Type</span>
        </button>
        <span className="text-[#D9D0C7]">···</span>
        <button
          onClick={() => setStep(2)}
          className={`flex items-center gap-2 pb-1 border-b-2 transition-colors ${
            step === 2 ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold' : 'border-transparent'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E2D9CE] flex items-center justify-center text-[11px]">2</span>
          <span>Target Goal</span>
        </button>
        <span className="text-[#D9D0C7]">···</span>
        <button
          onClick={() => setStep(3)}
          className={`flex items-center gap-2 pb-1 border-b-2 transition-colors ${
            step === 3 ? 'border-[#1E1C1A] text-[#1E1C1A] font-semibold' : 'border-transparent'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E2D9CE] flex items-center justify-center text-[11px]">3</span>
          <span>Your Ritual</span>
        </button>
      </div>

      {/* Step 1: Skin Type */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="text-center">
            <h2 className="text-xl font-serif text-[#1E1C1A]">Step 1: What is your primary skin type?</h2>
            <p className="text-xs text-[#7A746E] mt-1">Select the option that best describes how your skin feels by midday.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skinTypes.map((item) => {
              const isSelected = selectedSkinType === item.type;
              return (
                <div
                  key={item.type}
                  onClick={() => setSelectedSkinType(item.type)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#1E1C1A] shadow-md ring-1 ring-[#1E1C1A]'
                      : 'bg-[#FAF7F2] border-[#E8E1D9] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-serif font-medium text-[#1E1C1A]">{item.type} Skin</h3>
                    {isSelected && <Check className="w-4 h-4 text-[#9C6B68]" />}
                  </div>
                  <p className="text-xs text-[#7A746E] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="py-3 px-6 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Continue to Target Concern</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Target Concern */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="text-center">
            <h2 className="text-xl font-serif text-[#1E1C1A]">Step 2: What is your main skincare focus?</h2>
            <p className="text-xs text-[#7A746E] mt-1">Choose what you would like to address over the next 4 to 6 weeks.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map((item) => {
              const isSelected = selectedGoal === item.goal;
              return (
                <div
                  key={item.goal}
                  onClick={() => setSelectedGoal(item.goal)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#1E1C1A] shadow-md ring-1 ring-[#1E1C1A]'
                      : 'bg-[#FAF7F2] border-[#E8E1D9] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-serif font-medium text-[#1E1C1A]">{item.title}</h3>
                    {isSelected && <Check className="w-4 h-4 text-[#9C6B68]" />}
                  </div>
                  <p className="text-xs text-[#7A746E] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="py-2.5 px-4 text-xs font-medium text-[#7A746E] hover:text-[#1E1C1A]"
            >
              ← Back to Skin Type
            </button>
            <button
              onClick={() => setStep(3)}
              className="py-3 px-6 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Generate My Ritual</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Prescribed Routine Result */}
      {step === 3 && (
        <div className="space-y-8 animate-in fade-in-50">
          {/* Prescription Header */}
          <div className="p-6 bg-white rounded-3xl border border-[#EAE3DA] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9C6B68] font-semibold uppercase tracking-wider">
                <span>Personalized Ritual</span>
                <span>·</span>
                <span>{selectedSkinType} Skin</span>
                <span>·</span>
                <span>{selectedGoal}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#1E1C1A] mt-1">
                Your Complete Morning & Evening Regimen
              </h2>
              <p className="text-xs text-[#7A746E] mt-1">
                3 synergistic formulations designed to balance, hydrate, and shield your barrier without irritation.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#7A746E] hover:text-[#9C6B68] flex items-center gap-1.5 shrink-0 underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Routine Matcher</span>
            </button>
          </div>

          {/* AM & PM Breakdown Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AM Routine */}
            <div className="p-5 bg-white rounded-3xl border border-[#EAE3DA] space-y-4">
              <div className="flex items-center gap-2 text-amber-700 pb-2 border-b border-[#F2ECE4]">
                <Sun className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Morning Ritual (AM)</h3>
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] flex gap-3">
                  <img
                    src={cleanser.images[0].url}
                    alt={cleanser.name}
                    className="w-14 h-14 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase font-semibold">Step 1 · Cleanse</span>
                    <h4 
                      onClick={() => navigateToProduct(cleanser.slug)}
                      className="text-xs font-serif font-medium text-[#1E1C1A] hover:text-[#9C6B68] cursor-pointer"
                    >
                      {cleanser.name}
                    </h4>
                    <p className="text-[11px] text-[#7A746E] mt-0.5">Gentle amino-acid wash with lukewarm water.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] flex gap-3">
                  <img
                    src={serum.images[0].url}
                    alt={serum.name}
                    className="w-14 h-14 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase font-semibold">Step 2 · Treat & Plump</span>
                    <h4 
                      onClick={() => navigateToProduct(serum.slug)}
                      className="text-xs font-serif font-medium text-[#1E1C1A] hover:text-[#9C6B68] cursor-pointer"
                    >
                      {serum.name}
                    </h4>
                    <p className="text-[11px] text-[#7A746E] mt-0.5">Press 3-4 drops onto damp skin.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] flex gap-3">
                  <img
                    src={amProtection.images[0].url}
                    alt={amProtection.name}
                    className="w-14 h-14 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase font-semibold">Step 3 · Protect</span>
                    <h4 
                      onClick={() => navigateToProduct(amProtection.slug)}
                      className="text-xs font-serif font-medium text-[#1E1C1A] hover:text-[#9C6B68] cursor-pointer"
                    >
                      {amProtection.name}
                    </h4>
                    <p className="text-[11px] text-[#7A746E] mt-0.5">Two finger lengths for all-day invisible SPF 50+.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PM Routine */}
            <div className="p-5 bg-white rounded-3xl border border-[#EAE3DA] space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 pb-2 border-b border-[#F2ECE4]">
                <Moon className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Evening Ritual (PM)</h3>
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] flex gap-3">
                  <img
                    src={cleanser.images[0].url}
                    alt={cleanser.name}
                    className="w-14 h-14 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase font-semibold">Step 1 · Purify</span>
                    <h4 
                      onClick={() => navigateToProduct(cleanser.slug)}
                      className="text-xs font-serif font-medium text-[#1E1C1A] hover:text-[#9C6B68] cursor-pointer"
                    >
                      {cleanser.name}
                    </h4>
                    <p className="text-[11px] text-[#7A746E] mt-0.5">Remove daily sunscreen, pollution, and makeup residue.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] flex gap-3">
                  <img
                    src={serum.images[0].url}
                    alt={serum.name}
                    className="w-14 h-14 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase font-semibold">Step 2 · Repair</span>
                    <h4 
                      onClick={() => navigateToProduct(serum.slug)}
                      className="text-xs font-serif font-medium text-[#1E1C1A] hover:text-[#9C6B68] cursor-pointer"
                    >
                      {serum.name}
                    </h4>
                    <p className="text-[11px] text-[#7A746E] mt-0.5">Replenish cellular hydration overnight.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] flex gap-3">
                  <img
                    src={pmMoisturizer.images[0].url}
                    alt={pmMoisturizer.name}
                    className="w-14 h-14 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#7A746E] uppercase font-semibold">Step 3 · Seal & Fortify</span>
                    <h4 
                      onClick={() => navigateToProduct(pmMoisturizer.slug)}
                      className="text-xs font-serif font-medium text-[#1E1C1A] hover:text-[#9C6B68] cursor-pointer"
                    >
                      {pmMoisturizer.name}
                    </h4>
                    <p className="text-[11px] text-[#7A746E] mt-0.5">Ceramides lock moisture and prevent nocturnal water loss.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle Add to Bag Card */}
          <div className="p-6 bg-[#1E1C1A] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#C9B9A6] font-semibold">
                Complete Ritual Bundle (15% Bundle Discount Included)
              </span>
              <h3 className="text-xl font-serif text-[#FAF7F2]">
                Add Full 3-Step Ritual to Bag
              </h3>
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="text-xl font-semibold tabular-nums text-white">
                  {formatNaira(bundleDiscounted)}
                </span>
                <span className="text-xs text-[#A69E95] line-through tabular-nums">
                  {formatNaira(bundleTotal)}
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  Save {formatNaira(bundleTotal - bundleDiscounted)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddEntireRoutine}
              className="w-full sm:w-auto py-3.5 px-8 bg-[#FAF7F2] hover:bg-[#9C6B68] hover:text-white text-[#1E1C1A] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Entire Ritual to Bag</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
