// src/Components/admin/AdminSidebar.js
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGauge,
    faBagShopping,
    faBox,
    faUsers,
    faChartLine,
    faBullhorn,
    faTag,
    faFileLines,
    faStore,
    faGear,
    faChevronDown,
    faCrown,
    faXmark,
    faGlobe,
    faComments,
    faWarehouse,
    faBars,
    faLayerGroup,
    faBoxesStacked,
} from '@fortawesome/free-solid-svg-icons';

// ==========================================
// NAVIGATION DATA
// ==========================================
const NAV_GROUPS = [
    {
        title: null,
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: faGauge },
            { label: 'Orders', href: '/orders', icon: faBagShopping, hasArrow: true },

            // ✅ Updated Products Menu with Sub-items
            {
                label: 'Products',
                href: '/products',
                icon: faBox,
                hasArrow: true,
                subItems: [
                    { label: 'All Products', href: '/products', icon: faBox },
                    { label: 'Categories', href: '/products/categories', icon: faLayerGroup },
                    { label: 'Inventory', href: '/products/inventory', icon: faBoxesStacked },
                ]
            },

            { label: 'Customers', href: '/customers', icon: faUsers, hasArrow: true },
            { label: 'Analytics', href: '/analytics', icon: faChartLine, hasArrow: true },
            { label: 'Marketing', href: '/marketing', icon: faBullhorn, hasArrow: true },
            { label: 'Discounts', href: '/discounts', icon: faTag, hasArrow: true },
            { label: 'Reports', href: '/reports', icon: faFileLines, hasArrow: true },
        ],
    },
    {
        title: 'Sales Channels',
        items: [
            { label: 'Online Store', href: '/online-store', icon: faStore },
            { label: 'Social Commerce', href: '/social', icon: faComments },
            { label: 'Marketplaces', href: '/marketplaces', icon: faWarehouse },
            { label: 'Settings', href: '/settings', icon: faGear },
        ],
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // State to track which menu dropdown is open
    const [openMenus, setOpenMenus] = useState({
        '/products': false,
    });

    // Automatically open the Products menu if we are on a /products route
    useEffect(() => {
        if (pathname.startsWith('/products')) {
            setOpenMenus((prev) => ({ ...prev, '/products': true }));
        }
    }, [pathname]);

    const toggleMenu = (href) => {
        setOpenMenus((prev) => ({
            ...prev,
            [href]: !prev[href],
        }));
    };

    return (
        <>
            {/* Mobile toggle button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center shadow-lg"
                aria-label="Open menu"
            >
                <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
            </button>

            {/* Overlay for mobile */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-40
                    transition-transform duration-300
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                `}
            >
                {/* Brand header */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-red-500 to-orange-500 shadow-md shadow-red-500/25">
                            <FontAwesomeIcon icon={faCrown} className="w-4 h-4 text-white" />
                        </span>
                        <span className="text-[16px] font-bold text-gray-900 font-serif">
                            King&apos;s
                        </span>
                    </Link>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-900"
                        aria-label="Close menu"
                    >
                        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav */}
                <div className="flex-1 overflow-y-auto py-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {NAV_GROUPS.map((group, gi) => (
                        <div key={gi} className="mb-4">
                            {group.title && (
                                <p className="px-5 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em]">
                                    {group.title}
                                </p>
                            )}
                            <nav className="px-3 space-y-0.5">
                                {group.items.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        pathname.startsWith(item.href + '/');

                                    const hasSubItems = item.subItems && item.subItems.length > 0;
                                    const isSubOpen = openMenus[item.href];

                                    return (
                                        <div key={item.href} className="flex flex-col">
                                            {/* Main Item */}
                                            {hasSubItems ? (
                                                <button
                                                    onClick={() => toggleMenu(item.href)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors group ${isActive
                                                        ? 'bg-red-50 text-red-600'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                        }`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        className={`w-3.5 h-3.5 ${isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'}`}
                                                    />
                                                    <span className="flex-1 truncate text-left">{item.label}</span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                        className={`w-2.5 h-2.5 transition-transform duration-200 ${isSubOpen ? 'rotate-180' : ''
                                                            } ${isActive ? 'text-red-500' : 'text-gray-300'}`}
                                                    />
                                                </button>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors group ${isActive
                                                        ? 'bg-red-500 text-white shadow-sm shadow-red-500/25'
                                                        : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                                                        }`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-500'}`}
                                                    />
                                                    <span className="flex-1 truncate">{item.label}</span>
                                                    {item.hasArrow && (
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                            className={`w-2 h-2 -rotate-90 ${isActive ? 'text-white/60' : 'text-gray-300'}`}
                                                        />
                                                    )}
                                                </Link>
                                            )}

                                            {/* Sub-Items Dropdown */}
                                            {hasSubItems && isSubOpen && (
                                                <div className="mt-1 mb-2 ml-5 pl-3 border-l-2 border-gray-100 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                                                    {item.subItems.map((sub) => {
                                                        const isSubActive = pathname === sub.href;
                                                        return (
                                                            <Link
                                                                key={sub.href}
                                                                href={sub.href}
                                                                onClick={() => setMobileOpen(false)}
                                                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-colors ${isSubActive
                                                                        ? 'text-red-600 bg-red-50'
                                                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                                                    }`}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={sub.icon}
                                                                    className={`w-3 h-3 ${isSubActive ? 'text-red-500' : 'text-gray-400'}`}
                                                                />
                                                                {sub.label}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>
                    ))}
                </div>

                {/* Upgrade card */}
                <div className="p-3 border-t border-gray-100 shrink-0">
                    <div className="rounded-xl bg-linear-to-br from-red-50 to-orange-50 border border-red-100 p-4">
                        <div className="flex items-center gap-2 mb-1.5">
                            <FontAwesomeIcon icon={faCrown} className="w-3.5 h-3.5 text-orange-500" />
                            <p className="text-[12px] font-bold text-gray-900">Upgrade to Pro</p>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug">
                            Unlock advanced analytics and automation.
                        </p>
                        <button className="mt-3 w-full h-8 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[11.5px] font-semibold shadow-sm transition-colors">
                            Upgrade Now →
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}