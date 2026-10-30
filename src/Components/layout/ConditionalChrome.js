// src/Components/layout/ConditionalChrome.js
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// Add '/admin' and '/dashboard' here
const NO_CHROME_ROUTES = [
    '/login',
    '/signup',
    '/register',
    '/forgot-password',
    '/verify',
    '/reset-password',
    '/admin',
    '/dashboard',
    '/orders',
    '/products',
    '/customers',
    '/analytics',
    '/marketing',
    '/discounts',
    '/reports',
    '/online-store',
    '/social',
    '/marketplaces',
    '/settings'
];

function useIsNoChromeRoute() {
    const pathname = usePathname();
    return NO_CHROME_ROUTES.some((route) => pathname.startsWith(route));
}

export function ConditionalNavbar() {
    const isNoChromeRoute = useIsNoChromeRoute();
    if (isNoChromeRoute) return null;
    return <Navbar />;
}

export function ConditionalFooter() {
    const isNoChromeRoute = useIsNoChromeRoute();
    if (isNoChromeRoute) return null;
    return <Footer />;
}

export default function ConditionalChrome() {
    return (
        <>
            <ConditionalNavbar />
            <ConditionalFooter />
        </>
    );
}