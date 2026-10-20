// src/app/(main)/about/sections/CTABanner.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function CTABanner({
    title = 'Join Our Journey',
    subtitle = 'Discover thousands of curated products across fashion, home, beauty, and more.',
    ctaText = 'Start Shopping',
    ctaHref = '/shop',
}) {
    return (
        <section className="bg-white py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 px-8 py-12 lg:px-14 lg:py-16">

                    {/* Brand glow */}
                    <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-red-500/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl" />

                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                {title}
                            </h2>
                            <p className="mt-3 text-[14px] text-white/70 leading-relaxed">
                                {subtitle}
                            </p>
                        </div>

                        <Link
                            href={ctaHref}
                            className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0 self-start lg:self-auto"
                        >
                            {ctaText}
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}