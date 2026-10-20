// src/app/(main)/about/sections/StatsRow.js
'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_STATS = [
    { value: 50000, suffix: '+', label: 'Happy Customers' },
    { value: 12000, suffix: '+', label: 'Products Shipped' },
    { value: 30, suffix: '+', label: 'Countries Served' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

// ==========================================
// COUNT UP HOOK
// ==========================================
function useCountUp(target, isVisible, duration = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const startTime = performance.now();

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(step);
    }, [isVisible, target, duration]);

    return count;
}

// ==========================================
// SINGLE STAT
// ==========================================
function StatItem({ value, suffix, label, isVisible }) {
    const count = useCountUp(value, isVisible);
    const formatted = count.toLocaleString();

    return (
        <div className="text-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-none tabular-nums">
                {formatted}
                <span className="text-red-500">{suffix}</span>
            </p>
            <p className="mt-2 text-[12px] sm:text-[13px] text-gray-500 uppercase tracking-wider">
                {label}
            </p>
        </div>
    );
}

// ==========================================
// MAIN
// ==========================================
export default function StatsRow({ stats = DEFAULT_STATS }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-gray-50 py-14 lg:py-20 border-y border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, idx) => (
                        <StatItem
                            key={idx}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}