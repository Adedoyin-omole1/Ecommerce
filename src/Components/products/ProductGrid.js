"use client";

import { useState, useEffect } from "react";

export default function ProductGrid({ products, columns = 4 }) {
  const [displayedProducts, setDisplayedProducts] = useState(products);

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {displayedProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
