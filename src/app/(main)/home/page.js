// src/app/(main)/home/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";

export default function HomePage() {
    const router = useRouter();
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    // Check if user is logged in and is Level 1
    useEffect(() => {
        const userLevel = localStorage.getItem('userLevel') || '1';
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn && userLevel === '1') {
            const timer = setTimeout(() => {
                setShowUpgradeModal(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleUpgradeClose = () => {
        setShowUpgradeModal(false);
        localStorage.setItem('userLevel', '2');
        router.push('/home');
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Dashboard Sections */}
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
        </div>
    );
}