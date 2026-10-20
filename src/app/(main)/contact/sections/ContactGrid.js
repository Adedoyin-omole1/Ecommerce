// src/app/(main)/contact/sections/ContactGrid.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faLocationDot,
    faComments,
} from '@fortawesome/free-solid-svg-icons';

const DEFAULT_CARDS = [
    {
        icon: faPhone,
        title: 'Call Us',
        line1: '+234 800 000 0000',
        line2: 'Mon–Fri, 9am–6pm',
        href: 'tel:+2348000000000',
        accent: 'bg-red-50 text-red-500',
    },
    {
        icon: faEnvelope,
        title: 'Email Us',
        line1: 'hello@novatrend.com',
        line2: 'We reply within 24h',
        href: 'mailto:hello@novatrend.com',
        accent: 'bg-orange-50 text-orange-500',
    },
    {
        icon: faLocationDot,
        title: 'Visit Us',
        line1: '123 Fashion Avenue',
        line2: 'Lagos, Nigeria',
        href: 'https://maps.google.com',
        accent: 'bg-emerald-50 text-emerald-500',
    },
    {
        icon: faComments,
        title: 'Live Chat',
        line1: 'Available 24/7',
        line2: 'Chat with our team',
        href: '#',
        accent: 'bg-blue-50 text-blue-500',
    },
];

export default function ContactGrid({ cards = DEFAULT_CARDS }) {
    return (
        <section className="bg-white py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cards.map((card, idx) => (
                        <Link
                            key={idx}
                            href={card.href}
                            className="group bg-white border border-gray-100 hover:border-red-200 hover:shadow-lg hover:-translate-y-1 rounded-2xl p-5 transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                            style={{ animationDelay: `${idx * 0.08}s` }}
                        >
                            <div
                                className={`flex items-center justify-center w-11 h-11 rounded-xl ${card.accent} mb-4`}
                            >
                                <FontAwesomeIcon icon={card.icon} className="w-4 h-4" />
                            </div>
                            <h3 className="text-[14px] font-bold text-gray-900">
                                {card.title}
                            </h3>
                            <p className="mt-2 text-[13px] text-gray-700 font-medium truncate">
                                {card.line1}
                            </p>
                            <p className="text-[12px] text-gray-500 mt-0.5">
                                {card.line2}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}