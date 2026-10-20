// src/app/(main)/about/sections/ImageStrip.js
'use client';

import { useState } from 'react';

// ==========================================
// IMAGE DATA — replace paths with your own
// ==========================================
const DEFAULT_IMAGES = [
    { src: '/assets/images/about/strip-1.jpg', alt: 'Our studio' },
    { src: '/assets/images/about/strip-2.jpg', alt: 'Behind the scenes' },
    { src: '/assets/images/about/strip-3.jpg', alt: 'Workspace' },
    { src: '/assets/images/about/strip-4.jpg', alt: 'Our products' },
    { src: '/assets/images/about/strip-5.jpg', alt: 'Team at work' },
];

// ==========================================
// SPEED PRESETS — static classes so Tailwind sees them
// ==========================================
const SPEED_CLASSES = {
    20: '[animation:scrollStrip_20s_linear_infinite]',
    30: '[animation:scrollStrip_30s_linear_infinite]',
    40: '[animation:scrollStrip_40s_linear_infinite]',
    50: '[animation:scrollStrip_50s_linear_infinite]',
    60: '[animation:scrollStrip_60s_linear_infinite]',
    80: '[animation:scrollStrip_80s_linear_infinite]',
};

export default function ImageStrip({
    images = DEFAULT_IMAGES,
    speed = 40, // must match one of the keys above
}) {
    const [paused, setPaused] = useState(false);

    // Duplicate images for a seamless infinite loop
    const loopedImages = [...images, ...images];

    // Pick the static speed class (fallback to 40s)
    const speedClass = SPEED_CLASSES[speed] || SPEED_CLASSES[40];

    // Pause the animation on hover
    const pauseClass = paused ? '[animation-play-state:paused]' : '';

    return (
        <section className="bg-white py-6 lg:py-8">
            <div className="relative w-full overflow-hidden">

                {/* Left fade */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 z-10 bg-linear-to-r from-white to-transparent" />

                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 z-10 bg-linear-to-l from-white to-transparent" />

                {/* Scroll track */}
                <div
                    className={`flex gap-3 lg:gap-4 w-max ${speedClass} ${pauseClass}`}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {loopedImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative shrink-0 w-40 sm:w-50 lg:w-60 xl:w-70 aspect-3/4 rounded-lg overflow-hidden bg-gray-100"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}