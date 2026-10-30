// src/Components/auth/AuthTestimonialPanel.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import TestimonialCarousel from './TestimonialCarousel';

export default function AuthTestimonialPanel({
    brand = 'King\u2019s  Kollectibles',
    headline = 'Loved by thousands',
    footerLinks = [
        { label: 'Sign In', href: '/login' },
        { label: 'Shop Now', href: '/shop' },
    ],
}) {
    return (
        <div className="relative hidden lg:flex flex-col h-full overflow-hidden rounded-r-3xl bg-linear-to-br from-red-600 via-red-500 to-orange-500">

            {/* Ambient glows */}
            <div className="pointer-events-none absolute -top-40 -right-20 w-96 h-96 rounded-full bg-white/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-orange-300/25 blur-3xl" />

            {/* Subtle dot pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* TOP — Brand mark */}
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

            {/* CENTER — Headline + testimonial */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-10 lg:px-12">

                {/* Headline */}
                <div className="mb-8">
                    <h2 className="text-[26px] lg:text-[30px] font-bold text-white leading-tight tracking-tight">
                        {headline}
                    </h2>
                </div>

                {/* Rotating testimonial */}
                <TestimonialCarousel />
            </div>

            {/* BOTTOM — Footer links */}
            <div className="relative z-10 px-10 lg:px-12 pb-10">
                <div className="pt-6 border-t border-white/20 flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
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