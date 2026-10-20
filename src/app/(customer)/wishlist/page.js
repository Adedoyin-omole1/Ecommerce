// src/app/(customer)/wishlist/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faCartShopping,
  faLink,
  faBox,
  faCreditCard,
  faHeadset,
  faArrowRight,
  faHeart,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { CartToast } from '@/Components/ui/ToastCard';

export default function WishlistPage() {
  const { items, removeItem, clearAll, hydrated } = useWishlist();
  const { addItem, count: cartCount } = useCart();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/wishlist`
        : 'https://novatrend.com/wishlist';

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ==========================================
  // ADD SINGLE ITEM TO CART
  // ==========================================
  const handleAddToCart = (item) => {
    addItem(item);
    toast.custom(
      (t) => (
        <div onClick={() => toast.dismiss(t.id)}>
          <CartToast
            items={[item]}
            total={Number(item.price)}
            count={cartCount + 1}
          />
        </div>
      ),
      { duration: 3000 }
    );
  };

  // ==========================================
  // ADD ALL TO CART
  // ==========================================
  const handleAddAllToCart = () => {
    items.forEach((item) => addItem(item));
    toast.custom(
      (t) => (
        <div onClick={() => toast.dismiss(t.id)}>
          <CartToast
            items={items}
            total={items.reduce((s, i) => s + Number(i.price), 0)}
            count={cartCount + items.length}
          />
        </div>
      ),
      { duration: 3000 }
    );
  };

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <span className="relative flex w-8 h-8">
            <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-8 h-8 rounded-full bg-red-500" />
          </span>
          <p className="text-[12px] text-gray-500 font-medium">
            Loading your wishlist…
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================
  if (items.length === 0) {
    return (
      <section className="bg-gray-50 min-h-[70vh] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">

            <div className="relative inline-flex items-center justify-center mb-8">
              <span className="absolute w-24 h-24 rounded-full bg-red-100/60 blur-2xl" />
              <span className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500 shadow-lg shadow-red-500/25">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="w-8 h-8 text-white"
                />
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Your Wishlist is Empty
            </h1>
            <p className="mt-3 text-[14px] text-gray-500 leading-relaxed">
              Save your favorite items here to compare, revisit,
              and shop later. Just tap the heart on any product.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all"
            >
              Start Shopping
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-3 h-3"
              />
            </Link>

            <div className="mt-14 grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="text-center">
                <p className="text-[20px] font-bold text-gray-900">50K+</p>
                <p className="text-[11px] text-gray-500 mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-[20px] font-bold text-gray-900">12K+</p>
                <p className="text-[11px] text-gray-500 mt-1">Products</p>
              </div>
              <div className="text-center">
                <p className="text-[20px] font-bold text-gray-900">4.9</p>
                <p className="text-[11px] text-gray-500 mt-1">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // MAIN WISHLIST PAGE
  // ==========================================
  return (
    <section className="bg-gray-50 min-h-[70vh] py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">

        {/* PAGE HEADER */}
        <div>
          <nav className="text-[11.5px] sm:text-[12px] text-gray-500 flex items-center gap-1.5 mb-5">
            <Link href="/home" className="hover:text-red-500 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-none">
                My Wishlist
              </h1>
              <p className="mt-3 text-[14px] text-gray-500">
                You have{' '}
                <span className="font-semibold text-gray-900">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>{' '}
                saved for later.
              </p>
              <div className="mt-4 flex items-center gap-1.5">
                <span className="block w-10 h-0.5 bg-red-500" />
                <span className="block w-3 h-0.5 bg-red-500/60" />
                <span className="block w-1.5 h-0.5 bg-red-500/30" />
              </div>
            </div>

            {/* Desktop actions */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-gray-200 hover:border-red-500 hover:text-red-500 text-[12.5px] font-medium text-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                Clear Wishlist
              </button>
              <button
                onClick={handleAddAllToCart}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-red-500 hover:bg-red-600 text-white text-[12.5px] font-semibold shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all"
              >
                <FontAwesomeIcon icon={faCartShopping} className="w-3.5 h-3.5" />
                Add All to Cart
              </button>
            </div>
          </div>
        </div>

        {/* WISHLIST TABLE / CARDS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 items-center bg-red-600 px-6 py-4">
            <div className="col-span-1" />
            <div className="col-span-5 text-[11px] font-bold text-white uppercase tracking-widest">
              Product
            </div>
            <div className="col-span-2 text-[11px] font-bold text-white uppercase tracking-widest">
              Price
            </div>
            <div className="col-span-2 text-[11px] font-bold text-white uppercase tracking-widest">
              Date Added
            </div>
            <div className="col-span-2 text-[11px] font-bold text-white uppercase tracking-widest text-right">
              Action
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <WishlistRow
                key={item.id}
                item={item}
                index={idx}
                onRemove={() => removeItem(item.id)}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        </div>

        {/* SHARE + MOBILE ACTIONS */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-medium text-gray-700">
              Share your wishlist:
            </span>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-3 pr-1 py-1">
              <FontAwesomeIcon icon={faLink} className="w-3 h-3 text-gray-400" />
              <input
                type="text"
                readOnly
                defaultValue="https://king's Kollitable.com/wishlist/abc123"
                className="w-48 sm:w-64 text-[11.5px] text-gray-500 bg-transparent border-0 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[11.5px] font-semibold transition-colors ${copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-900 hover:bg-red-500 text-white'
                  }`}
              >
                {copied ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" />
                    Copied
                  </>
                ) : (
                  'Copy Link'
                )}
              </button>
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={clearAll}
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-full bg-white border border-gray-200 text-[12.5px] font-medium text-gray-700 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleAddAllToCart}
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white text-[12.5px] font-semibold shadow-lg shadow-red-500/25 transition-colors"
            >
              Add All
            </button>
          </div>
        </div>

        {/* TRUST ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
          <TrustItem
            icon={faBox}
            title="Free Shipping"
            subtitle="On all orders above $180"
          />
          <TrustItem
            icon={faCreditCard}
            title="Flexible Payment"
            subtitle="Multiple secure options"
          />
          <TrustItem
            icon={faHeadset}
            title="24×7 Support"
            subtitle="Always here to help"
          />
        </div>

      </div>
    </section>
  );
}

// ==========================================
// WISHLIST ROW
// ==========================================
function WishlistRow({ item, index, onRemove, onAddToCart }) {
  const added = item.addedAt || '18 April 2024';

  return (
    <div
      className="group relative grid grid-cols-12 gap-4 items-center px-4 sm:px-6 py-4 hover:bg-red-50/30 transition-colors opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Remove × */}
      <div className="col-span-12 sm:col-span-1 md:col-span-1 flex items-center">
        <button
          onClick={onRemove}
          aria-label="Remove from wishlist"
          className="flex items-center justify-center w-7 h-7 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product */}
      <div className="col-span-12 sm:col-span-11 md:col-span-5 flex items-center gap-4 min-w-0">
        <Link
          href={`/product/${item.id}`}
          className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity"
        >
          <img
            src={item.images?.[0] || item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </Link>
        <div className="min-w-0">
          <Link
            href={`/product/${item.id}`}
            className="text-[14px] font-semibold text-gray-900 truncate hover:text-red-500 transition-colors block"
          >
            {item.name}
          </Link>
          <p className="text-[11.5px] text-gray-500 mt-0.5">
            Color : {item.color || 'Natural'}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-6 sm:col-span-6 md:col-span-2">
        <p className="md:hidden text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
          Price
        </p>
        <p className="text-[15px] font-bold text-gray-900">
          ${item.price?.toFixed(2)}
        </p>
      </div>

      {/* Date Added */}
      <div className="col-span-6 sm:col-span-6 md:col-span-2">
        <p className="md:hidden text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
          Date Added
        </p>
        <p className="text-[13px] text-gray-600">{added}</p>
      </div>

      {/* Action */}
      <div className="col-span-12 sm:col-span-12 md:col-span-2 flex justify-end">
        <button
          onClick={onAddToCart}
          className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-gray-900 hover:bg-red-500 text-white text-[12px] font-semibold shadow-sm hover:shadow-md transition-all"
        >
          <FontAwesomeIcon icon={faCartShopping} className="w-3 h-3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ==========================================
// TRUST ITEM
// ==========================================
function TrustItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-red-50 text-red-500">
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="text-[13.5px] font-bold text-gray-900">{title}</p>
        <p className="text-[12px] text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}