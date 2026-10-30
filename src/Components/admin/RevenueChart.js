'use client';

export default function RevenueChart() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-bold text-gray-900">Sales Revenue</h2>
                <select className="h-8 px-2 rounded-lg border border-gray-200 text-[11.5px] text-gray-700 bg-white outline-none cursor-pointer hover:bg-gray-50">
                    <option>Daily</option>
                    <option>Weekly</option>
                </select>
            </div>

            {/* Chart Area */}
            <div className="relative flex-1 min-h-55 mb-4">
                {/* Tooltip Mockup */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] p-2 rounded-lg shadow-lg z-10 flex flex-col items-center pointer-events-none">
                    <span className="text-gray-400">May 18, 2025</span>
                    <div className="flex items-center gap-1.5 font-bold mt-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> ₦6,240
                    </div>
                </div>

                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 pb-6">
                    <div className="border-b border-gray-100 w-full flex items-center h-0"><span className="bg-white pr-2">₦8K</span></div>
                    <div className="border-b border-gray-100 w-full flex items-center h-0"><span className="bg-white pr-2">₦6K</span></div>
                    <div className="border-b border-gray-100 w-full flex items-center h-0"><span className="bg-white pr-2">₦4K</span></div>
                    <div className="border-b border-gray-100 w-full flex items-center h-0"><span className="bg-white pr-2">₦2K</span></div>
                    <div className="border-b border-gray-100 w-full flex items-center h-0"><span className="bg-white pr-2">₦0</span></div>
                </div>

                {/* SVG Line */}
                <svg viewBox="0 0 600 200" className="w-full h-full absolute inset-0 pt-2 pb-6" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Area Fill */}
                    <path d="M0 150 Q 50 140 100 120 T 200 130 T 300 90 T 400 70 T 500 40 T 600 60 L 600 200 L 0 200 Z" fill="url(#areaGradient)" />
                    {/* The Line */}
                    <path d="M0 150 Q 50 140 100 120 T 200 130 T 300 90 T 400 70 T 500 40 T 600 60" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                    {/* The Dot on the Line */}
                    <circle cx="300" cy="90" r="5" fill="#EF4444" stroke="white" strokeWidth="2" />
                </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[10px] text-gray-400 border-t border-gray-100 pt-3">
                <span>May 1</span><span>May 7</span><span>May 14</span><span>May 21</span><span>May 28</span>
            </div>

            {/* Bottom Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
                <div>
                    <p className="text-[13px] font-bold text-gray-900">₦48,250</p>
                    <p className="text-[10px] text-gray-500 mt-1">Total Revenue</p>
                </div>
                <div>
                    <p className="text-[13px] font-bold text-gray-900">1,482</p>
                    <p className="text-[10px] text-gray-500 mt-1">Total Orders</p>
                </div>
                <div>
                    <p className="text-[13px] font-bold text-gray-900">892</p>
                    <p className="text-[10px] text-gray-500 mt-1">New Customers</p>
                </div>
                <div>
                    <p className="text-[13px] font-bold text-gray-900">5.2%</p>
                    <p className="text-[10px] text-gray-500 mt-1">Returning Rate</p>
                </div>
            </div>
        </div>
    );
}