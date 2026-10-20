// src/Components/auth/TestimonialCarousel.js
'use client';

import { useState, useEffect } from 'react';

const DEFAULT_TESTIMONIALS = [
    {
        quote: 'I love shopping here. The quality is unmatched and shipping is always lightning fast.',
        name: 'Sarah Mitchell',
        role: 'Verified Buyer',
        initials: 'SM',
    },
    {
        quote: 'The curation is spot on. Every piece I\'ve ordered has become a wardrobe staple.',
        name: 'Amara Okafor',
        role: 'Verified Buyer',
        initials: 'AO',
    },
    {
        quote: 'Premium products, real customer care. This is my go-to store for everything.',
        name: 'James Whitfield',
        role: 'Verified Buyer',
        initials: 'JW',
    },
];

const ROTATE_INTERVAL = 5000;

export default function TestimonialCarousel({
    testimonials = DEFAULT_TESTIMONIALS,
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, ROTATE_INTERVAL);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const active = testimonials[activeIndex];

    return (
        <div className="relative">

            {/* Quote icon */}
            <span className="block text-[64px] leading-none text-white/40 font-serif">
                &ldquo;
            </span>

            {/* Testimonial content — cross-fade on change */}
            <div key={activeIndex} className="mt-2 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                <p className="text-[16px] lg:text-[18px] text-white leading-relaxed font-medium max-w-md">
                    {active.quote}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[12px] font-bold">
                        {active.initials}
                    </span>
                    <div>
                        <p className="text-[13.5px] font-semibold text-white">
                            {active.name}
                        </p>
                        <p className="text-[11px] text-white/70">
                            {active.role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Dots — clickable */}
            <div className="mt-8 flex items-center gap-2">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`View testimonial ${idx + 1}`}
                        className={`rounded-full transition-all duration-300 ${idx === activeIndex
                            ? 'w-8 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}