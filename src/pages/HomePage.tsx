import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  HERO_IMAGE, 
  SERUM_IMAGE, 
  CLEANSER_IMAGE, 
  BARRIER_CREAM_IMAGE 
} from '../data/seedData';
import { 
  ArrowRight, 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  Sun, 
  Flower2, 
  Star, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { SkinConcern } from '../types';

export const HomePage: React.FC = () => {
  const { 
    products, 
    categories, 
    setCurrentView, 
    setSelectedCategoryFilter, 
    setSelectedConcernFilter,
    navigateToProduct,
  } = useStore();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.badge === 'Best Seller' || p.rating >= 4.8).slice(0, 4);

  const concernsList: { title: SkinConcern; desc: string; icon: any }[] = [
    { title: 'Hydration & Dryness', desc: 'Replenish moisture with multi-molecular hyaluronic acid', icon: Droplet },
    { title: 'Skin Barrier Care', desc: 'Ceramide 3:1:1 complex to comfort and rebuild resilience', icon: ShieldCheck },
    { title: 'Blemish & Oil Balance', desc: 'Clarifying niacinamide & zinc for clear, smooth texture', icon: Flower2 },
    { title: 'Dullness & Radiance', desc: 'Antioxidants & botanical squalane for luminous glow', icon: Sparkles },
    { title: 'Sensitive & Redness', desc: 'Centella and chamomile to soothe reactivity', icon: Flower2 },
    { title: 'Uneven Tone', desc: 'Melanin-safe gentle brighteners that restore balance', icon: Sun },
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setSelectedConcernFilter(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConcernClick = (concern: SkinConcern) => {
    setSelectedConcernFilter(concern);
    setSelectedCategoryFilter(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Quiet Kicker (Zero-Pill Discipline) */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-widest text-[#7A746E]">
                <span>Formulated in Lagos</span>
                <span aria-hidden="true">·</span>
                <span>Clean Botanical Science</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#1E1C1A] leading-[1.15] text-balance">
                Beauty, thoughtfully <span className="italic font-normal">curated.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#7A746E] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover skincare and beauty essentials designed to become part of your everyday ritual. Restorative lipid formulas crafted to nourish melanin-rich, sensitive, and dry skin.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter(null);
                    setSelectedConcernFilter(null);
                    setCurrentView('shop');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setCurrentView('routine-builder')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#1E1C1A] border border-[#E2D9CE] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#9C6B68]" />
                  <span>Build Routine</span>
                </button>
              </div>

              {/* Trust Metric Row */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#7A746E]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8EB897]" />
                  <span>Zero White Cast</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8EB897]" />
                  <span>Dermatologist Approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8EB897]" />
                  <span>Complimentary Shipping</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-[#EAE3DA] bg-[#F4EFEA]">
                <img
                  src={HERO_IMAGE}
                  alt="Veloura Skincare everyday beauty ritual"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white max-w-sm">
                    <span className="text-[10px] uppercase tracking-widest text-[#E8DFD8]">
                      Featured Formulation
                    </span>
                    <h2 className="text-lg sm:text-xl font-serif text-white mt-1">
                      Veloura Golden Squalane Glow Body Oil
                    </h2>
                    <p className="text-xs text-white/80 mt-1 line-clamp-2">
                      Cold-pressed African marula and sugarcane squalane for 24-hour supple radiance.
                    </p>
                    <button
                      onClick={() => navigateToProduct('glow-body-oil')}
                      className="mt-3 text-xs font-semibold text-[#FAF7F2] underline hover:text-[#C9B9A6] flex items-center gap-1"
                    >
                      <span>Explore Formulation</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#EAE3DA]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7A746E] block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#1E1C1A]">
              Explore by Product Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              setCurrentView('shop');
            }}
            className="text-xs font-semibold text-[#9C6B68] hover:text-[#1E1C1A] mt-2 sm:mt-0 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group cursor-pointer bg-white rounded-2xl p-3 border border-[#EAE3DA] hover:border-[#1E1C1A] transition-all hover:shadow-md"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] mb-3">
                <img
                  src={cat.imageUrl || HERO_IMAGE}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-serif font-medium text-[#1E1C1A] text-center group-hover:text-[#9C6B68] transition-colors">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY SKIN CONCERN */}
      <section className="bg-white py-14 sm:py-20 border-y border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#7A746E] block mb-1">
              Targeted Skincare
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
              Shop by Skin Concern
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-2 leading-relaxed">
              Find formulas specifically paired to comfort, hydrate, clarify, and protect your skin’s individual needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {concernsList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onClick={() => handleConcernClick(item.title)}
                  className="p-5 bg-[#FAF7F2] hover:bg-[#F4EBE8] rounded-2xl border border-[#E8E1D9] hover:border-[#9C6B68] transition-all cursor-pointer group flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9C6B68] shadow-xs shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-serif font-medium text-[#1E1C1A] group-hover:text-[#9C6B68] transition-colors">
                        {item.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-[#7A746E] group-hover:text-[#9C6B68] transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-[#7A746E] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#EAE3DA]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7A746E] block mb-1">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1E1C1A]">
              Bestselling Formulations
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              setSelectedConcernFilter(null);
              setCurrentView('shop');
            }}
            className="text-xs font-semibold text-[#9C6B68] hover:text-[#1E1C1A] mt-2 sm:mt-0 flex items-center gap-1 group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. BRAND PHILOSOPHY / STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#EAE3DA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#9C6B68] font-semibold">
                Our Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A] leading-tight">
                Skincare for your everyday ritual.
              </h2>
              <p className="text-xs sm:text-sm text-[#7A746E] leading-relaxed">
                Veloura brings together thoughtfully selected beauty essentials designed to make everyday skincare feel simple, enjoyable, and intentional.
              </p>
              <p className="text-xs sm:text-sm text-[#7A746E] leading-relaxed">
                We reject 10-step complexity in favor of biocompatible lipid repair: cleansers that preserve your mantle, serums with multi-molecular weight hydration, and daily mineral SPF tested to leave zero residue on rich skin tones.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('about')}
                  className="text-xs font-semibold text-[#1E1C1A] hover:text-[#9C6B68] underline flex items-center gap-1"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-4/5 bg-[#F0EAE1]">
                <img
                  src={CLEANSER_IMAGE}
                  alt="Pure whipped foam texture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-4/5 bg-[#F0EAE1] mt-6">
                <img
                  src={SERUM_IMAGE}
                  alt="Amber bottle droplet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROUTINE BUILDER CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E1C1A] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9B9A6] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9B9A6]" />
              Interactive Skincare Matcher
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2]">
              Unsure which formulations suit your skin?
            </h2>
            <p className="text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
              Take our 60-second skincare ritual builder. Choose your skin type and priority concern to unlock a personalized AM & PM ritual with bundle savings.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView('routine-builder')}
                className="px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#9C6B68] hover:text-white text-[#1E1C1A] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
              >
                <span>Build Your Routine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS & PRAISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#7A746E] block mb-1">
            Real Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1E1C1A]">
            Loved by Daily Ritualists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#EAE3DA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1 text-[#C7995A] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h3 className="text-sm font-serif font-medium text-[#1E1C1A] mb-2">
                "The only serum that quenched my dry Lagos skin"
              </h3>
              <p className="text-xs text-[#7A746E] leading-relaxed">
                Between the dry air conditioning and humidity, my skin was flaky. After 4 days with the Hydration Serum, my face feels bouncy and plump all day without being greasy.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E1C1A]">Amina B. · Lagos</span>
              <span className="text-[10px] text-emerald-700 font-medium">Verified Buyer</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EAE3DA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1 text-[#C7995A] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h3 className="text-sm font-serif font-medium text-[#1E1C1A] mb-2">
                "Finally an SPF with ZERO white cast!"
              </h3>
              <p className="text-xs text-[#7A746E] leading-relaxed">
                As a dark-skinned woman in Abuja, finding a mineral sunscreen that does not look purple is rare. This blends in 10 seconds into a warm natural glow.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E1C1A]">Zainab M. · Abuja</span>
              <span className="text-[10px] text-emerald-700 font-medium">Verified Buyer</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EAE3DA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1 text-[#C7995A] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h3 className="text-sm font-serif font-medium text-[#1E1C1A] mb-2">
                "Restored my damaged moisture barrier in 48 hours"
              </h3>
              <p className="text-xs text-[#7A746E] leading-relaxed">
                I over-exfoliated and my cheeks were burning and red. The Ceramide Barrier Cream felt like a soothing velvet blanket. Worth every kobo.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E1C1A]">Kemi A. · Port Harcourt</span>
              <span className="text-[10px] text-emerald-700 font-medium">Verified Buyer</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
