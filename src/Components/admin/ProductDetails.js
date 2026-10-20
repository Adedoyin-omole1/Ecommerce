"use client";

import { useState } from "react";

export default function ProductDetails({ id }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <p className="text-gray-600">Product ID: {id}</p>
    </div>
  );
}
