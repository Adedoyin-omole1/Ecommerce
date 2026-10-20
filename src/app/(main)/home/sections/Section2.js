// src/app/(main)/home/sections/section2.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faLock,
    faRotateLeft,
    faHeadset,
} from '@fortawesome/free-solid-svg-icons';

// ==========================================
// FEATURES DATA
// ==========================================
const FEATURES = [
    {
        id: 'shipping',
        icon: faTruckFast,
        title: 'Free Shipping',
        subtitle: 'On orders over $50',
    },
    {
        id: 'secure',
        icon: faLock,
        title: 'Secure Payments',
        subtitle: '100% secure checkout',
    },
    {
        id: 'returns',
        icon: faRotateLeft,
        title: 'Easy Returns',
        subtitle: '30-day return policy',
    },
    {
        id: 'support',
        icon: faHeadset,
        title: '24/7 Support',
        subtitle: 'Always here to help',
    },
];

export default function Section2() {
    return (
        <section className="bg-white border-y border-gray-100">
            <div className="max-w-325 mx-auto px-6 lg:px-8 py-10 lg:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex justify-center"
                        >
                            {/* Icon + Text side by side */}
                            <div className="flex items-center gap-3.5">
                                {/* Icon */}
                                <div className="shrink-0 flex items-center justify-center text-gray-900">
                                    <FontAwesomeIcon
                                        icon={feature.icon}
                                        className="w-8 h-8"
                                    />
                                </div>

                                {/* Text */}
                                <div className="min-w-0">
                                    <p className="text-[14px] font-semibold text-gray-900 leading-tight">
                                        {feature.title}
                                    </p>
                                    <p className="text-[12px] text-gray-500 mt-1 leading-tight">
                                        {feature.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}