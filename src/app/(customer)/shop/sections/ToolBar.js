// src/app/(customer)/shop/sections/Toolbar.js
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass, faSliders, faTableCells, faList,
    faChevronRight, faChevronDown, faBars, faXmark, faCheck,
} from '@fortawesome/free-solid-svg-icons';

const SORT_OPTIONS = [
    { label: 'Popular', value: 'Popular' },
    { label: 'Newest', value: 'New' },
    { label: 'Price: Low to High', value: 'Price' },
    { label: 'Top Rated', value: 'Rating' },
];

const VIEW_OPTIONS = [
    { value: 'grid-4', label: 'Grid 4', icon: faTableCells },
    { value: 'list', label: 'List', icon: faList },
    { value: 'grid-5', label: 'Grid 5', icon: faTableCells },
];

export default function Toolbar({
    total = 0, title = "Products", categoryLabel = '', subLabel = '',
    view = 'grid-4', onSearchChange, onSortChange, onViewChange,
    onFiltersClick, onCategoriesClick, activeFilterCount = 0,
}) {
    const [activeSort, setActiveSort] = useState('Popular');
    const [sortOpen, setSortOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const sortRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSort = (option) => {
        setActiveSort(option.value);
        setSortOpen(false);
        onSortChange?.(option.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        onSearchChange?.(e.target.value);
    };

    const clearSearch = () => {
        setSearch('');
        onSearchChange?.('');
    };

    const activeSortLabel = SORT_OPTIONS.find((o) => o.value === activeSort)?.label || 'Popular';

    return (
        <div className="bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col gap-4 p-4 sm:p-5">

                {/* Breadcrumbs */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-gray-100">
                    <nav className="text-[11.5px] sm:text-[12px] text-gray-500 flex items-center gap-1.5 flex-wrap">
                        <Link href="/home" className="hover:text-red-500 transition-colors">Main</Link>
                        <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 text-gray-300" />
                        <Link href="/shop" className="hover:text-red-500 transition-colors">Shop</Link>

                        {categoryLabel && (
                            <>
                                <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 text-gray-300" />
                                <Link href={`/shop?category=${categoryLabel.toLowerCase()}`} className="hover:text-red-500 transition-colors capitalize">
                                    {categoryLabel}
                                </Link>
                            </>
                        )}
                        {subLabel && (
                            <>
                                <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 text-gray-300" />
                                <span className="text-gray-900 font-semibold capitalize">{subLabel}</span>
                            </>
                        )}
                    </nav>
                </div>

                {/* Title & Sort */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                            onClick={onCategoriesClick}
                            className="lg:hidden shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faBars} className="w-3.5 h-3.5" />
                        </button>
                        <h1 className="text-[15px] sm:text-[17px] lg:text-[19px] font-bold text-gray-900 truncate">
                            {title}
                        </h1>
                        {total > 0 && (
                            <span className="hidden sm:inline-flex items-center text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full shrink-0">
                                {total} {total === 1 ? 'item' : 'items'}
                            </span>
                        )}
                    </div>

                    <div ref={sortRef} className="relative shrink-0">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center gap-2 h-9 px-3.5 rounded-full bg-gray-50 hover:bg-gray-100 text-[12px] font-medium text-gray-900 transition-colors"
                        >
                            <span className="hidden sm:inline text-gray-500 font-normal">Sort:</span>
                            <span className="truncate max-w-25">{activeSortLabel}</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`w-2.5 h-2.5 text-gray-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {sortOpen && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-xl z-30 py-1.5 overflow-hidden">
                                {SORT_OPTIONS.map((option) => {
                                    const isActive = activeSort === option.value;
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSort(option)}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-[12.5px] text-left transition-colors ${isActive ? 'bg-red-50 text-red-500 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            <span>{option.label}</span>
                                            {isActive && <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search & View */}
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex flex-1 relative">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search in this collection..."
                            className="w-full h-9 pl-10 pr-10 text-[12.5px] bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/15 rounded-full outline-none transition-all"
                        />
                        {search && (
                            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                                <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setSearchOpen(true)}
                        className="sm:hidden flex-1 flex items-center justify-center gap-2 h-9 rounded-full bg-gray-50 border border-transparent hover:border-gray-200 text-gray-500 text-[12px] transition-colors"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5" />
                        <span>Search</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-0.5 p-0.5 bg-gray-50 rounded-full shrink-0">
                        {VIEW_OPTIONS.map((option) => {
                            const isActive = view === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => onViewChange?.(option.value)}
                                    className={`flex items-center justify-center w-7 h-7 rounded-full transition-all ${isActive ? 'bg-white text-red-500 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    <FontAwesomeIcon icon={option.icon} className="w-3 h-3" />
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={onFiltersClick}
                        className="lg:hidden relative shrink-0 inline-flex items-center justify-center w-9 h-9 bg-gray-900 hover:bg-red-500 text-white rounded-full transition-colors"
                    >
                        <FontAwesomeIcon icon={faSliders} className="w-3.5 h-3.5" />
                        {activeFilterCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold border-2 border-white">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Search Modal */}
            {searchOpen && (
                <div className="fixed inset-0 z-60 bg-white p-4 sm:hidden">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <input
                                autoFocus
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search products"
                                className="w-full pl-10 pr-3 h-11 text-[13px] bg-gray-50 border border-gray-200 focus:border-red-500 rounded-full outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={() => { clearSearch(); setSearchOpen(false); }}
                            className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-gray-50 text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}