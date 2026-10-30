// src/Components/admin/TrafficSources.js
'use client';

const SOURCES = [
    { label: 'Direct', value: 34, color: 'bg-red-500' },
    { label: 'Organic Search', value: 28, color: 'bg-orange-500' },
    { label: 'Social Media', value: 18, color: 'bg-amber-500' },
    { label: 'Paid Ads', value: 12, color: 'bg-emerald-500' },
    { label: 'Email', value: 8, color: 'bg-gray-400' },
];

export default function TrafficSources() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Traffic Sources</h3>
                <button className="text-[11.5px] font-semibold text-red-500 hover:text-red-600">
                    View Report →
                </button>
            </div>

            <div className="space-y-3">
                {SOURCES.map((s) => (
                    <div key={s.label}>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[12px] text-gray-700">{s.label}</span>
                            <span className="text-[11.5px] font-semibold text-gray-900 tabular-nums">
                                {s.value}%
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div
                                className={`h-full rounded-full ${s.color} transition-all`}
                                style={{ width: `${s.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}