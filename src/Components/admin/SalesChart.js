// src/Components/admin/SalesChart.js
'use client';

const DATA = [
    { x: 0, y: 15 },
    { x: 1, y: 25 },
    { x: 2, y: 20 },
    { x: 3, y: 35 },
    { x: 4, y: 30 },
    { x: 5, y: 45 },
    { x: 6, y: 40 },
    { x: 7, y: 52 },
    { x: 8, y: 48 },
    { x: 9, y: 62 },
    { x: 10, y: 58 },
    { x: 11, y: 70 },
    { x: 12, y: 65 },
];

export default function SalesChart() {
    const W = 600;
    const H = 220;
    const padding = 20;

    const maxY = 80;
    const minY = 0;

    const points = DATA.map((d) => {
        const px = padding + (d.x / 12) * (W - padding * 2);
        const py = H - padding - ((d.y - minY) / (maxY - minY)) * (H - padding * 2);
        return `${px},${py}`;
    }).join(' ');

    const areaPoints = `${padding},${H - padding} ${points} ${W - padding},${H - padding}`;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Sales Revenue</h3>
                <select className="h-8 px-3 rounded-lg border border-gray-200 text-[11.5px] text-gray-700 bg-white outline-none">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
            </div>

            <div className="relative">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
                    {/* Grid lines */}
                    {[0, 1, 2, 3].map((i) => (
                        <line
                            key={i}
                            x1={padding}
                            x2={W - padding}
                            y1={padding + i * ((H - padding * 2) / 3)}
                            y2={padding + i * ((H - padding * 2) / 3)}
                            stroke="#F3F4F6"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Area fill */}
                    <polygon
                        points={areaPoints}
                        fill="url(#areaGradient)"
                    />

                    {/* Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Gradient def */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-2 px-4 text-[10.5px] text-gray-400">
                    <span>May 1</span>
                    <span>May 7</span>
                    <span>May 14</span>
                    <span>May 21</span>
                    <span>May 28</span>
                </div>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-100">
                <Stat label="Total Revenue" value="$48,250" />
                <Stat label="Total Orders" value="1,482" />
                <Stat label="New Customers" value="892" />
                <Stat label="Returning Rate" value="5.2%" />
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div>
            <p className="text-[14px] font-bold text-gray-900 tabular-nums">{value}</p>
            <p className="mt-0.5 text-[10.5px] text-gray-500">{label}</p>
        </div>
    );
}