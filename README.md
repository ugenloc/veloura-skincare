# Veloura Skincare — Mobile-First Luxury E-Commerce

> **Beauty, thoughtfully curated.**
> A modern, mobile-first e-commerce web application for premium skincare rituals, routines, and effortless shopping. Built with React 19, TypeScript, and Tailwind CSS.

---

## 🌟 Overview

Veloura is designed as an editorial, high-trust direct-to-consumer (DTC) beauty platform. It rejects cluttered, aggressive discount layouts in favor of an elegant beauty-tech aesthetic, generous whitespace, warm neutral tones, and biocompatible lipid barrier science.

---

## ✨ Key Features

### 1. Mobile-First Customer Experience
- **Bottom Navigation**: Ergonomic 5-destination thumb bar (`Home`, `Shop`, `Ritual`, `Saved`, `Bag`) designed for one-handed smartphone use.
- **Top Bar Contract**: Minimalist brand wordmark, clear navigation links, and primary action affordances.
- **Micro-Interactions**: Smooth touch feedback, swipeable image galleries, and zero layout shift.

### 2. Product Discovery & Catalog
- **Multi-Faceted Filtering**: Filter by product categories (*Serums*, *Cleansers*, *Moisturizers*, *Body Care*, *Sun Care*), target skin concerns (*Hydration*, *Skin Barrier*, *Blemish & Oil Balance*, *Radiance*, *Sensitivity*, *Uneven Tone*), skin types, and price range.
- **Global Search**: Instant keyword matching across product names, descriptions, and active ingredients (e.g. *Hyaluronic*, *Ceramides*, *Niacinamide*, *Squalane*).
- **Product Badges & Zero-Pill Hierarchy**: Clean unboxed metadata with subtle typographic separators (`·`) and single status indicators (`Best Seller`, `New Arrival`, `Award Winner`).

### 3. Product Detail Page (PDP)
- **High-Fidelity Gallery**: Multi-image gallery with thumbnail selection and zoom view.
- **Structured Accordions**:
  - The Ritual & Description
  - Clinical & Botanical Benefits
  - Step-by-Step Instructions & Pro-tips
  - Full Botanical & Active Ingredients list
  - Skin Types & Texture details
- **Verified Customer Reviews**: Star rating breakdown and interactive submission modal.

### 4. Interactive Skincare Routine Builder
- 3-step ritual matcher:
  1. Skin Type (*Dry*, *Oily*, *Combination*, *Normal*, *Sensitive*)
  2. Target Concern (*Hydration*, *Barrier Support*, *Radiance*, *Oil Balance*, *Redness*)
  3. Curated AM & PM Regimen with step-by-step guidance.
- **1-Click Bundle Add**: Add the entire personalized 3-step routine to bag with an automatic 15% discount (`VELOURA10` / `ROUTINE15`).

### 5. Shopping Bag & Checkout Flow
- **Slide-Over Bag Drawer**: Real-time quantity controls, save-for-later wishlist toggling, and complimentary nationwide shipping progress bar (threshold: ₦30,000).
- **Promo Code Engine**: Supports percentage and fixed Naira discounts (`VELOURA10`, `GLOW2000`, `FREESHIP`).
- **Streamlined 4-Step Checkout**:
  1. Contact Details (Guest checkout supported)
  2. Delivery Address (Covers all 36 Nigerian states and international addresses)
  3. Courier Speed (Standard Nationwide, Express Lagos, Priority Air)
  4. Payment Gateway (Pluggable abstraction supporting Paystack, Flutterwave, and Stripe)
- **Payment Gateway Simulator**: Test card, direct NIP bank transfer, and USSD (*737#) channels with webhook confirmation.

### 6. Order Tracking & Customer Account
- **Real-Time Fulfillment Timeline**: Track progress across 5 stages: *Order Placed → Payment Confirmed → Studio Packing → Dispatched → Out for Delivery → Delivered*.
- **Customer Portal**: Order history with 1-click reorder, saved delivery destinations, and synced wishlist.
- **WhatsApp Concierge**: Direct chat widget for real-time customer support and skin advice.

### 7. Staff Admin Dashboard (`/admin`)
- **Executive Metrics**: Today's sales (₦), order counts, active customers, pending dispatch, and low-stock alerts.
- **Catalog Management**: Create, edit, and archive products with prices, SKUs, and inventory.
- **Order Processing**: Update fulfillment status and assign courier tracking numbers.
- **Stock Control**: Fast inline batch inventory adjustments (+1, +5, +25).
- **Review Moderation & Discounts**: Approve customer reviews and configure promotional codes.
- **Relational Database Schema**: Built-in viewer and copy tool for PostgreSQL DDL (PRD Section 26).

---

## 🛠️ Tech Stack

- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Typography**: Cormorant Garamond & Plus Jakarta Sans

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/veloura-skincare.git
   cd veloura-skincare
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🗄️ Database Architecture

The relational schema implements standard PostgreSQL DDL for:
- `users`: Customer accounts and roles (`customer`, `admin`)
- `products`: Catalog entries, prices, inventory, and JSONB skin metadata
- `product_images`: Multi-asset photography
- `categories`: Taxonomy and navigation
- `reviews`: Customer ratings and moderation status
- `orders` & `order_items`: Complete order history, pricing breakdown, and timeline logs
- `discount_codes`: Dynamic promotional rules
- `wishlists`: Persisted favorites

---

## 📄 License

Apache-2.0
