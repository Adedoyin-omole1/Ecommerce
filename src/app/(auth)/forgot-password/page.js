// src/app/(auth)/forgot-password/page.js
'use client';

import AuthShell from '@/Components/auth/AuthShell';
import ForgotPasswordForm from '@/Components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const handleSubmit = (email) => {
    console.log('Forgot password for:', email);
  };

  return (
    <AuthShell
      leftPanelProps={{
        brand: 'King\u2019s Kollectibles',
        headline: 'We\u2019ve got you covered',
        footerLinks: [
          { label: 'Sign In', href: '/login' },
          { label: 'Sign Up', href: '/signup' },
        ],
      }}
    >
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </AuthShell>
  );
}