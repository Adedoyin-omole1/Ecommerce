'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthShell from '@/Components/auth/AuthShell';
import LoginForm from '@/Components/auth/LoginForm';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (form) => {
        setIsLoading(true);
        
        // 1. Sign in via Supabase
        const success = await login(form.email, form.password);
        
        if (success) {
            // 2. Get the authenticated user
            const { data: { user } } = await supabase.auth.getUser();

            // 3. Check role from Metadata AND the Profiles table
            const metadataRole = user?.user_metadata?.role;
            
            // Also check the database just to be extra safe
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            const dbRole = profile?.role;
            
            console.log("Login Roles -> Metadata:", metadataRole, "| Database:", dbRole);

            // 4. Redirect based on role
            // If either the metadata or the database says 'admin', send to dashboard!
            if (metadataRole === 'admin' || dbRole === 'admin') {
                toast.success('Welcome back, Admin');
                router.push('/dashboard');
            } else {
                toast.success('Welcome back');
                router.push('/home');
            }
        }
        
        setIsLoading(false);
    };

    return (
        <AuthShell
            leftPanelProps={{
                brand: 'King\u2019s Kollectibles',
                headline: 'Welcome back',
                footerLinks: [
                    { label: 'Sign Up', href: '/signup' },
                    { label: 'Shop Now', href: '/shop' },
                ],
            }}
        >
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </AuthShell>
    );
}