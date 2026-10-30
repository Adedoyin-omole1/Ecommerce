// src/app/(customer)/shop/sections/Sidebar.js
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown, faChevronRight, faTag, faBolt, faStar, faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const QUICK_LINKS = [
    { name: 'All Products', href: '/shop', icon: faLayerGroup, badge: '' },
    { name: 'New Arrivals', href: '/shop?badge=new_arrivals', icon: faStar, badge: 'new_arrivals' },
    { name: 'Flash Sales', href: '/shop?badge=flash_sale', icon: faBolt, badge: 'flash_sale' },
];

const ARTICLES = [
    { title: 'The Basics Of Buying A Telescope', date: '08 Jul 2025' },
    { title: 'Consumer Psychology In The Industrial And Manufacturing Equipment Marketplace', date: '08 Jul 2025' },
    { title: 'Enhance Your Brand Potential With Giant Advertising Blimps', date: '08 Jul 2025' },
];

export default function Sidebar() {
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || '';
    const activeSub = searchParams.get('sub') || '';
    const activeBadge = searchParams.get('badge') || '';

    const [categories, setCategories] = useState([]);
    const [openGroup, setOpenGroup] = useState(activeCategory);

    useEffect(() => {
        const fetchCats = async () => {
            const { data } = await supabase.from('categories').select('*');
            if (data) setCategories(data);
        };
        fetchCats();
    }, []);

    useEffect(() => {
        setOpenGroup(activeCategory);
    }, [activeCategory]);

    return (
        <aside className="w-full space-y-4">

            {/* Quick Links (All Products, New Arrivals, Flash Sale) */}
            <div className="bg-white lg:rounded-2xl lg:border lg:border-gray-100 p-4">
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Discover</h3>
                <ul className="space-y-1">
                    {QUICK_LINKS.map((link) => {
                        const isActive = activeBadge === link.badge && !activeCategory && !activeSub;
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${isActive
                                        ? 'bg-red-50 text-red-500'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <FontAwesomeIcon
                                        icon={link.icon}
                                        className={`w-3.5 h-3.5 ${isActive ? 'text-red-500' : 'text-gray-400'}`}
                                    />
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Categories */}
            <div className="bg-white lg:rounded-2xl lg:border lg:border-gray-100 p-4">
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Categories</h3>
                <div className="space-y-0.5">
                    {categories.map((cat) => {
                        const catSlug = cat.name.toLowerCase();
                        const isOpen = openGroup === catSlug;
                        const isActive = activeCategory === catSlug;

                        let subs = cat.subcategories || [];
                        if (typeof subs === 'string') {
                            try { subs = JSON.parse(subs.replace(/'/g, '"')); } catch (e) { subs = []; }
                        }
                        if (!Array.isArray(subs)) subs = [];

                        return (
                            <div key={cat.id}>
                                <div className="flex items-center">
                                    <Link
                                        href={`/shop?category=${catSlug}`}
                                        className={`flex-1 py-2.5 text-left text-[13.5px] font-semibold transition-colors capitalize ${isActive ? 'text-red-500' : 'text-gray-800 hover:text-red-500'}`}
                                    >
                                        {cat.name}
                                    </Link>
                                    {subs.length > 0 && (
                                        <button
                                            onClick={() => setOpenGroup(isOpen ? null : catSlug)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} className={`w-2.5 h-2.5 ${isActive ? 'text-red-500' : ''}`} />
                                        </button>
                                    )}
                                </div>

                                {isOpen && subs.length > 0 && (
                                    <ul className="mt-1 mb-2 space-y-0.5">
                                        {subs.map((subItem) => {
                                            const subSlug = subItem.toLowerCase().replace(/\s+/g, '-');
                                            const isSubActive = activeSub === subSlug && isActive;

                                            return (
                                                <li key={subItem}>
                                                    <Link
                                                        href={`/shop?category=${catSlug}&sub=${subSlug}`}
                                                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${isSubActive ? 'bg-red-50 text-red-500 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                                    >
                                                        <FontAwesomeIcon icon={faTag} className={`w-3 h-3 ${isSubActive ? 'text-red-500' : 'text-gray-400'}`} />
                                                        {subItem}
                                                    </Link>
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
                <h3 className="text-[13px] font-bold text-gray-900 mb-3">News Marketplace</h3>
                <ul className="space-y-4">
                    {ARTICLES.map((article, i) => (
                        <li key={i}>
                            <Link href="/blog" className="block group">
                                <p className="text-[12.5px] text-gray-700 leading-snug group-hover:text-red-500 transition-colors">{article.title}</p>
                                <p className="text-[10.5px] text-gray-400 mt-1">{article.date}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-[12px] font-medium text-gray-500 hover:text-red-500 transition-colors">View More</button>
            </div>
        </aside>
    );
}