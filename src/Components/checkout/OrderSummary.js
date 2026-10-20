// src/Components/checkout/OrderSummary.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShieldHalved,
    faTruckFast,
    faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/contexts/CartContext';

export default function OrderSummary() {
    const { items, subtotal, count } = useCart();

    const shipping = 0;
    const discount = Math.round(subtotal * 0.1);
    const total = subtotal + shipping - discount;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">

            {/* ============ HEADER ============ */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-[15px] font-bold text-gray-900">
                    Order Summary
                </h2>
                <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-orange-50 text-orange-600 text-[11px] font-bold">
                    {count}
                </span>
            </div>

            {/* ============ ITEMS ============ */}
            <div className="max-h-90 overflow-y-auto">
                {items.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                        <p className="text-[13px] text-gray-500">
                            Your cart is empty.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start gap-3.5 px-6 py-4 hover:bg-gray-50/40 transition-colors"
                            >
                                {/* Image */}
                                <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML =
                                                '<div class="flex items-center justify-center w-full h-full text-gray-300 text-[10px]">No Image</div>';
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold text-gray-900 truncate leading-snug">
                                        {item.name}
                                    </p>
                                    <p className="text-[11px] text-gray-500 mt-1">
                                        {item.color || 'Default'}
                                        {item.category && ` / ${item.category}`}
                                    </p>
                                    <p className="text-[11px] text-gray-500">
                                        Size: {item.size || 'US M8'}
                                    </p>
                                </div>

                                {/* Price */}
                                <p className="shrink-0 text-[13px] font-bold text-gray-900 tabular-nums">
                                    ₦{(item.price * (item.qty || 1)).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ============ TOTALS ============ */}
            <div className="px-6 py-5 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900 tabular-nums">
                        ₦{subtotal.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-semibold text-emerald-600">
                        Free
                    </span>
                </div>
                {discount > 0 && (
                    <div className="flex items-center justify-between text-[13px]">
                        <span className="text-orange-500">Discount (10%)</span>
                        <span className="font-semibold text-orange-500 tabular-nums">
                            -₦{discount.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>

            {/* ============ GRAND TOTAL ============ */}
            <div className="px-6 py-5 border-t-2 border-dashed border-gray-200 bg-orange-50/40">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Total
                        </p>
                        <p className="text-[10.5px] text-gray-400 mt-0.5">
                            Including all taxes
                        </p>
                    </div>
                    <p className="text-[24px] font-bold text-orange-500 leading-none tabular-nums">
                        ₦{total.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* ============ TRUST ROW ============ */}
            <div className="px-6 py-5 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-3">
                    <Trust icon={faShieldHalved} label="Secure" sub="Checkout" />
                    <Trust icon={faTruckFast} label="Free" sub="Shipping" />
                    <Trust icon={faRotateLeft} label="Easy" sub="Returns" />
                </div>
            </div>
        </div>
    );
}

// ==========================================
// TRUST ITEM
// ==========================================
function Trust({ icon, label, sub }) {
    return (
        <div className="flex flex-col items-center text-center gap-2">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-50 text-orange-500">
                <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />
            </span>
            <div>
                <p className="text-[10.5px] font-bold text-gray-900 leading-tight">
                    {label}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                    {sub}
                </p>
            </div>
        </div>
    );
}