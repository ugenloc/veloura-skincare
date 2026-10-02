import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { FilterSheet } from '../components/FilterSheet';
import { SkinConcern, SkinType } from '../types';
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles } from 'lucide-react';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'best-selling' | 'rating';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    categories, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter,
    selectedConcernFilter,
    setSelectedConcernFilter,
    searchQuery,
    setSearchQuery,
    formatNaira,
  } = useStore();

  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategoryFilter && product.categoryId !== selectedCategoryFilter) {
        return false;
      }

      // Concern filter
      if (selectedConcernFilter && !product.concerns.includes(selectedConcernFilter as SkinConcern)) {
        return false;
      }

      // Skin type filter
      if (selectedSkinType && !product.skinTypes.includes(selectedSkinType)) {
        return false;
      }

      // In stock filter
      if (inStockOnly && product.stockQuantity <= 0) {
        return false;
      }

      // Price filter
      const effectivePrice = product.salePrice ?? product.price;
      if (effectivePrice > maxPrice) {
        return false;
      }

      // Search Query filter (matches name, description, ingredients, concerns, category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q) || product.shortDescription.toLowerCase().includes(q);
        const matchesIngredients = product.ingredients.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesConcern = product.concerns.some(c => c.toLowerCase().includes(q));

        if (!matchesName && !matchesDesc && !matchesIngredients && !matchesCat && !matchesConcern) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'best-selling') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === 'newest') return (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategoryFilter, selectedConcernFilter, selectedSkinType, inStockOnly, maxPrice, searchQuery, sortBy]);

  const activeFiltersCount = [
    selectedCategoryFilter !== null,
    selectedConcernFilter !== null,
    selectedSkinType !== null,
    inStockOnly,
    maxPrice < 30000,
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSelectedCategoryFilter(null);
    setSelectedConcernFilter(null);
    setSelectedSkinType(null);
    setInStockOnly(false);
    setMaxPrice(30000);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Editorial Title & Search Header */}
      <div className="border-b border-[#EAE3DA] pb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A746E] mb-1">
              <span>Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Clean Lipid Essentials</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
              The Skincare Collection
            </h1>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-1 max-w-xl">
              Nourishing, pH-balanced formulas designed for everyday skin barrier restoration.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#7A746E]" />
            <input
              type="text"
              placeholder="Filter by ingredient, concern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E2D9CE] rounded-xl text-xs focus:outline-hidden focus:border-[#1E1C1A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Segmented Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          <button
            onClick={() => setSelectedCategoryFilter(null)}
            className={`px-4 py-2 text-xs rounded-xl whitespace-nowrap transition-colors border ${
              selectedCategoryFilter === null
                ? 'bg-[#1E1C1A] text-white border-[#1E1C1A] font-medium'
                : 'bg-white text-[#1E1C1A] border-[#E8E1D9] hover:bg-[#F6F2EC]'
            }`}
          >
            All Formulations ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter(p => p.categoryId === cat.id).length;
            const isSelected = selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(isSelected ? null : cat.id)}
                className={`px-4 py-2 text-xs rounded-xl whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-[#1E1C1A] text-white border-[#1E1C1A] font-medium'
                    : 'bg-white text-[#1E1C1A] border-[#E8E1D9] hover:bg-[#F6F2EC]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Filter Trigger, Results Count & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterSheetOpen(true)}
            className="py-2 px-3.5 bg-white border border-[#E2D9CE] hover:border-[#1E1C1A] rounded-xl flex items-center gap-2 text-xs font-medium text-[#1E1C1A] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#7A746E]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#9C6B68] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Active Filter Chips / Clear */}
          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-[#7A746E] hover:text-[#9C6B68] underline text-xs"
            >
              Reset ({activeFiltersCount})
            </button>
          )}

          {selectedConcernFilter && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EBE8] text-[#9C6B68] rounded-lg text-xs font-medium">
              <span>Concern: {selectedConcernFilter}</span>
              <button onClick={() => setSelectedConcernFilter(null)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {/* Right: Count & Sort Dropdown */}
        <div className="flex items-center gap-4">
          <span className="text-[#7A746E] hidden sm:inline tabular-nums">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#7A746E]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-[#E2D9CE] rounded-xl py-2 px-3 text-xs text-[#1E1C1A] focus:outline-hidden focus:border-[#1E1C1A] cursor-pointer"
            >
              <option value="featured">Sort: Curated Featured</option>
              <option value="best-selling">Sort: Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 sm:p-16 bg-white rounded-3xl border border-[#EAE3DA] text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#9C6B68] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-serif text-[#1E1C1A]">
            We couldn't find matching formulations
          </h3>
          <p className="text-xs text-[#7A746E] leading-relaxed">
            No products match your current search terms or filter combinations. Try clearing some filters or searching for ingredients like "hyaluronic" or "squalane".
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="py-2.5 px-6 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Clear All Filters & Search
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Filter Bottom Sheet (Shared across mobile & desktop) */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        categories={categories}
        selectedCategory={selectedCategoryFilter}
        onSelectCategory={setSelectedCategoryFilter}
        selectedConcern={selectedConcernFilter}
        onSelectConcern={setSelectedConcernFilter}
        selectedSkinType={selectedSkinType}
        onSelectSkinType={setSelectedSkinType}
        inStockOnly={inStockOnly}
        onToggleInStock={() => setInStockOnly(!inStockOnly)}
        maxPrice={maxPrice}
        onChangeMaxPrice={setMaxPrice}
        onReset={handleResetFilters}
        formatNaira={formatNaira}
      />
    </div>
  );
};
