// src/Components/admin/RecentOrders.js
'use client';

const ORDERS = [
    { id: '#10258', customer: 'Olivia Carter', total: '$89.00', status: 'Delivered', color: 'emerald', time: '2h ago' },
    { id: '#10257', customer: 'Liam Wilson', total: '$120.00', status: 'Processing', color: 'orange', time: '4h ago' },
    { id: '#10256', customer: 'Sophia Martinez', total: '$45.00', status: 'Shipped', color: 'amber', time: '6h ago' },
    { id: '#10255', customer: 'Noah Anderson', total: '$64.00', status: 'Delivered', color: 'emerald', time: '8h ago' },
    { id: '#10254', customer: 'Ava Thompson', total: '$32.00', status: 'Processing', color: 'orange', time: '12h ago' },
];

const STATUS_CLASSES = {
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-500',
    amber: 'bg-amber-50 text-amber-600',
};

export default function RecentOrders() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Recent Orders</h3>
                <button className="text-[11.5px] font-semibold text-red-500 hover:text-red-600">
                    View All →
                </button>
            </div>

            <div className="overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            <th className="pb-2">Order</th>
                            <th className="pb-2">Customer</th>
                            <th className="pb-2">Total</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ORDERS.map((o) => (
                            <tr key={o.id} className="border-t border-gray-50">
                                <td className="py-2.5 text-[12px] font-semibold text-gray-900">{o.id}</td>
                                <td className="py-2.5 text-[12px] text-gray-700">{o.customer}</td>
                                <td className="py-2.5 text-[12px] font-semibold text-gray-900 tabular-nums">
                                    {o.total}
                                </td>
                                <td className="py-2.5">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_CLASSES[o.color]}`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td className="py-2.5 text-[11px] text-gray-500 text-right whitespace-nowrap">
                                    {o.time}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}