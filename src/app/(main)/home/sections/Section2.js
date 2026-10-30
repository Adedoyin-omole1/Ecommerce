// src/app/(main)/home/sections/Section2.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faLock,
    faRotateLeft,
    faHeadset,
} from '@fortawesome/free-solid-svg-icons';

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
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex justify-center w-full"
                        >
                            <div className="flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                                <div className="shrink-0 flex items-center justify-center text-gray-900">
                                    <FontAwesomeIcon
                                        icon={feature.icon}
                                        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[12.5px] sm:text-[14px] font-semibold text-gray-900 leading-tight">
                                        {feature.title}
                                    </p>
                                    <p className="text-[10.5px] sm:text-[12px] text-gray-500 mt-0.5 sm:mt-1 leading-tight">
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