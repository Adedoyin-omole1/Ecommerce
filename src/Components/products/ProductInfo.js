// src/Components/products/ProductInfo.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faHeart,
    faEye,
    faMinus,
    faPlus,
    faCheck,
    faRuler,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { CartToast, WishlistToast } from '@/Components/ui/ToastCard';

// ==========================================
// COLOR MAP
// ==========================================
const COLOR_MAP = {
    Black: '#111827',
    White: '#FFFFFF',
    Grey: '#9CA3AF',
    Purple: '#8B5CF6',
    Brown: '#92400E',
    Tan: '#D97706',
    Silver: '#D1D5DB',
    Navy: '#1E3A8A',
    Blue: '#3B82F6',
    Pink: '#EC4899',
    'Rose Gold': '#F4A7A3',
};

export default function ProductInfo({ product }) {
    const { addItem, count: cartCount } = useCart();
    const { toggleItem, isInWishlist, count: wishlistCount } = useWishlist();

    const [qty, setQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Default');
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'One Size');

    const liked = isInWishlist(product.id);
    const discountPercent = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        addItem(
            { ...product, color: selectedColor, size: selectedSize },
            qty
        );
        toast.custom(
            (t) => (
                <div onClick={() => toast.dismiss(t.id)}>
                    <CartToast
                        items={[{ ...product, qty, color: selectedColor, size: selectedSize }]}
                        total={product.price * qty}
                        count={cartCount + qty}
                    />
                </div>
            ),
            { duration: 3000 }
        );
    };

    const handleWishlist = () => {
        const wasLiked = liked;
        toggleItem({ ...product, color: selectedColor, size: selectedSize });
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

    const handleBuyNow = () => {
        addItem(
            { ...product, color: selectedColor, size: selectedSize },
            qty
        );
        window.location.href = '/checkout';
    };

    return (
        <div className="lg:sticky lg:top-24">

            {/* ============================================
                BRAND + TITLE
            ============================================ */}
            {product.brand && (
                <p className="text-[10.5px] font-semibold text-orange-500 uppercase tracking-[0.16em]">
                    {product.brand}
                </p>
            )}

            <h1 className="mt-1.5 text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-gray-900 leading-[1.15] tracking-tight">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={`w-3.5 h-3.5 ${i <= Math.round(product.rating)
                                ? 'text-amber-400'
                                : 'text-gray-200'
                                }`}
                        />
                    ))}
                </div>
                <span className="text-[12px] text-gray-500">
                    {product.rating} · {product.reviews} Reviews
                </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
                <span className="text-[26px] font-bold text-gray-900 tabular-nums leading-none">
                    ₦{product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                    <>
                        <span className="text-[14px] text-gray-400 line-through tabular-nums leading-none">
                            ₦{product.oldPrice.toLocaleString()}
                        </span>
                        <span className="inline-flex items-center justify-center h-6 px-2 rounded-md bg-orange-500 text-white text-[10.5px] font-bold">
                            -{discountPercent}%
                        </span>
                    </>
                )}
            </div>

            {/* Live viewers */}
            <div className="mt-3 flex items-center gap-1.5 text-[11.5px] text-gray-500">
                <FontAwesomeIcon icon={faEye} className="w-3 h-3 text-orange-500" />
                <span>
                    <span className="font-semibold text-gray-900">32</span> people are
                    viewing this right now
                </span>
            </div>

            {/* ============================================
                DESCRIPTION
            ============================================ */}
            <p className="mt-5 text-[13.5px] text-gray-600 leading-relaxed line-clamp-3">
                {product.description}
            </p>

            {/* ============================================
                DIVIDER
            ============================================ */}
            <div className="my-6 h-px bg-gray-100" />

            {/* ============================================
                COLOR PICKER
            ============================================ */}
            {product.colors?.length > 0 && (
                <div className="mb-5">
                    <div className="flex items-baseline justify-between mb-2.5">
                        <p className="text-[12px] font-semibold text-gray-900 uppercase tracking-wider">
                            Color
                        </p>
                        <span className="text-[12px] text-gray-500">
                            {selectedColor}
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {product.colors.map((color) => {
                            const isSelected = selectedColor === color;
                            return (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    aria-label={`Select ${color}`}
                                    className={`relative w-8 h-8 rounded-full transition-all ${isSelected
                                        ? 'ring-2 ring-offset-2 ring-orange-500'
                                        : 'ring-1 ring-gray-200 hover:ring-gray-400'
                                        }`}
                                    style={{
                                        background: COLOR_MAP[color] || '#E5E7EB',
                                        border:
                                            color === 'White'
                                                ? '1px solid #E5E7EB'
                                                : 'none',
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ============================================
                SIZE PICKER
            ============================================ */}
            {product.sizes?.length > 0 && (
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2.5">
                        <p className="text-[12px] font-semibold text-gray-900 uppercase tracking-wider">
                            Size
                        </p>
                        <button className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-wider">
                            <FontAwesomeIcon icon={faRuler} className="w-2.5 h-2.5" />
                            Size Guide
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => {
                            const isSelected = selectedSize === size;
                            return (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`min-w-14 h-10 px-3 rounded-lg text-[12px] font-semibold transition-all ${isSelected
                                        ? 'bg-orange-500 text-white border-2 border-orange-500 shadow-md shadow-orange-500/20'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-400 hover:text-orange-500'
                                        }`}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>

                    {/* Stock status */}
                    <div className="mt-3 flex items-center gap-1.5 text-[11.5px] text-emerald-600">
                        <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                        <span className="font-semibold">673 in stock</span>
                    </div>
                </div>
            )}

            {/* ============================================
                QUANTITY + ADD TO CART
            ============================================ */}
            <div className="mt-6 flex items-center gap-3">

                {/* Quantity stepper */}
                <div className="flex items-center h-13 rounded-xl border border-gray-200 bg-white overflow-hidden">
                    <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="flex items-center justify-center w-11 h-full text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                        <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                    </button>
                    <span className="min-w-9 text-center text-[14px] font-bold text-gray-900 tabular-nums">
                        {qty}
                    </span>
                    <button
                        onClick={() => setQty((q) => q + 1)}
                        aria-label="Increase quantity"
                        className="flex items-center justify-center w-11 h-full text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                    </button>
                </div>

                {/* Add to cart */}
                <button
                    onClick={handleAddToCart}
                    className="flex-1 h-13 rounded-xl bg-gray-900 hover:bg-orange-500 text-white text-[13.5px] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                    <span>Add to Cart</span>
                </button>
            </div>

            {/* ============================================
                BUY NOW
            ============================================ */}
            <button
                onClick={handleBuyNow}
                className="group mt-3 w-full h-13 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
                Buy It Now
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                />
            </button>

            {/* ============================================
                WISHLIST / ASK / SHARE ROW
            ============================================ */}
            <div className="mt-5 flex items-center justify-around text-[11.5px] font-medium text-gray-500 border-t border-gray-100 pt-5">
                <button
                    onClick={handleWishlist}
                    className={`inline-flex items-center gap-1.5 hover:text-orange-500 transition-colors ${liked ? 'text-orange-500' : ''
                        }`}
                >
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`w-3 h-3 ${liked ? 'text-orange-500' : ''}`}
                    />
                    {liked ? 'Wishlisted' : 'Wishlist'}
                </button>
                <span className="w-px h-3 bg-gray-200" />
                <button className="inline-flex items-center gap-1.5 hover:text-orange-500 transition-colors">
                    Ask a question
                </button>
                <span className="w-px h-3 bg-gray-200" />
                <button className="inline-flex items-center gap-1.5 hover:text-orange-500 transition-colors">
                    Share
                </button>
            </div>

            {/* ============================================
                META
            ============================================ */}
            <div className="mt-5 pt-5 border-t border-gray-100 space-y-2 text-[11.5px]">
                <MetaRow label="SKU" value={product.sku} />
                <MetaRow label="Category" value={product.category} />
                <MetaRow label="Tags" value={product.tags?.join(', ')} />
            </div>
        </div>
    );
}

// ==========================================
// META ROW
// ==========================================
function MetaRow({ label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-2">
            <span className="shrink-0 w-20 text-gray-400 font-semibold uppercase tracking-wider text-[10px] pt-0.5">
                {label}
            </span>
            <span className="text-gray-700">{value}</span>
        </div>
    );
}