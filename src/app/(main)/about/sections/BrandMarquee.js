// src/app/(main)/about/sections/BrandMarquee.js
'use client';

const DEFAULT_WORDS = [
    'Quality',
    'Curated',
    'Sustainable',
    'Timeless',
    'Crafted',
    'Modern',
];

export default function BrandMarquee({
    words = DEFAULT_WORDS,
    speed = 30,
}) {
    // Duplicate for a seamless loop
    const loopedWords = [...words, ...words, ...words];

    return (
        <section className="bg-gray-950 py-6 lg:py-8 overflow-hidden border-y border-gray-800">
            <div className="relative w-full">

                {/* Left fade */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10 bg-linear-to-r from-gray-950 to-transparent" />

                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10 bg-linear-to-l from-gray-950 to-transparent" />

                {/* Track */}
                <div className="flex items-center gap-8 lg:gap-12 w-max animate-[marqueeLeft_30s_linear_infinite]">
                    {loopedWords.map((word, idx) => (
                        <div key={idx} className="flex items-center gap-8 lg:gap-12 shrink-0">
                            <span className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight">
                                {word}
                            </span>
                            <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-red-500 shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}