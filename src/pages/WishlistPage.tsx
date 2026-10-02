import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setCurrentView } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-[#EAE3DA] pb-6 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#9C6B68] font-semibold">
            Saved Formulations
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A] mt-1">
            Your Skincare Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#7A746E] mt-1">
            Curate products you love and move them directly to your bag whenever you are ready.
          </p>
        </div>

        <span className="text-xs font-semibold text-[#7A746E]">
          {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="p-12 sm:p-16 bg-white rounded-3xl border border-[#EAE3DA] text-center max-w-md mx-auto space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#9C6B68] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-serif text-[#1E1C1A]">Save products you love</h3>
          <p className="text-xs text-[#7A746E] leading-relaxed">
            Click the heart icon on any formulation to save it here for later reference or reordering.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentView('shop')}
              className="py-3 px-6 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Start Exploring Products
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
