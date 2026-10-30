// src/app/(customer)/shop/sections/FilterPanel.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo } from 'react';

const COLOR_MAP = {
    'Purple': '#8B5CF6', 'Black': '#000000', 'Red': '#EF4444', 'Orange': '#F97316',
    'Blue': '#3B82F6', 'White': '#FFFFFF', 'Green': '#22C55E', 'Yellow': '#EAB308',
    'Grey': '#9CA3AF', 'Pink': '#EC4899', 'Teal': '#14B8A6', 'Brown': '#78350F'
};

export default function FilterPanel({
    products = [],
    filters = {},
    onToggleFilter,
    onPriceChange,
    onClearAll,
    activeCount = 0,
}) {
    const [openSections, setOpenSections] = useState({
        price: true,
        brand: true,
        category: true,
        colors: true,
    });
    const [brandSearch, setBrandSearch] = useState('');

    const toggle = (key) => setOpenSections((p) => ({ ...p, [key]: !p[key] }));

    // Extract dynamic data from products
    const dynamicBrands = useMemo(() => {
        const brands = products.map(p => p.brand).filter(Boolean);
        return [...new Set(brands)];
    }, [products]);

    const dynamicColors = useMemo(() => {
        const colors = products.flatMap(p => p.colors || []).filter(Boolean);
        return [...new Set(colors)];
    }, [products]);

    const dynamicCategories = useMemo(() => {
        const cats = products.map(p => p.category).filter(Boolean);
        return [...new Set(cats)];
    }, [products]);

    const filteredBrands = dynamicBrands.filter((b) =>
        b.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const isBrandChecked = (b) => filters.brands?.includes(b);
    const isColorChecked = (c) => filters.colors?.includes(c);
    const isCategoryChecked = (c) => filters.genders?.includes(c.toLowerCase());

    const priceMin = filters.minPrice ?? 0;
    const priceMax = filters.maxPrice ?? 1000000;

    return (
        <aside className="w-full">
            <div className="bg-white lg:rounded-2xl lg:border lg:border-gray-100 p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                    <h3 className="text-[13.5px] font-bold text-gray-900">
                        Filters
                        {activeCount > 0 && (
                            <span className="ml-2 text-[10px] font-medium text-gray-500">({activeCount} active)</span>
                        )}
                    </h3>
                    {activeCount > 0 && (
                        <button onClick={onClearAll} className="text-[11.5px] font-medium text-red-500 hover:text-red-600 transition-colors">
                            Clear all
                        </button>
                    )}
                </div>

                {/* PRICE */}
                <FilterSection title="Price" isOpen={openSections.price} onToggle={() => toggle('price')}>
                    <div className="pt-3">
                        <div className="relative h-1 bg-gray-200 rounded-full">
                            <div
                                className="absolute h-1 bg-red-500 rounded-full"
                                style={{ left: `${(priceMin / 1000000) * 100}%`, right: `${100 - (priceMax / 1000000) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex-1 border border-gray-200 rounded-md px-2.5 py-1.5">
                            <p className="text-[9.5px] text-gray-400 leading-none">₦ Min</p>
                            <input type="number" value={priceMin} onChange={(e) => onPriceChange?.(Math.max(0, Number(e.target.value) || 0), priceMax)} className="w-full text-[12px] font-semibold text-gray-900 leading-tight mt-1 outline-none bg-transparent" />
                        </div>
                        <div className="flex-1 border border-gray-200 rounded-md px-2.5 py-1.5">
                            <p className="text-[9.5px] text-gray-400 leading-none">₦ Max</p>
                            <input type="number" value={priceMax} onChange={(e) => onPriceChange?.(priceMin, Math.max(0, Number(e.target.value) || 0))} className="w-full text-[12px] font-semibold text-gray-900 leading-tight mt-1 outline-none bg-transparent" />
                        </div>
                    </div>
                </FilterSection>

                {/* BRAND */}
                <FilterSection title="Brand" isOpen={openSections.brand} onToggle={() => toggle('brand')}>
                    <div className="pt-2">
                        <input type="text" placeholder="Search Brand" value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} className="w-full px-3 py-2 mb-3 text-[11.5px] bg-gray-50 border border-gray-200 rounded-md outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 transition-all" />
                        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
                            {filteredBrands.length === 0 ? (
                                <p className="text-[11px] text-gray-400 py-2">No brands match.</p>
                            ) : (
                                filteredBrands.map((brand) => (
                                    <li key={brand} className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-[12.5px] text-gray-600 hover:text-gray-900 cursor-pointer flex-1">
                                            <input type="checkbox" checked={isBrandChecked(brand)} onChange={() => onToggleFilter?.('brands', brand)} className="w-3.5 h-3.5 rounded border-gray-300 accent-red-500 cursor-pointer" />
                                            {brand}
                                        </label>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </FilterSection>

                {/* CATEGORY */}
                <FilterSection title="Category" isOpen={openSections.category} onToggle={() => toggle('category')}>
                    <div className="pt-1 grid grid-cols-2 gap-2">
                        {dynamicCategories.map((cat) => {
                            const isActive = isCategoryChecked(cat);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => onToggleFilter?.('genders', cat.toLowerCase())}
                                    className={`py-2 text-[12px] font-medium rounded-md border transition-colors ${isActive ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-500'}`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>

                {/* COLORS */}
                <FilterSection title="Colors" isOpen={openSections.colors} onToggle={() => toggle('colors')}>
                    <div className="grid grid-cols-4 gap-2.5 pt-1">
                        {dynamicColors.map((colorName) => {
                            const isActive = isColorChecked(colorName);
                            const hex = COLOR_MAP[colorName] || '#CCCCCC';
                            return (
                                <button key={colorName} onClick={() => onToggleFilter?.('colors', colorName)} className="flex flex-col items-center gap-1 group">
                                    <span
                                        className={`w-7 h-7 rounded-full transition-all ${isActive ? 'ring-2 ring-red-500 ring-offset-2' : 'ring-1 ring-gray-200 group-hover:ring-red-400'}`}
                                        style={{ background: hex, border: colorName === 'White' ? '1px solid #e5e7eb' : 'none' }}
                                    />
                                    <span className={`text-[9px] truncate max-w-full transition-colors ${isActive ? 'text-red-500 font-medium' : 'text-gray-500 group-hover:text-red-500'}`}>
                                        {colorName}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>
            </div>
        </aside>
    );
}

function FilterSection({ title, isOpen, onToggle, children }) {
    return (
        <div className="border-b border-gray-100 py-3.5 last:border-none">
            <button onClick={onToggle} aria-expanded={isOpen} className="w-full flex items-center justify-between text-left group">
                <span className="text-[12.5px] font-semibold text-gray-900 flex items-center gap-2 group-hover:text-red-500 transition-colors">{title}</span>
                <FontAwesomeIcon icon={faChevronDown} className={`w-2.5 h-2.5 text-gray-400 group-hover:text-red-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    );
}