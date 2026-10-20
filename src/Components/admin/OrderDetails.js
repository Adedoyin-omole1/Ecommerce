"use client";

import { useState } from "react";

export default function OrderDetails({ id }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p className="text-gray-600">Order ID: {id}</p>
    </div>
  );
}
