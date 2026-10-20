// src/Components/auth/LoginForm.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faXTwitter,
  faGoogle,
  faApple,
} from '@fortawesome/free-brands-svg-icons';

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    onSubmit?.(form);
  };

  return (
    <div className="w-full max-w-md mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[22px] font-bold text-gray-900">
          Welcome back
        </h1>
        <p className="mt-1.5 text-[13px] text-gray-500">
          Sign in to continue to your account
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
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            className="w-full h-11 bg-[#faf7f5] border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 rounded-lg px-4 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter your password"
              className="w-full h-11 bg-[#faf7f5] border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 rounded-lg px-4 pr-11 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="w-3.5 h-3.5"
              />
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 accent-red-500 cursor-pointer"
            />
            <span className="text-[12px] text-gray-600">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[12px] font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-px transition-all"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Sign In with
        </span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social buttons */}
      <div className="flex items-center justify-center gap-3">
        <SocialButton icon={faFacebookF} label="Facebook" />
        <SocialButton icon={faXTwitter} label="X" />
        <SocialButton icon={faGoogle} label="Google" />
        <SocialButton icon={faApple} label="Apple" />
      </div>

      {/* Bottom link */}
      <p className="mt-8 text-center text-[12.5px] text-gray-500">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

// ==========================================
// SOCIAL BUTTON
// ==========================================
function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 hover:border-red-500 hover:-translate-y-0.5 transition-all"
    >
      <FontAwesomeIcon icon={icon} className="w-4 h-4 text-gray-800" />
    </button>
  );
}