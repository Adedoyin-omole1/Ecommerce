// src/app/(main)/contact/sections/ContactHero.js
'use client';

export default function ContactHero({
    eyebrow = 'Get in Touch',
    title = "We'd Love to Hear From You",
    subtitle = 'Questions, feedback, partnerships, or just want to say hi? Our team is here to help — reach out any time.',
}) {
    return (
        <section className="relative bg-white overflow-hidden pt-16 lg:pt-20 pb-10 lg:pb-12">

            {/* Ambient glows */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-red-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-5 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
                    <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-red-500" />
                    </span>
                    <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.24em]">
                        {eyebrow}
                    </p>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-gray-900 leading-[1.05] tracking-[-0.02em] max-w-3xl mx-auto opacity-0 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards]">
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-[15px] text-gray-600 max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards]">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}