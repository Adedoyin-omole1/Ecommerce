"use client";

import { useState } from "react";

export default function AdminLayoutWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 text-xl font-bold">Admin Panel</div>
        <nav className="mt-4">
          <a href="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-800">Dashboard</a>
          <a href="/admin/products" className="block px-4 py-2 hover:bg-gray-800">Products</a>
          <a href="/admin/orders" className="block px-4 py-2 hover:bg-gray-800">Orders</a>
          <a href="/admin/customers" className="block px-4 py-2 hover:bg-gray-800">Customers</a>
          <a href="/admin/settings" className="block px-4 py-2 hover:bg-gray-800">Settings</a>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white shadow h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600"
          >
            Menu
          </button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Admin User</span>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
