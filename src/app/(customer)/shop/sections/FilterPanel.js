// src/app/(customer)/shop/sections/FilterPanel.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// ==========================================
// FILTER DATA
// ==========================================
const BRANDS = [
    { name: 'Omega', count: 12 },
    { name: 'Hugo', count: 5 },
    { name: 'Tudor', count: 4 },
    { name: 'Longines', count: 16 },
    { name: 'Orient', count: 12 },
    { name: 'Timex', count: 7 },
    { name: 'Casio', count: 8 },
    { name: 'Fossil', count: 6 },
    { name: 'Lacoste', count: 5 },
    { name: 'Swatch', count: 4 },
    { name: 'Skagen', count: 3 },
    { name: 'Carl F. Bucherer', count: 2 },
];

const COLORS = [
    { name: 'Purple', hex: '#8B5CF6' },
    { name: 'Black', hex: '#000000' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Green', hex: '#22C55E' },
    { name: 'Yellow', hex: '#EAB308' },
    { name: 'Grey', hex: '#9CA3AF' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Teal', hex: '#14B8A6' },
    {
        name: 'Multi',
        hex: 'conic-gradient(from 90deg, #EF4444, #F97316, #EAB308, #22C55E, #3B82F6, #8B5CF6)',
    },
];

const FEATURES = [
    'Calorie according',
    'Sleep Monitoring',
    'Physical activity',
    'Pulse Measurement',
    'Stopwatch',
    'Timer',
];

const GENDERS = ['Girls', 'Men', 'Unisex', 'Women'];

export default function FilterPanel({
    filters = {},
    onToggleFilter,
    onPriceChange,
    onClearAll,
    activeCount = 0,
}) {
    const [openSections, setOpenSections] = useState({
        price: true,
        brand: true,
        gender: true,
        colors: true,
        features: true,
    });
    const [brandSearch, setBrandSearch] = useState('');

    const toggle = (key) =>
        setOpenSections((p) => ({ ...p, [key]: !p[key] }));

    const filteredBrands = BRANDS.filter((b) =>
        b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const isBrandChecked = (b) => filters.brands?.includes(b);
    const isColorChecked = (c) => filters.colors?.includes(c);
    const isFeatureChecked = (f) => filters.features?.includes(f);
    const isGenderChecked = (g) => filters.genders?.includes(g.toLowerCase());

    const priceMin = filters.minPrice ?? 0;
    const priceMax = filters.maxPrice ?? 10000;

    return (
        <aside className="w-full">
            <div className="bg-white lg:rounded-2xl lg:border lg:border-gray-100 p-4">

                {/* Header with clear button */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                    <h3 className="text-[13.5px] font-bold text-gray-900">
                        Filters
                        {activeCount > 0 && (
                            <span className="ml-2 text-[10px] font-medium text-gray-500">
                                ({activeCount} active)
                            </span>
                        )}
                    </h3>
                    {activeCount > 0 && (
                        <button
                            onClick={onClearAll}
                            className="text-[11.5px] font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* ============ PRICE ============ */}
                <FilterSection
                    title="Price"
                    isOpen={openSections.price}
                    onToggle={() => toggle('price')}
                >
                    <div className="pt-3">
                        <div className="relative h-1 bg-gray-200 rounded-full">
                            <div
                                className="absolute h-1 bg-red-500 rounded-full"
                                style={{
                                    left: `${(priceMin / 10000) * 100}%`,
                                    right: `${100 - (priceMax / 10000) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex-1 border border-gray-200 rounded-md px-2.5 py-1.5">
                            <p className="text-[9.5px] text-gray-400 leading-none">
                                $ Min
                            </p>
                            <input
                                type="number"
                                value={priceMin}
                                onChange={(e) =>
                                    onPriceChange?.(
                                        Math.max(0, Number(e.target.value) || 0),
                                        priceMax
                                    )
                                }
                                className="w-full text-[12px] font-semibold text-gray-900 leading-tight mt-1 outline-none bg-transparent"
                            />
                        </div>
                        <div className="flex-1 border border-gray-200 rounded-md px-2.5 py-1.5">
                            <p className="text-[9.5px] text-gray-400 leading-none">
                                $ Max
                            </p>
                            <input
                                type="number"
                                value={priceMax}
                                onChange={(e) =>
                                    onPriceChange?.(
                                        priceMin,
                                        Math.max(0, Number(e.target.value) || 0)
                                    )
                                }
                                className="w-full text-[12px] font-semibold text-gray-900 leading-tight mt-1 outline-none bg-transparent"
                            />
                        </div>
                    </div>
                </FilterSection>

                {/* ============ BRAND ============ */}
                <FilterSection
                    title="Brand"
                    isOpen={openSections.brand}
                    onToggle={() => toggle('brand')}
                >
                    <div className="pt-2">
                        <input
                            type="text"
                            placeholder="Search Brand"
                            value={brandSearch}
                            onChange={(e) => setBrandSearch(e.target.value)}
                            className="w-full px-3 py-2 mb-3 text-[11.5px] bg-gray-50 border border-gray-200 rounded-md outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 transition-all"
                        />
                        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
                            {filteredBrands.length === 0 ? (
                                <p className="text-[11px] text-gray-400 py-2">
                                    No brands match.
                                </p>
                            ) : (
                                filteredBrands.map((brand) => (
                                    <li
                                        key={brand.name}
                                        className="flex items-center justify-between"
                                    >
                                        <label className="flex items-center gap-2 text-[12.5px] text-gray-600 hover:text-gray-900 cursor-pointer flex-1">
                                            <input
                                                type="checkbox"
                                                checked={isBrandChecked(brand.name)}
                                                onChange={() =>
                                                    onToggleFilter?.(
                                                        'brands',
                                                        brand.name
                                                    )
                                                }
                                                className="w-3.5 h-3.5 rounded border-gray-300 accent-red-500 cursor-pointer"
                                            />
                                            {brand.name}
                                        </label>
                                        <span className="text-[10px] text-gray-400 font-medium">
                                            {brand.count}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </FilterSection>

                {/* ============ GENDER ============ */}
                <FilterSection
                    title="Gender"
                    isOpen={openSections.gender}
                    onToggle={() => toggle('gender')}
                >
                    <div className="pt-1 grid grid-cols-2 gap-2">
                        {GENDERS.map((g) => {
                            const isActive = isGenderChecked(g);
                            return (
                                <button
                                    key={g}
                                    onClick={() =>
                                        onToggleFilter?.('genders', g.toLowerCase())
                                    }
                                    className={`py-2 text-[12px] font-medium rounded-md border transition-colors ${isActive
                                            ? 'bg-red-500 text-white border-red-500'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-500'
                                        }`}
                                >
                                    {g}
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>

                {/* ============ COLORS ============ */}
                <FilterSection
                    title="Colors"
                    isOpen={openSections.colors}
                    onToggle={() => toggle('colors')}
                >
                    <div className="grid grid-cols-4 gap-2.5 pt-1">
                        {COLORS.map((color) => {
                            const isActive = isColorChecked(color.name);
                            return (
                                <button
                                    key={color.name}
                                    onClick={() =>
                                        onToggleFilter?.('colors', color.name)
                                    }
                                    className="flex flex-col items-center gap-1 group"
                                    aria-label={color.name}
                                    aria-pressed={isActive}
                                >
                                    <span
                                        className={`w-7 h-7 rounded-full transition-all ${isActive
                                                ? 'ring-2 ring-red-500 ring-offset-2'
                                                : 'ring-1 ring-gray-200 group-hover:ring-red-400'
                                            }`}
                                        style={{
                                            background: color.hex,
                                            border: color.border
                                                ? '1px solid #e5e7eb'
                                                : 'none',
                                        }}
                                    />
                                    <span
                                        className={`text-[9px] truncate max-w-full transition-colors ${isActive
                                                ? 'text-red-500 font-medium'
                                                : 'text-gray-500 group-hover:text-red-500'
                                            }`}
                                    >
                                        {color.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>

                {/* ============ FEATURES ============ */}
                <FilterSection
                    title="Features"
                    isOpen={openSections.features}
                    onToggle={() => toggle('features')}
                >
                    <ul className="space-y-2 pt-1">
                        {FEATURES.map((feat) => (
                            <li key={feat}>
                                <label className="flex items-center gap-2 text-[12.5px] text-gray-600 hover:text-gray-900 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isFeatureChecked(feat)}
                                        onChange={() =>
                                            onToggleFilter?.('features', feat)
                                        }
                                        className="w-3.5 h-3.5 rounded border-gray-300 accent-red-500 cursor-pointer"
                                    />
                                    {feat}
                                </label>
                            </li>
                        ))}
                    </ul>
                </FilterSection>

                {/* Collapsed sections */}
                {['Movement', 'Watch Features', 'Case Shape'].map((title) => (
                    <div
                        key={title}
                        className="border-t border-gray-100 py-3.5 last:border-none"
                    >
                        <button className="w-full flex items-center justify-between text-left group">
                            <span className="text-[12.5px] font-semibold text-gray-900 group-hover:text-red-500 transition-colors">
                                {title}
                            </span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="w-2.5 h-2.5 text-gray-400 group-hover:text-red-500 transition-colors"
                            />
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
}

// ==========================================
// REUSABLE FILTER SECTION
// ==========================================
function FilterSection({ title, isOpen, onToggle, children }) {
    return (
        <div className="border-b border-gray-100 py-3.5 last:border-none">
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between text-left group"
            >
                <span className="text-[12.5px] font-semibold text-gray-900 flex items-center gap-2 group-hover:text-red-500 transition-colors">
                    {title}
                </span>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-2.5 h-2.5 text-gray-400 group-hover:text-red-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    );
}