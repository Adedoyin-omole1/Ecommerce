// src/app/(customer)/shop/sections/Sidebar.js
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronRight,
    faClock,
    faGlasses,
    faBagShopping,
    faGem,
    faShirt,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

// ==========================================
// SHARED SUB-CATEGORY BUILDER
// ==========================================
const buildSubs = (category) => [
    { name: 'Watches', href: `/shop?category=${category}&sub=watches`, icon: faClock },
    { name: 'Sunglasses', href: `/shop?category=${category}&sub=sunglasses`, icon: faGlasses },
    { name: 'Bags & Accessories', href: `/shop?category=${category}&sub=bags`, icon: faBagShopping },
    { name: 'Jewelry', href: `/shop?category=${category}&sub=jewelry`, icon: faGem },
    { name: 'Apparel', href: `/shop?category=${category}&sub=apparel`, icon: faShirt },
];

const CATEGORIES = [
    { id: 'women', title: 'Women', subs: buildSubs('women') },
    { id: 'men', title: 'Men', subs: buildSubs('men') },
    { id: 'kids', title: 'Kids', subs: buildSubs('kids') },
];

const WATCH_SUBS = [
    'Automatic',
    'Chronograph',
    'Digital',
    'Dress Watches',
    'Fashion Watches',
    'GMT Watches',
    'Leather Band',
    'Perpetual',
    'Quartz',
    'Sports Watches',
];

const ARTICLES = [
    { title: 'The Basics Of Buying A Telescope', date: '08 Jul 2025' },
    {
        title: 'Consumer Psychology In The Industrial And Manufacturing Equipment Marketplace',
        date: '08 Jul 2025',
    },
    {
        title: 'Enhance Your Brand Potential With Giant Advertising Blimps',
        date: '08 Jul 2025',
    },
];

export default function Sidebar() {
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || 'women';
    const activeSub = searchParams.get('sub') || 'watches';

    const [openGroup, setOpenGroup] = useState(activeCategory);
    const [openSubGroup, setOpenSubGroup] = useState(true);

    // Re-open the group when the URL category changes
    useEffect(() => {
        setOpenGroup(activeCategory);
    }, [activeCategory]);

    return (
        <aside className="w-full space-y-4">

            {/* Categories */}
            <div className="bg-white lg:rounded-2xl lg:border lg:border-gray-100 p-4">
                <div className="space-y-0.5">
                    {CATEGORIES.map((cat) => {
                        const isOpen = openGroup === cat.id;
                        const isActive = activeCategory === cat.id;

                        return (
                            <div key={cat.id}>
                                {/* Header row: link + toggle button */}
                                <div className="flex items-center">
                                    <Link
                                        href={`/shop?category=${cat.id}`}
                                        className={`flex-1 py-2.5 text-left text-[13.5px] font-semibold transition-colors capitalize ${isActive
                                                ? 'text-red-500'
                                                : 'text-gray-800 hover:text-red-500'
                                            }`}
                                    >
                                        {cat.title}
                                    </Link>
                                    <button
                                        onClick={() =>
                                            setOpenGroup(isOpen ? null : cat.id)
                                        }
                                        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${cat.title}`}
                                        aria-expanded={isOpen}
                                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <FontAwesomeIcon
                                            icon={isOpen ? faChevronDown : faChevronRight}
                                            className={`w-2.5 h-2.5 transition-transform duration-200 ${isActive ? 'text-red-500' : ''
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Sub-categories */}
                                {isOpen && (
                                    <ul className="mt-1 mb-2 space-y-0.5">
                                        {cat.subs.map((subItem) => {
                                            const subSlug = subItem.href.split('sub=')[1];
                                            const isSubActive = activeSub === subSlug && isActive;
                                            const isWatch = subItem.name === 'Watches';

                                            return (
                                                <li key={subItem.name}>
                                                    <div className="flex items-center">
                                                        <Link
                                                            href={subItem.href}
                                                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors flex-1 ${isSubActive
                                                                    ? 'bg-red-50 text-red-500 font-medium'
                                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                                }`}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={subItem.icon}
                                                                className={`w-3 h-3 ${isSubActive
                                                                        ? 'text-red-500'
                                                                        : 'text-gray-400'
                                                                    }`}
                                                            />
                                                            {subItem.name}
                                                        </Link>
                                                        {isWatch && isSubActive && (
                                                            <button
                                                                onClick={() =>
                                                                    setOpenSubGroup(!openSubGroup)
                                                                }
                                                                aria-label="Toggle watch subtypes"
                                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        openSubGroup
                                                                            ? faChevronDown
                                                                            : faChevronRight
                                                                    }
                                                                    className="w-2.5 h-2.5"
                                                                />
                                                            </button>
                                                        )}
                                                    </div>

                                                    {isWatch && isSubActive && openSubGroup && (
                                                        <ul className="pl-6 mt-1 space-y-0.5 border-l border-gray-100 ml-4">
                                                            {WATCH_SUBS.map((sub) => (
                                                                <li key={sub}>
                                                                    <Link
                                                                        href={`/shop?category=${activeCategory}&sub=${sub
                                                                            .toLowerCase()
                                                                            .replace(/\s+/g, '-')}`}
                                                                        className="block py-1.5 text-[12.5px] text-gray-500 hover:text-red-500 transition-colors"
                                                                    >
                                                                        {sub}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Articles */}
            <div className="bg-white lg:rounded-2xl lg:border lg:border-gray-100 p-4">
                <h3 className="text-[13px] font-bold text-gray-900 mb-3">
                    News Marketplace
                </h3>
                <ul className="space-y-4">
                    {ARTICLES.map((article, i) => (
                        <li key={i}>
                            <Link href="/blog" className="block group">
                                <p className="text-[12.5px] text-gray-700 leading-snug group-hover:text-red-500 transition-colors">
                                    {article.title}
                                </p>
                                <p className="text-[10.5px] text-gray-400 mt-1">
                                    {article.date}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-[12px] font-medium text-gray-500 hover:text-red-500 transition-colors">
                    View More
                </button>
            </div>
        </aside>
    );
}