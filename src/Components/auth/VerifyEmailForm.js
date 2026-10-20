// src/Components/auth/VerifyEmailForm.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faEnvelopeCircleCheck,
    faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';

const CODE_LENGTH = 6;

export default function VerifyEmailForm({
    email = 'your@email.com',
    onSubmit,
    onResend,
}) {
    const router = useRouter();
    const { login } = useUser();
    const [code, setCode] = useState(Array(CODE_LENGTH).fill(''));
    const [success, setSuccess] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputsRef = useRef([]);

    // Auto-focus first input on mount
    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    // Countdown for resend
    useEffect(() => {
        if (secondsLeft <= 0) {
            setCanResend(true);
            return;
        }
        const timer = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    // Auto-redirect to /home after success (3 seconds) — logs the user in
    useEffect(() => {
        if (!success) return;
        const timer = setTimeout(() => {
            // Log the user in with whatever info we have
            // (In production, the /verify API returns user data)
            login({
                name: email
                    .split('@')[0]
                    .replace(/[._]/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase()),
                email,
                role: 'customer',
            });
            router.push('/home');
        }, 3000);
        return () => clearTimeout(timer);
    }, [success, router, email, login]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        const joined = newCode.join('');
        if (joined.length === CODE_LENGTH && !joined.includes('')) {
            setTimeout(() => {
                onSubmit?.(joined);
                setSuccess(true);
            }, 200);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, CODE_LENGTH);
        if (!pasted) return;

        const newCode = Array(CODE_LENGTH).fill('');
        for (let i = 0; i < pasted.length; i++) {
            newCode[i] = pasted[i];
        }
        setCode(newCode);

        const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
        inputsRef.current[focusIndex]?.focus();

        if (pasted.length === CODE_LENGTH) {
            setTimeout(() => {
                onSubmit?.(pasted);
                setSuccess(true);
            }, 200);
        }
    };

    const handleResend = () => {
        if (!canResend) return;
        onResend?.();
        setCode(Array(CODE_LENGTH).fill(''));
        setSecondsLeft(30);
        setCanResend(false);
        inputsRef.current[0]?.focus();
    };

    // ==========================================
    // SUCCESS STATE
    // ==========================================
    if (success) {
        return (
            <div className="w-full max-w-md mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-500 mb-6">
                    <FontAwesomeIcon
                        icon={faEnvelopeCircleCheck}
                        className="w-7 h-7"
                    />
                </div>

                <h1 className="text-[22px] font-bold text-gray-900">
                    Email verified
                </h1>
                <p className="mt-2 text-[13px] text-gray-500 leading-relaxed max-w-sm mx-auto">
                    Your email has been successfully verified. Signing you
                    in…
                </p>

                {/* Loading bar — visual cue for the auto-redirect */}
                <div className="mt-6 mx-auto w-48 h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full animate-[progress_3s_linear_forwards]" />
                </div>

                <Link
                    href="/home"
                    className="mt-8 inline-flex items-center justify-center gap-2 h-11 w-full bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-px transition-all"
                >
                    Continue to Home
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
                    <FontAwesomeIcon icon={faShieldHalved} className="w-5 h-5" />
                </div>
                <h1 className="text-[22px] font-bold text-gray-900">
                    Verify your email
                </h1>
                <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed">
                    We sent a 6-digit code to{' '}
                    <span className="font-semibold text-gray-900">{email}</span>
                </p>
            </div>

            {/* OTP inputs */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
                {code.map((digit, i) => (
                    <input
                        key={i}
                        ref={(el) => (inputsRef.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        aria-label={`Digit ${i + 1}`}
                        className="w-11 h-13 sm:w-12 sm:h-14 text-center text-[20px] font-bold text-gray-900 bg-[#faf7f5] border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 rounded-lg outline-none transition-all tabular-nums"
                    />
                ))}
            </div>

            {/* Resend */}
            <div className="mt-6 text-center">
                {canResend ? (
                    <button
                        onClick={handleResend}
                        className="text-[12.5px] font-semibold text-red-500 hover:text-red-600 transition-colors"
                    >
                        Resend code
                    </button>
                ) : (
                    <p className="text-[12.5px] text-gray-500">
                        Didn&apos;t receive the code?{' '}
                        <span className="text-gray-400">
                            Resend in {secondsLeft}s
                        </span>
                    </p>
                )}
            </div>

            {/* Back to sign in */}
            <div className="mt-8 text-center">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-[12.5px] font-medium text-gray-600 hover:text-red-500 transition-colors"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}