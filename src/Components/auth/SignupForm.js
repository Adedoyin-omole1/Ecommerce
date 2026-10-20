// src/Components/auth/SignupForm.js
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

export default function SignupForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !agreed) return;
    onSubmit?.(form);
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="text-center mb-8">
        <h1 className="text-[22px] font-bold text-gray-900">
          Create your account
        </h1>
        <p className="mt-1.5 text-[13px] text-gray-500">
          Join thousands of members and start shopping today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full name */}
        <div>
          <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter full name"
            className="w-full h-11 bg-[#faf7f5] border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 rounded-lg px-4 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
          />
        </div>

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

          {form.password.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${i < passwordStrength.score
                        ? passwordStrength.color
                        : 'bg-gray-200'
                      }`}
                  />
                ))}
              </div>
              <span
                className={`text-[10px] font-medium ${passwordStrength.textColor}`}
              >
                {passwordStrength.label}
              </span>
            </div>
          )}
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 accent-red-500 cursor-pointer shrink-0"
          />
          <span className="text-[12px] text-gray-600 leading-relaxed">
            I agree to the{' '}
            <Link
              href="/terms"
              className="font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={!agreed}
          className="w-full h-11 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-lg shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-px transition-all"
        >
          Sign Up
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Or sign up with
        </span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="flex items-center justify-center gap-3">
        <SocialButton icon={faFacebookF} label="Facebook" />
        <SocialButton icon={faXTwitter} label="X" />
        <SocialButton icon={faGoogle} label="Google" />
        <SocialButton icon={faApple} label="Apple" />
      </div>

      <p className="mt-8 text-center text-[12.5px] text-gray-500">
        Already have an account?{' '}
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

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '', textColor: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = {
    0: { label: 'Too short', color: 'bg-red-500', textColor: 'text-red-500' },
    1: { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' },
    2: { label: 'Fair', color: 'bg-amber-500', textColor: 'text-amber-500' },
    3: { label: 'Good', color: 'bg-emerald-500', textColor: 'text-emerald-500' },
    4: { label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' },
  };

  return { score, ...map[score] };
}