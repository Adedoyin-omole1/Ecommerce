'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthShell from '@/Components/auth/AuthShell';
import VerifyEmailForm from '@/Components/auth/VerifyEmailForm';
import { useUser } from '@/contexts/UserContext';
import toast from 'react-hot-toast';

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { verifyOtp } = useUser();

    // Get email from URL (?email=user@example.com)
    const email = searchParams.get('email') || '';
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!email) {
            toast.error('No email provided for verification');
            router.push('/signup');
        }
    }, [email, router]);

    const handleVerify = async (code) => {
        setIsLoading(true);
        const success = await verifyOtp(email, code);

        if (success) {
            toast.success('Account verified! Welcome.');
            router.push('/home'); // Send customer to shop
        }
        setIsLoading(false);
    };

    return (
        <AuthShell
            leftPanelProps={{
                brand: 'King\u2019s Kollectibles',
                headline: 'Almost there',
                footerLinks: [
                    { label: 'Sign In', href: '/login' },
                    { label: 'Support', href: '/contact' },
                ],
            }}
        >
            <VerifyEmailForm
                email={email}
                onSubmit={handleVerify}
                isLoading={isLoading}
            />
        </AuthShell>
    );
}