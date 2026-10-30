// src/app/(customer)/account/password/page.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faKey,
    faCheck,
    faEye,
    faEyeSlash,
    faShieldHalved
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export default function PasswordPage() {
    const [form, setForm] = useState({ current: '', next: '', confirm: '' });
    const [show, setShow] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
    const strength = getStrength(form.next);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.next !== form.confirm) return toast.error('Passwords do not match');
        if (form.next.length < 8) return toast.error('Password must be at least 8 characters');

        setSaved(true);
        toast.success('Password updated successfully');
        setForm({ current: '', next: '', confirm: '' });
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="px-7 py-6 border-b border-gray-100 flex items-center gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 text-orange-500">
                    <FontAwesomeIcon icon={faKey} className="w-5 h-5" />
                </span>
                <div>
                    <h2 className="text-[17px] font-bold text-gray-900">Change Password</h2>
                    <p className="text-[13px] text-gray-500 mt-0.5">Keep your account secure with a strong password</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-7 space-y-6 max-w-2xl">
                <PasswordField
                    label="Current Password"
                    value={form.current}
                    onChange={(v) => handleChange('current', v)}
                    show={show}
                />

                <div>
                    <PasswordField
                        label="New Password"
                        value={form.next}
                        onChange={(v) => handleChange('next', v)}
                        show={show}
                        onToggle={() => setShow(!show)}
                    />
                    {form.next.length > 0 && (
                        <div className="mt-3 flex items-center gap-3">
                            <div className="flex-1 flex gap-1.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <span
                                        key={i}
                                        className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength.score ? strength.color : 'bg-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className={`text-[11.5px] font-semibold ${strength.textColor}`}>
                                {strength.label}
                            </span>
                        </div>
                    )}
                </div>

                <PasswordField
                    label="Confirm New Password"
                    value={form.confirm}
                    onChange={(v) => handleChange('confirm', v)}
                    show={show}
                />

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2.5 mb-3">
                        <FontAwesomeIcon icon={faShieldHalved} className="w-3.5 h-3.5 text-orange-500" />
                        <p className="text-[13px] font-bold text-gray-900">Password Tips</p>
                    </div>
                    <ul className="space-y-1.5 text-[13px] text-gray-600">
                        <li className="flex items-start gap-2.5">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                            At least 8 characters long
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                            Mix of uppercase, lowercase, and numbers
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                            Add a special character (!@#$%)
                        </li>
                    </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-6">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gray-900 hover:bg-orange-500 text-white text-[13.5px] font-semibold shadow-md hover:-translate-y-0.5 transition-all"
                    >
                        {saved ? (
                            <>
                                <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" /> Updated
                            </>
                        ) : (
                            'Update Password'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

// ==========================================
// ✅ ADDED BACK: PASSWORD FIELD COMPONENT
// ==========================================
function PasswordField({ label, value, onChange, show, onToggle }) {
    return (
        <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-12 px-4 pr-12 rounded-xl bg-[#faf7f5] border border-transparent focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15 text-[14px] text-gray-900 outline-none transition-all"
                />
                {onToggle && (
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-label={show ? 'Hide password' : 'Show password'}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <FontAwesomeIcon
                            icon={show ? faEyeSlash : faEye}
                            className="w-4 h-4"
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

// ==========================================
// ✅ ADDED BACK: PASSWORD STRENGTH LOGIC
// ==========================================
function getStrength(password) {
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