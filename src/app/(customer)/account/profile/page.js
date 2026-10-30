// src/app/(customer)/account/profile/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useUser } from '@/contexts/UserContext';

export default function ProfilePage() {
  const { user, updateUser } = useUser();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+234 800 000 0000',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ name: form.name, email: form.email });
    setSaved(true);
    toast.success('Profile updated successfully');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="px-7 py-6 border-b border-gray-100 flex items-center gap-4">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 text-orange-500">
          <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
        </span>
        <div>
          <h2 className="text-[17px] font-bold text-gray-900">Personal Details</h2>
          <p className="text-[13px] text-gray-500 mt-0.5">Update your name, email, and phone number</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-7 space-y-6 max-w-2xl">
        <Field
          icon={faUser}
          label="Full Name"
          value={form.name}
          onChange={(v) => handleChange('name', v)}
          placeholder="Enter your full name"
        />

        <Field
          icon={faEnvelope}
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(v) => handleChange('email', v)}
          placeholder="you@example.com"
        />

        <Field
          icon={faPhone}
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={(v) => handleChange('phone', v)}
          placeholder="+234 800 000 0000"
        />

        <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-gray-100 mt-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gray-900 hover:bg-orange-500 text-white text-[13.5px] font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            {saved ? (
              <>
                <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              'Save Changes'
            )}
          </button>
          <Link
            href="/account"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-white border border-gray-200 hover:border-gray-300 text-[13.5px] font-medium text-gray-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// ✅ ADDED BACK: FIELD COMPONENT
// ==========================================
function Field({ icon, label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <FontAwesomeIcon
          icon={icon}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#faf7f5] border border-transparent focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
        />
      </div>
    </div>
  );
}