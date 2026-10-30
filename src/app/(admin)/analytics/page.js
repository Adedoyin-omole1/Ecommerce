// src/app/(admin)/analytics/page.js
'use client';

import StatCard from '@/Components/admin/StatCard';
import SalesChart from '@/Components/admin/SalesChart';
import ConversionFunnel from '@/Components/admin/ConversionFunnel';
import TrafficSources from '@/Components/admin/TrafficSources';
import { faDollarSign, faBagShopping, faUsers, faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-900 tracking-tight">Analytics</h1>
                <p className="mt-1 text-[13px] text-gray-500">Deep dive into your store's performance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={faDollarSign} label="Total Revenue" value="$48,250" change="+12.5%" color="red" />
                <StatCard icon={faBagShopping} label="Total Orders" value="1,482" change="+8.3%" color="orange" />
                <StatCard icon={faUsers} label="Customers" value="892" change="+16.7%" color="amber" />
                <StatCard icon={faCartShopping} label="Avg. Order Value" value="$32.56" change="+5.4%" color="emerald" />
            </div>

            <SalesChart />
            <ConversionFunnel />
            <TrafficSources />
        </div>
    );
}