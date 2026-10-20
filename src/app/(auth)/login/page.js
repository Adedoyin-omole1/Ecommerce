// src/app/(auth)/login/page.js
'use client';

import { useRouter } from 'next/navigation';
import AuthShell from '@/Components/auth/AuthShell';
import LoginForm from '@/Components/auth/LoginForm';
import { useUser } from '@/contexts/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = (form) => {
    login({
      name: form.email
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      email: form.email,
      role: 'customer',
    });
    router.push('/home');
  };

  return (
    <AuthShell
      leftPanelProps={{
        brand: 'King\u2019s Kollitab',
        headline: 'Loved by thousands',
        footerLinks: [
          { label: 'Sign Up', href: '/signup' },
          { label: 'Shop Now', href: '/shop' },
        ],
      }}
    >
      <LoginForm onSubmit={handleLogin} />
    </AuthShell>
  );
}