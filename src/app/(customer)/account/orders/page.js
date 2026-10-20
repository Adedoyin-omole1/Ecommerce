// src/app/(customer)/account/orders/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faHome,
  faArrowRight,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';

// ==========================================
// SAMPLE ORDERS
// ==========================================
const SAMPLE_ORDERS = [
  {
    id: 'CTH-89765',
    status: 'On Delivery',
    statusColor: 'orange',
    expected: '28 May 2024',
    from: 'Delaware, United States',
    to: "George's House, Indonesia",
    items: [
      {
        id: 1,
        name: 'Japan Green Outer',
        price: 399000,
        size: 'M',
        image: '/assets/images/products/image6.jpg',
      },
      {
        id: 2,
        name: 'White off jacket 2024',
        price: 450000,
        size: 'M',
        image: '/assets/images/products/image7.jpg',
      },
    ],
  },
  {
    id: 'CTH-81719',
    status: 'On Delivery',
    statusColor: 'orange',
    expected: '28 May 2024',
    from: 'Warsaw, United States',
    to: "George's House, Indonesia",
    items: [
      {
        id: 3,
        name: 'One set leather suits',
        price: 2300000,
        size: 'L',
        image: '/assets/images/products/image8.jpg',
      },
      {
        id: 4,
        name: 'White off tee',
        price: 100000,
        size: 'L',
        image: '/assets/images/products/image9.jpg',
      },
    ],
  },
];

export default function OrdersPage() {
  const { user } = useUser();
  const [activeFilter, setActiveFilter] = useState('shipping');

  const filters = [
    { id: 'shipping', label: 'On Shipping', count: 1 },
    { id: 'arrived', label: 'Arrived', count: 2 },
    { id: 'cancelled', label: 'Cancelled', count: 1 },
  ];

  const filteredOrders = SAMPLE_ORDERS.filter((order) => {
    if (activeFilter === 'arrived') return order.status === 'Delivered';
    if (activeFilter === 'cancelled') return false;
    return true;
  });

  return (
    <div className="space-y-8">

      {/* Greeting */}
      <div>
        <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.16em]">
          Good Morning
        </p>
        <h1 className="mt-2 text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
          {user?.name || 'Mofiyinfoba81'}
        </h1>
      </div>

      {/* Tabs */}
      <OrdersTabs />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8 items-start">

        <aside className="lg:sticky lg:top-28 space-y-3">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`w-full flex items-center justify-between gap-3 h-12 px-5 rounded-full text-[13.5px] font-semibold transition-all ${isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white border border-gray-100 text-gray-600 hover:border-gray-300'
                  }`}
              >
                <span>{f.label}</span>
                <span
                  className={`flex items-center justify-center min-w-6 h-6 px-2 text-[11px] font-bold rounded-full ${isActive
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </aside>

        <div className="space-y-5 min-w-0">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 text-gray-400 mb-4">
                <FontAwesomeIcon icon={faBoxOpen} className="w-6 h-6" />
              </div>
              <h2 className="text-[16px] font-bold text-gray-900">
                No orders here
              </h2>
              <p className="mt-2 text-[13px] text-gray-500 max-w-sm mx-auto">
                When you place an order it will appear here.
              </p>
              <Link
                href="/shop"
                className="mt-5 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-[12.5px] font-semibold px-5 py-2.5 rounded-full shadow-md shadow-orange-500/25 transition-all"
              >
                Shop Now
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// TABS
// ==========================================
function OrdersTabs() {
  const tabs = [
    { label: 'Profile', href: '/account/profile' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'My Order', href: '/account/orders', active: true },
    { label: 'Saved Address', href: '/account/addresses' },
    { label: 'Change Password', href: '/account/password' },
    { label: 'Logout', href: '/login' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          className={`shrink-0 inline-flex items-center h-11 px-6 rounded-full text-[13.5px] font-semibold transition-all ${tab.active
            ? 'bg-gray-900 text-white shadow-md'
            : 'bg-white border border-gray-100 text-gray-600 hover:border-gray-300'
            }`}
        >
          <span className="whitespace-nowrap">{tab.label}</span>
        </Link>
      ))}
    </div>
  );
}

// ==========================================
// ORDER CARD
// ==========================================
function OrderCard({ order }) {
  const subtotal = order.items.reduce((s, i) => s + i.price, 0);
  const statusStyles = {
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-500',
    red: 'bg-red-50 text-red-500',
  };
  const statusClass = statusStyles[order.statusColor] || statusStyles.orange;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

      {/* Header */}
      <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FontAwesomeIcon icon={faBagShopping} className="w-4 h-4 text-gray-400" />
          <p className="text-[13.5px] text-gray-500">
            Order ID:{' '}
            <span className="font-bold text-gray-900">
              {order.id}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-[12.5px] text-gray-500">
            Estimated arrival:{' '}
            <span className="font-semibold text-gray-700">
              {order.expected}
            </span>
          </p>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-semibold ${statusClass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {order.status}
          </span>
        </div>
      </div>

      {/* Route */}
      <div className="px-6 sm:px-8 py-5 border-t border-b border-gray-100 bg-gray-50/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[12.5px] text-gray-600 shrink-0">
            <FontAwesomeIcon icon={faHome} className="w-3.5 h-3.5 text-orange-500" />
            <span className="hidden sm:inline">{order.from}</span>
            <span className="sm:hidden">{order.from.split(',')[0]}</span>
          </div>

          <div className="flex-1 flex items-center gap-1 min-w-7.5">
            <span className="flex-1 border-t border-dashed border-gray-300" />
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="flex-1 border-t border-dashed border-gray-300" />
          </div>

          <div className="flex items-center gap-2 text-[12.5px] text-gray-600 shrink-0">
            <FontAwesomeIcon icon={faHome} className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden sm:inline">{order.to}</span>
            <span className="sm:hidden">{order.to.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-50">
        {order.items.map((item) => (
          <div key={item.id} className="px-6 sm:px-8 py-5 flex items-center gap-5">
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] sm:text-[16px] font-bold text-gray-900 truncate">
                {item.name}
              </p>
              <p className="text-[13px] text-gray-500 mt-1.5">
                Rp {item.price.toLocaleString()}
              </p>
              <p className="text-[12px] text-gray-400 mt-0.5">
                Size: {item.size}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-8 py-5 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between gap-4">
        <p className="text-[13px] text-gray-500">
          <span className="font-semibold text-gray-700">Total:</span>{' '}
          <span className="font-bold text-gray-900 text-[15px]">
            Rp {subtotal.toLocaleString()}
          </span>{' '}
          <span className="text-gray-400">| {order.items.length} items</span>
        </p>
        <button className="h-10 px-6 rounded-full bg-gray-900 hover:bg-orange-500 text-white text-[13px] font-semibold transition-colors">
          Details
        </button>
      </div>
    </div>
  );
}