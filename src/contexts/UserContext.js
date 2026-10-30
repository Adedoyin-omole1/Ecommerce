// src/contexts/UserContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check active session on load
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                await fetchUserProfile(session.user);
            }
            setLoading(false);
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session) {
                    await fetchUserProfile(session.user);
                } else {
                    setUser(null);
                }
            }
        );

        return () => authListener.subscription.unsubscribe();
    }, []);

    // Helper to fetch profile data (Role, Name)
    const fetchUserProfile = async (authUser) => {
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

        setUser({
            id: authUser.id,
            email: authUser.email,
            name: profile?.full_name || authUser.email.split('@')[0],
            // Prioritize the profile table role, then metadata, then default to customer
            role: profile?.role || authUser.user_metadata?.role || 'customer',
        });
    };

    // ✅ NEW: Update user profile (Name, Email, etc.)
    const updateUser = async (updatedData) => {
        // 1. Instantly update the UI so the user sees the change immediately
        setUser(prev => ({ ...prev, ...updatedData }));

        // 2. Save to Supabase 'profiles' table in the background
        if (user?.id) {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: updatedData.name,
                    // You can add more fields here if you update your database schema
                })
                .eq('id', user.id);

            if (error) {
                console.error('Failed to update profile:', error);
                toast.error('Failed to save changes to database');
            }
        }
    };

    // 1. Customer Signup (Sends OTP)
    const signup = async (email, password, fullName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'customer', // Force role to customer
                },
                // This ensures Supabase sends an OTP code, not a magic link
                emailRedirectTo: undefined,
            }
        });

        if (error) {
            toast.error(error.message);
            return false;
        }

        toast.success('Verification code sent to your email!');
        return true; // Return true so page redirects to /verify
    };

    // 2. Verify OTP Code
    const verifyOtp = async (email, token) => {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup'
        });

        if (error) {
            toast.error(error.message);
            return false;
        }
        return true; // Successfully verified and logged in
    };

    // 3. Login (For both Admin and Customers)
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
            return false;
        }
        return true;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <UserContext.Provider value={{ user, loading, signup, login, verifyOtp, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser must be used within UserProvider');
    return ctx;
}