// src/app/(customer)/shop/page.js
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Sidebar from './sections/sidebar';
import FilterPanel from './sections/FilterPanel';
import Toolbar from './sections/ToolBar';
import ProductGrid from './sections/ProductGrid';
import { useAdminProducts } from '@/contexts/AdminProductContext';

const INITIAL_VISIBLE = 9;

export default function ShopPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const sub = searchParams.get('sub') || '';
  const badge = searchParams.get('badge') || '';

  const { products, loading } = useAdminProducts();

  const [sortBy, setSortBy] = useState('Popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [view, setView] = useState('grid-4');

  const [filters, setFilters] = useState({
    brands: [],
    genders: [],
    colors: [],
    features: [],
    minPrice: 0,
    maxPrice: 1000000,
    watchTypes: [],
  });

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [category, sub, badge, searchTerm, sortBy, filters]);

  useEffect(() => {
    const locked = mobileFiltersOpen || mobileCatsOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileFiltersOpen, mobileCatsOpen]);

  // ---------- Filtering + sorting ----------
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Filter by Badge / Tag
    if (badge) {
      result = result.filter(p => p.tags?.includes(badge));
    }

    // Filter by Category
    if (category) {
      result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    // Filter by Subcategory
    if (sub) {
      const formattedSub = sub.replace(/-/g, ' ').toLowerCase();
      result = result.filter(p => p.subcategory?.toLowerCase() === formattedSub);
    }

    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((p) => p.name?.toLowerCase().includes(q) || p.subtitle?.toLowerCase().includes(q));
    }

    // Filters
    if (filters.brands.length > 0) result = result.filter((p) => filters.brands.includes(p.brand));
    if (filters.colors.length > 0) result = result.filter((p) => p.colors?.some(c => filters.colors.includes(c)));
    if (filters.minPrice > 0) result = result.filter((p) => p.price >= filters.minPrice);
    if (filters.maxPrice < 1000000) result = result.filter((p) => p.price <= filters.maxPrice);

    // Sort
    if (sortBy === 'Price') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'New') result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return result;
  }, [products, category, sub, badge, searchTerm, sortBy, filters]);

  // ✅ Normalize products so images are always arrays (fixes the grid image mapping)
  const normalizedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount).map(p => ({
      ...p,
      images: p.images || (p.image ? [p.image] : [])
    }));
  }, [filteredProducts, visibleCount]);

  const hasMore = filteredProducts.length > visibleCount;

  // ---------- Dynamic Labels ----------
  let categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  let subLabel = sub ? sub.replace(/-/g, ' ') : '';
  let pageTitle = '';

  if (badge === 'new_arrivals') {
    categoryLabel = '';
    pageTitle = 'Fresh Drops: New Arrivals';
  } else if (badge === 'flash_sale') {
    categoryLabel = '';
    pageTitle = 'Limited Time: Flash Sale Deals';
  } else if (sub) {
    pageTitle = `${categoryLabel}'s ${subLabel}`;
  } else if (category) {
    pageTitle = `${categoryLabel}'s Collection`;
  } else {
    pageTitle = 'All Products';
  }

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((x) => x !== value) : [...prev[key], value],
    }));
  };

  const setPriceRange = (min, max) => setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));

  const clearAllFilters = () => {
    setFilters({ brands: [], genders: [], colors: [], features: [], minPrice: 0, maxPrice: 1000000, watchTypes: [] });
    setSearchTerm('');
  };

  const activeFilterCount =
    filters.brands.length + filters.genders.length + filters.colors.length +
    filters.features.length + filters.watchTypes.length +
    (filters.minPrice > 0 ? 1 : 0) + (filters.maxPrice < 1000000 ? 1 : 0);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-4 sm:py-5 lg:py-8">
      <div className="max-w-400 mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 space-y-3 sm:space-y-4 lg:space-y-5">

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

        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-500 font-medium">Active:</span>
            {filters.brands.map((b) => (
              <FilterChip key={`brand-${b}`} label={b} onRemove={() => toggleArrayFilter('brands', b)} />
            ))}
            {filters.colors.map((c) => (
              <FilterChip key={`color-${c}`} label={c} onRemove={() => toggleArrayFilter('colors', c)} />
            ))}
            <button onClick={clearAllFilters} className="text-[11px] text-red-500 hover:text-red-600 font-medium ml-1 underline underline-offset-2">
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 xl:gap-6">

          <div className={`fixed inset-0 z-50 lg:static lg:z-auto lg:block lg:w-56 xl:w-64 lg:shrink-0 ${mobileCatsOpen ? 'block' : 'hidden'}`}>
            <div onClick={() => setMobileCatsOpen(false)} className="lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white lg:bg-transparent h-full lg:h-auto w-[85%] max-w-sm lg:w-full lg:max-w-none overflow-y-auto lg:overflow-visible lg:sticky lg:top-24 p-4 lg:p-0 rounded-r-2xl lg:rounded-none">
              <div className="lg:hidden flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-gray-900">Menu</h3>
                <button onClick={() => setMobileCatsOpen(false)} className="text-[12px] text-gray-500 hover:text-red-500 font-medium">Close</button>
              </div>
              <Sidebar />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* ✅ PASS THE NORMALIZED PRODUCTS */}
            <ProductGrid products={normalizedProducts} view={view} />
            {hasMore && (
              <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2">
                <button onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)} className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-200 hover:border-red-500 hover:text-red-500 text-[13px] font-semibold text-gray-900 rounded-full transition-colors">
                  Show More
                </button>
                <p className="text-[11px] text-gray-400">Showing {normalizedProducts.length} of {filteredProducts.length}</p>
              </div>
            )}
          </div>

          <div className={`fixed inset-0 z-50 lg:static lg:z-auto lg:block lg:w-56 xl:w-64 lg:shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
            <div onClick={() => setMobileFiltersOpen(false)} className="lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white lg:bg-transparent h-full lg:h-auto w-[85%] max-w-sm ml-auto lg:ml-0 lg:w-full lg:max-w-none overflow-y-auto lg:overflow-visible lg:sticky lg:top-24 p-4 lg:p-0 rounded-l-2xl lg:rounded-none">
              <div className="lg:hidden flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-gray-900">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-[12px] text-gray-500 hover:text-red-500 font-medium">Close</button>
              </div>
              <FilterPanel
                products={products}
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

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-full text-[11px] text-gray-700">
      <span className="capitalize">{label}</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500 transition-colors">×</button>
    </span>
  );
}