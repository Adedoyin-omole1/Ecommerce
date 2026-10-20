// src/Components/auth/ForgotPasswordForm.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEnvelopeCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function ForgotPasswordForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onSubmit?.(email);
    setSent(true);
  };

  // ==========================================
  // SUCCESS STATE
  // ==========================================
  if (sent) {
    return (
      <div className="w-full max-w-md mx-auto text-center">

        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-500 mb-6">
          <FontAwesomeIcon
            icon={faEnvelopeCircleCheck}
            className="w-7 h-7"
          />
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-bold text-gray-900">
          Check your email
        </h1>
        <p className="mt-2 text-[13px] text-gray-500 leading-relaxed max-w-sm mx-auto">
          We&apos;ve sent a password reset link to{' '}
          <span className="font-semibold text-gray-900">{email}</span>.
          Click the link in the email to reset your password.
        </p>

        {/* Tips */}
        <div className="mt-6 p-4 bg-[#faf7f5] rounded-xl text-left">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Didn&apos;t receive it?
          </p>
          <ul className="space-y-1.5 text-[12px] text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0" />
              Check your spam or junk folder
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0" />
              Make sure you entered the correct email
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0" />
              Wait a few minutes — it can take up to 5 minutes
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => setSent(false)}
            className="w-full h-11 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-px transition-all"
          >
            Resend Email
          </button>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 h-11 w-full text-[13px] font-medium text-gray-600 hover:text-red-500 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // FORM STATE
  // ==========================================
  return (
    <div className="w-full max-w-md mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[22px] font-bold text-gray-900">
          Forgot your password?
        </h1>
        <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed">
          Enter the email you used to sign up and we&apos;ll send you
          a link to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full h-11 bg-[#faf7f5] border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 rounded-lg px-4 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-px transition-all"
        >
          Send Reset Link
        </button>
      </form>

      {/* Bottom link */}
      <p className="mt-8 text-center text-[12.5px] text-gray-500">
        Remember your password?{' '}
        <Link
          href="/login"
          className="font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}