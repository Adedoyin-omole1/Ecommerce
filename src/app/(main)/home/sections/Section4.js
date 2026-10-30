// src/app/(main)/home/sections/section4.js
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { CartToast, WishlistToast } from '@/Components/ui/ToastCard';
import { useAdminProducts } from '@/contexts/AdminProductContext';

const LEFT_BANNER_IMAGES = [
    '/assets/images/banners/banner-img1.png',
    '/assets/images/banners/banner-img2.png',
];

function useCountdown(targetHours = 75) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date();
        target.setHours(target.getHours() + targetHours);

        const tick = () => {
            const diff = target - new Date();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft({ days, hours, minutes, seconds });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetHours]);

    return timeLeft;
}

function useBannerRotation(images, intervalMs = 30000) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, intervalMs);
        return () => clearInterval(interval);
    }, [images, intervalMs]);

    return currentIndex;
}

function TimerBox({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-bold text-white leading-none tabular-nums">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-medium text-white/70 uppercase tracking-wider mt-1">
                {label}
            </span>
        </div>
    );
}

export default function Section4() {
    const timeLeft = useCountdown(75);
    const activeImageIndex = useBannerRotation(LEFT_BANNER_IMAGES, 30000);
    const { toggleItem, isInWishlist, count: wishlistCount } = useWishlist();
    const { addItem, count: cartCount } = useCart();

    // ✅ Pull products and filter by 'flash_sale' tag
    const { products } = useAdminProducts();
    const FLASH_PRODUCTS = products.filter(p => p.tags?.includes('flash_sale')).slice(0, 5);

    const handleWishlistToggle = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasLiked = isInWishlist(product.id);
        toggleItem(product);
        if (!wasLiked) {
            toast.custom((t) => (
                <div onClick={() => toast.dismiss(t.id)}>
                    <WishlistToast item={product} count={wishlistCount + 1} />
                </div>
            ), { duration: 2500 });
        }
    };

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        toast.custom((t) => (
            <div onClick={() => toast.dismiss(t.id)}>
                <CartToast items={[product]} total={Number(product.price)} count={cartCount + 1} />
            </div>
        ), { duration: 3000 });
    };

    return (
        <section className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">

                {/* BANNERS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-red-600 via-red-500 to-orange-500 min-h-55 sm:min-h-60 lg:min-h-65 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/15 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-orange-300/30 blur-3xl" />
                        <div className="relative grid grid-cols-2 h-full">
                            <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-7 relative z-10">
                                <p className="text-[10px] sm:text-[11px] font-bold text-white/90 mb-1 uppercase tracking-[0.2em]">Flash Sale</p>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">Up To 70% Off</h3>
                                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 mt-3 sm:mt-4">
                                    <TimerBox value={timeLeft.days} label="Days" />
                                    <span className="text-[12px] sm:text-[14px] font-bold text-white/60 -mt-2">:</span>
                                    <TimerBox value={timeLeft.hours} label="Hours" />
                                    <span className="text-[12px] sm:text-[14px] font-bold text-white/60 -mt-2">:</span>
                                    <TimerBox value={timeLeft.minutes} label="Mins" />
                                    <span className="text-[12px] sm:text-[14px] font-bold text-white/60 -mt-2">:</span>
                                    <TimerBox value={timeLeft.seconds} label="Secs" />
                                </div>
                                <div className="mt-4 sm:mt-5">
                                    <Link href="/shop" className="inline-flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-gray-50 text-red-600 text-[11.5px] sm:text-[12px] font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all">
                                        Shop Sale Now
                                        <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                                    </Link>
                                </div>
                            </div>
                            <div className="relative">
                                {LEFT_BANNER_IMAGES.map((src, i) => (
                                    <img key={src} src={src} alt="Flash Sale" className={`absolute inset-0 w-full h-full object-cover object-left transition-all duration-1000 group-hover:scale-105 ${i === activeImageIndex ? 'opacity-100' : 'opacity-0'}`} onError={(e) => { e.target.style.display = 'none'; }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-gray-900 via-gray-900 to-gray-800 min-h-55 sm:min-h-60 lg:min-h-65 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                        <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-red-500/25 blur-3xl" />
                        <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-orange-500/10 blur-3xl" />
                        <div className="relative grid grid-cols-2 h-full">
                            <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-7 relative z-10">
                                <p className="text-[10px] sm:text-[11px] font-bold text-white/70 mb-1 uppercase tracking-[0.2em]">New Collection</p>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">Summer 2025</h3>
                                <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-[12px] text-white/70 leading-relaxed max-w-45 sm:max-w-50">Discover the latest trends and fresh styles.</p>
                                <div className="mt-4 sm:mt-5">
                                    <Link href="/shop" className="inline-flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-gray-50 text-gray-900 text-[11.5px] sm:text-[12px] font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all">
                                        Shop Collection
                                        <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                                    </Link>
                                </div>
                            </div>
                            <div className="relative overflow-hidden">
                                <img src="/assets/images/banners/banner-img3.png" alt="New Collection" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FLASH SALE PRODUCTS */}
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
                        <div>
                            <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.2em] mb-1.5">
                                Limited Time
                            </p>
                            <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
                                Flash Sale Products
                            </h3>
                        </div>
                        <Link href="/shop" className="group inline-flex items-center gap-2 text-[13px] font-semibold text-gray-900 hover:text-red-500 transition-colors shrink-0">
                            View All Flash Deals
                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible">
                        {FLASH_PRODUCTS.length === 0 ? (
                            <p className="text-gray-500 text-sm">No flash sales running right now.</p>
                        ) : (
                            FLASH_PRODUCTS.map((product) => {
                                const liked = isInWishlist(product.id);
                                return (
                                    <div key={product.id} className="group relative shrink-0 w-56 sm:w-60 lg:w-auto bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                        <div className="relative w-full aspect-square overflow-hidden bg-gray-900">
                                            <img src={product.images?.[0] || product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" onError={(e) => { e.target.style.display = 'none'; }} />
                                            {product.badge && (
                                                <span className="absolute top-3 left-3 text-[10px] font-semibold text-white bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                                                    {product.badge === 'New' ? 'Best Seller' : product.badge}
                                                </span>
                                            )}
                                            <button aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'} onClick={(e) => handleWishlistToggle(product, e)} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white text-gray-900 hover:text-red-500'}`}>
                                                <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-[14px] font-semibold text-gray-900 leading-tight line-clamp-1">{product.name}</h3>
                                            <p className="mt-0.5 text-[11.5px] font-medium text-gray-400 line-clamp-1">{product.subtitle || 'Own the Style'}</p>
                                            <div className="mt-3 flex items-center justify-between gap-2">
                                                <span className="text-[15px] font-bold text-gray-900 tabular-nums">₦{product.price?.toLocaleString() || '0'}</span>
                                                <button aria-label="Add to cart" onClick={(e) => handleAddToCart(product, e)} className="group/btn inline-flex items-center gap-1.5 bg-gray-900 hover:bg-red-500 text-white text-[11.5px] font-semibold pl-3.5 pr-1 py-1 rounded-full transition-colors shrink-0">
                                                    Buy Now
                                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-gray-900">
                                                        <FontAwesomeIcon icon={faArrowRight} className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}