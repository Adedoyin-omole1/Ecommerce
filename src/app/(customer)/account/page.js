// src/app/(customer)/account/page.js
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxOpen, faHeart, faCartShopping, faLocationDot, faKey,
  faArrowRight, faClockRotateLeft, faTag, faTruckFast, faGear,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

export default function AccountPage() {
  const { user } = useUser();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <div className="space-y-6">
      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={faBoxOpen} label="Orders" value="0" href="/account/orders" color="text-orange-500 bg-orange-50" />
        <StatCard icon={faHeart} label="Wishlist" value={wishlistCount} href="/wishlist" color="text-red-500 bg-red-50" />
        <StatCard icon={faCartShopping} label="Cart" value={cartCount} href="/cart" color="text-amber-500 bg-amber-50" />
        <StatCard icon={faLocationDot} label="Addresses" value="1" href="/account/addresses" color="text-emerald-500 bg-emerald-50" />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="text-[16px] font-bold text-gray-900">Account Profile</h2>
              <Link href="/account/profile" className="group inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                Edit <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="px-7 py-6 flex items-center gap-5">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-orange-500 to-red-500 text-white text-[18px] font-bold shrink-0 shadow-md">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-[16px] font-bold text-gray-900 truncate">{user?.name}</p>
                <p className="text-[13.5px] text-gray-500 truncate mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="px-7 py-5 border-b border-gray-100">
              <h2 className="text-[16px] font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-3">
              <QuickLink icon={faClockRotateLeft} label="Order History" href="/account/orders" />
              <QuickLink icon={faHeart} label="My Wishlist" href="/wishlist" />
              <QuickLink icon={faLocationDot} label="Saved Addresses" href="/account/addresses" />
              <QuickLink icon={faKey} label="Change Password" href="/account/password" />
              <QuickLink icon={faGear} label="Account Settings" href="/account/profile" />
            </div>
          </div>
        </div>

        <div className="space-y-6 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-gray-900 mb-4">Need help?</h3>
            <div className="space-y-4">
              <SupportRow icon={faTruckFast} label="Free shipping over ₦50,000" />
              <SupportRow icon={faClockRotateLeft} label="30-day easy returns" />
              <SupportRow icon={faTag} label="Best price guaranteed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// STAT CARD COMPONENT
// ==========================================
function StatCard({ icon, label, value, href, color }) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex items-center justify-center w-11 h-11 rounded-xl ${color}`}>
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        </span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all"
        />
      </div>
      <p className="mt-4 text-[26px] font-bold text-gray-900 tabular-nums leading-none">
        {value}
      </p>
      <p className="mt-2 text-[12.5px] text-gray-500 font-medium">
        {label}
      </p>
    </Link>
  );
}

// ==========================================
// QUICK LINK COMPONENT
// ==========================================
function QuickLink({ icon, label, href }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors shrink-0">
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      </span>
      <span className="flex-1 text-[14px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors truncate">
        {label}
      </span>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0"
      />
    </Link>
  );
}

// ==========================================
// SUPPORT ROW COMPONENT
// ==========================================
function SupportRow({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5 text-orange-500 shrink-0" />
      <span className="text-[13.5px] text-gray-600">{label}</span>
    </div>
  );
}