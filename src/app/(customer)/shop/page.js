// src/app/(customer)/shop/page.js
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Sidebar from './sections/sidebar';
import FilterPanel from './sections/FilterPanel';
import Toolbar from './sections/ToolBar';
import ProductGrid from './sections/ProductGrid';
import { ALL_PRODUCTS } from '@/data/products';

const INITIAL_VISIBLE = 9;

// ==========================================
// HUMAN-READABLE LABELS
// ==========================================
const CATEGORY_LABELS = {
  women: 'Women',
  men: 'Men',
  kids: 'Kids',
};

const SUB_LABELS = {
  watches: 'Watches',
  sunglasses: 'Sunglasses',
  bags: 'Bags & Accessories',
  jewelry: 'Jewelry',
  apparel: 'Apparel',
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'women';
  const sub = searchParams.get('sub') || 'watches';

  // ---------- State ----------
  const [sortBy, setSortBy] = useState('Popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [view, setView] = useState('grid-4');

  // Filters
  const [filters, setFilters] = useState({
    brands: [],
    genders: [],
    colors: [],
    features: [],
    minPrice: 0,
    maxPrice: 10000,
    watchTypes: [],
  });

  // ---------- Reset visible count when filters change ----------
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [category, sub, searchTerm, sortBy, filters]);

  // ---------- Lock body scroll when drawer open ----------
  useEffect(() => {
    const locked = mobileFiltersOpen || mobileCatsOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFiltersOpen, mobileCatsOpen]);

  // ---------- Filtering + sorting ----------
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (category) result = result.filter((p) => p.gender === category);
    if (sub) result = result.filter((p) => p.tags?.some((t) => t.toLowerCase() === sub.toLowerCase()) || p.category?.toLowerCase() === sub.toLowerCase());

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (filters.brands.length > 0)
      result = result.filter((p) => filters.brands.includes(p.brand));

    if (filters.genders.length > 0)
      result = result.filter((p) => filters.genders.includes(p.gender));

    if (filters.colors.length > 0)
      result = result.filter((p) => filters.colors.includes(p.color));

    if (filters.minPrice > 0)
      result = result.filter((p) => p.price >= filters.minPrice);

    if (filters.maxPrice < 10000)
      result = result.filter((p) => p.price <= filters.maxPrice);

    if (sortBy === 'Price') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'New') result.sort((a, b) => b.id - a.id);

    return result;
  }, [category, sub, searchTerm, sortBy, filters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = filteredProducts.length > visibleCount;

  // ---------- Dynamic labels ----------
  const categoryLabel = CATEGORY_LABELS[category] || 'All';
  const subLabel = SUB_LABELS[sub] || 'Products';

  const pageTitle = `${categoryLabel}'s New In: ${subLabel}`;

  // ---------- Filter helpers ----------
  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((x) => x !== value)
        : [...prev[key], value],
    }));
  };

  const setPriceRange = (min, max) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      genders: [],
      colors: [],
      features: [],
      minPrice: 0,
      maxPrice: 10000,
      watchTypes: [],
    });
    setSearchTerm('');
  };

  const activeFilterCount =
    filters.brands.length +
    filters.genders.length +
    filters.colors.length +
    filters.features.length +
    filters.watchTypes.length +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 10000 ? 1 : 0);

  return (
    <section className="bg-gray-50 min-h-screen py-4 sm:py-5 lg:py-8">
      <div className="max-w-400 mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 space-y-3 sm:space-y-4 lg:space-y-5">

        {/* Toolbar */}
        <Toolbar
          total={filteredProducts.length}
          title={pageTitle}
          categoryLabel={categoryLabel}
          subLabel={subLabel}
          view={view}
          onViewChange={setView}
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
          onFiltersClick={() => setMobileFiltersOpen(true)}
          onCategoriesClick={() => setMobileCatsOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-500 font-medium">
              Active:
            </span>
            {filters.brands.map((b) => (
              <FilterChip
                key={`brand-${b}`}
                label={b}
                onRemove={() => toggleArrayFilter('brands', b)}
              />
            ))}
            {filters.colors.map((c) => (
              <FilterChip
                key={`color-${c}`}
                label={c}
                onRemove={() => toggleArrayFilter('colors', c)}
              />
            ))}
            {filters.genders.map((g) => (
              <FilterChip
                key={`gender-${g}`}
                label={g}
                onRemove={() => toggleArrayFilter('genders', g)}
              />
            ))}
            {filters.features.map((f) => (
              <FilterChip
                key={`feature-${f}`}
                label={f}
                onRemove={() => toggleArrayFilter('features', f)}
              />
            ))}
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-red-500 hover:text-red-600 font-medium ml-1 underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 xl:gap-6">

          {/* LEFT RAIL — Categories */}
          <div
            className={`
              fixed inset-0 z-50 lg:static lg:z-auto lg:block lg:w-56 xl:w-64 lg:shrink-0
              ${mobileCatsOpen ? 'block' : 'hidden'}
            `}
          >
            <div
              onClick={() => setMobileCatsOpen(false)}
              className="lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <div className="relative bg-white lg:bg-transparent h-full lg:h-auto w-[85%] max-w-sm lg:w-full lg:max-w-none overflow-y-auto lg:overflow-visible lg:sticky lg:top-24 p-4 lg:p-0 rounded-r-2xl lg:rounded-none">
              <div className="lg:hidden flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-gray-900">
                  Categories
                </h3>
                <button
                  onClick={() => setMobileCatsOpen(false)}
                  className="text-[12px] text-gray-500 hover:text-red-500 font-medium"
                >
                  Close
                </button>
              </div>
              <Sidebar />
            </div>
          </div>

          {/* CENTER — Product grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={visibleProducts} view={view} />

            {hasMore && (
              <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2">
                <button
                  onClick={() =>
                    setVisibleCount((c) => c + INITIAL_VISIBLE)
                  }
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-200 hover:border-red-500 hover:text-red-500 text-[13px] font-semibold text-gray-900 rounded-full transition-colors"
                >
                  Show More
                </button>
                <p className="text-[11px] text-gray-400">
                  Showing {visibleProducts.length} of{' '}
                  {filteredProducts.length}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT RAIL — Filters */}
          <div
            className={`
              fixed inset-0 z-50 lg:static lg:z-auto lg:block lg:w-56 xl:w-64 lg:shrink-0
              ${mobileFiltersOpen ? 'block' : 'hidden'}
            `}
          >
            <div
              onClick={() => setMobileFiltersOpen(false)}
              className="lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <div className="relative bg-white lg:bg-transparent h-full lg:h-auto w-[85%] max-w-sm ml-auto lg:ml-0 lg:w-full lg:max-w-none overflow-y-auto lg:overflow-visible lg:sticky lg:top-24 p-4 lg:p-0 rounded-l-2xl lg:rounded-none">
              <div className="lg:hidden flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-gray-900">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-[12px] text-gray-500 hover:text-red-500 font-medium"
                >
                  Close
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onToggleFilter={toggleArrayFilter}
                onPriceChange={setPriceRange}
                onClearAll={clearAllFilters}
                activeCount={activeFilterCount}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FILTER CHIP
// ==========================================
function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full text-[11px] text-gray-700">
      <span className="capitalize">{label}</span>
      <button
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        ×
      </button>
    </span>
  );
}