// src/Components/account/AccountPageHeader.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

const TABS = [
    { label: 'Profile', href: '/account/profile' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'My Order', href: '/account/orders' },
    { label: 'Saved Address', href: '/account/addresses' },
    { label: 'Change Password', href: '/account/password' },
];

export default function AccountPageHeader({
    greeting = 'Good Morning',
    showLogout = true,
}) {
    const pathname = usePathname();
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    };

    const firstName = user?.name || 'Friend';

    return (
        <div className="space-y-5">
            {/* Greeting */}
            <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.14em]">
                    {greeting}
                </p>
                <h1 className="mt-1.5 text-[24px] sm:text-[28px] font-bold text-gray-900 tracking-tight">
                    {firstName}
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
                {TABS.map((tab) => {
                    const isActive =
                        tab.href === '/account/orders'
                            ? pathname.startsWith('/account/orders')
                            : pathname.startsWith(tab.href);

                    return (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className={`shrink-0 inline-flex items-center h-9 px-4 rounded-full text-[12.5px] font-medium transition-all ${isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white border border-gray-100 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <span className="whitespace-nowrap">
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}

                {showLogout && (
                    <button
                        onClick={handleLogout}
                        className="shrink-0 inline-flex items-center h-9 px-4 rounded-full text-[12.5px] font-medium bg-white border border-gray-100 text-gray-600 hover:border-red-200 hover:text-red-500 transition-all"
                    >
                        <span className="whitespace-nowrap">Logout</span>
                    </button>
                )}
            </div>
        </div>
    );
}