'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faBagShopping, faUsers, faCartShopping, faCalendar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import StatCard from '@/Components/admin/StatCard';
import RevenueChart from '@/Components/admin/RevenueChart';
import OrdersOverview from '@/Components/admin/OrdersOverview';
import { TrafficSources, ConversionFunnel, BestSellingProducts, RecentOrders } from '@/Components/admin/DashboardWidgets';
import { useAdminProducts } from '@/contexts/AdminProductContext';

export default function AdminDashboard() {
  const { products } = useAdminProducts();

  // Mock Sparklines for the Stat Cards
  const spark1 = "M0 20 Q 10 10 20 15 T 40 5 T 60 15 T 80 0 T 100 10";
  const spark2 = "M0 15 Q 15 20 25 10 T 50 15 T 75 5 T 100 12";
  const spark3 = "M0 25 Q 20 5 40 20 T 70 10 T 100 5";
  const spark4 = "M0 20 Q 15 10 30 15 T 60 5 T 80 18 T 100 2";

  return (
    <div className="space-y-6 pb-10 max-w-[1600px] mx-auto">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white border border-gray-200 text-[12.5px] font-medium text-gray-700 shadow-sm">
          <FontAwesomeIcon icon={faCalendar} className="w-3.5 h-3.5 text-gray-400" />
          May 1, 2025 – May 31, 2025
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={faDollarSign} title="Total Revenue" value="₦48,250"
          percentage="+12.5%" colorClass="text-red-500" bgClass="bg-red-50" sparklinePath={spark1}
        />
        <StatCard
          icon={faBagShopping} title="Total Orders" value="1,482"
          percentage="+8.3%" colorClass="text-orange-500" bgClass="bg-orange-50" sparklinePath={spark2}
        />
        <StatCard
          icon={faUsers} title="Customers" value="892"
          percentage="+16.7%" colorClass="text-amber-500" bgClass="bg-amber-50" sparklinePath={spark3}
        />
        <StatCard
          icon={faCartShopping} title="Avg. Order Value" value="₦32.56"
          percentage="+5.4%" colorClass="text-emerald-500" bgClass="bg-emerald-50" sparklinePath={spark4}
        />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart takes 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        {/* Orders Overview takes 1 column */}
        <div className="lg:col-span-1">
          <OrdersOverview />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ConversionFunnel />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BestSellingProducts />
            <RecentOrders />
          </div>
        </div>

        <div className="lg:col-span-1">
          <TrafficSources />
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-red-500 via-red-500 to-orange-500 p-6 sm:p-8 shadow-lg shadow-red-500/20">
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/15 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">
              Grow Smarter
            </p>
            <h2 className="mt-1 text-[20px] sm:text-[24px] font-bold text-white leading-tight">
              Turn Insights into Increased Sales
            </h2>
          </div>
          <button className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white hover:bg-gray-50 text-gray-900 text-[13px] font-semibold shadow-md hover:shadow-lg transition-all shrink-0">
            View Full Analytics <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}