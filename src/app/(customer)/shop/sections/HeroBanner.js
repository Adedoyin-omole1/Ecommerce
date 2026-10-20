// src/app/(customer)/shop/sections/HeroBanner.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function HeroBanner({ title = 'Mens Shoes & Sneaker' }) {
    return (
        <div className="relative w-full h-40 sm:h-52 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
            <img
                src="/assets/images/banners/shop-hero.jpg"
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-75"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-red-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-black/60" />

            <div className="relative h-full flex items-center justify-center">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center px-6 drop-shadow-lg tracking-tight">
                    {title}
                </h1>
            </div>

            <button
                aria-label="Previous banner"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-red-500 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-colors"
            >
                <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
                aria-label="Next banner"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-red-500 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-colors"
            >
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
        </div>
    );
}