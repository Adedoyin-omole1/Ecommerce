// src/app/(customer)/account/addresses/page.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faPlus,
    faPen,
    faTrashCan,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';

export default function AddressesPage() {
    const { user } = useUser();

    const addresses = [
        {
            id: 1,
            label: 'Home',
            name: user?.name || 'John Doe',
            line1: '123 Fashion Avenue',
            line2: 'Apartment 4B',
            city: 'Lagos',
            state: 'Lagos State',
            zip: '100001',
            country: 'Nigeria',
            default: true,
        },
        {
            id: 2,
            label: 'Office',
            name: user?.name || 'John Doe',
            line1: '45 Business District',
            line2: 'Floor 12',
            city: 'Lagos',
            state: 'Lagos State',
            zip: '100002',
            country: 'Nigeria',
            default: false,
        },
    ];

    return (
        <div className="space-y-8">

            {/* GREETING */}
            <div>
                <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.16em]">
                    Good Morning
                </p>
                <h1 className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
                    {user?.name || 'Friend'}
                </h1>
            </div>

            {/* TABS */}
            <Tabs />

            {/* CONTENT — full width */}
            <div className="space-y-6 min-w-0">

                {/* Header row */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h2 className="text-[18px] font-bold text-gray-900">
                            Saved Addresses
                        </h2>
                        <p className="text-[13px] text-gray-500 mt-1">
                            {addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-semibold shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 transition-all shrink-0">
                        <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" />
                        Add New Address
                    </button>
                </div>

                {/* Address grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className={`bg-white rounded-2xl border p-6 transition-all ${addr.default
                                    ? 'border-orange-200 shadow-md shadow-orange-500/10'
                                    : 'border-gray-100 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-50 text-orange-500">
                                        <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                                    </span>
                                    <p className="text-[15px] font-bold text-gray-900">
                                        {addr.label}
                                    </p>
                                </div>
                                {addr.default && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wide">
                                        <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" />
                                        Default
                                    </span>
                                )}
                            </div>

                            <div className="text-[13.5px] text-gray-600 leading-relaxed">
                                <p className="font-semibold text-gray-900">
                                    {addr.name}
                                </p>
                                <p className="mt-1.5">{addr.line1}</p>
                                {addr.line2 && <p>{addr.line2}</p>}
                                <p>
                                    {addr.city}, {addr.state} {addr.zip}
                                </p>
                                <p>{addr.country}</p>
                            </div>

                            <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-4 flex-wrap">
                                <button className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-orange-500 transition-colors">
                                    <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                                    Edit
                                </button>
                                <button className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-red-500 transition-colors">
                                    <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" />
                                    Delete
                                </button>
                                {!addr.default && (
                                    <button className="ml-auto inline-flex items-center gap-2 text-[12.5px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ==========================================
// TABS
// ==========================================
function Tabs() {
    const tabs = [
        { label: 'Profile', href: '/account/profile' },
        { label: 'Wishlist', href: '/wishlist' },
        { label: 'My Order', href: '/account/orders' },
        { label: 'Saved Address', href: '/account/addresses', active: true },
        { label: 'Change Password', href: '/account/password' },
        { label: 'Logout', href: '/login' },
    ];

    return (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
            {tabs.map((tab) => (
                <Link
                    key={tab.label}
                    href={tab.href}
                    className={`shrink-0 inline-flex items-center h-11 px-6 rounded-full text-[13.5px] font-semibold transition-all ${tab.active
                            ? 'bg-gray-900 text-white shadow-md'
                            : 'bg-white border border-gray-100 text-gray-600 hover:border-gray-300'
                        }`}
                >
                    <span className="whitespace-nowrap">{tab.label}</span>
                </Link>
            ))}
        </div>
    );
}