// src/Components/layout/Navbar.js
'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import MegaMenu from './Megadropdown';
import UserMenu from './UserMenu';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useUser } from '@/contexts/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faChevronDown,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const NAV_LINKS = [
  { name: 'Home', href: '/home' },
  { name: 'Categories', href: '/shop', isMega: true },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user } = useUser();

  // ✅ PREVENT HYDRATION MISMATCH: Only check login state after mounting on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoggedIn = isMounted && !!user;

  const openTimeout = useRef(null);
  const closeTimeout = useRef(null);

  const handleMegaEnter = () => {
    clearTimeout(closeTimeout.current);
    openTimeout.current = setTimeout(() => setIsMegaOpen(true), 100);
  };

  const handleMegaLeave = () => {
    clearTimeout(openTimeout.current);
    closeTimeout.current = setTimeout(() => setIsMegaOpen(false), 150);
  };

  const formatCount = (n) => (n > 99 ? '99+' : n);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-325 mx-auto px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-6">

          {/* LOGO */}
          <Link
            href="/home"
            aria-label="King's Kollectibles — Home"
            className="group shrink-0 flex flex-col justify-center leading-none"
          >
            <span className="flex items-baseline gap-0.75 font-serif">
              <span className="text-[19px] font-light italic tracking-tight text-gray-900 group-hover:text-red-500 transition-colors">
                King&apos;s
              </span>
              <span className="relative inline-flex items-baseline text-[21px] font-bold tracking-tight text-gray-900 group-hover:text-red-500 transition-colors">
                <span>Kollect</span>
                <span className="relative inline-flex items-center justify-center mx-px translate-y-px">
                  <FontAwesomeIcon
                    icon={faCrown}
                    className="w-4 h-4 text-red-500 group-hover:text-red-600 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300 drop-shadow-sm"
                  />
                  <span className="absolute -top-0.5 right-0 w-1 h-1 rounded-full bg-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
                <span>bles</span>
              </span>
            </span>
            <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.36em] text-gray-400 group-hover:text-gray-500 transition-colors">
              Premium Collections
            </span>
          </Link>

          {/* CENTER: NAV LINKS */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-9">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + '/');

              if (link.isMega) {
                return (
                  <div
                    key={link.name}
                    className="relative h-18 flex items-center"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <button
                      className="relative group flex items-center gap-1 text-[13px] font-medium text-gray-800 hover:text-black transition-colors h-full"
                      aria-haspopup="true"
                      aria-expanded={isMegaOpen}
                    >
                      <span>{link.name}</span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-2 h-2 text-gray-400 ml-0.5 transition-transform duration-200 ${isMegaOpen ? 'rotate-180' : ''}`}
                      />
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${isActive || isMegaOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group flex items-center text-[13px] font-medium text-gray-800 hover:text-black transition-colors h-18"
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </Link>
              );
            })}
          </div>

          {/* RIGHT: ICONS */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              aria-label="Search"
              className="text-gray-800 hover:text-red-500 transition-colors"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
            </button>

            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative text-gray-800 hover:text-red-500 transition-colors"
            >
              <FontAwesomeIcon icon={faHeartRegular} className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[9px] font-bold text-white bg-red-500 rounded-full">
                  {formatCount(wishlistCount)}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label={`Cart (${cartCount} items)`}
              className="relative text-gray-800 hover:text-red-500 transition-colors"
            >
              <FontAwesomeIcon icon={faCartShopping} className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[9px] font-bold text-white bg-red-500 rounded-full">
                  {formatCount(cartCount)}
                </span>
              )}
            </Link>

            {/* Login/User Menu (Client Side only) */}
            {isMounted && (
              isLoggedIn ? (
                <UserMenu />
              ) : (
                <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                  <Link
                    href="/login"
                    className="text-[12.5px] font-medium text-gray-700 hover:text-red-500 transition-colors"
                  >
                    Login
                  </Link>
                  <span className="text-gray-300">/</span>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center h-8 px-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold shadow-sm shadow-red-500/25 hover:shadow-md transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative text-gray-800"
            >
              <FontAwesomeIcon icon={faHeartRegular} className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[9px] font-bold text-white bg-red-500 rounded-lg">
                  {formatCount(wishlistCount)}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative text-gray-800">
              <FontAwesomeIcon icon={faCartShopping} className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[9px] font-bold text-white bg-red-500 rounded-lg">
                  {formatCount(cartCount)}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              className="text-gray-800 hover:text-black focus:outline-none p-1"
            >
              {isMobileOpen ? (
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MEGA MENU */}
      {isMegaOpen && (
        <div onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
          <MegaMenu onClose={() => setIsMegaOpen(false)} />
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="max-w-325 mx-auto px-6 py-4 space-y-1">
            {NAV_LINKS.filter((l) => !l.isMega).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block py-3 text-[15px] font-medium text-gray-800 border-b border-gray-50 hover:text-red-500"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-2">
                Shop by Category
              </p>
              <Link
                href="/shop"
                onClick={() => setIsMobileOpen(false)}
                className="block py-3 text-[15px] font-medium text-gray-800 border-b border-gray-50 hover:text-red-500"
              >
                View All Categories
              </Link>
            </div>

            <div className="pt-5 flex items-center justify-around">
              <button className="text-gray-800 flex flex-col items-center gap-1 text-[11px]">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" />
                Search
              </button>
              <Link
                href="/wishlist"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 flex flex-col items-center gap-1 text-[11px] relative"
              >
                <FontAwesomeIcon icon={faHeartRegular} className="w-5 h-5" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 right-2 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-red-500 rounded-full">
                    {formatCount(wishlistCount)}
                  </span>
                )}
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/login'}
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 flex flex-col items-center gap-1 text-[11px]"
              >
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                {isLoggedIn ? 'Account' : 'Login'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}