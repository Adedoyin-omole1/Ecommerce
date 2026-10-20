// src/app/(customer)/shop/sections/ProductGrid.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { CartToast, WishlistToast } from '@/Components/ui/ToastCard';

// ==========================================
// LAYOUT CLASSES PER VIEW
// ==========================================
const GRID_CLASSES = {
    'grid-4':
        'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4',
    'grid-5':
        'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3',
    'list': 'flex flex-col gap-3',
};

export default function ProductGrid({ products = [], view = 'grid-4' }) {
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
                        <WishlistToast
                            item={product}
                            count={wishlistCount + 1}
                        />
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

    if (products.length === 0) {
        return (
            <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm">No products found.</p>
                <p className="text-gray-400 text-xs mt-1">
                    Try adjusting your filters or search.
                </p>
            </div>
        );
    }

    const isList = view === 'list';
    const isCompact = view === 'grid-5'; // 5-col = icon-only button
    const gridClass = GRID_CLASSES[view] || GRID_CLASSES['grid-4'];

    return (
        <div className={gridClass}>
            {products.map((product) => {
                const liked = isInWishlist(product.id);

                return (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className={`group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${isList ? 'flex flex-row items-stretch' : 'flex flex-col'
                            }`}
                    >
                        {/* ============ Image Tile ============ */}
                        <div
                            className={`relative overflow-hidden shrink-0 ${product.bg || 'bg-gray-900'
                                } ${isList
                                    ? 'w-32 sm:w-40 lg:w-48 aspect-square'
                                    : 'w-full aspect-square'
                                }`}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />

                            {/* Badge */}
                            {product.badge && (
                                <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                                    {product.badge === 'New'
                                        ? 'Best Seller'
                                        : product.badge}
                                </span>
                            )}

                            {/* Wishlist */}
                            <button
                                aria-label={
                                    liked
                                        ? 'Remove from wishlist'
                                        : 'Add to wishlist'
                                }
                                onClick={(e) => handleWishlistToggle(product, e)}
                                className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all ${liked
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white text-gray-900 hover:text-red-500'
                                    }`}
                            >
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className="w-3 h-3"
                                />
                            </button>
                        </div>

                        {/* ============ Info ============ */}
                        <div
                            className={`flex flex-col flex-1 ${isList
                                    ? 'p-4 justify-between'
                                    : isCompact
                                        ? 'p-2.5'
                                        : 'p-3.5'
                                }`}
                        >
                            <div>
                                <h3
                                    className={`font-bold text-gray-900 leading-tight line-clamp-1 ${isCompact
                                            ? 'text-[12.5px]'
                                            : 'text-[13.5px]'
                                        }`}
                                >
                                    {product.name}
                                </h3>
                                <p
                                    className={`mt-0.5 font-medium text-gray-400 line-clamp-1 ${isCompact
                                            ? 'text-[10px]'
                                            : 'text-[11px]'
                                        }`}
                                >
                                    {product.subtitle || 'Own the Style'}
                                </p>
                            </div>

                            <div
                                className={`flex items-center ${isCompact
                                        ? 'justify-between gap-1 mt-2'
                                        : 'justify-between gap-2 mt-3'
                                    }`}
                            >
                                {/* Price pill */}
                                <span
                                    className={`inline-flex items-center justify-center rounded-full bg-gray-100 font-bold text-gray-900 shrink-0 ${isCompact
                                            ? 'px-2.5 py-1 text-[11.5px]'
                                            : 'px-3 py-1.5 text-[13px]'
                                        }`}
                                >
                                    ${product.price.toFixed(0)}
                                </span>

                                {/* Buy Now — compact = icon-only */}
                                <button
                                    aria-label="Add to cart"
                                    onClick={(e) =>
                                        handleAddToCart(product, e)
                                    }
                                    className={`group/btn inline-flex items-center bg-gray-900 hover:bg-red-500 text-white font-semibold rounded-full transition-colors shrink-0 ${isCompact
                                            ? 'p-1'
                                            : 'gap-1.5 pl-3.5 pr-1 py-1 text-[11.5px]'
                                        }`}
                                >
                                    {!isCompact && <span>Buy Now</span>}
                                    <span
                                        className={`flex items-center justify-center rounded-full bg-white text-gray-900 ${isCompact
                                                ? 'w-6 h-6'
                                                : 'w-5 h-5'
                                            }`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className={`${isCompact
                                                    ? 'w-2.5 h-2.5'
                                                    : 'w-2 h-2'
                                                }`}
                                        />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}