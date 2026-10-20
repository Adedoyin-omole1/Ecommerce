// src/Components/cart/CartHeader.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/contexts/CartContext';

export default function CartHeader() {
    const { count, clearCart } = useCart();

    return (
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
                <h1 className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-tight">
                    Cart
                </h1>
                <span className="inline-flex items-center justify-center min-w-6.5 h-6 px-2 rounded-full bg-red-500 text-white text-[11px] font-bold">
                    {String(count).padStart(2, '0')}
                </span>
            </div>

            <button
                onClick={clearCart}
                className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-red-500 transition-colors"
            >
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className="w-3 h-3 group-hover:scale-110 transition-transform"
                />
                Delete All
            </button>
        </div>
    );
}