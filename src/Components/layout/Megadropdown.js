// src/Components/layout/MegaMenu.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// ==========================================
// CATEGORIES DATA
// ==========================================
const CATEGORIES = [
    {
        title: 'Women',
        href: '/shop?category=women',
        items: [
            { name: 'Dresses', href: '/shop?category=women&sub=dresses' },
            { name: 'Tops', href: '/shop?category=women&sub=tops' },
            { name: 'Shoes', href: '/shop?category=women&sub=shoes' },
            { name: 'Bags', href: '/shop?category=women&sub=bags' },
            { name: 'Jewelry', href: '/shop?category=women&sub=jewelry' },
        ],
    },
    {
        title: 'Men',
        href: '/shop?category=men',
        items: [
            { name: 'Shirts', href: '/shop?category=men&sub=shirts' },
            { name: 'Trousers', href: '/shop?category=men&sub=trousers' },
            { name: 'Shoes', href: '/shop?category=men&sub=shoes' },
            { name: 'Watches', href: '/shop?category=men&sub=watches' },
            { name: 'Bags', href: '/shop?category=men&sub=bags' },
        ],
    },
    {
        title: 'Home & Living',
        href: '/shop?category=home-living',
        items: [
            { name: 'Kitchen', href: '/shop?category=home-living&sub=kitchen' },
            { name: 'Decor', href: '/shop?category=home-living&sub=decor' },
            { name: 'Bedding', href: '/shop?category=home-living&sub=bedding' },
            { name: 'Furniture', href: '/shop?category=home-living&sub=furniture' },
            { name: 'Lighting', href: '/shop?category=home-living&sub=lighting' },
        ],
    },
    {
        title: 'Food',
        href: '/shop?category=food',
        items: [
            { name: 'Order Online', href: '/shop?category=food&sub=order' },
            { name: 'Menu', href: '/shop?category=food&sub=menu' },
            { name: 'Reservations', href: '/shop?category=food&sub=reservations' },
            { name: 'Groceries', href: '/shop?category=food&sub=groceries' },
        ],
    },
];

// ==========================================
// MARKETPLACE
// ==========================================
const MARKETPLACE = {
    title: 'Marketplace',
    href: '/shop?category=marketplace',
    items: [
        { name: 'All Products', href: '/shop?category=marketplace' },
        { name: 'Electronics', href: '/shop?category=marketplace&sub=electronics' },
        { name: 'Beauty', href: '/shop?category=marketplace&sub=beauty' },
        { name: 'Art & Crafts', href: '/shop?category=marketplace&sub=art' },
        { name: 'Books', href: '/shop?category=marketplace&sub=books' },
    ],
};

// ==========================================
// HERO VIDEO
// ==========================================
const HERO = {
    title: 'Summer Sale',
    subtitle: 'Up to 50% off sitewide',
    ctaText: 'Shop Now',
    href: '/shop?category=sale',
    video: '/assets/videos/summer-sale.mp4',
    poster: '/assets/images/summer-sale.jpg',
};

export default function MegaMenu({ onClose }) {
    return (
        <div
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl z-40"
            onMouseLeave={onClose}
        >
            <div className="max-w-325 mx-auto px-6 lg:px-8 py-5">
                <div className="grid grid-cols-[0.9fr_2.4fr] gap-5">

                    {/* LEFT PANEL — HERO VIDEO */}
                    <Link
                        href={HERO.href}
                        onClick={onClose}
                        className="group relative block rounded-xl overflow-hidden bg-black h-56"
                    >
                        <video
                            src={HERO.video}
                            poster={HERO.poster}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="relative h-full flex flex-col justify-end p-4 text-white">
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-red-400 mb-1">
                                <FontAwesomeIcon icon={faPlay} className="w-2 h-2" />
                                Limited Time
                            </span>
                            <h3 className="text-base font-bold leading-tight">{HERO.title}</h3>
                            <p className="text-[11px] text-gray-300 mt-0.5">{HERO.subtitle}</p>
                            <span className="inline-flex items-center gap-2 mt-2.5 text-[11px] font-semibold group-hover:gap-3 transition-all">
                                {HERO.ctaText}
                                <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                            </span>
                        </div>
                    </Link>

                    {/* RIGHT PANEL — CATEGORY GRID */}
                    <div className="flex flex-col">
                        <div className="grid grid-cols-4 gap-4 flex-1">
                            {CATEGORIES.map((cat) => (
                                <div key={cat.title}>
                                    <Link
                                        href={cat.href}
                                        onClick={onClose}
                                        className="block text-[11px] font-bold text-black uppercase tracking-[0.08em] mb-2.5 hover:text-red-500 transition-colors"
                                    >
                                        {cat.title}
                                    </Link>
                                    <ul className="space-y-1.5">
                                        {cat.items.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className="text-[12.5px] text-gray-600 hover:text-red-500 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100">
                            <Link
                                href={MARKETPLACE.href}
                                onClick={onClose}
                                className="inline-block text-[11px] font-bold text-black uppercase tracking-[0.08em] mb-2 hover:text-red-500 transition-colors"
                            >
                                {MARKETPLACE.title}
                            </Link>
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                {MARKETPLACE.items.map((item, idx) => (
                                    <span key={item.name} className="flex items-center gap-2.5">
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="text-[12.5px] text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                        {idx < MARKETPLACE.items.length - 1 && (
                                            <span className="text-gray-300 text-[10px]">·</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}