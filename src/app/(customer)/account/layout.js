// src/app/(customer)/account/layout.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';

const TABS = [
    { label: 'Overview', href: '/account' },
    { label: 'My Orders', href: '/account/orders' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Saved Addresses', href: '/account/addresses' },
    { label: 'Profile', href: '/account/profile' },
    { label: 'Change Password', href: '/account/password' },
];

export default function AccountLayout({ children }) {
    const { user } = useUser();
    const pathname = usePathname();
    const [greeting, setGreeting] = useState('Welcome');

    // Dynamic Greeting based on time
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    // Extract first name safely
    const firstName = user?.name ? user.name.split(' ')[0] : 'Friend';

    return (
        <section className="bg-gray-50 min-h-screen">
            <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-[12px] font-bold text-orange-500 uppercase tracking-[0.16em]">
                        {greeting}
                    </p>
                    <h1 className="mt-2 text-[28px] sm:text-[34px] font-bold text-gray-900 tracking-tight">
                        {firstName}
                    </h1>
                </div>

                {/* Navigation Tabs (Scrollable on Mobile) */}
                <div className="mb-8 flex items-center gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2">
                    {TABS.map((tab) => {
                        // Check if active (exact match for /account, startsWith for others)
                        const isActive = tab.href === '/account'
                            ? pathname === '/account'
                            : pathname.startsWith(tab.href);

                        return (
                            <Link
                                key={tab.label}
                                href={tab.href}
                                className={`shrink-0 inline-flex items-center h-11 px-6 rounded-full text-[13px] font-semibold transition-all ${isActive
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Page Content */}
                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    );
}