// src/Components/providers/AppProviders.js
'use client';

import { UserProvider } from '@/contexts/UserContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { CartProvider } from '@/contexts/CartContext';

export default function AppProviders({ children }) {
    return (
        <UserProvider>
            <WishlistProvider>
                <CartProvider>{children}</CartProvider>
            </WishlistProvider>
        </UserProvider>
    );
}