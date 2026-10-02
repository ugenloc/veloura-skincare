/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/Toast';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RoutineBuilderPage } from './pages/RoutineBuilderPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { DatabaseSchemaModal } from './pages/DatabaseSchemaModal';

const AppContent: React.FC = () => {
  const { currentView } = useStore();
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // If in Admin Dashboard, show full-screen admin view with dedicated header
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#F8F6F2] font-sans selection:bg-[#E2D5CC]">
        <AdminDashboard onOpenSchemaModal={() => setIsSchemaModalOpen(true)} />
        <DatabaseSchemaModal
          isOpen={isSchemaModalOpen}
          onClose={() => setIsSchemaModalOpen(false)}
        />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1C1A] flex flex-col font-sans selection:bg-[#E2D5CC]">
      {/* Editorial Navigation Top Bar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'routine-builder' && <RoutineBuilderPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-confirmation' && <OrderConfirmationPage />}
        {currentView === 'order-tracking' && <OrderTrackingPage />}
        {currentView === 'account' && <AccountPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'about' && <AboutContactPage />}
      </main>

      {/* Editorial Footer */}
      <Footer onOpenSchemaModal={() => setIsSchemaModalOpen(true)} />

      {/* Mobile-First Fixed Bottom Navigation (375px–768px viewports) */}
      <MobileBottomNav />

      {/* Slide-over Shopping Bag */}
      <CartDrawer />

      {/* Floating Customer Care WhatsApp Concierge */}
      <WhatsAppButton />

      {/* Relational Schema SQL Modal */}
      <DatabaseSchemaModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />

      {/* Non-intrusive Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
