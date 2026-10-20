// src/contexts/UserContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);
const STORAGE_KEY = 'novatrend-user';

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [hydrated, setHydrated] = useState(false);

    // ---------- Load from localStorage on mount ----------
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setUser(JSON.parse(raw));
        } catch (err) {
            console.error('Failed to load user:', err);
        } finally {
            setHydrated(true);
        }
    }, []);

    // ---------- Persist on change ----------
    useEffect(() => {
        if (!hydrated) return;
        try {
            if (user) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (err) {
            console.error('Failed to save user:', err);
        }
    }, [user, hydrated]);

    // ---------- API ----------
    const login = (userData) => {
        setUser({
            id: userData.id || `user_${Date.now()}`,
            name: userData.name || 'Guest',
            email: userData.email || '',
            avatar: userData.avatar || null,
            role: userData.role || 'customer',
            joinedAt: userData.joinedAt || new Date().toISOString(),
        });
    };

    const logout = () => setUser(null);

    const updateUser = (patch) => {
        setUser((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const isLoggedIn = !!user;

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                hydrated,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser must be used within UserProvider');
    return ctx;
}