// src/app/(main)/home/sections/section1.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// ==========================================
// FLOATING PRODUCT CARDS DATA
// ==========================================
const PRODUCTS = [
    {
        id: 'sneakers',
        name: 'Air Max 270',
        price: 129.99,
        image: '/assets/images/products/image1.jpg',
        position: 'top-[8%] left-[0%]',
    },
    {
        id: 'headphones',
        name: 'Wireless Headphones',
        price: 89.99,
        image: '/assets/images/products/image2.jpg',
        position: 'top-[48%] left-[-4%]',
    },
    {
        id: 'watch',
        name: 'Smart Watch',
        price: 199.99,
        image: '/assets/images/products/image3.jpg',
        position: 'top-[12%] right-[0%]',
    },
    {
        id: 'bottle',
        name: 'Water Bottle',
        price: 24.99,
        image: '/assets/images/products/image4.jpg',
        position: 'bottom-[10%] right-[-4%]',
    },
];

// ==========================================
// SOCIAL PROOF AVATARS
// ==========================================
const AVATARS = [
    '/assets/avatars/user1.png',
    '/assets/avatars/user2.png',
    '/assets/avatars/user3.png',
    '/assets/avatars/user4.png',
];

export default function Section1() {
    return (
        <section className="relative bg-linear-to-br from-gray-50 via-white to-gray-100 overflow-hidden">

            {/* Ambient background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[10%] right-[5%] w-125 h-125 rounded-full bg-red-100/40 blur-3xl" />
                <div className="absolute bottom-[5%] left-[5%] w-125 h-125 rounded-full bg-orange-100/40 blur-3xl" />
            </div>

            <div className="relative max-w-325 mx-auto px-6 lg:px-8 pt-16 lg:pt-10 pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-end">

                    {/* ============================================
                        LEFT COLUMN — TEXT CONTENT
                    ============================================ */}
                    <div className="relative z-10 lg:self-center">

                        {/* Eyebrow with dot */}
                        <div className="inline-flex items-center gap-2 mb-5">
                            <span className="relative flex w-2 h-2">
                                <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex w-2 h-2 rounded-full bg-red-500" />
                            </span>
                            <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.24em]">
                                Trending Now
                            </p>
                        </div>

                        {/* Headline with gradient keyword */}
                        <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-bold text-gray-900 leading-[1.02] tracking-[-0.02em]">
                            Discover Products
                            <br />
                            You&apos;ll{' '}
                            <span className="relative inline-block">
                                <span className="bg-linear-to-r from-red-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                                    Love
                                </span>
                                <svg
                                    className="absolute -bottom-1 left-0 w-full h-2 text-red-400/40"
                                    viewBox="0 0 100 8"
                                    preserveAspectRatio="none"
                                    fill="none"
                                >
                                    <path
                                        d="M2 6 Q 50 -2, 98 6"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 text-[16px] text-gray-600 leading-relaxed max-w-md">
                            Shop the latest trending products curated for modern
                            lifestyles. Premium quality, unbeatable prices.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/shop"
                                className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[14px] font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all"
                            >
                                Shop Now
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                            <Link
                                href="/collections"
                                className="group inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 text-[14px] font-semibold px-7 py-3.5 rounded-full border border-gray-200 hover:border-gray-900 transition-all"
                            >
                                Explore Collection
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex -space-x-2.5">
                                {AVATARS.map((src, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-white overflow-hidden flex items-center justify-center shadow-sm"
                                        style={{ background: `hsl(${i * 60 + 20}, 75%, 70%)` }}
                                    >
                                        <img
                                            src={src}
                                            alt={`Customer ${i + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-[13px] leading-tight">
                                <p className="font-bold text-gray-900">50,000+ customers</p>
                                <p className="text-gray-500">trust us worldwide</p>
                            </div>
                        </div>
                    </div>

                    {/* ============================================
                        RIGHT COLUMN — MODEL IMAGE STICKS TO BOTTOM
                    ============================================ */}
                    <div className="relative h-105 sm:h-125 lg:h-140 w-full">

                        {/* Soft glow behind model */}
                        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                            <div className="w-[70%] h-[70%] rounded-full bg-linear-to-br from-red-100/60 to-orange-100/60 blur-3xl translate-y-6" />
                        </div>

                        {/* Model Image */}
                        <img
                            src="/assets/hero-model.png"
                            alt="Model wearing trending products"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 max-h-full w-auto object-contain drop-shadow-2xl"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />

                        {/* Floating Product Cards */}
                        {PRODUCTS.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className={`group absolute ${product.position} z-20 bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden w-36 sm:w-40 border border-gray-100/80 hover:border-red-200`}
                            >
                                {/* Product image */}
                                <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-gray-900 text-[14px] font-bold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                                        +
                                    </span>
                                </div>

                                {/* Product info */}
                                <div className="px-3.5 pt-2.5 pb-3">
                                    <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.08em]">
                                        Product
                                    </p>
                                    <p className="text-[12px] font-semibold text-gray-900 truncate text-left mt-1 group-hover:text-red-500 transition-colors">
                                        {product.name}
                                    </p>
                                    <p className="text-[13px] font-bold text-gray-900 text-left mt-1">
                                        ${product.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}