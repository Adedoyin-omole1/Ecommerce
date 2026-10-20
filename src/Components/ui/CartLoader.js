// src/Components/ui/CartLoader.js
'use client';

import { useEffect, useState } from 'react';

// ==========================================
// KEYFRAMES (injected once, no external CSS file needed)
// ==========================================
const LOADER_STYLES = `
  @keyframes cart-loader-roll {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(4px); }
  }

  @keyframes cart-loader-bounce {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }

  @keyframes cart-loader-wheel {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes cart-loader-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes cart-loader-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .cart-loader-roll    { animation: cart-loader-roll 1.2s ease-in-out infinite; }
  .cart-loader-bounce  { animation: cart-loader-bounce 1s ease-in-out infinite; }
  .cart-loader-wheel   { animation: cart-loader-wheel 0.9s linear infinite; transform-origin: center; }
  .cart-loader-spin    { animation: cart-loader-spin 1s linear infinite; }

  .cart-loader-shimmer-text {
    background: linear-gradient(
      90deg,
      #9CA3AF 0%,
      #F97316 50%,
      #9CA3AF 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: cart-loader-shimmer 2s linear infinite;
  }
`;

// ==========================================
// INLINE LOADER (small, fits in cards/sections)
// ==========================================
export function CartLoader({
    size = 'md',       // sm | md | lg
    label = 'Loading…',
}) {
    const dimensions = {
        sm: { wrapper: 'w-16 h-16', wheel: 5 },
        md: { wrapper: 'w-24 h-24', wheel: 7 },
        lg: { wrapper: 'w-32 h-32', wheel: 9 },
    };
    const d = dimensions[size] || dimensions.md;

    return (
        <>
            <style>{LOADER_STYLES}</style>

            <div className="flex flex-col items-center justify-center gap-4">
                <div className={`${d.wrapper} relative flex items-center justify-center`}>

                    {/* Spinning progress ring */}
                    <svg
                        className="absolute inset-0 cart-loader-spin"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="44"
                            stroke="#FEE7D6"
                            strokeWidth="6"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="44"
                            stroke="#F97316"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="69 210"
                            transform="rotate(-90 50 50)"
                        />
                    </svg>

                    {/* Cart SVG */}
                    <svg
                        viewBox="0 0 64 64"
                        className="w-1/2 h-1/2 cart-loader-roll text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* Cart body */}
                        <path d="M4 12h8l6 30h30l6-22H14" />

                        {/* Bouncing items inside cart */}
                        <g className="cart-loader-bounce">
                            <rect
                                x="22"
                                y="20"
                                width="6"
                                height="6"
                                rx="1.5"
                                fill="currentColor"
                                stroke="none"
                                opacity="0.4"
                            />
                            <rect
                                x="32"
                                y="17"
                                width="6"
                                height="6"
                                rx="1.5"
                                fill="currentColor"
                                stroke="none"
                                opacity="0.6"
                            />
                            <rect
                                x="42"
                                y="20"
                                width="6"
                                height="6"
                                rx="1.5"
                                fill="currentColor"
                                stroke="none"
                                opacity="0.8"
                            />
                        </g>

                        {/* Wheels */}
                        <circle
                            cx="20"
                            cy="52"
                            r={d.wheel}
                            className="cart-loader-wheel"
                            fill="none"
                        />
                        <circle
                            cx="46"
                            cy="52"
                            r={d.wheel}
                            className="cart-loader-wheel"
                            fill="none"
                        />
                    </svg>
                </div>

                {/* Label */}
                {label && (
                    <p className="cart-loader-shimmer-text text-[12.5px] font-bold tracking-wider uppercase">
                        {label}
                    </p>
                )}
            </div>
        </>
    );
}

// ==========================================
// FULL PAGE OVERLAY LOADER
// ==========================================
export function PageLoader({
    label = 'Loading…',
    fullScreen = false,
}) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const containerClass = fullScreen
        ? 'fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm'
        : 'min-h-[60vh] w-full';

    return (
        <>
            <style>{LOADER_STYLES}</style>

            <div className={`${containerClass} flex items-center justify-center`}>
                <div className="flex flex-col items-center gap-5">

                    {/* Bigger cart loader */}
                    <div className="w-28 h-28 relative flex items-center justify-center">

                        <svg
                            className="absolute inset-0 cart-loader-spin"
                            viewBox="0 0 100 100"
                            fill="none"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="44"
                                stroke="#FEE7D6"
                                strokeWidth="6"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="44"
                                stroke="#F97316"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray="69 210"
                                transform="rotate(-90 50 50)"
                            />
                        </svg>

                        <svg
                            viewBox="0 0 64 64"
                            className="w-1/2 h-1/2 cart-loader-roll text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 12h8l6 30h30l6-22H14" />
                            <g className="cart-loader-bounce">
                                <rect x="22" y="20" width="6" height="6" rx="1.5" fill="currentColor" stroke="none" opacity="0.4" />
                                <rect x="32" y="17" width="6" height="6" rx="1.5" fill="currentColor" stroke="none" opacity="0.6" />
                                <rect x="42" y="20" width="6" height="6" rx="1.5" fill="currentColor" stroke="none" opacity="0.8" />
                            </g>
                            <circle cx="20" cy="52" r="7" className="cart-loader-wheel" fill="none" />
                            <circle cx="46" cy="52" r="7" className="cart-loader-wheel" fill="none" />
                        </svg>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                        <p className="cart-loader-shimmer-text text-[14px] font-bold tracking-wider uppercase">
                            {label}
                        </p>
                        {seconds > 3 && (
                            <p className="mt-1.5 text-[12px] text-gray-400">
                                This is taking a moment…
                            </p>
                        )}
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" />
                    </div>
                </div>
            </div>
        </>
    );
}

// ==========================================
// DEFAULT EXPORT
// ==========================================
export default CartLoader;