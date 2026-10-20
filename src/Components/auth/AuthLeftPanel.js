// src/Components/auth/AuthLeftPanel.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCrown,
    faArrowTrendUp,
    faTruckFast,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';

export default function AuthLeftPanel({
    brand = 'King\u2019s Kollitab',
    title = 'Speedy, Easy and Fast',
    description = 'Sign in to access your saved items, track orders in real time, and unlock member-only drops curated just for you.',
    footerLinks = [
        { label: 'Sign Up', href: '/signup' },
        { label: 'Discover Here', href: '/shop' },
    ],
}) {
    return (
        <div className="relative hidden lg:flex flex-col h-full overflow-hidden rounded-l-3xl bg-linear-to-br from-red-600 via-red-500 to-orange-500">

            {/* ============================================
                BACKGROUND — ambience + subtle pattern
            ============================================ */}
            <div className="pointer-events-none absolute -top-40 -right-20 w-96 h-96 rounded-full bg-white/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-orange-300/25 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* ============================================
                TOP — Brand mark
            ============================================ */}
            <div className="relative z-10 flex items-center gap-3 px-10 lg:px-12 pt-10">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25">
                    <FontAwesomeIcon icon={faCrown} className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-[15px] font-bold font-serif text-white">
                        {brand}
                    </span>
                    <span className="mt-0.5 text-[8.5px] font-medium uppercase tracking-[0.28em] text-white/60">
                        Premium Collections
                    </span>
                </div>
            </div>

            {/* ============================================
                CENTER — Illustration (mockup cards)
            ============================================ */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-8 lg:px-12">
                <div className="relative w-full max-w-sm h-72">

                    {/* Ambient glow behind mockup */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-56 h-56 rounded-full bg-white/10 blur-3xl" />
                    </div>

                    {/* CARD 1 — Big order card (back) */}
                    <div className="absolute top-0 right-0 w-52 bg-white rounded-2xl shadow-2xl shadow-black/20 p-4 rotate-6 hover:rotate-3 transition-transform duration-500">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                Order Total
                            </p>
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
                                <FontAwesomeIcon
                                    icon={faArrowTrendUp}
                                    className="w-2.5 h-2.5"
                                />
                            </span>
                        </div>

                        {/* Amount */}
                        <p className="mt-1.5 text-[22px] font-bold text-gray-900 leading-none">
                            $348.50
                        </p>

                        {/* Mini chart */}
                        <svg
                            viewBox="0 0 160 40"
                            className="mt-3 w-full h-10"
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 0 30 L 20 22 L 40 26 L 60 15 L 80 20 L 100 10 L 120 18 L 140 8 L 160 14"
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle cx="140" cy="8" r="3" fill="#ef4444" />
                            <circle cx="140" cy="8" r="6" fill="#ef4444" opacity="0.2" />
                        </svg>

                        {/* Status */}
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500">
                                <FontAwesomeIcon icon={faTruckFast} className="w-3 h-3" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold text-gray-900 leading-tight">
                                    Delivery in transit
                                </p>
                                <p className="text-[9px] text-gray-500">
                                    Arriving today at 3 PM
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2 — Small wishlist chip (front-left) */}
                    <div className="absolute bottom-0 left-0 w-40 bg-white rounded-2xl shadow-2xl shadow-black/20 p-3.5 rotate-[-8deg] hover:rotate-[-5deg] transition-transform duration-500">
                        <div className="flex items-center gap-2.5">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white shrink-0">
                                <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold text-gray-900">
                                    Saved Items
                                </p>
                                <p className="text-[9px] text-gray-500">
                                    24 in collection
                                </p>
                            </div>
                        </div>

                        {/* Mini product thumbs */}
                        <div className="mt-2.5 flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded bg-gray-100" />
                            <span className="w-6 h-6 rounded bg-amber-100" />
                            <span className="w-6 h-6 rounded bg-purple-100" />
                            <span className="w-6 h-6 rounded bg-pink-100" />
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-gray-900 text-white text-[8px] font-bold">
                                +20
                            </span>
                        </div>
                    </div>

                    {/* CARD 3 — Small floating badge */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 w-24 bg-white rounded-xl shadow-xl shadow-black/15 px-3 py-2 -rotate-3">
                        <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider leading-none">
                            Members
                        </p>
                        <p className="mt-0.5 text-[14px] font-bold text-gray-900 leading-none">
                            50K+
                        </p>
                    </div>

                    {/* Decorative dots */}
                    <span className="absolute top-4 left-8 w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="absolute bottom-6 right-12 w-2 h-2 rounded-full bg-white/40" />
                    <span className="absolute top-1/3 right-2 w-1 h-1 rounded-full bg-white/50" />
                </div>
            </div>

            {/* ============================================
                BOTTOM — Headline + description + links
            ============================================ */}
            <div className="relative z-10 px-10 lg:px-12 pb-10 text-center">
                <h2 className="text-[24px] lg:text-[26px] font-bold text-white leading-tight tracking-tight">
                    {title}
                </h2>

                <p className="mt-3 text-[13px] text-white/85 leading-relaxed max-w-sm mx-auto">
                    {description}
                </p>

                {/* Pagination dots */}
                <div className="mt-6 flex items-center justify-center gap-1.5">
                    <span className="w-6 h-1.5 rounded-full bg-white" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>

                {/* Footer links */}
                <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                    {footerLinks.map((link, idx) => (
                        <span key={link.label} className="flex items-center gap-5">
                            <Link
                                href={link.href}
                                className="hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                            {idx < footerLinks.length - 1 && (
                                <span className="w-px h-3 bg-white/30" />
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}