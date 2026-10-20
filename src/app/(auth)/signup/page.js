// src/app/(auth)/signup/page.js
'use client';

import { useRouter } from 'next/navigation';
import AuthShell from '@/Components/auth/AuthShell';
import SignupForm from '@/Components/auth/SignupForm';

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = (form) => {
        router.push(`/verify?email=${encodeURIComponent(form.email)}`);
    };

    return (
        <AuthShell
            leftPanelProps={{
                brand: 'King\u2019s Kollitab',
                headline: 'Join the Kingdom',
                footerLinks: [
                    { label: 'Sign In', href: '/login' },
                    { label: 'Shop Now', href: '/shop' },
                ],
            }}
        >
            <SignupForm onSubmit={handleSignup} />
        </AuthShell>
    );
}