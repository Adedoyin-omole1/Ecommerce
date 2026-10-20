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

const LEFT_BANNER_IMAGES = [
    '/assets/images/banners/banner-img1.png',
    '/assets/images/banners/banner-img2.png',
];

const FLASH_PRODUCTS = [
    { id: 'flash-headphones', name: 'Overhead Headphones', category: 'Audio', subtitle: 'Own the Sound', price: 59.99, oldPrice: 79.99, image: '/assets/images/products/image6.jpg', badge: 'Best Seller', size: 'One Size', color: 'Black' },
    { id: 'flash-watch', name: 'Premium Smart Watch', category: 'Wearables', subtitle: 'Own the Moment', price: 149.99, oldPrice: 199.99, image: '/assets/images/products/image9.jpg', badge: '15%', size: '42mm', color: 'Silver' },
    { id: 'flash-phone', name: 'ProMax Headphones', category: 'Audio', subtitle: 'Own the Bass', price: 129.99, oldPrice: null, image: '/assets/images/products/image7.jpg', badge: 'Best Seller', size: 'One Size', color: 'White' },
    { id: 'flash-sunglasses', name: 'Aviator Sunglasses', category: 'Eyewear', subtitle: 'Own the Look', price: 89.99, oldPrice: 119.99, image: '/assets/images/products/image11.jpg', badge: '25%', size: 'Medium', color: 'Gold' },
    { id: 'flash-bottle', name: 'Steel Water Bottle', category: 'Lifestyle', subtitle: 'Own the Hydration', price: 24.99, oldPrice: 34.99, image: '/assets/images/products/image10.jpg', badge: '30%', size: '500ml', color: 'Matte Black' },
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
            <span className="text-[16px] sm:text-[18px] font-bold text-white leading-none tabular-nums">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-[8px] font-medium text-white/70 uppercase tracking-wider mt-1">
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
        <section className="bg-white py-10 lg:py-12">
            <div className="max-w-325 mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">

                    {/* LEFT BANNER */}
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-red-600 via-red-500 to-orange-500 min-h-55 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/15 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-orange-300/30 blur-3xl" />
                        <div className="relative grid grid-cols-2 h-full">
                            <div className="flex flex-col justify-center p-6 lg:p-7 relative z-10">
                                <p className="text-[11px] font-semibold text-white/90 mb-1 uppercase tracking-wider">Flash Sale</p>
                                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">Up To 70% Off</h3>
                                <div className="flex items-center gap-2 sm:gap-3 mt-4">
                                    <TimerBox value={timeLeft.days} label="Days" />
                                    <span className="text-[14px] font-bold text-white/60 -mt-2">:</span>
                                    <TimerBox value={timeLeft.hours} label="Hours" />
                                    <span className="text-[14px] font-bold text-white/60 -mt-2">:</span>
                                    <TimerBox value={timeLeft.minutes} label="Mins" />
                                    <span className="text-[14px] font-bold text-white/60 -mt-2">:</span>
                                    <TimerBox value={timeLeft.seconds} label="Secs" />
                                </div>
                                <div className="mt-5">
                                    <Link href="/shop" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-red-600 text-[12px] font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all">
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

                    {/* RIGHT BANNER */}
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-gray-900 via-gray-900 to-gray-800 min-h-55 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                        <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-red-500/25 blur-3xl" />
                        <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-orange-500/10 blur-3xl" />
                        <div className="relative grid grid-cols-2 h-full">
                            <div className="flex flex-col justify-center p-6 lg:p-7 relative z-10">
                                <p className="text-[11px] font-semibold text-white/70 mb-1 uppercase tracking-wider">New Collection</p>
                                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">Summer 2025</h3>
                                <p className="mt-2 text-[12px] text-white/70 leading-relaxed max-w-45">Discover the latest trends and fresh styles.</p>
                                <div className="mt-5">
                                    <Link href="/shop" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 text-[12px] font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all">
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

                {/* FLASH SALE PRODUCTS — COMPACT CARDS */}
                <div className="mt-8 lg:mt-10">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[18px] lg:text-[20px] font-bold text-gray-900">Flash Sale Products</h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {FLASH_PRODUCTS.map((product) => {
                            const liked = isInWishlist(product.id);
                            return (
                                <div
                                    key={product.id}
                                    className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="relative w-full aspect-square overflow-hidden bg-gray-900">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" onError={(e) => { e.target.style.display = 'none'; }} />
                                        {product.badge && (
                                            <span className="absolute top-2 left-2 text-[10px] font-semibold text-white bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                                                {product.badge}
                                            </span>
                                        )}
                                        <button
                                            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                                            onClick={(e) => handleWishlistToggle(product, e)}
                                            className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:text-red-500'}`}
                                        >
                                            <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <div className="p-3">
                                        <h3 className="text-[12.5px] font-bold text-gray-900 leading-tight line-clamp-1">{product.name}</h3>
                                        <p className="mt-0.5 text-[10px] font-medium text-gray-400 line-clamp-1">{product.subtitle}</p>

                                        <div className="mt-2.5 flex items-center justify-between gap-1.5">
                                            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-gray-100 text-[11.5px] font-bold text-gray-900">
                                                ${product.price}
                                            </span>
                                            <button
                                                aria-label="Add to cart"
                                                onClick={(e) => handleAddToCart(product, e)}
                                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 hover:bg-red-500 text-white transition-colors"
                                            >
                                                <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}