// src/Components/products/RelatedProducts.js
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function RelatedProducts({ products = [] }) {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === 'left' ? -260 : 260,
            behavior: 'smooth',
        });
    };

    if (products.length === 0) return null;

    return (
        <div className="mt-16 lg:mt-24 pt-10 lg:pt-14 border-t border-gray-100">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-gray-900">
                    You might also like
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:border-orange-500 hover:text-orange-500 text-gray-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="w-2.5 h-2.5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:border-orange-500 hover:text-orange-500 text-gray-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-3.5 overflow-x-auto scroll-smooth pb-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="group shrink-0 w-40 sm:w-44 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                            <img
                                src={product.images?.[0]}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />

                            {/* Badge */}
                            {product.badge && (
                                <span className="absolute top-2 left-2 text-[9px] font-semibold text-white bg-orange-500 px-1.5 py-0.5 rounded">
                                    {product.badge}
                                </span>
                            )}
                        </div>

                        {/* Info — compact */}
                        <div className="p-3">
                            <h3 className="text-[12.5px] font-semibold text-gray-900 leading-tight line-clamp-1 group-hover:text-orange-500 transition-colors">
                                {product.name}
                            </h3>
                            <p className="mt-0.5 text-[10.5px] text-gray-500 line-clamp-1">
                                {product.subtitle || 'Own the Style'}
                            </p>

                            <div className="mt-2 flex items-baseline gap-1.5">
                                <span className="text-[13px] font-bold text-gray-900">
                                    ₦{product.price.toLocaleString()}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-[10px] text-gray-400 line-through">
                                        ₦{product.oldPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}