'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faCartShopping, faBagShopping } from '@fortawesome/free-solid-svg-icons';

export function TrafficSources() {
    const sources = [
        { label: 'Direct', value: 34, color: 'bg-red-500' },
        { label: 'Organic Search', value: 28, color: 'bg-orange-500' },
        { label: 'Social Media', value: 18, color: 'bg-amber-500' },
        { label: 'Paid Ads', value: 12, color: 'bg-emerald-500' },
        { label: 'Email', value: 8, color: 'bg-gray-400' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-[15px] font-bold text-gray-900">Traffic Sources</h2>
                <button className="text-[11.5px] font-semibold text-red-500 hover:text-red-600">View Report →</button>
            </div>
            <div className="space-y-4">
                {sources.map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                        <span className="text-[11.5px] text-gray-600 w-24 shrink-0">{s.label}</span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-900 w-6 text-right">{s.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ConversionFunnel() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-[15px] font-bold text-gray-900">Conversion Funnel</h2>
                <span className="text-[11.5px] text-gray-500">This Month</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: faUser, label: 'Site Visitors', val: '12,450', pct: '+12%' },
                    { icon: faEye, label: 'Product Views', val: '3,240', pct: '+8%' },
                    { icon: faCartShopping, label: 'Added to Cart', val: '742', pct: '+14%' },
                    { icon: faBagShopping, label: 'Purchases', val: '311', pct: '+11%' },
                ].map((step, idx) => (
                    <div key={step.label} className="bg-gray-50 rounded-xl p-4 text-center relative">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-red-500 shadow-sm mb-2">
                            <FontAwesomeIcon icon={step.icon} className="w-3.5 h-3.5" />
                        </span>
                        <p className="text-[16px] font-bold text-gray-900">{step.val}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{step.label}</p>
                        <p className="text-[10px] font-bold text-emerald-500 mt-1">↑ {step.pct}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function BestSellingProducts() {
    const products = [
        { name: 'Classic White Sneakers', sales: 1284, revenue: '₦38,520' },
        { name: 'Minimal Hoodie', sales: 942, revenue: '₦28,260' },
        { name: 'Smart Watch Pro', sales: 721, revenue: '₦21,630' },
    ];
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-gray-900">Best Selling Products</h2>
                <button className="text-[11.5px] font-semibold text-red-500 hover:text-red-600">View All →</button>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <th className="pb-2">#</th>
                        <th className="pb-2">Product</th>
                        <th className="pb-2 text-right">Sales</th>
                        <th className="pb-2 text-right">Revenue</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {products.map((p, i) => (
                        <tr key={i}>
                            <td className="py-2.5 text-[11px] text-gray-500">{i + 1}</td>
                            <td className="py-2.5 text-[12px] font-medium text-gray-900">{p.name}</td>
                            <td className="py-2.5 text-[12px] text-gray-600 text-right">{p.sales.toLocaleString()}</td>
                            <td className="py-2.5 text-[12px] font-bold text-gray-900 text-right">{p.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function RecentOrders() {
    const orders = [
        { id: '#10258', name: 'Olivia Carter', total: '₦89.00', status: 'Delivered', color: 'emerald' },
        { id: '#10257', name: 'Liam Wilson', total: '₦120.00', status: 'Processing', color: 'orange' },
        { id: '#10256', name: 'Sophia Martinez', total: '₦45.00', status: 'Shipped', color: 'amber' },
    ];
    const colors = {
        emerald: 'bg-emerald-50 text-emerald-600',
        orange: 'bg-orange-50 text-orange-500',
        amber: 'bg-amber-50 text-amber-600'
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-gray-900">Recent Orders</h2>
                <button className="text-[11.5px] font-semibold text-red-500 hover:text-red-600">View All →</button>
            </div>
            <div className="space-y-3">
                {orders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between py-1">
                        <div>
                            <p className="text-[12px] font-semibold text-gray-900">{o.name}</p>
                            <p className="text-[10px] text-gray-400">{o.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[12px] font-bold text-gray-900">{o.total}</p>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold mt-1 ${colors[o.color]}`}>
                                {o.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}