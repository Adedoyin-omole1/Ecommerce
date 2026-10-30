// src/Components/checkout/OrderReceipt.js
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faDownload,
    faArrowRight,
    faCrown,
    faBoxOpen,
    faTruckFast,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/contexts/CartContext';

export default function OrderReceipt({ orderData }) {
    const { items, subtotal } = useCart();
    const [generated, setGenerated] = useState(false);

    const shipping = 0;
    const discount = subtotal * 0.1;
    const total = subtotal + shipping - discount;

    // Generate an order number once
    const orderNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;

    // Estimate delivery (5 business days)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const formattedDate = deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });

    const handleGenerateReceipt = () => {
        setGenerated(true);
        setTimeout(() => {
            window.print();
        }, 200);
    };

    return (
        <div className="relative">

            {/* ============================================
                MAIN RECEIPT CARD
            ============================================ */}
            <div
                id="print-receipt"
                className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden"
            >

                {/* ============ HEADER ============ */}
                <div className="relative px-8 sm:px-10 pt-10 pb-8 bg-linear-to-br from-orange-50 via-white to-white">

                    {/* Decorative brand glow */}
                    <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-orange-200/30 blur-3xl" />

                    {/* Top row — Brand + Status pill */}
                    <div className="relative flex items-start justify-between gap-4 mb-8">
                        {/* Brand mark */}
                        <div className="flex items-center gap-2.5">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-red-500 to-orange-500 shadow-md shadow-orange-500/25">
                                <FontAwesomeIcon icon={faCrown} className="w-4 h-4 text-white" />
                            </span>
                            <div className="flex flex-col leading-none">
                                <span className="text-[14px] font-bold font-serif text-gray-900">
                                    King&apos;s  Kollectibles
                                </span>
                                <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.28em] text-gray-400">
                                    Premium Collections
                                </span>
                            </div>
                        </div>

                        {/* Status pill */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10.5px] font-semibold shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Order Confirmed
                        </span>
                    </div>

                    {/* Success check */}
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 mb-5">
                        <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                    </div>

                    {/* Headline */}
                    <h1 className="relative text-[26px] sm:text-[32px] font-bold text-gray-900 leading-[1.1] tracking-tight max-w-lg">
                        Thank you for your purchase!
                    </h1>

                    <p className="relative mt-3 text-[13px] text-gray-600 leading-relaxed max-w-md">
                        Your order is confirmed. We&apos;re preparing it for
                        shipment and will email you as soon as it&apos;s on the
                        way.
                    </p>

                    {/* Order number + action links */}
                    <div className="relative mt-6 flex items-center flex-wrap gap-x-6 gap-y-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
                                Order
                            </span>
                            <span className="text-[13px] font-bold text-gray-900 tabular-nums">
                                {orderNumber}
                            </span>
                        </div>
                        <span className="w-px h-4 bg-gray-200" />
                        <Link
                            href="/account/orders"
                            className="text-[12.5px] font-semibold text-orange-500 hover:text-orange-600 border-b border-orange-500/40 hover:border-orange-600 transition-colors"
                        >
                            View order
                        </Link>
                        <Link
                            href="/shop"
                            className="text-[12.5px] font-semibold text-orange-500 hover:text-orange-600 border-b border-orange-500/40 hover:border-orange-600 transition-colors"
                        >
                            Keep shopping
                        </Link>
                    </div>
                </div>

                {/* ============ DELIVERY TIMELINE ============ */}
                <div className="px-8 sm:px-10 py-6 border-t border-gray-100 bg-white">
                    <div className="flex items-center justify-between gap-4">

                        {/* Step 1 */}
                        <div className="flex items-center gap-3 flex-1">
                            <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-white">
                                <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[12px] font-semibold text-gray-900">
                                    Order placed
                                </p>
                                <p className="text-[10.5px] text-gray-500">
                                    Confirmed
                                </p>
                            </div>
                        </div>

                        {/* Connector */}
                        <span className="hidden sm:block h-px flex-1 bg-linear-to-r from-emerald-500 to-gray-200" />

                        {/* Step 2 */}
                        <div className="flex items-center gap-3 flex-1">
                            <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-orange-100 text-orange-500">
                                <FontAwesomeIcon icon={faBoxOpen} className="w-3.5 h-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[12px] font-semibold text-gray-900">
                                    Processing
                                </p>
                                <p className="text-[10.5px] text-gray-500">
                                    In progress
                                </p>
                            </div>
                        </div>

                        {/* Connector */}
                        <span className="hidden sm:block h-px flex-1 bg-gray-200" />

                        {/* Step 3 */}
                        <div className="flex items-center gap-3 flex-1">
                            <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-400">
                                <FontAwesomeIcon icon={faTruckFast} className="w-3.5 h-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[12px] font-semibold text-gray-500">
                                    Delivery
                                </p>
                                <p className="text-[10.5px] text-gray-400">
                                    Est. {formattedDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============ ORDER ITEMS ============ */}
                <div className="px-8 sm:px-10 py-6 bg-gray-50/60 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.12em]">
                            Order Summary
                        </h3>
                        <span className="text-[10.5px] text-gray-500">
                            {items.length} {items.length === 1 ? 'item' : 'items'}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white border border-gray-100"
                            >
                                <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-50">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[12.5px] font-semibold text-gray-900 truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-[10.5px] text-gray-500 mt-0.5">
                                        {item.color || 'Default'} · Size {item.size || 'M'}
                                    </p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-[12.5px] font-bold text-gray-900">
                                        ₦{(item.price * (item.qty || 1)).toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                        × {item.qty || 1}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============ TOTALS ============ */}
                <div className="px-8 sm:px-10 py-6 bg-white">
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="text-gray-900 font-medium">
                                ₦{subtotal.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-gray-500">Shipping</span>
                            <span className="text-emerald-600 font-medium">
                                Free
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-orange-500">
                                Discount (10%)
                            </span>
                            <span className="text-orange-500 font-medium">
                                -₦{discount.toLocaleString()}
                            </span>
                        </div>

                        <div className="pt-4 mt-3 border-t-2 border-dashed border-gray-200 flex items-center justify-between">
                            <span className="text-[14px] font-bold text-gray-900">
                                Total Paid
                            </span>
                            <span className="text-[22px] font-bold text-orange-500 tabular-nums">
                                ₦{total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ============ PAYMENT METHOD ============ */}
                {orderData && (
                    <div className="px-8 sm:px-10 pb-8">
                        <div className="rounded-xl bg-linear-to-br from-orange-50 to-orange-50/40 border border-orange-100 p-4 flex items-center gap-4">
                            <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/25">
                                <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10.5px] font-semibold text-orange-600 uppercase tracking-wider">
                                    Paid via
                                </p>
                                <p className="text-[13px] font-semibold text-gray-900 mt-0.5 truncate">
                                    {orderData.method}
                                    {orderData.bank && orderData.bank !== orderData.method && (
                                        <span className="text-gray-500 font-normal">
                                            {' '}· {orderData.bank}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============ FOOTER ============ */}
                <div className="px-8 sm:px-10 py-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
                        <p className="text-[11px] text-gray-500">
                            Need help? Reach us at{' '}
                            <a
                                href="mailto:hello@novatrend.com"
                                className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                hello@novatrend.com
                            </a>
                        </p>
                        <div className="flex items-center gap-2 text-[10.5px] text-gray-400">
                            <FontAwesomeIcon icon={faEnvelope} className="w-2.5 h-2.5" />
                            A copy has been sent to your email
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================
                ACTIONS (hidden when printing)
            ============================================ */}
            <div className="mt-6 space-y-3" data-print-hide>
                <button
                    onClick={handleGenerateReceipt}
                    disabled={generated}
                    className="group w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-emerald-500 text-white text-[13.5px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                    {generated ? (
                        <>
                            <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" />
                            Receipt Downloaded
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
                            Generate Receipt
                        </>
                    )}
                </button>

                <Link
                    href="/shop"
                    className="group w-full h-12 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 text-[13.5px] font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    Continue Shopping
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </div>
        </div>
    );
}