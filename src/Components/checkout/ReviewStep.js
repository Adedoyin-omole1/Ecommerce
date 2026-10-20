// src/Components/checkout/ReviewStep.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/contexts/CartContext';

export default function ReviewStep({ onContinue }) {
    const { items, subtotal } = useCart();
    const shipping = 0;
    const discount = subtotal * 0.1;
    const total = subtotal + shipping - discount;

    return (
        <div className="space-y-6">

            {/* Delivery info card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-[14px] font-bold text-gray-900 mb-3">
                            Delivery Details
                        </h3>
                        <div className="space-y-1 text-[12.5px] text-gray-600">
                            <p className="font-medium text-gray-900">
                                John Doe
                            </p>
                            <p>123 Fashion Avenue, Apartment 4B</p>
                            <p>Lagos, Lagos State 100001</p>
                            <p>Nigeria</p>
                            <p className="text-gray-500 mt-2">
                                +234 800 000 0000 · john@example.com
                            </p>
                        </div>
                    </div>

                    {/* Verified badge */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold shrink-0">
                        <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" />
                        Verified
                    </span>
                </div>
            </div>

            {/* Items review */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
                <h3 className="text-[14px] font-bold text-gray-900 mb-4">
                    Review Your Items
                </h3>

                <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                        >
                            {/* Image */}
                            <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-50">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13.5px] font-semibold text-gray-900 truncate">
                                    {item.name}
                                </p>
                                <p className="text-[11.5px] text-gray-500 mt-0.5">
                                    {item.color || 'Default'} · Size {item.size || 'M'}
                                </p>
                                <p className="text-[11.5px] text-gray-400 mt-0.5">
                                    Qty: {item.qty || 1}
                                </p>
                            </div>

                            {/* Price */}
                            <p className="text-[13.5px] font-bold text-gray-900 shrink-0">
                                ₦{(item.price * (item.qty || 1)).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Totals breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 space-y-3">
                <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">
                        ₦{subtotal.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                    <span className="text-orange-500">Discount (10%)</span>
                    <span className="font-medium text-orange-500">
                        -₦{discount.toLocaleString()}
                    </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[15px] font-bold text-gray-900">
                        Total to Pay
                    </span>
                    <span className="text-[18px] font-bold text-orange-500">
                        ₦{total.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Continue */}
            <button
                type="button"
                onClick={onContinue}
                className="w-full h-14 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
            >
                Continue to Payment →
            </button>
        </div>
    );
}