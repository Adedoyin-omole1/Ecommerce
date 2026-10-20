// src/Components/auth/ResetPasswordForm.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faCheck,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

export default function ResetPasswordForm({ token, onSubmit }) {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.password || form.password !== form.confirm) return;
    onSubmit?.({ token, password: form.password });
    setSuccess(true);
  };

  const passwordStrength = getPasswordStrength(form.password);
  const passwordsMatch =
    form.confirm.length > 0 && form.password === form.confirm;
  const passwordsDontMatch =
    form.confirm.length > 0 && form.password !== form.confirm;

  // ==========================================
  // SUCCESS STATE
  // ==========================================
  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-500 mb-6">
          <FontAwesomeIcon icon={faCheck} className="w-7 h-7" />
        </div>

        <h1 className="text-[22px] font-bold text-gray-900">
          Password updated
        </h1>
        <p className="mt-2 text-[13px] text-gray-500 leading-relaxed max-w-sm mx-auto">
          Your password has been successfully reset. You can now sign
          in with your new password.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex items-center justify-center gap-2 h-11 w-full bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-px transition-all"
        >
          Continue to Sign In
        </Link>
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
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 text-red-500 mb-4">
          <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
        </div>
        <h1 className="text-[22px] font-bold text-gray-900">
          Set a new password
        </h1>
        <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed">
          Your new password must be different from any previous
          passwords.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* New password */}
        <div>
          <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={form.password}
              onChange={(e) =>
                handleChange('password', e.target.value)
              }
              placeholder="Enter new password"
              className="w-full h-11 bg-[#faf7f5] border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 rounded-lg px-4 pr-11 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? 'Hide password' : 'Show password'
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="w-3.5 h-3.5"
              />
            </button>
          </div>

          {/* Strength bar */}
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

        {/* Confirm password */}
        <div>
          <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              required
              value={form.confirm}
              onChange={(e) =>
                handleChange('confirm', e.target.value)
              }
              placeholder="Re-enter new password"
              className={`w-full h-11 bg-[#faf7f5] border rounded-lg px-4 pr-11 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all ${passwordsDontMatch
                  ? 'border-red-500 focus:ring-red-500/15'
                  : 'border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={
                showConfirm
                  ? 'Hide password'
                  : 'Show password'
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon
                icon={showConfirm ? faEyeSlash : faEye}
                className="w-3.5 h-3.5"
              />
            </button>
          </div>

          {/* Match indicator */}
          {form.confirm.length > 0 && (
            <p
              className={`mt-1.5 text-[11px] font-medium flex items-center gap-1.5 ${passwordsMatch
                  ? 'text-emerald-500'
                  : 'text-red-500'
                }`}
            >
              <FontAwesomeIcon
                icon={passwordsMatch ? faCheck : undefined}
                className="w-2.5 h-2.5"
              />
              {passwordsMatch
                ? 'Passwords match'
                : 'Passwords don\u2019t match'}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-px transition-all"
        >
          Reset Password
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

// ==========================================
// PASSWORD STRENGTH
// ==========================================
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