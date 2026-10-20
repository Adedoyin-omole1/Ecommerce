// src/app/(customer)/product/[id]/page.js
'use client';

import * as React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import ProductGallery from '@/Components/products/ProductGallery';
import ProductInfo from '@/Components/products/ProductInfo';
import ProductTabs from '@/Components/products/ProductsTabs';
import RelatedProducts from '@/Components/products/RelatedProducts';
import { getProductById, getRelatedProducts } from '@/data/products';

export default function ProductDetailPage({ params }) {
  // ✅ Unwrap the params Promise (Next.js 15+)
  const { id } = React.use(params);
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id, 4);

  // ==========================================
  // NOT FOUND
  // ==========================================
  if (!product) {
    return (
      <section className="bg-gray-50 min-h-[70vh] flex items-center justify-center py-16">
        <div className="max-w-md text-center px-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 text-red-500 mb-6">
            <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
          </div>
          <h1 className="text-[26px] font-bold text-gray-900">
            Product not found
          </h1>
          <p className="mt-3 text-[14px] text-gray-500 leading-relaxed">
            The product you&apos;re looking for doesn&apos;t exist or
            has been removed.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-semibold px-6 py-3 rounded-full shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 transition-all"
          >
            Browse Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-[11.5px] sm:text-[12px] text-gray-500 flex items-center gap-1.5 flex-wrap mb-6">
          <Link href="/home" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 text-gray-300" />
          <Link href="/shop" className="hover:text-orange-500 transition-colors">
            Shop
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 text-gray-300" />
          <span className="text-gray-900 font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Main grid — Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT — Gallery */}
          <ProductGallery
            images={product.images}
            badge={product.badge}
            productName={product.name}
          />

          {/* RIGHT — Info */}
          <ProductInfo product={product} />
        </div>

        {/* Tabs — Description / Info / Reviews */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </section>
  );
}