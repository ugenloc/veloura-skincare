import { Product, Category, Review, DiscountCode, DeliveryOption, Order } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_skincare_ritual_1790952742114.jpg';
export const SERUM_IMAGE = '/src/assets/images/product_serum_amber_1790952757165.jpg';
export const CLEANSER_IMAGE = '/src/assets/images/product_cleanser_foam_1790952767652.jpg';
export const BARRIER_CREAM_IMAGE = '/src/assets/images/product_barrier_cream_1790952780712.jpg';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-serums',
    name: 'Serums & Essences',
    slug: 'serums',
    description: 'Targeted botanical and clinical actives formulated to nourish and replenish deeper layers of the skin.',
    imageUrl: SERUM_IMAGE,
  },
  {
    id: 'cat-cleansers',
    name: 'Cleansers',
    slug: 'cleansers',
    description: 'Gentle, pH-balanced formulas that cleanse impurities without stripping your skin’s natural lipid barrier.',
    imageUrl: CLEANSER_IMAGE,
  },
  {
    id: 'cat-moisturizers',
    name: 'Moisturizers & Creams',
    slug: 'moisturizers',
    description: 'Lipid-rich ceramide treatments that lock in hydration and reinforce natural barrier resilience.',
    imageUrl: BARRIER_CREAM_IMAGE,
  },
  {
    id: 'cat-body',
    name: 'Body & Oils',
    slug: 'body-care',
    description: 'Silky botanical body oils and replenishing elixirs for head-to-toe supple radiance.',
    imageUrl: HERO_IMAGE,
  },
  {
    id: 'cat-sun-protection',
    name: 'Sun Care',
    slug: 'sun-care',
    description: 'Weightless, invisible broad-spectrum UV defense crafted for daily wear and glow without residue.',
    imageUrl: SERUM_IMAGE,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'veloura-hydration-serum',
    name: 'Veloura Deep Hydration Multi-Molecular Serum',
    slug: 'hydration-serum',
    shortDescription: 'Multi-depth hyaluronic complex with panthenol and snow mushroom extract for bouncy, plump skin.',
    description: 'A transformative lightweight elixir featuring four molecular weights of hyaluronic acid paired with Tremella (snow mushroom) and pro-vitamin B5. Designed to hydrate both the surface and deeper epidermis, imparting an immediate dewy radiance that lasts all day without feeling tacky or heavy.',
    price: 18500,
    salePrice: 16500,
    sku: 'VEL-SRM-01',
    stockQuantity: 42,
    categoryId: 'cat-serums',
    categoryName: 'Serums & Essences',
    brand: 'Veloura',
    size: '30 ml / 1.0 fl. oz.',
    texture: 'Lightweight, silky liquid essence that absorbs within seconds.',
    status: 'active',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 128,
    images: [
      { id: 'img-1', url: SERUM_IMAGE, alt: 'Veloura Deep Hydration Serum bottle', isPrimary: true },
      { id: 'img-2', url: BARRIER_CREAM_IMAGE, alt: 'Serum texture swatch' }
    ],
    benefits: [
      'Multi-depth hydration from 4 molecular weights of Hyaluronic Acid',
      'Instant plumping effect that softens the appearance of dehydration lines',
      'Supports optimal moisture retention beneath daily creams and oils',
      'Non-comedogenic, fragrance-free formula suitable for everyday use'
    ],
    howToUse: 'After cleansing or misting, dispense 3 to 4 drops onto damp face and neck. Gently press into skin with warm palms until absorbed. Follow with moisturizer.',
    ingredients: 'Water/Aqua, Propanediol, Sodium Hyaluronate (Multi-Molecular Complex), Tremella Fuciformis (Mushroom) Extract, Panthenol (Vitamin B5), Glycerin, Allantoin, Ethylhexylglycerin, Phenoxyethanol.',
    skinTypes: ['Dry', 'Normal', 'Combination', 'Sensitive', 'Oily'],
    concerns: ['Hydration & Dryness', 'Skin Barrier Care', 'Dullness & Radiance'],
    isFeatured: true,
  },
  {
    id: 'veloura-gentle-cloud-cleanser',
    name: 'Veloura Gentle Cloud Amino Cleanser',
    slug: 'gentle-cloud-cleanser',
    shortDescription: 'Gentle, pH 5.5 whipped amino-acid cleanser that melts away impurities without stripping.',
    description: 'Formulated with ultra-gentle apple-derived amino acids and calming chamomile water, this delicate cleanser removes daily grime, sunscreen, and light makeup while preserving skin barrier lipids. Leaves skin feeling velvety soft and comfortable, never tight.',
    price: 14500,
    sku: 'VEL-CLN-02',
    stockQuantity: 58,
    categoryId: 'cat-cleansers',
    categoryName: 'Cleansers',
    brand: 'Veloura',
    size: '150 ml / 5.1 fl. oz.',
    texture: 'Whipped cloud foam that lathers into a micro-bubble cushion.',
    status: 'active',
    badge: 'New Arrival',
    rating: 4.8,
    reviewCount: 94,
    images: [
      { id: 'img-c1', url: CLEANSER_IMAGE, alt: 'Veloura Cloud Cleanser Bottle', isPrimary: true },
      { id: 'img-c2', url: SERUM_IMAGE, alt: 'Cleanser foaming texture' }
    ],
    benefits: [
      'Balanced pH 5.5 maintains optimal skin microbiome',
      'Removes surface buildup and impurities without stinging eyes',
      'Soothes redness and calms reactive skin during wash',
      'Leaves zero residue or tight aftermath'
    ],
    howToUse: 'Dampen hands and face. Pump 1–2 doses into palms and massage in gentle circular motions for 60 seconds. Rinse thoroughly with lukewarm water.',
    ingredients: 'Water/Aqua, Chamomilla Recutita (Matricaria) Flower Water, Potassium Cocoyl Glycinate, Sodium Lauroyl Oat Amino Acids, Glycerin, Centella Asiatica Extract, Camellia Sinensis (Green Tea) Leaf Extract, Citric Acid.',
    skinTypes: ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'],
    concerns: ['Hydration & Dryness', 'Sensitive & Redness', 'Blemish & Oil Balance'],
    isFeatured: true,
  },
  {
    id: 'veloura-barrier-cream',
    name: 'Veloura Ceramide Barrier Recovery Cream',
    slug: 'ceramide-barrier-cream',
    shortDescription: 'Rich restorative balm-cream infused with 3:1:1 physiological lipids to seal moisture.',
    description: 'An intensely replenishing daily cream packed with skin-identical ceramides (EOP, NP, AP), cholesterol, and free fatty acids. Designed to comfort compromised barriers, replenish moisture, and shield against environmental dryness.',
    price: 21000,
    salePrice: 19500,
    sku: 'VEL-CRM-03',
    stockQuantity: 34,
    categoryId: 'cat-moisturizers',
    categoryName: 'Moisturizers & Creams',
    brand: 'Veloura',
    size: '50 ml / 1.7 fl. oz.',
    texture: 'Silky, velvety cushion cream with a cushiony, non-greasy matte finish.',
    status: 'active',
    badge: 'Award Winner',
    rating: 5.0,
    reviewCount: 167,
    images: [
      { id: 'img-b1', url: BARRIER_CREAM_IMAGE, alt: 'Veloura Barrier Cream jar', isPrimary: true },
      { id: 'img-b2', url: HERO_IMAGE, alt: 'Cream application swatch' }
    ],
    benefits: [
      'Rebuilds and fortifies depleted skin barrier within 3 days of use',
      'Soothes peeling, tightness, and wind-burned skin',
      'Contains 5 essential ceramides and bio-fermented squalane',
      'Pairs seamlessly under makeup with zero pilling'
    ],
    howToUse: 'Warm a pea-sized amount between clean fingertips. Press and smooth evenly over face, neck, and décolleté as the final step of your morning and evening ritual.',
    ingredients: 'Water/Aqua, Caprylic/Capric Triglyceride, Squalane, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Butyrospermum Parkii (Shea) Butter, Niacinamide, Sodium Hyaluronate, Tocopherol (Vitamin E).',
    skinTypes: ['Dry', 'Normal', 'Sensitive', 'Combination'],
    concerns: ['Skin Barrier Care', 'Hydration & Dryness', 'Sensitive & Redness'],
    isFeatured: true,
  },
  {
    id: 'veloura-glow-body-oil',
    name: 'Veloura Golden Squalane Glow Body Oil',
    slug: 'glow-body-oil',
    shortDescription: 'Featherlight dry body oil infused with cold-pressed marula, jojoba, and subtle warm amber notes.',
    description: 'A luxurious, fast-absorbing elixir that envelopes the body in a velvety veil of hydration. Blended with cold-pressed African marula oil, sugarcane squalane, and nourishing rosehip seed oil to leave limbs radiant, smooth, and delicately scented with notes of warm vanilla and solar woods.',
    price: 16500,
    sku: 'VEL-OIL-04',
    stockQuantity: 28,
    categoryId: 'cat-body',
    categoryName: 'Body & Oils',
    brand: 'Veloura',
    size: '100 ml / 3.4 fl. oz.',
    texture: 'Dry botanical oil that sinks into skin instantly with zero grease.',
    status: 'active',
    badge: 'Limited Edition',
    rating: 4.9,
    reviewCount: 82,
    images: [
      { id: 'img-o1', url: HERO_IMAGE, alt: 'Veloura Glow Body Oil Ritual', isPrimary: true },
      { id: 'img-o2', url: SERUM_IMAGE, alt: 'Body oil droplet' }
    ],
    benefits: [
      'Provides satin glow and deep nourishment for dry limbs',
      'Softens textured elbows, knees, and dry cuticles',
      'Rapid dry-finish formula prevents oil transfer onto clothing',
      'Crafted with 100% pure cold-pressed plant extracts'
    ],
    howToUse: 'Smooth generously over damp skin immediately following shower or bath. Focus on legs, arms, and collarbones for an instant luminous glow.',
    ingredients: 'Caprylic/Capric Triglyceride, Squalane (Sugarcane), Sclerocarya Birrea (Marula) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Canina (Rosehip) Fruit Oil, Fragrance (Natural Botanical Blend), Tocopherol.',
    skinTypes: ['Dry', 'Normal', 'Sensitive', 'Combination', 'Oily'],
    concerns: ['Hydration & Dryness', 'Dullness & Radiance'],
    isFeatured: true,
  },
  {
    id: 'veloura-clarifying-elixir',
    name: 'Veloura 5% Niacinamide & Zinc Clarifying Elixir',
    slug: 'clarifying-elixir',
    shortDescription: 'Gentle clarifying active serum that minimizes pores and refines texture without drying.',
    description: 'A soothing water-gel formulated with pure 5% niacinamide, zinc PCA, and fermented willow bark. Formulated to calm surface irritation, reduce excess sebum, and visibly refine uneven texture while maintaining hydration.',
    price: 19200,
    sku: 'VEL-NIA-05',
    stockQuantity: 19,
    categoryId: 'cat-serums',
    categoryName: 'Serums & Essences',
    brand: 'Veloura',
    size: '30 ml / 1.0 fl. oz.',
    texture: 'Clear, crisp water-gel with instant soothing cooling effect.',
    status: 'active',
    badge: 'Best Seller',
    rating: 4.7,
    reviewCount: 65,
    images: [
      { id: 'img-cl1', url: SERUM_IMAGE, alt: 'Veloura Clarifying Serum bottle', isPrimary: true },
      { id: 'img-cl2', url: CLEANSER_IMAGE, alt: 'Water gel texture' }
    ],
    benefits: [
      'Visibly refines congested pores and smooths uneven skin texture',
      'Balances daytime sebum production without flaking or dryness',
      'Fade post-blemish dark marks and support clear tone',
      'Safe for daily morning and night use'
    ],
    howToUse: 'Apply 3 to 4 drops across entire face after cleansing and misting. Follow with your favorite moisturizer.',
    ingredients: 'Water/Aqua, Niacinamide (5%), Propanediol, Zinc PCA, Salix Alba (Willow) Bark Extract, Sodium Hyaluronate, Hydroxyethylcellulose, Ethylhexylglycerin.',
    skinTypes: ['Oily', 'Combination', 'Normal'],
    concerns: ['Blemish & Oil Balance', 'Uneven Tone'],
    isFeatured: false,
  },
  {
    id: 'veloura-calming-mist',
    name: 'Veloura Soothing Centella & Green Tea Calming Mist',
    slug: 'calming-mist',
    shortDescription: 'Ultra-fine botanical micro-mist that calms reactive skin and locks in soothing moisture.',
    description: 'An essential desk and travel companion formulated with 85% Centella Asiatica leaf water and antioxidant-dense green tea. Instantly cools flushed skin, combats air conditioning dryness, and acts as the perfect preparatory essence.',
    price: 12800,
    sku: 'VEL-MST-06',
    stockQuantity: 64,
    categoryId: 'cat-serums',
    categoryName: 'Serums & Essences',
    brand: 'Veloura',
    size: '120 ml / 4.0 fl. oz.',
    texture: 'Micro-fine refreshing mist with subtle herbaceous aroma.',
    status: 'active',
    rating: 4.8,
    reviewCount: 47,
    images: [
      { id: 'img-m1', url: CLEANSER_IMAGE, alt: 'Veloura Calming Mist bottle', isPrimary: true },
      { id: 'img-m2', url: BARRIER_CREAM_IMAGE, alt: 'Fine mist spray' }
    ],
    benefits: [
      'Instantly relieves sensation of stinging, heat, and tightness',
      'Hydrates makeup without disrupting coverage',
      'Reinforces skin defense against environmental pollutants',
      'Alcohol-free and formulated without synthetic fragrance'
    ],
    howToUse: 'Hold bottle 8 inches from face with eyes closed and mist evenly across skin. Use morning, evening, or whenever skin needs a calming hydration boost.',
    ingredients: 'Centella Asiatica Leaf Water, Water/Aqua, Camellia Sinensis Leaf Extract, Glycerin, Sodium PCA, Dipotassium Glycyrrhizate, Allantoin.',
    skinTypes: ['Sensitive', 'Dry', 'Combination', 'Normal', 'Oily'],
    concerns: ['Sensitive & Redness', 'Skin Barrier Care', 'Hydration & Dryness'],
    isFeatured: false,
  },
  {
    id: 'veloura-night-elixir',
    name: 'Veloura Botanical Rosehip & Marula Night Oil',
    slug: 'night-elixir',
    shortDescription: 'Regenerative nighttime treatment oil to replenish lipid deficiency and promote morning bounce.',
    description: 'An organic cold-pressed lipid blend packed with natural Vitamin A (trans-retinoic acid), omega 3-6-9 fatty acids, and CoQ10. Re-energizes skin overnight for velvety, supple luminosity by sunrise.',
    price: 23500,
    sku: 'VEL-NGH-07',
    stockQuantity: 12, // Low stock example
    categoryId: 'cat-body',
    categoryName: 'Body & Oils',
    brand: 'Veloura',
    size: '30 ml / 1.0 fl. oz.',
    texture: 'Rich golden botanical oil that presses into a cashmere finish.',
    status: 'active',
    badge: 'Limited Edition',
    rating: 4.9,
    reviewCount: 53,
    images: [
      { id: 'img-ne1', url: SERUM_IMAGE, alt: 'Veloura Night Oil bottle', isPrimary: true },
      { id: 'img-ne2', url: HERO_IMAGE, alt: 'Golden oil drops' }
    ],
    benefits: [
      'Deeply nourishes dry and fatigued skin while you sleep',
      'Natural cold-pressed lipids support cell turnover',
      'Awaken with soft, supple, glowing complexion',
      'Provides comforting sensory ritual before bed'
    ],
    howToUse: 'Warm 2–3 drops in palms and press into skin as the concluding step of your evening ritual.',
    ingredients: 'Rosa Rubiginosa (Rosehip) Seed Oil, Sclerocarya Birrea (Marula) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Ubiquinone (CoQ10), Helianthus Annuus Seed Oil, Tocopherol.',
    skinTypes: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Hydration & Dryness', 'Skin Barrier Care', 'Dullness & Radiance'],
    isFeatured: false,
  },
  {
    id: 'veloura-mineral-spf',
    name: 'Veloura Mineral Silk Invisible Daily SPF 50+',
    slug: 'mineral-spf',
    shortDescription: 'Ultra-sheer 100% mineral daily sunscreen that leaves zero white cast on melanin-rich skin.',
    description: 'Engineered specifically to blend seamlessly on all skin tones with zero chalky cast or greasiness. Non-nano zinc oxide provides PA++++ broad-spectrum protection against UVA/UVB rays and blue light, while ectoin and niacinamide calm heat.',
    price: 17000,
    salePrice: 15500,
    sku: 'VEL-SPF-08',
    stockQuantity: 55,
    categoryId: 'cat-sun-protection',
    categoryName: 'Sun Care',
    brand: 'Veloura',
    size: '50 ml / 1.7 fl. oz.',
    texture: 'Silk fluid that glides like a primer with a natural satin glow.',
    status: 'active',
    badge: 'Best Seller',
    rating: 5.0,
    reviewCount: 110,
    images: [
      { id: 'img-sp1', url: BARRIER_CREAM_IMAGE, alt: 'Veloura Mineral SPF bottle', isPrimary: true },
      { id: 'img-sp2', url: CLEANSER_IMAGE, alt: 'SPF fluid texture' }
    ],
    benefits: [
      'Zero white cast, formulated and tested on deep melanin skin tones',
      'Broad spectrum SPF 50+ / PA++++ UVA & UVB protection',
      'Non-greasy satin finish functions as a skin-smoothing makeup primer',
      'Reef-safe, non-nano mineral formula suitable for sensitive skin'
    ],
    howToUse: 'Apply two finger lengths generously to face and neck every morning as the final skincare step, 15 minutes before sun exposure.',
    ingredients: 'Zinc Oxide (Non-Nano 16%), Water/Aqua, C12-15 Alkyl Benzoate, Caprylic/Capric Triglyceride, Niacinamide, Ectoin, Polyglyceryl-3 Polyricinoleate, Silica, Phenoxyethanol.',
    skinTypes: ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'],
    concerns: ['Skin Barrier Care', 'Uneven Tone', 'Dullness & Radiance'],
    isFeatured: true,
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'veloura-hydration-serum',
    userName: 'Amina B.',
    userEmail: 'amina.b@example.com',
    rating: 5,
    title: 'The only serum that quenched my dry Lagos skin',
    content: 'Between the dry air conditioning and humidity, my skin was flaky and tight. After just 4 days with this serum, my face feels bouncy and plump all day. It sinks in without any sticky residue!',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-15'
  },
  {
    id: 'rev-2',
    productId: 'veloura-hydration-serum',
    userName: 'Chioma O.',
    userEmail: 'chioma.o@example.com',
    rating: 5,
    title: 'Holy grail hydration!',
    content: 'I layer this with the Barrier Cream. My makeup has never looked this seamless. 10/10 recommendation.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-18'
  },
  {
    id: 'rev-3',
    productId: 'veloura-barrier-cream',
    userName: 'Kemi A.',
    userEmail: 'kemi.a@example.com',
    rating: 5,
    title: 'Restored my damaged moisture barrier in 48 hours',
    content: 'I over-exfoliated and my cheeks were burning and red. This cream felt like a soothing velvet blanket. Worth every kobo.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-22'
  },
  {
    id: 'rev-4',
    productId: 'veloura-gentle-cloud-cleanser',
    userName: 'Temi D.',
    userEmail: 'temi.d@example.com',
    rating: 5,
    title: 'Gentle, luxurious, does not sting',
    content: 'The foam is so dense and cloud-like. It cleanses waterproof sunscreen easily and doesn’t leave my sensitive skin tight.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-25'
  },
  {
    id: 'rev-5',
    productId: 'veloura-mineral-spf',
    userName: 'Zainab M.',
    userEmail: 'zainab.m@example.com',
    rating: 5,
    title: 'Finally an SPF with ZERO white cast!',
    content: 'As a dark-skinned woman in Abuja, finding a mineral sunscreen that does not look purple is rare. This blends in 10 seconds into a warm natural glow.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-28'
  }
];

export const INITIAL_DISCOUNTS: DiscountCode[] = [
  {
    id: 'disc-1',
    code: 'VELOURA10',
    type: 'percentage',
    value: 10,
    minOrderValue: 15000,
    usageLimit: 500,
    usageCount: 142,
    active: true,
    description: '10% off your entire ritual (Min spend ₦15,000)'
  },
  {
    id: 'disc-2',
    code: 'GLOW2000',
    type: 'fixed',
    value: 2000,
    minOrderValue: 25000,
    usageLimit: 200,
    usageCount: 68,
    active: true,
    description: '₦2,000 off orders over ₦25,000'
  },
  {
    id: 'disc-3',
    code: 'FREESHIP',
    type: 'fixed',
    value: 2500,
    minOrderValue: 30000,
    usageLimit: 300,
    usageCount: 95,
    active: true,
    description: 'Free Standard Nationwide Shipping on orders over ₦30,000'
  }
];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Standard Nationwide Delivery',
    description: 'Delivered securely to your doorstep across Nigeria',
    estimatedDays: '2 - 4 business days',
    price: 2500,
  },
  {
    id: 'express_lagos',
    name: 'Express Same-Day / Next-Day (Lagos)',
    description: 'Fast dispatched via dedicated courier in Lagos Mainland & Island',
    estimatedDays: 'Within 24 hours',
    price: 4000,
  },
  {
    id: 'priority_nationwide',
    name: 'Priority Air Express (Abuja, Port Harcourt, Kano)',
    description: 'Direct airport-routed express courier service',
    estimatedDays: '1 - 2 business days',
    price: 5500,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-849201',
    orderNumber: 'VEL-849201',
    userId: 'usr-1',
    customerName: 'Amina Bello',
    customerEmail: 'amina.b@example.com',
    customerPhone: '+234 803 123 4567',
    items: [
      {
        id: 'ci-1',
        productId: 'veloura-hydration-serum',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        unitPrice: 16500,
      },
      {
        id: 'ci-2',
        productId: 'veloura-barrier-cream',
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        unitPrice: 19500,
      }
    ],
    subtotal: 36000,
    shippingFee: 2500,
    discount: 3600,
    discountCode: 'VELOURA10',
    total: 34900,
    paymentStatus: 'paid',
    fulfillmentStatus: 'shipped',
    paymentProvider: 'paystack',
    transactionReference: 'pstk_ref_982402198',
    shippingAddress: {
      fullName: 'Amina Bello',
      email: 'amina.b@example.com',
      phone: '+234 803 123 4567',
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Ikoyi',
      address: '14 Alexander Avenue, Ikoyi',
      deliveryNotes: 'Leave at security gate with Mr. John.'
    },
    deliveryMethod: DELIVERY_OPTIONS[0],
    trackingNumber: 'GIG-EXP-992144',
    timeline: [
      { status: 'paid', label: 'Order Placed & Payment Confirmed', timestamp: '2026-09-30 10:14 AM' },
      { status: 'processing', label: 'Handcrafted Batch Packed at Lagos Studio', timestamp: '2026-09-30 02:30 PM' },
      { status: 'shipped', label: 'Dispatched via Courier', timestamp: '2026-10-01 09:00 AM', note: 'Tracking ID: GIG-EXP-992144' }
    ],
    createdAt: '2026-09-30T10:14:00Z',
    updatedAt: '2026-10-01T09:00:00Z'
  },
  {
    id: 'ord-849102',
    orderNumber: 'VEL-849102',
    userId: 'usr-2',
    customerName: 'Emeka Nwosu',
    customerEmail: 'emeka.n@example.com',
    customerPhone: '+234 812 987 6543',
    items: [
      {
        id: 'ci-3',
        productId: 'veloura-mineral-spf',
        product: INITIAL_PRODUCTS[7],
        quantity: 2,
        unitPrice: 15500,
      }
    ],
    subtotal: 31000,
    shippingFee: 4000,
    discount: 0,
    total: 35000,
    paymentStatus: 'paid',
    fulfillmentStatus: 'delivered',
    paymentProvider: 'flutterwave',
    transactionReference: 'flw_tx_55419028',
    shippingAddress: {
      fullName: 'Emeka Nwosu',
      email: 'emeka.n@example.com',
      phone: '+234 812 987 6543',
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Victoria Island',
      address: 'Plot 7, Adeola Odeku Street',
    },
    deliveryMethod: DELIVERY_OPTIONS[1],
    trackingNumber: 'GIG-EXP-884120',
    timeline: [
      { status: 'paid', label: 'Order Placed & Paid', timestamp: '2026-09-28 01:20 PM' },
      { status: 'processing', label: 'Dispatched from Hub', timestamp: '2026-09-28 04:00 PM' },
      { status: 'shipped', label: 'Out for Courier Delivery', timestamp: '2026-09-29 09:30 AM' },
      { status: 'delivered', label: 'Successfully Delivered to Customer', timestamp: '2026-09-29 01:45 PM' }
    ],
    createdAt: '2026-09-28T13:20:00Z',
    updatedAt: '2026-09-29T13:45:00Z'
  }
];
