'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthShell from '@/Components/auth/AuthShell';
import SignupForm from '@/Components/auth/SignupForm';
import { useUser } from '@/contexts/UserContext';

export default function SignupPage() {
    const router = useRouter();
    const { signup } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (form) => {
        setIsLoading(true);
        const success = await signup(form.email, form.password, form.name);

        if (success) {
            // Redirect to verify page, passing the email in the URL
            router.push(`/verify?email=${encodeURIComponent(form.email)}`);
        }
        setIsLoading(false);
    };

    return (
        <AuthShell
            leftPanelProps={{
                brand: 'King\u2019s Kollectibles',
                headline: 'Join the Kingdom',
                footerLinks: [
                    { label: 'Sign In', href: '/login' },
                    { label: 'Shop Now', href: '/shop' },
                ],
            }}
        >
            <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        </AuthShell>
    );
}