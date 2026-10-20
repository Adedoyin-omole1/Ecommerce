// src/Components/account/AccountSidebar.js
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGauge,
    faBoxOpen,
    faHeart,
    faCartShopping,
    faGear,
    faLocationDot,
    faKey,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

export default function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useUser();
    const { count: wishlistCount } = useWishlist();
    const { count: cartCount } = useCart();

    const NAV = [
        { label: 'Dashboard', href: '/account', icon: faGauge },
        { label: 'Orders', href: '/account/orders', icon: faBoxOpen },
        { label: 'Wishlist', href: '/wishlist', icon: faHeart, badge: wishlistCount },
        { label: 'Cart', href: '/cart', icon: faCartShopping, badge: cartCount },
        { label: 'Addresses', href: '/account/addresses', icon: faLocationDot },
        { label: 'Settings', href: '/account/profile', icon: faGear },
        { label: 'Password', href: '/account/password', icon: faKey },
    ];

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-28">
                <p className="hidden lg:block text-[11px] font-bold text-gray-400 uppercase tracking-[0.16em] px-4 mb-3">
                    My Account
                </p>

                <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
                    {NAV.map((item) => {
                        const isActive =
                            item.href === '/account'
                                ? pathname === '/account'
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group shrink-0 lg:shrink lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13.5px] font-medium transition-colors ${isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                                        }`}
                                />
                                <span className="whitespace-nowrap">
                                    {item.label}
                                </span>
                                {item.badge > 0 && (
                                    <span
                                        className={`ml-auto flex items-center justify-center min-w-5 h-5 px-1.5 text-[10.5px] font-bold rounded-full ${isActive
                                            ? 'bg-white text-gray-900'
                                            : 'bg-orange-500 text-white'
                                            }`}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                    <div className="hidden lg:block h-px bg-gray-200 my-4 mx-2" />

                    <button
                        onClick={handleLogout}
                        className="group shrink-0 lg:shrink lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13.5px] font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className="w-4 h-4 text-gray-400 group-hover:text-red-500"
                        />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}