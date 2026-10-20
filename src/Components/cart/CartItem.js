// src/Components/cart/CartItem.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinus,
  faPlus,
  faTrashCan,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/contexts/CartContext';

export default function CartItem({ item }) {
  const { incrementQty, decrementQty, removeItem } = useCart();
  const lineTotal = (Number(item.price) || 0) * item.qty;

  return (
    <div className="group relative grid grid-cols-12 gap-4 items-center px-4 sm:px-6 py-5 hover:bg-red-50/20 transition-colors">

      {/* Remove */}
      <div className="col-span-1 flex items-center">
        <button
          onClick={() => removeItem(item.id)}
          aria-label="Remove from cart"
          className="flex items-center justify-center w-7 h-7 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" />
        </button>
      </div>

      {/* Product */}
      <div className="col-span-11 md:col-span-5 flex items-start gap-4 min-w-0">
        <Link
          href={`/product/${item.id}`}
          className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-emerald-50/60 flex items-center justify-center"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </Link>

        <div className="min-w-0 flex-1">
          {item.category && (
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.14em] mb-1">
              {item.category}
            </p>
          )}
          <Link
            href={`/product/${item.id}`}
            className="text-[14px] font-semibold text-gray-900 hover:text-red-500 transition-colors block leading-snug"
          >
            {item.name}
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11.5px] text-gray-500">
            <span>
              Color :{' '}
              <span className="text-gray-900 font-medium">
                {item.color || 'Natural'}
              </span>
            </span>
            <span>
              Size :{' '}
              <span className="text-gray-900 font-medium">
                {item.size || 'US M8'}
              </span>
            </span>
          </div>

          <button
            aria-label="Move to wishlist"
            className="mt-3 text-gray-400 hover:text-red-500 transition-colors"
          >
            <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Mobile: price + qty */}
      <div className="col-span-12 md:hidden flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => decrementQty(item.id)}
            aria-label="Decrease quantity"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500 transition-colors"
          >
            <FontAwesomeIcon icon={faMinus} className="w-2.5 h-2.5" />
          </button>
          <span className="w-6 text-center text-[13px] font-semibold text-gray-900 tabular-nums">
            {String(item.qty).padStart(2, '0')}
          </span>
          <button
            onClick={() => incrementQty(item.id)}
            aria-label="Increase quantity"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="w-2.5 h-2.5" />
          </button>
        </div>
        <p className="text-[15px] font-bold text-gray-900">
          ${lineTotal.toFixed(2)}
        </p>
      </div>

      {/* Desktop: Price */}
      <div className="hidden md:block col-span-3">
        <p className="text-[15px] font-semibold text-gray-900">
          ${lineTotal.toFixed(2)}
        </p>
      </div>

      {/* Desktop: Qty */}
      <div className="hidden md:flex col-span-3 items-center justify-end">
        <div className="flex items-center gap-2">
          <button
            onClick={() => decrementQty(item.id)}
            aria-label="Decrease quantity"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500 transition-colors"
          >
            <FontAwesomeIcon icon={faMinus} className="w-2.5 h-2.5" />
          </button>
          <span className="w-6 text-center text-[13px] font-semibold text-gray-900 tabular-nums">
            {String(item.qty).padStart(2, '0')}
          </span>
          <button
            onClick={() => incrementQty(item.id)}
            aria-label="Increase quantity"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}