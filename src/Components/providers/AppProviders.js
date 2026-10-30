'use client';

import { UserProvider } from '@/contexts/UserContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { CartProvider } from '@/contexts/CartContext';
import { AdminProductProvider } from '@/contexts/AdminProductContext'; // NEW

export default function AppProviders({ children }) {
    return (
        <UserProvider>
            <WishlistProvider>
                <CartProvider>
                    <AdminProductProvider>
                        {children}
                    </AdminProductProvider>
                </CartProvider>
            </WishlistProvider>
        </UserProvider>
    );
}