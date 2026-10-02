import React from 'react';
import { useStore, AppView } from '../context/StoreContext';
import { Home, Sparkles, Heart, ShoppingBag, Grid } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartCount, 
    wishlist, 
    setIsCartDrawerOpen,
    setSelectedCategoryFilter,
    setSelectedConcernFilter,
  } = useStore();

  const handleTab = (view: AppView) => {
    if (view === 'shop') {
      setSelectedCategoryFilter(null);
      setSelectedConcernFilter(null);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE3DA] px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
        {/* Tab 1: Home */}
        <button
          onClick={() => handleTab('home')}
          className="min-h-[44px] flex flex-col items-center justify-center text-center transition-colors relative"
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'text-[#9C6B68]' : 'text-[#7A746E]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 font-medium ${
            currentView === 'home' ? 'text-[#9C6B68] font-semibold' : 'text-[#7A746E]'
          }`}>
            Home
          </span>
        </button>

        {/* Tab 2: Shop */}
        <button
          onClick={() => handleTab('shop')}
          className="min-h-[44px] flex flex-col items-center justify-center text-center transition-colors relative"
          aria-label="Shop"
        >
          <Grid className={`w-5 h-5 ${currentView === 'shop' ? 'text-[#9C6B68]' : 'text-[#7A746E]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 font-medium ${
            currentView === 'shop' ? 'text-[#9C6B68] font-semibold' : 'text-[#7A746E]'
          }`}>
            Shop
          </span>
        </button>

        {/* Tab 3: Routine Builder */}
        <button
          onClick={() => handleTab('routine-builder')}
          className="min-h-[44px] flex flex-col items-center justify-center text-center transition-colors relative"
          aria-label="Ritual Builder"
        >
          <Sparkles className={`w-5 h-5 ${currentView === 'routine-builder' ? 'text-[#9C6B68]' : 'text-[#7A746E]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 font-medium ${
            currentView === 'routine-builder' ? 'text-[#9C6B68] font-semibold' : 'text-[#7A746E]'
          }`}>
            Ritual
          </span>
        </button>

        {/* Tab 4: Wishlist */}
        <button
          onClick={() => handleTab('wishlist')}
          className="min-h-[44px] flex flex-col items-center justify-center text-center transition-colors relative"
          aria-label={`Wishlist with ${wishlist.length} saved products`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${currentView === 'wishlist' ? 'text-[#9C6B68] fill-[#9C6B68]' : 'text-[#7A746E]'}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 min-w-[14px] h-[14px] bg-[#9C6B68] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className={`text-[10px] tracking-tight mt-1 font-medium ${
            currentView === 'wishlist' ? 'text-[#9C6B68] font-semibold' : 'text-[#7A746E]'
          }`}>
            Saved
          </span>
        </button>

        {/* Tab 5: Bag */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="min-h-[44px] flex flex-col items-center justify-center text-center transition-colors relative"
          aria-label={`Shopping Bag with ${cartCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#1E1C1A]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 min-w-[14px] h-[14px] bg-[#1E1C1A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 font-semibold text-[#1E1C1A]">
            Bag
          </span>
        </button>
      </div>
    </nav>
  );
};
