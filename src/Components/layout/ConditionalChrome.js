// src/Components/layout/ConditionalChrome.js
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// Auth routes hide both Navbar and Footer
const AUTH_ROUTES = ['/login', '/signup', '/register', '/forgot-password', '/verify', '/reset-password'];

function useIsAuthRoute() {
    const pathname = usePathname();
    return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export function ConditionalNavbar() {
    const isAuthRoute = useIsAuthRoute();
    if (isAuthRoute) return null;
    return <Navbar />;
}

export function ConditionalFooter() {
    const isAuthRoute = useIsAuthRoute();
    if (isAuthRoute) return null;
    return <Footer />;
}

// Default export kept for compatibility — returns both
export default function ConditionalChrome() {
    return (
        <>
            <ConditionalNavbar />
            <ConditionalFooter />
        </>
    );
}