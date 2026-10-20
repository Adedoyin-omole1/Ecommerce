// src/Components/account/CollectionsBanner.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function CollectionsBanner({
    eyebrow = 'Collections',
    title = 'Explore The Various Collection of Our Curated Picks',
    description =
    "Don't miss out on shopping our latest collection — you'll not be let down.",
    ctaLabel = 'Explore Collections',
    ctaHref = '/shop',
    image = '/assets/images/banners/collections.jpg',
    imageAlt = 'Clothing on hangers',
}) {
    return (
        <Link
            href={ctaHref}
            className="group block relative overflow-hidden rounded-3xl bg-gray-100 hover:shadow-xl transition-all duration-500"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-50 md:min-h-60">

                {/* ============ LEFT — Image ============ */}
                <div className="relative overflow-hidden bg-gray-200 order-2 md:order-1">
                    <img
                        src={image}
                        alt={imageAlt}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* ============ RIGHT — Text ============ */}
                <div className="relative flex flex-col justify-center px-6 sm:px-10 py-8 md:py-10 order-1 md:order-2">

                    {/* Eyebrow */}
                    <p className="text-[11px] font-semibold text-gray-500 tracking-wide">
                        <span className="text-orange-500">- </span>
                        {eyebrow}
                    </p>

                    {/* Title */}
                    <h2 className="mt-3 text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-gray-900 leading-[1.2] tracking-tight max-w-md">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="mt-3 text-[13.5px] text-gray-500 leading-relaxed max-w-md">
                        {description}
                    </p>

                    {/* CTA — appears on hover as a subtle inline link */}
                    <span className="mt-5 inline-flex items-center gap-2 text-[12.5px] font-semibold text-orange-500 group-hover:text-orange-600 transition-colors">
                        {ctaLabel}
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        />
                    </span>
                </div>
            </div>
        </Link>
    );
}