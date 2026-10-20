// src/app/(main)/about/sections/ValuesGrid.js
'use client';

const DEFAULT_VALUES = [
    {
        number: '01',
        title: 'Quality First',
        description:
            'We prioritize well-crafted, durable products designed to bring value and reliability to your everyday life.',
    },
    {
        number: '02',
        title: 'Customer-Centered',
        description:
            'Your satisfaction comes first, with seamless shopping experiences, responsive support, and thoughtfully curated products.',
    },
    {
        number: '03',
        title: 'Integrity & Transparency',
        description:
            'We believe in honest communication, ethical sourcing, and delivering exactly what we promise—no surprises.',
    },
    {
        number: '04',
        title: 'Community Focused',
        description:
            'We build connections by valuing our customers, supporting small businesses, and giving back whenever we can.',
    },
];

export default function ValuesGrid({
    image = '/assets/images/about/values.jpg',
    imageAlt = 'Our team at work',
    values = DEFAULT_VALUES,
}) {
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

                    {/* Left — Image */}
                    <div className="relative w-full aspect-4/3 lg:aspect-auto lg:h-115 rounded-2xl overflow-hidden bg-gray-100 group">
                        <img
                            src={image}
                            alt={imageAlt}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>

                    {/* Right — Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                        {values.map((value, idx) => (
                            <div
                                key={value.number}
                                className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <p className="text-[11px] font-medium text-red-500 tracking-wider">
                                    {value.number}
                                </p>
                                <h3 className="mt-2 text-[16px] font-semibold text-gray-900">
                                    {value.title}
                                </h3>
                                <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}