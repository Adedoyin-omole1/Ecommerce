// src/app/(main)/home/sections/section3.js
'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faHeart,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { CartToast, WishlistToast } from '@/Components/ui/ToastCard';
import { ALL_PRODUCTS } from '@/data/products';

const CAROUSEL_CLASS =
    'flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

const CATEGORIES = [
    { id: 'fashion', name: 'Fashion', image: '/assets/images/categories/fashion.jpg' },
    { id: 'electronics', name: 'Electronics', image: '/assets/images/categories/electronics.jpg' },
    { id: 'beauty', name: 'Beauty', image: '/assets/images/categories/beauty.jpg' },
    { id: 'fitness', name: 'Fitness', image: '/assets/images/categories/fitness.jpg' },
    { id: 'decor', name: 'Home Decor', image: '/assets/images/categories/decor.jpg' },
    { id: 'accessories', name: 'Accessories', image: '/assets/images/categories/accessories.jpg' },
];

// ✅ Pull products from the global data source
const NEW_ARRIVALS = ALL_PRODUCTS.slice(0, 6);

export default function Section3() {
    const categoriesScrollRef = useRef(null);
    const arrivalsScrollRef = useRef(null);
    const { toggleItem, isInWishlist, count: wishlistCount } = useWishlist();
    const { addItem, count: cartCount } = useCart();

    const scroll = (ref, direction) => {
        if (!ref.current) return;
        const scrollAmount = 340;
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
        <section className="bg-white py-12 lg:py-16">
            <div className="max-w-325 mx-auto px-6 lg:px-8 space-y-14 lg:space-y-16">

                {/* CATEGORIES */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[22px] font-bold text-gray-900">Shop by Categories</h2>
                        <Link href="/shop" className="group inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-red-500 transition-colors">
                            View All Categories
                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="relative">
                        <button aria-label="Scroll left" onClick={() => scroll(categoriesScrollRef, 'left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                            <FontAwesomeIcon icon={faChevronLeft} className="w-3.5 h-3.5" />
                        </button>
                        <button aria-label="Scroll right" onClick={() => scroll(categoriesScrollRef, 'right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                            <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5" />
                        </button>

                        <div ref={categoriesScrollRef} className={CAROUSEL_CLASS}>
                            {CATEGORIES.map((cat) => (
                                <Link key={cat.id} href={`/shop?category=${cat.id}`} className="group shrink-0 w-40 sm:w-45 lg:w-50">
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none'; }} />
                                    </div>
                                    <div className="px-0.5">
                                        <p className="text-[14px] font-semibold text-gray-900 group-hover:text-red-500 transition-colors">{cat.name}</p>
                                        <p className="text-[12px] text-gray-500 mt-0.5 inline-flex items-center gap-1">
                                            Shop Now
                                            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* NEW ARRIVALS — COMPACT CARD (now clickable) */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[22px] font-bold text-gray-900">New Arrivals</h2>
                        <Link href="/shop" className="group inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-red-500 transition-colors">
                            View All New Arrivals
                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="relative">
                        <button aria-label="Scroll left" onClick={() => scroll(arrivalsScrollRef, 'left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                            <FontAwesomeIcon icon={faChevronLeft} className="w-2.5 h-2.5" />
                        </button>
                        <button aria-label="Scroll right" onClick={() => scroll(arrivalsScrollRef, 'right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                            <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5" />
                        </button>

                        <div ref={arrivalsScrollRef} className={CAROUSEL_CLASS}>
                            {NEW_ARRIVALS.map((product) => {
                                const liked = isInWishlist(product.id);
                                return (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        className="group relative shrink-0 w-52 sm:w-56 lg:w-60 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Image */}
                                        <div className="relative w-full aspect-square overflow-hidden bg-gray-900">
                                            <img
                                                src={product.images?.[0] || product.image}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />

                                            {product.badge && (
                                                <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                                                    {product.badge === 'New' ? 'Best Seller' : product.badge}
                                                </span>
                                            )}

                                            <button
                                                aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                                                onClick={(e) => handleWishlistToggle(product, e)}
                                                className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all ${liked
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white text-gray-900 hover:text-red-500'
                                                    }`}
                                            >
                                                <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                                            </button>

                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
                                                {[0, 1, 2, 3].map((i) => (
                                                    <span key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Info — compact */}
                                        <div className="p-3.5">
                                            <h3 className="text-[14px] font-bold text-gray-900 leading-tight line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <p className="mt-0.5 text-[11px] font-medium text-gray-400 line-clamp-1">
                                                {product.subtitle || 'Own the Style'}
                                            </p>

                                            <div className="mt-3 flex items-center justify-between gap-2">
                                                <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-gray-100 text-[13px] font-bold text-gray-900">
                                                    ₦{product.price.toLocaleString()}
                                                </span>

                                                <button
                                                    aria-label="Add to cart"
                                                    onClick={(e) => handleAddToCart(product, e)}
                                                    className="group/btn inline-flex items-center gap-1.5 bg-gray-900 hover:bg-red-500 text-white text-[11.5px] font-semibold pl-3.5 pr-1 py-1 rounded-full transition-colors"
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
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}