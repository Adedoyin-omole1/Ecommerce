// src/app/(main)/home/sections/section5.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';

// ==========================================
// ABOUT SECTION — IMAGE + PLAY → VIDEO MODAL
// ==========================================
export default function Section5() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll while the modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on ESC key
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <section className="bg-white py-10 lg:py-12">
                <div className="max-w-325 mx-auto px-6 lg:px-8">

                    {/* ============================================
                        ABOUT SECTION BANNER
                    ============================================ */}
                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-gray-950 via-gray-900 to-gray-800 min-h-70 lg:min-h-80">

                        {/* Ambient glows */}
                        <div className="pointer-events-none absolute -top-24 -left-16 w-72 h-72 rounded-full bg-red-500/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-2 h-full items-center">

                            {/* ============================================
                                LEFT — TEXT
                            ============================================ */}
                            <div className="flex flex-col justify-center p-8 lg:p-12 relative z-10">

                                <p className="text-[11px] font-semibold text-red-400 uppercase tracking-[0.24em] mb-3">
                                    About Us
                                </p>

                                <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                                    Our Brand
                                    <br />
                                    Our Story
                                </h2>

                                <p className="mt-4 text-[13px] lg:text-[14px] text-white/70 leading-relaxed max-w-md">
                                    We&apos;re more than a store — we&apos;re a movement.
                                    Built on passion, quality, and purpose, we bring
                                    curated fashion, lifestyle, and everyday essentials
                                    to people who value the details.
                                </p>

                                <div className="mt-6 flex items-center gap-1.5">
                                    <span className="block w-10 h-0.5 bg-red-500" />
                                    <span className="block w-3 h-0.5 bg-red-500/60" />
                                    <span className="block w-1.5 h-0.5 bg-red-500/30" />
                                </div>

                                <div className="mt-7">
                                    <Link
                                        href="/about"
                                        className="group inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 text-[12px] font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                                    >
                                        Learn More About Us
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform"
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* ============================================
                                RIGHT — IMAGE + PLAY BUTTON
                            ============================================ */}
                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                aria-label="Play brand story video"
                                className="group relative h-55 lg:h-full overflow-hidden cursor-pointer"
                            >
                                {/* Poster image */}
                                <img
                                    src="/assets/images/banners/brand-story.jpg"
                                    alt="Our Brand Story"
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />

                                {/* Dark gradient overlay for text blend */}
                                <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/40 to-transparent" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                                {/* Play button */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                                    {/* Pulsing ring */}
                                    <span className="absolute w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-white/40 animate-ping" />

                                    {/* Button */}
                                    <span className="relative flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/15 group-hover:bg-white/25 backdrop-blur-md border-2 border-white/50 transition-all group-hover:scale-110">
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            className="w-4 h-4 lg:w-5 lg:h-5 text-white ml-0.5"
                                        />
                                    </span>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                VIDEO MODAL
            ============================================ */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Brand story video"
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close video"
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-colors"
                    >
                        <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
                    </button>

                    {/* Video wrapper — stops click-through */}
                    <div
                        className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            src="/assets/videos/brand-story.mp4"
                            poster="/assets/images/banners/brand-story.jpg"
                            autoPlay
                            controls
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}
        </>
    );
}