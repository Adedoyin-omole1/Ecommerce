// src/Components/layout/UserMenu.js
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faGear,
    faBoxOpen,
    faHeart,
    faRightFromBracket,
    faChevronDown,
    faGauge,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';

// ==========================================
// MENU ITEMS
// ==========================================
const MENU_ITEMS = [
    { label: 'My Account', href: '/account', icon: faGauge },
    { label: 'Orders', href: '/account/orders', icon: faBoxOpen },
    { label: 'Wishlist', href: '/wishlist', icon: faHeart },
    { label: 'Settings', href: '/account/profile', icon: faGear },
];

export default function UserMenu() {
    const { user, logout } = useUser();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on ESC
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleLogout = () => {
        setOpen(false);
        logout();
        router.push('/login');
    };

    if (!user) return null;

    // ----- Initials fallback -----
    const initials = user.name
        ? user.name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'U';

    return (
        <div ref={ref} className="relative">

            {/* Trigger — avatar + name */}
            <button
                onClick={() => setOpen(!open)}
                aria-haspopup="true"
                aria-expanded={open}
                className="group flex items-center gap-2 text-[13px] font-medium text-gray-800 hover:text-black transition-colors"
            >
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-orange-500 to-red-500 text-white text-[11px] font-bold shadow-sm">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        initials
                    )}
                </span>

                <span className="hidden xl:inline max-w-20 truncate">
                    {user.name.split(' ')[0]}
                </span>

                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-2 h-2 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/5 z-50 overflow-hidden">

                    {/* Header */}
                    <div className="px-5 py-4 bg-linear-to-br from-orange-50 to-red-50/50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 text-white text-[13px] font-bold shadow-sm">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    initials
                                )}
                            </span>
                            <div className="min-w-0">
                                <p className="text-[13.5px] font-bold text-gray-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-[11px] text-gray-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                        {MENU_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="w-3.5 h-3.5 text-gray-400"
                                />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Footer — logout */}
                    <div className="border-t border-gray-100 py-1.5">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                className="w-3.5 h-3.5 text-gray-400"
                            />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}