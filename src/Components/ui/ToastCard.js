// src/Components/ui/ToastCard.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';

// ==========================================
// ADD TO CART TOAST
// ==========================================
export function CartToast({ items = [], total = 0, count = 1 }) {
    const previewItems = items.slice(-3); // last 3 items

    return (
        <div className="w-[320px] sm:w-90 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600">
                    <FontAwesomeIcon icon={faCartShopping} className="w-3 h-3" />
                </span>
                <p className="text-[13px] font-semibold text-gray-900">
                    Added to cart
                </p>
                <span className="ml-auto flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {count}
                </span>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-50">
                {previewItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-4 py-2.5">
                        <div className="shrink-0 w-11 h-11 rounded-lg overflow-hidden bg-gray-50">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[12.5px] font-semibold text-gray-900 truncate">
                                {item.name}
                            </p>
                            <p className="text-[11px] text-gray-500">
                                {item.size || 'US M8'} · {item.color || 'Natural'}
                            </p>
                        </div>
                        <p className="shrink-0 text-[13px] font-semibold text-gray-900">
                            ${(Number(item.price) * (item.qty || 1)).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/60">
                <span className="text-[12.5px] font-medium text-gray-500">
                    Total
                </span>
                <span className="text-[14px] font-bold text-gray-900">
                    ${total.toFixed(2)}
                </span>
            </div>
        </div>
    );
}

// ==========================================
// ADD TO WISHLIST TOAST
// ==========================================
export function WishlistToast({ item, count = 1 }) {
    return (
        <div className="w-70 sm:w-[320px] bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-500 shrink-0">
                    <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-gray-900">
                        Added to your collection
                    </p>
                    {item?.name && (
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">
                            {item.name}
                        </p>
                    )}
                </div>
                <span className="shrink-0 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {count}
                </span>
            </div>
        </div>
    );
}