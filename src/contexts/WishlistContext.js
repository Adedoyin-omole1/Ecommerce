// src/contexts/WishlistContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'novatrend-wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // ---------- Load from localStorage on mount ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (err) {
      console.error('Failed to load wishlist:', err);
    } finally {
      setHydrated(true);
    }
  }, []);

  // ---------- Persist to localStorage on change ----------
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save wishlist:', err);
    }
  }, [items, hydrated]);

  // ---------- API ----------
  const addItem = (product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleItem = (product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const clearAll = () => setItems([]);

  const isInWishlist = (id) => items.some((p) => p.id === id);

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        addItem,
        removeItem,
        toggleItem,
        clearAll,
        isInWishlist,
        hydrated,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used inside <WishlistProvider>');
  }
  return ctx;
}