import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  ChevronRight, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Check, 
  Share2, 
  Droplet, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  MessageSquarePlus, 
  X 
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    products, 
    selectedProductSlug, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    formatNaira, 
    reviews, 
    addReview,
    setCurrentView,
    setSelectedCategoryFilter,
  } = useStore();

  const product = products.find(p => p.slug === selectedProductSlug) || products[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<'desc' | 'benefits' | 'howTo' | 'ingredients' | 'skinTypes'>('desc');
  
  // Review Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stockQuantity <= 0;
  const effectivePrice = product.salePrice ?? product.price;

  const productReviews = reviews.filter(r => r.productId === product.id && r.status === 'approved');
  const relatedProducts = products.filter(p => p.id !== product.id && (p.categoryId === product.categoryId || p.concerns.some(c => product.concerns.includes(c)))).slice(0, 3);

  const toggleSection = (section: 'desc' | 'benefits' | 'howTo' | 'ingredients' | 'skinTypes') => {
    setExpandedSection(expandedSection === section ? 'desc' : section);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewContent.trim()) return;

    addReview(product.id, {
      userName: reviewName,
      userEmail: reviewEmail || 'shopper@example.com',
      rating: reviewRating,
      title: reviewTitle || 'My Experience with this ritual',
      content: reviewContent,
    });

    setIsReviewModalOpen(false);
    setReviewName('');
    setReviewEmail('');
    setReviewTitle('');
    setReviewContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#7A746E]">
        <button onClick={() => setCurrentView('home')} className="hover:text-[#1E1C1A]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setCurrentView('shop')} className="hover:text-[#1E1C1A]">
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => {
            setSelectedCategoryFilter(product.categoryId);
            setCurrentView('shop');
          }} 
          className="hover:text-[#1E1C1A]"
        >
          {product.categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1E1C1A] truncate max-w-xs font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Contiguous Purchase Module) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery Column (Desktop Sticky) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Large Main Photography */}
          <div className="relative aspect-4/3 sm:aspect-1/1 w-full bg-[#F6F2EC] rounded-3xl overflow-hidden border border-[#EAE3DA]">
            <img
              src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
              alt={product.images[selectedImageIndex]?.alt || product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-[11px] font-semibold tracking-wider uppercase text-[#1E1C1A] rounded-lg shadow-xs border border-[#E8E1D9]">
                {product.badge}
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-colors backdrop-blur-xs shadow-xs ${
                isFavorited 
                  ? 'bg-[#1E1C1A] text-white' 
                  : 'bg-white/80 text-[#7A746E] hover:text-[#1E1C1A] hover:bg-white'
              }`}
              aria-label="Save to wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#9C6B68] text-[#9C6B68]' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#F6F2EC] ${
                    selectedImageIndex === idx ? 'border-[#1E1C1A]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Information Module */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7A746E] uppercase tracking-wider mb-1">
              <span>{product.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{product.size}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif text-[#1E1C1A] leading-snug">
              {product.name}
            </h1>

            {/* Rating & Reviews anchor */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1 text-[#C7995A]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="font-semibold text-[#1E1C1A] ml-1">{product.rating}</span>
              </div>
              <span className="text-[#7A746E]">·</span>
              <a href="#reviews" className="text-[#7A746E] hover:text-[#9C6B68] underline">
                {product.reviewCount} customer reviews
              </a>
            </div>
          </div>

          {/* Price & Stock Display */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE3DA] flex items-center justify-between">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-serif font-semibold text-[#1E1C1A] tabular-nums">
                {formatNaira(effectivePrice)}
              </span>
              {product.salePrice && (
                <span className="text-sm text-[#7A746E] line-through tabular-nums">
                  {formatNaira(product.price)}
                </span>
              )}
            </div>

            <div>
              {product.stockQuantity > 0 ? (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock ({product.stockQuantity} available)
                </span>
              ) : (
                <span className="text-xs text-red-600 font-semibold">
                  Temporarily Sold Out
                </span>
              )}
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#7A746E] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quantity Selector & Add to Bag CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#E2D9CE] rounded-xl bg-white px-2 py-1.5 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-gray-600 hover:text-black"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[#1E1C1A] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="p-1.5 text-gray-600 hover:text-black"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={isOutOfStock}
                className={`flex-1 py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#1E1C1A] hover:bg-[#9C6B68] text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity > 1 ? `(${quantity})` : ''} to Bag — {formatNaira(effectivePrice * quantity)}</span>
              </button>
            </div>

            {/* Delivery & Assurance markers */}
            <div className="p-3 bg-white rounded-xl border border-[#EAE3DA] text-[11px] text-[#7A746E] space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complimentary tracked delivery on orders above ₦30,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fresh studio-bottled batch · Formulated for sensitive & melanin skin</span>
              </div>
            </div>
          </div>

          {/* Structured Accordions (PRD Section 13) */}
          <div className="divide-y divide-[#EAE3DA] border-y border-[#EAE3DA] text-xs">
            {/* 1. Full Description */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('desc')}
                className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#1E1C1A]"
              >
                <span>The Ritual & Description</span>
                {expandedSection === 'desc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'desc' && (
                <p className="mt-3 text-[#7A746E] leading-relaxed text-xs">
                  {product.description}
                </p>
              )}
            </div>

            {/* 2. Key Benefits */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('benefits')}
                className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#1E1C1A]"
              >
                <span>Key Skin Benefits</span>
                {expandedSection === 'benefits' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'benefits' && (
                <ul className="mt-3 space-y-2 text-[#7A746E]">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9C6B68] mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3. How to Use */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('howTo')}
                className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#1E1C1A]"
              >
                <span>How to Use</span>
                {expandedSection === 'howTo' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'howTo' && (
                <div className="mt-3 text-[#7A746E] space-y-2">
                  <p className="leading-relaxed">{product.howToUse}</p>
                  <p className="text-[11px] text-[#9C6B68] font-medium">
                    Pro-tip: Apply onto slightly damp skin to maximize moisture locking.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Ingredients */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('ingredients')}
                className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#1E1C1A]"
              >
                <span>Full Botanical & Active Ingredients</span>
                {expandedSection === 'ingredients' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'ingredients' && (
                <p className="mt-3 text-[#7A746E] leading-relaxed font-mono text-[11px] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E1D9]">
                  {product.ingredients}
                </p>
              )}
            </div>

            {/* 5. Suitable Skin Types & Texture */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('skinTypes')}
                className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#1E1C1A]"
              >
                <span>Skin Types & Texture</span>
                {expandedSection === 'skinTypes' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'skinTypes' && (
                <div className="mt-3 space-y-2 text-[#7A746E]">
                  <div>
                    <span className="font-semibold text-[#1E1C1A]">Texture:</span> {product.texture}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1E1C1A]">Ideal for:</span> {product.skinTypes.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1E1C1A]">Concerns addressed:</span> {product.concerns.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION (PRD Section 14) */}
      <section id="reviews" className="pt-10 border-t border-[#EAE3DA] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1E1C1A]">
              Customer Experiences & Reviews
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#7A746E]">
              <div className="flex items-center text-[#C7995A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#1E1C1A]">{product.rating} out of 5</span>
              <span>· Based on {product.reviewCount} customer ratings</span>
            </div>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="py-2.5 px-4 bg-white border border-[#E2D9CE] hover:border-[#1E1C1A] rounded-xl text-xs font-semibold text-[#1E1C1A] flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#9C6B68]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {productReviews.length === 0 ? (
            <div className="p-8 bg-[#FAF7F2] rounded-2xl text-center text-xs text-[#7A746E]">
              Be the first to review this formulation!
            </div>
          ) : (
            productReviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-white rounded-2xl border border-[#EAE3DA] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#1E1C1A]">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#7A746E]">{rev.createdAt}</span>
                </div>

                <div className="flex items-center text-[#C7995A]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>

                <h4 className="text-xs font-semibold text-[#1E1C1A]">{rev.title}</h4>
                <p className="text-xs text-[#7A746E] leading-relaxed">{rev.content}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Formulations Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-[#EAE3DA] space-y-6">
          <h2 className="text-2xl font-serif text-[#1E1C1A]">
            Complete Your Daily Ritual
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsReviewModalOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E1D9] z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3DA]">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#1E1C1A]">
                  Share Your Experience
                </h3>
                <p className="text-xs text-[#7A746E] mt-0.5">
                  Reviewing: {product.name}
                </p>
              </div>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4 text-xs">
              {/* Star Selector */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1E1C1A] mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-1.5 text-2xl text-[#C7995A]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-[#C7995A] text-[#C7995A]' : 'text-gray-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#7A746E] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Folake O."
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#7A746E] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="folake@example.com"
                    value={reviewEmail}
                    onChange={(e) => setReviewEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#7A746E] mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="Summarize your experience (e.g. Velvety, plump skin in days!)"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#7A746E] mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How did the formulation feel on your skin? When do you apply it?"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
