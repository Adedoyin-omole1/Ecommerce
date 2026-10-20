// src/app/(main)/contact/sections/ContactForm.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaperPlane,
    faCheckCircle,
    faClock,
    faShieldHalved,
    faHeadset,
} from '@fortawesome/free-solid-svg-icons';

const SUBJECTS = [
    'General Inquiry',
    'Order Support',
    'Returns & Exchanges',
    'Partnership',
    'Press & Media',
];

export default function ContactForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: SUBJECTS[0],
        message: '',
    });
    const [sent, setSent] = useState(false);

    const handleChange = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;

        // TODO: POST to your API
        setSent(true);
        setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' });

        setTimeout(() => setSent(false), 4000);
    };

    return (
        <section className="bg-gray-50 py-14 lg:py-20 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-start">

                    {/* ============ FORM ============ */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm">

                        <div className="mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                                Send Us a Message
                            </h2>
                            <p className="mt-2 text-[13.5px] text-gray-500">
                                Fill in the form and we&apos;ll get back to you within
                                24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field
                                    label="Full Name"
                                    value={form.name}
                                    onChange={(v) => handleChange('name', v)}
                                    placeholder="Jane Doe"
                                    required
                                />
                                <Field
                                    label="Email Address"
                                    type="email"
                                    value={form.email}
                                    onChange={(v) => handleChange('email', v)}
                                    placeholder="jane@example.com"
                                    required
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                                    Subject
                                </label>
                                <div className="relative">
                                    <select
                                        value={form.subject}
                                        onChange={(e) =>
                                            handleChange('subject', e.target.value)
                                        }
                                        className="w-full appearance-none bg-gray-50 border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/15 rounded-xl pl-4 pr-10 py-3 text-[13.5px] text-gray-900 outline-none transition-all cursor-pointer"
                                    >
                                        {SUBJECTS.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                                        ▼
                                    </span>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                                    Message
                                </label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) =>
                                        handleChange('message', e.target.value)
                                    }
                                    rows={6}
                                    placeholder="Tell us how we can help..."
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/15 rounded-xl px-4 py-3 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[13.5px] font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all"
                            >
                                {sent ? (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            className="w-4 h-4"
                                        />
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <FontAwesomeIcon
                                            icon={faPaperPlane}
                                            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                                        />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* ============ INFO PANEL ============ */}
                    <div className="space-y-5">

                        {/* Map card */}
                        <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden bg-gray-100 border border-gray-100">
                            <iframe
                                title="Our Location"
                                src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
                                className="absolute inset-0 w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Hours + Guarantees */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-5">

                            <InfoRow
                                icon={faClock}
                                title="Working Hours"
                                text="Monday – Friday, 9am – 6pm"
                            />
                            <InfoRow
                                icon={faShieldHalved}
                                title="Safe & Secure"
                                text="Your data is always protected"
                            />
                            <InfoRow
                                icon={faHeadset}
                                title="24/7 Support"
                                text="Live chat always available"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// FIELD
// ==========================================
function Field({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    required = false,
}) {
    return (
        <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/15 rounded-xl px-4 py-3 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
            />
        </div>
    );
}

// ==========================================
// INFO ROW
// ==========================================
function InfoRow({ icon, title, text }) {
    return (
        <div className="flex items-start gap-3.5">
            <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500">
                <FontAwesomeIcon icon={icon} className="w-4 h-4" />
            </div>
            <div className="min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">
                    {title}
                </p>
                <p className="text-[12.5px] text-gray-500 mt-0.5">
                    {text}
                </p>
            </div>
        </div>
    );
}