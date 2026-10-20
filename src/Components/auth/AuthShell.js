// src/Components/auth/AuthShell.js
'use client';

import AuthTestimonialPanel from './AuthTestimonialPanel';

export default function AuthShell({
    leftPanelProps = {},
    children,
}) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#faf7f5]">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-red-900/10 overflow-hidden grid lg:grid-cols-[1fr_1.05fr] min-h-140">

                {/* LEFT PANEL — Form (white) */}
                <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-14 py-10 lg:py-12">
                    {children}
                </div>

                {/* RIGHT PANEL — Testimonial (brand) */}
                <AuthTestimonialPanel {...leftPanelProps} />
            </div>
        </div>
    );
}