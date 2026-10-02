import React, { useState } from 'react';
import { useStore, AppView } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, User as UserIcon, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartCount, 
    wishlist, 
    setIsCartDrawerOpen, 
    setSelectedCategoryFilter,
    setSelectedConcernFilter,
    searchQuery,
    setSearchQuery,
    currentUser,
    isAdmin,
    loginUser,
    logoutUser,
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNav = (view: AppView, catFilter: string | null = null, concernFilter: string | null = null) => {
    setSelectedCategoryFilter(catFilter);
    setSelectedConcernFilter(concernFilter);
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3DA]">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#1E1C1A] text-[#FAF7F2] text-[11px] font-medium tracking-wide py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span>Complimentary Nationwide Delivery on orders over ₦30,000</span>
        <span className="hidden sm:inline text-[#C9B9A6]">•</span>
        <span className="hidden sm:inline text-[#E8DFD8]">Formulated for Melanin & Sensitive Skin</span>
      </div>

      {/* Top Bar Contract (Zone 1: Wordmark, Zone 2: Links, Zone 3: Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-[#1E1C1A] hover:text-[#9C6B68] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => handleNav('home')} 
            className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-normal text-[#1E1C1A] hover:opacity-85 transition-opacity"
          >
            VELOURA
          </button>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wider uppercase text-[#1E1C1A]/80">
          <button
            onClick={() => handleNav('shop')}
            className={`hover:text-[#9C6B68] transition-colors relative py-1 ${
              currentView === 'shop' && !searchQuery ? 'text-[#9C6B68] font-semibold' : ''
            }`}
          >
            Shop All
          </button>
          <button
            onClick={() => handleNav('shop', null, 'Hydration & Dryness')}
            className="hover:text-[#9C6B68] transition-colors relative py-1"
          >
            Skin Concerns
          </button>
          <button
            onClick={() => handleNav('routine-builder')}
            className={`hover:text-[#9C6B68] transition-colors relative py-1 ${
              currentView === 'routine-builder' ? 'text-[#9C6B68] font-semibold' : ''
            }`}
          >
            Routine Rituals
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`hover:text-[#9C6B68] transition-colors relative py-1 ${
              currentView === 'about' ? 'text-[#9C6B68] font-semibold' : ''
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => handleNav('order-tracking')}
            className={`hover:text-[#9C6B68] transition-colors relative py-1 ${
              currentView === 'order-tracking' ? 'text-[#9C6B68] font-semibold' : ''
            }`}
          >
            Track Order
          </button>
        </nav>

        {/* Zone 3: Functional Interactive Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-[#1E1C1A] hover:text-[#9C6B68] transition-colors"
            aria-label="Search skincare products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => handleNav('wishlist')}
            className="p-2 text-[#1E1C1A] hover:text-[#9C6B68] transition-colors relative"
            aria-label="Saved products"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#9C6B68] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Account / Admin Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-2 text-[#1E1C1A] hover:text-[#9C6B68] transition-colors flex items-center gap-1"
              aria-label="User account menu"
            >
              {isAdmin ? (
                <ShieldCheck className="w-5 h-5 text-[#9C6B68]" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
            </button>

            {isUserMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EAE3DA] py-2 z-50 animate-in fade-in-50"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-[#F2ECE4]">
                  <p className="text-xs text-[#7A746E]">Signed in as</p>
                  <p className="text-sm font-semibold text-[#1E1C1A] truncate">
                    {currentUser?.name || 'Guest Shopper'}
                  </p>
                  <span className="inline-block mt-0.5 text-[10px] uppercase tracking-wider text-[#9C6B68] font-medium">
                    {currentUser?.role === 'admin' ? 'Staff Administrator' : 'Veloura Member'}
                  </span>
                </div>

                <button
                  onClick={() => handleNav('account')}
                  className="w-full text-left px-4 py-2 text-xs text-[#1E1C1A] hover:bg-[#FAF7F2] transition-colors"
                >
                  My Profile & Orders
                </button>
                <button
                  onClick={() => handleNav('wishlist')}
                  className="w-full text-left px-4 py-2 text-xs text-[#1E1C1A] hover:bg-[#FAF7F2] transition-colors"
                >
                  Saved Rituals ({wishlist.length})
                </button>
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full text-left px-4 py-2 text-xs text-[#9C6B68] font-semibold hover:bg-[#F9F4F0] flex items-center justify-between"
                >
                  <span>Admin Portal</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </button>

                <div className="border-t border-[#F2ECE4] mt-1 pt-1">
                  {currentUser ? (
                    <button
                      onClick={() => {
                        if (currentUser.role === 'customer') {
                          loginUser('admin@veloura.co', 'admin');
                        } else {
                          loginUser('amina.b@example.com', 'customer');
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#7A746E] hover:bg-[#FAF7F2]"
                    >
                      Switch to {currentUser.role === 'admin' ? 'Customer Mode' : 'Admin Mode'}
                    </button>
                  ) : (
                    <button
                      onClick={() => loginUser('amina.b@example.com', 'customer')}
                      className="w-full text-left px-4 py-2 text-xs text-[#1E1C1A] hover:bg-[#FAF7F2]"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="py-2 px-3 bg-[#1E1C1A] text-white hover:bg-[#9C6B68] rounded-xl flex items-center gap-2 text-xs font-medium transition-colors shadow-xs"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums font-semibold">{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Global Predictive Search Drawer */}
      {isSearchOpen && (
        <div className="bg-white border-b border-[#EAE3DA] px-4 py-4 sm:px-8 shadow-md animate-in slide-in-from-top-2">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-3 text-[#7A746E]" />
              <input
                type="text"
                placeholder="Search products, ingredients (hyaluronic, niacinamide), or concerns (dryness, acne)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-24 py-3 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl text-sm focus:outline-hidden focus:border-[#1E1C1A] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 px-3 py-1.5 bg-[#1E1C1A] text-white text-xs font-medium rounded-lg hover:bg-[#9C6B68] transition-colors"
              >
                Search
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#7A746E]">
              <span className="font-medium text-[#1E1C1A]">Popular:</span>
              {['Dryness', 'Barrier Cream', 'Hyaluronic', 'Niacinamide', 'Cloud Cleanser', 'SPF 50+'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    setCurrentView('shop');
                    setIsSearchOpen(false);
                  }}
                  className="px-2.5 py-1 bg-[#FAF7F2] hover:bg-[#EAE3DA] text-[#1E1C1A] rounded-md transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EAE3DA] px-6 py-6 space-y-4 animate-in slide-in-from-top-4 shadow-xl">
          <div className="space-y-3">
            <button
              onClick={() => handleNav('shop')}
              className="flex items-center justify-between w-full text-base font-serif font-medium text-[#1E1C1A] py-1 border-b border-[#F2ECE4]"
            >
              <span>Explore All Skincare</span>
              <ArrowRight className="w-4 h-4 text-[#7A746E]" />
            </button>
            <button
              onClick={() => handleNav('shop', null, 'Hydration & Dryness')}
              className="flex items-center justify-between w-full text-base font-serif font-medium text-[#1E1C1A] py-1 border-b border-[#F2ECE4]"
            >
              <span>Shop by Skin Concern</span>
              <ArrowRight className="w-4 h-4 text-[#7A746E]" />
            </button>
            <button
              onClick={() => handleNav('routine-builder')}
              className="flex items-center justify-between w-full text-base font-serif font-medium text-[#1E1C1A] py-1 border-b border-[#F2ECE4]"
            >
              <span>Custom Routine Builder</span>
              <ArrowRight className="w-4 h-4 text-[#7A746E]" />
            </button>
            <button
              onClick={() => handleNav('about')}
              className="flex items-center justify-between w-full text-base font-serif font-medium text-[#1E1C1A] py-1 border-b border-[#F2ECE4]"
            >
              <span>Our Philosophy & Ingredients</span>
              <ArrowRight className="w-4 h-4 text-[#7A746E]" />
            </button>
            <button
              onClick={() => handleNav('order-tracking')}
              className="flex items-center justify-between w-full text-base font-serif font-medium text-[#1E1C1A] py-1 border-b border-[#F2ECE4]"
            >
              <span>Track Your Order</span>
              <ArrowRight className="w-4 h-4 text-[#7A746E]" />
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="flex items-center justify-between w-full text-base font-serif font-medium text-[#9C6B68] py-1 border-b border-[#F2ECE4]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Staff Admin Dashboard
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#7A746E]">
            <span>Currency: Nigerian Naira (₦)</span>
            <span>Studio: Lagos, Nigeria</span>
          </div>
        </div>
      )}
    </header>
  );
};
