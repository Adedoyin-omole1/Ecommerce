// src/Components/products/ProductGallery.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function ProductGallery({ images = [], badge, productName = 'Product' }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = images[activeIndex];

    const goPrev = () =>
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
    const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

    return (
        <div className="lg:sticky lg:top-24">

            {/* Main image */}
            <div className="relative w-full aspect-4/5 max-h-130 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">

                {/* Badge */}
                {badge && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-bold text-white bg-emerald-500 px-2.5 py-1 rounded-md">
                        {badge}
                    </span>
                )}

                {/* Image */}
                <img
                    src={activeImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />

                {/* Left/right arrows — smaller */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goPrev}
                            aria-label="Previous image"
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
                        </button>
                        <button
                            onClick={goNext}
                            aria-label="Next image"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails — compact row */}
            {images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`View image ${idx + 1}`}
                            className={`relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 border-2 transition-all ${idx === activeIndex
                                ? 'border-orange-500'
                                : 'border-gray-100 hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`${productName} ${idx + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}