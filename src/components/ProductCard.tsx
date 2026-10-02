import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateToProduct, addToCart, isInWishlist, toggleWishlist, formatNaira } = useStore();
  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url;
  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#EAE3DA] transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Product Image Slot */}
      <div 
        onClick={() => navigateToProduct(product.slug)}
        className="relative aspect-4/3 w-full bg-[#F6F2EC] overflow-hidden cursor-pointer"
      >
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[10px] tracking-wider uppercase font-semibold text-[#1E1C1A] border border-[#E8E1D9] rounded-md shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors backdrop-blur-xs shadow-xs ${
            isFavorited 
              ? 'bg-[#1E1C1A] text-[#FAF7F2]' 
              : 'bg-white/80 text-[#7A746E] hover:text-[#1E1C1A] hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-[#9C6B68]' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#1E1C1A] px-3 py-1 bg-white border border-[#E8E1D9] rounded">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#7A746E] tracking-wider uppercase mb-1">
            <span>{product.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{product.size}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateToProduct(product.slug)}
            className="text-base font-serif font-medium text-[#1E1C1A] line-clamp-1 cursor-pointer hover:text-[#9C6B68] transition-colors"
          >
            {product.name}
          </h3>

          {/* Short Descriptor */}
          <p className="text-xs text-[#7A746E] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-3 mt-2 border-t border-[#F2ECE4]">
          {/* Reviews & Pricing Row */}
          <div className="flex items-center justify-between mb-3">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[#1E1C1A] tabular-nums">
                {formatNaira(product.salePrice ?? product.price)}
              </span>
              {product.salePrice && (
                <span className="text-xs text-[#7A746E] line-through tabular-nums">
                  {formatNaira(product.price)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs text-[#7A746E]">
              <Star className="w-3.5 h-3.5 fill-[#C7995A] text-[#C7995A]" />
              <span className="font-medium text-[#1E1C1A]">{product.rating}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateToProduct(product.slug)}
              className="py-2 px-3 text-xs font-medium text-[#1E1C1A] bg-[#FAF7F2] hover:bg-[#EFE8DF] border border-[#E2D9CE] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-[#1E1C1A] hover:bg-[#9C6B68] text-white shadow-xs'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
