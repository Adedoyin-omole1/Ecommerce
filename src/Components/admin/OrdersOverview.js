'use client';

export default function OrdersOverview() {
    const data = [
        { label: 'Delivered', value: 1026, color: '#EF4444', pct: '69%' },
        { label: 'Processing', value: 241, color: '#F97316', pct: '16%' },
        { label: 'Shipped', value: 124, color: '#F59E0B', pct: '8%' },
        { label: 'Cancelled', value: 91, color: '#9CA3AF', pct: '6%' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-bold text-gray-900">Orders Overview</h2>
                <button className="text-[11.5px] font-semibold text-red-500 hover:text-red-600">View All →</button>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
                {/* CSS Donut Chart */}
                <div className="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F3F4F6" strokeWidth="4" />
                        {/* Delivered (Red) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="69 31" strokeDashoffset="25" />
                        {/* Processing (Orange) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F97316" strokeWidth="4" strokeDasharray="16 84" strokeDashoffset="-44" />
                        {/* Shipped (Amber) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="8 92" strokeDashoffset="-60" />
                        {/* Cancelled (Gray) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#9CA3AF" strokeWidth="4" strokeDasharray="6 94" strokeDashoffset="-68" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[18px] font-bold text-gray-900 leading-none">1,482</span>
                        <span className="text-[9px] text-gray-500 mt-1">Total Orders</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 w-full">
                    {data.map((item) => (
                        <div key={item.label} className="flex items-center justify-between text-[11.5px]">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-gray-600 font-medium">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-900 font-semibold">{item.value.toLocaleString()}</span>
                                <span className="text-gray-400 w-8 text-right">{item.pct}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}