// src/Components/cart/CartSummary.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/contexts/CartContext';

const SHIPPING = 5;
const TAX_RATE = 0.05;

export default function CartSummary() {
  const { count, subtotal } = useCart();
  const [promo, setPromo] = useState('');
  const [applied, setApplied] = useState(false);

  const shipping = count > 0 ? SHIPPING : 0;
  const tax = subtotal * TAX_RATE;
  const discount = applied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setApplied(promo.trim().toUpperCase() === 'SAVE10');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6">

      <h2 className="text-[16px] font-bold text-gray-900 mb-5 pb-5 border-b border-gray-100">
        Summary
      </h2>

      <div className="space-y-3 text-[13px]">
        <Row
          label="Total Items"
          value={`${String(count).padStart(2, '0')} ${count === 1 ? 'Item' : 'Items'
            }`}
        />
        <Row label="Sub total" value={`$${subtotal.toFixed(2)}`} />
        <Row label="Est. Delivery" value={`$${shipping.toFixed(2)}`} />
        <Row
          label="Taxes"
          value={
            <span className="text-red-500 font-semibold">
              +${tax.toFixed(2)}
            </span>
          }
        />
        <Row
          label="Discount"
          value={
            <span className="text-emerald-500 font-semibold">
              -${discount.toFixed(2)}
            </span>
          }
        />
        <div className="h-px bg-gray-100 my-2" />
        <Row
          label="Final payment"
          value={
            <span className="text-[16px] font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          }
          isBold
        />
      </div>

      <form
        onSubmit={handleApplyPromo}
        className="mt-5 flex items-center gap-2 p-1 bg-gray-50 rounded-full"
      >
        <div className="flex-1 relative">
          <FontAwesomeIcon
            icon={faTag}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Enter promo code"
            className="w-full pl-9 pr-3 py-2 text-[12px] bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 h-8 px-4 rounded-full bg-gray-900 hover:bg-red-500 text-white text-[11.5px] font-semibold transition-colors"
        >
          {applied ? 'Applied!' : 'Apply'}
        </button>
      </form>

      <div className="mt-4 space-y-2.5">
        <Link
          href="/checkout"
          className="group flex items-center justify-center gap-2 h-12 w-full bg-gray-900 hover:bg-red-500 text-white text-[13px] font-semibold rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          Checkout
        </Link>
        <Link
          href="/checkout?guest=1"
          className="flex items-center justify-center h-11 w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[12.5px] font-medium rounded-full transition-colors"
        >
          Member Checkout
        </Link>
      </div>

      <p className="mt-4 text-center text-[10.5px] text-gray-400">
        🔒 Secure checkout · SSL encrypted
      </p>
    </div>
  );
}

function Row({ label, value, isBold = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`text-gray-500 ${isBold ? 'font-semibold text-gray-900' : ''
          }`}
      >
        {label}
      </span>
      <span className={isBold ? 'text-gray-900' : 'text-gray-700 font-medium'}>
        {value}
      </span>
    </div>
  );
}