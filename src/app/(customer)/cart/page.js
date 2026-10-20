// src/app/(customer)/cart/page.js
'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import CartHeader from '@/Components/cart/CartHeader';
import CartItem from '@/Components/cart/CartItem';
import CartSummary from '@/Components/cart/CartSummary';
import EmptyCart from '@/Components/cart/EmptyCart';

export default function CartPage() {
  const { items, hydrated } = useCart();

  // Loading state
  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <p className="text-[12px] text-gray-500 font-medium">
          Loading cart…
        </p>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="bg-gray-50 min-h-screen py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="text-[11.5px] sm:text-[12px] text-gray-500 flex items-center gap-1.5 mb-5">
          <Link
            href="/home"
            className="hover:text-red-500 transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Carts</span>
        </nav>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5 lg:gap-8 items-start">

          {/* LEFT — Cart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <CartHeader />
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* RIGHT — Summary */}
          <div className="lg:sticky lg:top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </section>
  );
}