// src/app/(auth)/reset-password/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import AuthShell from '@/Components/auth/AuthShell';
import ResetPasswordForm from '@/Components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleReset = ({ token, password }) => {
    console.log('Reset password:', { token, password });
  };

  return (
    <AuthShell
      leftPanelProps={{
        brand: 'King\u2019s Kollitab',
        headline: 'Almost there',
        footerLinks: [
          { label: 'Sign In', href: '/login' },
          { label: 'Sign Up', href: '/signup' },
        ],
      }}
    >
      <ResetPasswordForm token={token} onSubmit={handleReset} />
    </AuthShell>
  );
}