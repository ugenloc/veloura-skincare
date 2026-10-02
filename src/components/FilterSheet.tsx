import React from 'react';
import { SkinConcern, SkinType } from '../types';
import { X, Check } from 'lucide-react';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { id: string; name: string }[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  selectedConcern: string | null;
  onSelectConcern: (concern: string | null) => void;
  selectedSkinType: SkinType | null;
  onSelectSkinType: (type: SkinType | null) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  maxPrice: number;
  onChangeMaxPrice: (price: number) => void;
  onReset: () => void;
  formatNaira: (val: number) => string;
}

const CONCERNS: SkinConcern[] = [
  'Hydration & Dryness',
  'Skin Barrier Care',
  'Blemish & Oil Balance',
  'Dullness & Radiance',
  'Sensitive & Redness',
  'Uneven Tone',
];

const SKIN_TYPES: SkinType[] = ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'];

export const FilterSheet: React.FC<FilterSheetProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  selectedConcern,
  onSelectConcern,
  selectedSkinType,
  onSelectSkinType,
  inStockOnly,
  onToggleInStock,
  maxPrice,
  onChangeMaxPrice,
  onReset,
  formatNaira,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 md:inset-x-0 md:bottom-0 md:top-auto md:max-h-[85vh]">
        <div className="w-screen max-w-md md:max-w-xl md:mx-auto bg-white rounded-t-3xl md:rounded-b-none shadow-2xl flex flex-col border border-[#EAE3DA]">
          {/* Grab Handle on mobile */}
          <div className="w-10 h-1.5 bg-[#D9D0C7] rounded-full mx-auto my-3 md:hidden" />

          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE3DA] flex items-center justify-between">
            <h3 className="text-base font-serif font-medium text-[#1E1C1A]">
              Filter Skincare Rituals
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={onReset}
                className="text-xs text-[#7A746E] hover:text-[#9C6B68] underline"
              >
                Reset All
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Category Segmented Controls */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] mb-2.5">
                Product Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onSelectCategory(null)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selectedCategory === null
                      ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
                      : 'bg-[#FAF7F2] text-[#1E1C1A] border-[#E8E1D9] hover:bg-[#EFE8DF]'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(selectedCategory === cat.id ? null : cat.id)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                      selectedCategory === cat.id
                        ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
                        : 'bg-[#FAF7F2] text-[#1E1C1A] border-[#E8E1D9] hover:bg-[#EFE8DF]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Skin Concern */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] mb-2.5">
                Target Skin Concern
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CONCERNS.map((concern) => {
                  const isSelected = selectedConcern === concern;
                  return (
                    <button
                      key={concern}
                      onClick={() => onSelectConcern(isSelected ? null : concern)}
                      className={`p-2.5 text-left text-xs rounded-xl border flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#F4EBE8] text-[#9C6B68] border-[#9C6B68] font-medium'
                          : 'bg-[#FAF7F2] text-[#1E1C1A] border-[#E8E1D9] hover:bg-[#EFE8DF]'
                      }`}
                    >
                      <span className="truncate">{concern}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#9C6B68] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skin Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] mb-2.5">
                Skin Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SKIN_TYPES.map((type) => {
                  const isSelected = selectedSkinType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => onSelectSkinType(isSelected ? null : type)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
                          : 'bg-[#FAF7F2] text-[#1E1C1A] border-[#E8E1D9] hover:bg-[#EFE8DF]'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1C1A]">
                  Maximum Price
                </label>
                <span className="text-xs font-bold text-[#1E1C1A] tabular-nums">
                  Up to {formatNaira(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="30000"
                step="1000"
                value={maxPrice}
                onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1E1C1A] h-1.5 bg-[#E8E1D9] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7A746E] mt-1 tabular-nums">
                <span>₦10,000</span>
                <span>₦30,000</span>
              </div>
            </div>

            {/* Availability Checkbox */}
            <div className="pt-2 border-t border-[#F2ECE4]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={onToggleInStock}
                  className="w-4 h-4 rounded-sm border-[#D9D0C7] text-[#1E1C1A] focus:ring-0"
                />
                <span className="text-xs font-medium text-[#1E1C1A]">
                  Show In-Stock products only
                </span>
              </label>
            </div>
          </div>

          {/* Sticky Bottom Confirmation */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#EAE3DA]">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
