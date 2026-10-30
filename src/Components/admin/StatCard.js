'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

export default function StatCard({ icon, title, value, percentage, colorClass, bgClass, sparklinePath }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
            {/* Top Row */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full ${bgClass} ${colorClass} flex items-center justify-center shrink-0`}>
                        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                    </span>
                    <span className="text-[13px] font-medium text-gray-500">{title}</span>
                </div>
            </div>

            {/* Middle Row (Big Number) */}
            <div>
                <h3 className="text-[26px] font-bold text-gray-900 leading-none">{value}</h3>
            </div>

            {/* Bottom Row (Percentage & Sparkline) */}
            <div className="flex items-end justify-between mt-4">
                <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-emerald-500 flex items-center gap-1">
                        <FontAwesomeIcon icon={faArrowTrendUp} className="w-3 h-3" /> {percentage}
                    </span>
                    <span className="text-[10px] text-gray-400">vs last month</span>
                </div>
                {/* Tiny SVG Sparkline */}
                <svg viewBox="0 0 100 30" className="w-20 h-8 opacity-60">
                    <path d={sparklinePath} fill="none" stroke="currentColor" strokeWidth="2.5" className={colorClass} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}