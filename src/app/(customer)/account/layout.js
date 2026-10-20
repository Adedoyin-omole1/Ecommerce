// src/app/(customer)/account/layout.js
'use client';

import AccountSidebar from '@/Components/account/AccountSidebar';

export default function AccountLayout({ children }) {
    return (
        <section className="bg-gray-50 min-h-screen">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">

                    {/* Sidebar */}
                    <AccountSidebar />

                    {/* Content */}
                    <div className="flex-1 min-w-0 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}