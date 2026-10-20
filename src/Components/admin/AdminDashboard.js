"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [stats] = useState({
    totalSales: 125000,
    totalOrders: 342,
    totalCustomers: 128,
    totalProducts: 89,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Sales", value: `$${stats.totalSales.toLocaleString()}`, color: "bg-blue-500" },
          { label: "Total Orders", value: stats.totalOrders, color: "bg-green-500" },
          { label: "Total Customers", value: stats.totalCustomers, color: "bg-purple-500" },
          { label: "Total Products", value: stats.totalProducts, color: "bg-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} text-white rounded-lg p-6`}>
            <h3 className="text-sm font-medium opacity-90">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
