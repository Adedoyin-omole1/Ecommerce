// src/Components/admin/BestSellingProducts.js
'use client';

const PRODUCTS = [
    { rank: 1, name: 'Classic White Sneakers', sales: 1284, revenue: '$38,520', color: 'bg-stone-100' },
    { rank: 2, name: 'Minimal Hoodie', sales: 942, revenue: '$28,260', color: 'bg-gray-100' },
    { rank: 3, name: 'Smart Watch Pro', sales: 721, revenue: '$21,630', color: 'bg-zinc-100' },
    { rank: 4, name: 'Polarized Sunglasses', sales: 620, revenue: '$18,600', color: 'bg-slate-100' },
    { rank: 5, name: 'Travel Backpack', sales: 512, revenue: '$15,360', color: 'bg-neutral-100' },
];

export default function BestSellingProducts() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Best Selling Products</h3>
                <button className="text-[11.5px] font-semibold text-red-500 hover:text-red-600">
                    View All →
                </button>
            </div>

            <div className="space-y-3">
                {PRODUCTS.map((p) => (
                    <div key={p.rank} className="flex items-center gap-3">
                        <span className="shrink-0 w-5 text-center text-[11.5px] font-semibold text-gray-400">
                            {p.rank}
                        </span>
                        <span className={`shrink-0 w-10 h-10 rounded-lg ${p.color}`} />
                        <span className="flex-1 text-[12.5px] font-medium text-gray-900 truncate">
                            {p.name}
                        </span>
                        <span className="text-[11.5px] text-gray-500 tabular-nums shrink-0">
                            {p.sales.toLocaleString()}
                        </span>
                        <span className="text-[12px] font-semibold text-gray-900 tabular-nums shrink-0">
                            {p.revenue}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}