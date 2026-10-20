"use client";

import { useState } from "react";

export default function CustomerLayoutWrapper({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/shop" className="text-xl font-bold">Ecommerce</a>
            <nav className="hidden md:flex space-x-8">
              <a href="/shop" className="text-gray-900 hover:text-gray-500">Shop</a>
              <a href="/wishlist" className="text-gray-900 hover:text-gray-500">Wishlist</a>
              <a href="/account" className="text-gray-900 hover:text-gray-500">Account</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="/cart" className="text-gray-900 hover:text-gray-500">Cart</a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-600"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Ecommerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
