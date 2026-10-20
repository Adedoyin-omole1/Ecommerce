// src/app/(main)/contact/sections/FAQTeaser.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const DEFAULT_FAQS = [
    {
        q: 'How long does shipping take?',
        a: 'Orders typically ship within 24 hours and arrive in 3–7 business days depending on your location.',
    },
    {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy on most items. Products must be unused and in their original packaging.',
    },
    {
        q: 'Do you ship internationally?',
        a: 'Yes! We ship to over 30 countries worldwide. Shipping costs and delivery times vary by destination.',
    },
];

export default function FAQTeaser({ faqs = DEFAULT_FAQS }) {
    const [open, setOpen] = useState(0);

    return (
        <section className="bg-white py-14 lg:py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.24em] mb-2">
                        Quick Answers
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, idx) => {
                        const isOpen = open === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
                            >
                                <button
                                    onClick={() => setOpen(isOpen ? -1 : idx)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-100/60 transition-colors"
                                >
                                    <span className="text-[14px] font-semibold text-gray-900">
                                        {faq.q}
                                    </span>
                                    <span
                                        className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-sm text-red-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
                                            }`}
                                    >
                                        +
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5 -mt-1 text-[13.5px] text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Link to full FAQ */}
                <div className="mt-8 text-center">
                    <Link
                        href="/faq"
                        className="group inline-flex items-center gap-2 text-[13px] font-medium text-red-500 hover:text-red-600 transition-colors"
                    >
                        See all FAQs
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

            </div>
        </section>
    );
}