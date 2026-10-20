// src/app/(main)/about/sections/AboutHero.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function AboutHero({
    eyebrow = 'Our Story',
    title = 'Crafting Products People Love',
    subtitle = 'We are a multi-category marketplace bringing together fashion, home, beauty, and everyday essentials — curated with care, delivered with purpose.',
}) {
    return (
        <section className="relative bg-white overflow-hidden pt-16 lg:pt-24 pb-10 lg:pb-14">

            {/* Ambient red/orange glow */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-red-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
                    <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-red-500" />
                    </span>
                    <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.24em]">
                        {eyebrow}
                    </p>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-gray-900 leading-[1.05] tracking-[-0.02em] max-w-4xl opacity-0 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards]">
                    {title}
                </h1>

                {/* Subtitle + CTA */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards]">
                    <p className="text-[15px] text-gray-600 max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>

                    <Link
                        href="/shop"
                        className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold px-6 py-3 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0"
                    >
                        Explore Shop
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}