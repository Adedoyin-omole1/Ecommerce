// src/app/(auth)/verify/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import AuthShell from '@/Components/auth/AuthShell';
import VerifyEmailForm from '@/Components/auth/VerifyEmailForm';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || 'your@email.com';

    const handleVerify = (code) => {
        console.log('Verify code:', code);
    };

    const handleResend = () => {
        console.log('Resend code to:', email);
    };

    return (
        <AuthShell
            leftPanelProps={{
                brand: 'King\u2019s Kollitab',
                headline: 'One step away',
                footerLinks: [
                    { label: 'Sign In', href: '/login' },
                    { label: 'Sign Up', href: '/signup' },
                ],
            }}
        >
            <VerifyEmailForm
                email={email}
                onSubmit={handleVerify}
                onResend={handleResend}
            />
        </AuthShell>
    );
}