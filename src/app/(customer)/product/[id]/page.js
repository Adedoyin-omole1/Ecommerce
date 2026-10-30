// src/app/(customer)/product/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useAdminProducts } from '@/contexts/AdminProductContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function ProductDetailsPage() {
  const params = useParams();
  const { products, loading } = useAdminProducts();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products && params.id) {
      const foundProduct = products.find(p => p.id === params.id);
      if (foundProduct) {
        setProduct(foundProduct);

        const imgs = foundProduct.images?.length > 0 ? foundProduct.images : (foundProduct.image ? [foundProduct.image] : []);
        setActiveImage(imgs[0] || '');

        // Safely set default color string
        if (foundProduct.colors?.length > 0) {
          const firstColor = foundProduct.colors[0];
          setSelectedColor(typeof firstColor === 'string' ? firstColor : firstColor.name);
        }

        // Set default size
        if (foundProduct.sizes?.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }

        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [products, params.id]);

  if (loading) return <div className="flex h-[70vh] items-center justify-center">Loading...</div>;

  if (!product) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <Link href="/shop" className="mt-4 text-red-500 underline">Back to Shop</Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const productImages = product.images?.length > 0 ? product.images : (product.image ? [product.image] : []);
  const price = Number(product.price || 0);

  const hasDiscount = product.old_price && Number(product.old_price) > price;
  const oldPrice = hasDiscount ? Number(product.old_price) : null;

  // Safely map display colors to simple strings
  const displayColors = product.colors?.map(c => typeof c === 'string' ? c : c.name) || [];

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) return toast.error('Please select a size');
    if (displayColors.length > 0 && !selectedColor) return toast.error('Please select a color');

    const cartItem = {
      ...product,
      selectedColor: selectedColor,
      selectedSize,
      quantity,
      cartId: `${product.id}-${selectedColor || 'default'}-${selectedSize || 'default'}`
    };

    addItem(cartItem);
    toast.success('Added to Cart');
  };

  return (
    <section className="bg-white min-h-screen pt-6 pb-16 font-sans">
      <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="text-[11px] text-gray-400 mb-6 flex items-center gap-2 tracking-wide">
          <Link href="/home" className="hover:text-red-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-red-500 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* LEFT: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3">

            {/* Main Image Box */}
            <div className="relative w-full aspect-square bg-[#f4f4f4] overflow-hidden group">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex items-center justify-start gap-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-20 bg-[#f4f4f4] overflow-hidden border transition-all ${activeImage === img ? 'border-red-500' : 'border-transparent hover:border-gray-300'
                      }`}
                  >
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">

            {/* Header */}
            <div className="mb-5">
              <h1 className="text-[20px] font-bold text-gray-900 uppercase tracking-widest mb-1.5">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-end gap-2.5 mb-3">
                <span className="text-[20px] font-bold text-gray-900">
                  ₦{price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-[13px] text-gray-400 line-through mb-0.5 font-medium">
                    ₦{oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <p className="text-[12px] text-gray-500 leading-relaxed max-w-md">
                {product.subtitle || 'A sleek and clean e-commerce template with endless possibilities. Creating an awesome clothes store with this Theme is easy than you can imagine.'}
              </p>
            </div>

            <hr className="border-gray-100 mb-5" />

            {/* Colors (Text Based) */}
            {displayColors.length > 0 && (
              <div className="mb-6">
                <span className="block text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-2">Color:</span>
                <div className="flex flex-wrap gap-2">
                  {displayColors.map((colorName, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(colorName)}
                      className={`min-w-9 h-9 px-3 text-[12px] font-bold border transition-all flex items-center justify-center uppercase tracking-wider ${selectedColor === colorName
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-900 bg-white'
                        }`}
                    >
                      {colorName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <span className="block text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-2">Size:</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-9 h-9 px-2 text-[12px] font-bold border transition-all flex items-center justify-center ${selectedSize === size
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-900 bg-white'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-stretch gap-2 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 h-10.5 bg-gray-900 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-[11px] font-bold uppercase tracking-widest transition-all"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <div className="flex items-center justify-between border border-gray-200 h-10.5 px-3 w-24 bg-white shrink-0">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-black transition-colors">
                  <FontAwesomeIcon icon={faMinus} className="w-2.5 h-2.5" />
                </button>
                <span className="font-semibold text-[13px] text-gray-900">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="text-gray-400 hover:text-black transition-colors">
                  <FontAwesomeIcon icon={faPlus} className="w-2.5 h-2.5" />
                </button>
              </div>

              <button
                onClick={() => toggleItem(product)}
                className={`w-10.5 h-10.5 border flex items-center justify-center shrink-0 transition-colors ${isLiked ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500'
                  }`}
              >
                <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5" />
              </button>
            </div>

            <hr className="border-gray-100 mb-5" />

            {/* Meta Data Table */}
            <div className="space-y-2 text-[12px] text-gray-600">
              <div className="flex items-center">
                <span className="w-24 font-bold text-gray-800 uppercase tracking-wider text-[10px]">SKU:</span>
                <span className="font-medium text-gray-500">{product.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-bold text-gray-800 uppercase tracking-wider text-[10px]">Category:</span>
                <span className="font-medium text-gray-500">{product.category} {product.subcategory ? `, ${product.subcategory}` : ''}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-bold text-gray-800 uppercase tracking-wider text-[10px]">Tags:</span>
                <span className="font-medium text-gray-500">{product.tags?.length > 0 ? product.tags.join(', ') : 'Elegant, Summer'}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="w-24 font-bold text-gray-800 uppercase tracking-wider text-[10px]">Availability:</span>
                {product.stock > 0 ? (
                  <span className="font-semibold text-green-600">In Stock ({product.stock})</span>
                ) : (
                  <span className="font-semibold text-red-500">Out of Stock</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM TABS */}
        <div className="mt-16">
          <div className="flex border-b border-gray-100 mb-6 w-full max-w-2xl">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'description' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-400 hover:text-gray-900'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'info' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-400 hover:text-gray-900'
                }`}
            >
              Information
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'reviews' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-400 hover:text-gray-900'
                }`}
            >
              Reviews
            </button>
          </div>

          <div className="w-full max-w-3xl text-[13px] text-gray-500 leading-relaxed">
            {activeTab === 'description' && (
              <div className="whitespace-pre-line">
                {product.description || 'No description provided for this product.'}
              </div>
            )}

            {activeTab === 'info' && (
              <table className="w-full text-left border-collapse max-w-lg">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <th className="py-2.5 font-bold text-gray-800 w-1/3 uppercase text-[10px] tracking-widest">Category</th>
                    <td className="py-2.5">{product.category || 'N/A'}</td>
                  </tr>
                  {product.subcategory && (
                    <tr>
                      <th className="py-2.5 font-bold text-gray-800 w-1/3 uppercase text-[10px] tracking-widest">Subcategory</th>
                      <td className="py-2.5">{product.subcategory}</td>
                    </tr>
                  )}
                  {product.brand && (
                    <tr>
                      <th className="py-2.5 font-bold text-gray-800 w-1/3 uppercase text-[10px] tracking-widest">Brand</th>
                      <td className="py-2.5">{product.brand}</td>
                    </tr>
                  )}
                  <tr>
                    <th className="py-2.5 font-bold text-gray-800 w-1/3 uppercase text-[10px] tracking-widest">Stock</th>
                    <td className="py-2.5">{product.stock || 0} items available</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === 'reviews' && (
              <p className="italic text-gray-400">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-start mb-6">
              <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest">You may also like</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(relProduct => (
                <Link key={relProduct.id} href={`/product/${relProduct.id}`} className="group block text-left">
                  <div className="relative aspect-4/5 bg-[#f4f4f4] overflow-hidden mb-3">
                    <img
                      src={relProduct.images?.[0] || relProduct.image}
                      alt={relProduct.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[12px] font-bold text-gray-900 truncate mb-0.5 uppercase tracking-wider">{relProduct.name}</h3>
                  <p className="text-[12px] font-semibold text-gray-500">₦{Number(relProduct.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}