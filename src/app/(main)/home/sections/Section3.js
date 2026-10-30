// src/app/(main)/home/sections/section3.js
'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faHeart,
    faChevronLeft,
    faChevronRight,
    faImage
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { CartToast, WishlistToast } from '@/Components/ui/ToastCard';
import { useAdminProducts } from '@/contexts/AdminProductContext';
import { supabase } from '@/lib/supabase';

const CAROUSEL_CLASS =
    'flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

export default function Section3() {
    const categoriesScrollRef = useRef(null);
    const arrivalsScrollRef = useRef(null);
    const { toggleItem, isInWishlist, count: wishlistCount } = useWishlist();
    const { addItem, count: cartCount } = useCart();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('categories').select('*').limit(10);
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    const { products } = useAdminProducts();
    const NEW_ARRIVALS = products.slice(0, 6);

    const scroll = (ref, direction) => {
        if (!ref.current) return;
        const scrollAmount = 300;
        ref.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    const handleWishlistToggle = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasLiked = isInWishlist(product.id);
        toggleItem(product);
        if (!wasLiked) {
            toast.custom(
                (t) => (
                    <div onClick={() => toast.dismiss(t.id)}>
                        <WishlistToast item={product} count={wishlistCount + 1} />
                    </div>
                ),
                { duration: 2500 }
            );
        }
    };

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        toast.custom(
            (t) => (
                <div onClick={() => toast.dismiss(t.id)}>
                    <CartToast
                        items={[product]}
                        total={Number(product.price)}
                        count={cartCount + 1}
                    />
                </div>
            ),
            { duration: 3000 }
        );
    };

    return (
        <section className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">

                {/* ============================================
                    CATEGORIES CAROUSEL (PROFESSIONAL STYLE)
                ============================================ */}
                <div>
                    <div className="flex flex-col items-center text-center mb-10">
                        <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.2em] mb-1.5">
                            Browse Our Shop
                        </p>
                        <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
                            Shop by Categories
                        </h2>
                    </div>

                    <div className="relative">
                        <button
                            aria-label="Scroll left"
                            onClick={() => scroll(categoriesScrollRef, 'left')}
                            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
                        </button>
                        <button
                            aria-label="Scroll right"
                            onClick={() => scroll(categoriesScrollRef, 'right')}
                            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                        >
                            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                        </button>

                        <div ref={categoriesScrollRef} className={`${CAROUSEL_CLASS} justify-start md:justify-center`}>
                            {categories.length === 0 ? (
                                <p className="text-gray-500 text-sm">No categories found.</p>
                            ) : (
                                categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/shop?category=${cat.name.toLowerCase()}`}
                                        className="group shrink-0 w-36 sm:w-44 md:w-48 flex flex-col items-center"
                                    >
                                        {/* ✅ PERFECT CONTAINER: NO CUTTING, NO RED BORDER */}
                                        <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                            {cat.image_url ? (
                                                <img
                                                    src={cat.image_url}
                                                    alt={cat.name}
                                                    // Object-contain ensures the WHOLE image is visible. 
                                                    // The bg-gray-100 fills the empty space nicely.
                                                    className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}

                                            {/* Fallback */}
                                            <div
                                                className={`absolute inset-0 w-full h-full flex-col items-center justify-center bg-gray-50 ${cat.image_url ? 'hidden' : 'flex'}`}
                                                style={{ display: cat.image_url ? 'none' : 'flex' }}
                                            >
                                                <FontAwesomeIcon icon={faImage} className="w-8 h-8 text-gray-300 mb-2" />
                                                <span className="text-[10px] text-gray-400 font-medium">No Image</span>
                                            </div>
                                        </div>

                                        <div className="text-center w-full px-1">
                                            <h3 className="text-[14px] font-bold text-gray-900 group-hover:text-red-500 transition-colors truncate">
                                                {cat.name}
                                            </h3>
                                            <span className="inline-flex items-center justify-center gap-1 mt-1.5 text-[12px] font-medium text-gray-500 group-hover:text-red-500 transition-colors">
                                                Shop Now
                                                <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-[13px] font-semibold text-gray-900 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                        >
                            View All Categories
                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* ============================================
                    NEW ARRIVALS CAROUSEL (UNCHANGED)
                ============================================ */}
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                        <div>
                            <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.2em] mb-1.5">
                                Fresh Drops
                            </p>
                            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
                                New Arrivals
                            </h2>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                href="/shop"
                                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-gray-900 hover:text-red-500 transition-colors"
                            >
                                View All
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            aria-label="Scroll left"
                            onClick={() => scroll(arrivalsScrollRef, 'left')}
                            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
                        </button>
                        <button
                            aria-label="Scroll right"
                            onClick={() => scroll(arrivalsScrollRef, 'right')}
                            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                        >
                            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                        </button>

                        <div ref={arrivalsScrollRef} className={CAROUSEL_CLASS}>
                            {NEW_ARRIVALS.length === 0 ? (
                                <p className="text-gray-500 text-sm">No products yet.</p>
                            ) : (
                                NEW_ARRIVALS.map((product) => {
                                    const liked = isInWishlist(product.id);
                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            className="group relative shrink-0 w-56 sm:w-60 lg:w-64 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="relative w-full aspect-square overflow-hidden bg-gray-900">
                                                <img
                                                    src={product.images?.[0] || product.image}
                                                    alt={product.name}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />

                                                {product.badge && (
                                                    <span className="absolute top-3 left-3 text-[10px] font-semibold text-white bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                                                        {product.badge === 'New' ? 'Best Seller' : product.badge}
                                                    </span>
                                                )}

                                                <button
                                                    aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                                                    onClick={(e) => handleWishlistToggle(product, e)}
                                                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${liked
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white text-gray-900 hover:text-red-500'
                                                        }`}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="p-4">
                                                <h3 className="text-[14px] font-semibold text-gray-900 leading-tight line-clamp-1">
                                                    {product.name}
                                                </h3>
                                                <p className="mt-0.5 text-[11.5px] font-medium text-gray-400 line-clamp-1">
                                                    {product.subtitle || 'Own the Style'}
                                                </p>

                                                <div className="mt-3 flex items-center justify-between gap-2">
                                                    <span className="text-[15px] font-bold text-gray-900 tabular-nums">
                                                        ₦{product.price?.toLocaleString() || '0'}
                                                    </span>

                                                    <button
                                                        aria-label="Add to cart"
                                                        onClick={(e) => handleAddToCart(product, e)}
                                                        className="group/btn inline-flex items-center gap-1.5 bg-gray-900 hover:bg-red-500 text-white text-[11.5px] font-semibold pl-3.5 pr-1 py-1 rounded-full transition-colors shrink-0"
                                                    >
                                                        Buy Now
                                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-gray-900">
                                                            <FontAwesomeIcon icon={faArrowRight} className="w-2 h-2" />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}