// src/Components/cart/EmptyCart.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export default function EmptyCart() {
  return (
    <section className="bg-gray-50 min-h-[70vh] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">

          <div className="relative inline-flex items-center justify-center mb-8">
            <span className="absolute w-24 h-24 rounded-full bg-red-100/60 blur-2xl" />
            <span className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500 shadow-lg shadow-red-500/25">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="w-8 h-8 text-white"
              />
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Your Cart is Empty
          </h1>
          <p className="mt-3 text-[14px] text-gray-500 leading-relaxed">
            Looks like you haven&apos;t added anything yet. Explore
            our collection and start shopping.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all"
          >
            Start Shopping
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </Link>

          <div className="mt-14 grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="text-center">
              <p className="text-[20px] font-bold text-gray-900">Free</p>
              <p className="text-[11px] text-gray-500 mt-1">Shipping</p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-gray-900">30d</p>
              <p className="text-[11px] text-gray-500 mt-1">Returns</p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-gray-900">24/7</p>
              <p className="text-[11px] text-gray-500 mt-1">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}