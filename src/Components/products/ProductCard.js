"use client";

import Image from "next/image";

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  rating = 0,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={image || "/assets/images/products/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
        />
        <button
          onClick={() => onToggleWishlist?.(id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg"
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < rating ? "⭐" : "☆"}</span>
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button
            onClick={() => onAddToCart?.(id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
