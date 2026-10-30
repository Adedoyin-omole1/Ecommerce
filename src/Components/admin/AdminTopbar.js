// src/Components/admin/Admin Kollectibles.js
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faBell,
    faChevronDown,
    faGear,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';
import toast from 'react-hot-toast';

// ✅ FIX: Removed the space in the function name
export default function AdminTopbar() {
    const router = useRouter();
    const { user, logout } = useUser();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        router.push('/login');
    };

    // Get initials or fallback
    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'AD'; // Default to Admin if no user found

    return (
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

            {/* Left side: Mobile Menu Spacer + Search */}
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile spacer for hamburger (in layout) */}
                <div className="w-10 lg:hidden shrink-0" />

                {/* Search */}
                <div className="w-full max-w-md relative">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Search products, orders, customers..."
                        className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100/70 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/15 text-[13px] text-gray-900 placeholder:text-gray-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Right side: Actions & Profile */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                {/* Notifications */}
                <button
                    aria-label="Notifications"
                    className="relative w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
                    {/* Notification dot */}
                    <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
                </button>

                {/* Divider */}
                <span className="hidden sm:block w-px h-6 bg-gray-200" />

                {/* Profile Dropdown Wrapper */}
                <div className="relative" ref={dropdownRef}>

                    {/* Profile Trigger */}
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-1 sm:pl-2 pr-1 sm:pr-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                        {/* Avatar */}
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-red-500 to-orange-500 text-white text-[11px] font-bold shadow-sm shrink-0">
                            {initials}
                        </span>

                        {/* Name & Role */}
                        <div className="hidden sm:flex flex-col text-left">
                            <p className="text-[12.5px] font-semibold text-gray-900 leading-tight">
{user?.email || 'admin@example.com'}
                            </p>
                            <p className="text-[10.5px] text-gray-500 leading-tight">
                                Store Manager
                            </p>
                        </div>

                        {/* Chevron */}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`w-2.5 h-2.5 text-gray-400 ml-1 hidden sm:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                            {/* Mobile-only header inside dropdown */}
                            <div className="px-4 py-2 border-b border-gray-50 sm:hidden">
                                <p className="text-[13px] font-bold text-gray-900">{user?.email || 'admin@example.com'}</p>
                                <p className="text-[11px] text-gray-500 truncate">{user?.email || 'admin@example.com'}</p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1">
                                <Link
                                    href="/account/profile"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-gray-400" />
                                    My Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faGear} className="w-3.5 h-3.5 text-gray-400" />
                                    Store Settings
                                </Link>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-gray-100 pt-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12.5px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5 h-3.5" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}