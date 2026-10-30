// src/Components/admin/ConversionFunnel.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEye,
    faCartShopping,
    faBagShopping,
} from '@fortawesome/free-solid-svg-icons';

const STEPS = [
    { icon: faUser, label: 'Site Visitors', value: '12,450', change: '+12%' },
    { icon: faEye, label: 'Product Views', value: '3,240', change: '+8%' },
    { icon: faCartShopping, label: 'Added to Cart', value: '742', change: '+14%' },
    { icon: faBagShopping, label: 'Purchases', value: '311', change: '+11%' },
];

export default function ConversionFunnel() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Conversion Funnel</h3>
                <select className="h-8 px-3 rounded-lg border border-gray-200 text-[11.5px] text-gray-700 bg-white outline-none">
                    <option>This Month</option>
                    <option>Last Month</option>
                </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STEPS.map((step, i) => (
                    <div key={step.label} className="relative">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white text-red-500 shadow-sm mb-2">
                                <FontAwesomeIcon icon={step.icon} className="w-3.5 h-3.5" />
                            </span>
                            <p className="text-[16px] font-bold text-gray-900 tabular-nums leading-none">
                                {step.value}
                            </p>
                            <p className="mt-1.5 text-[10px] text-gray-500">{step.label}</p>
                            <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                                ↑ {step.change}
                            </p>
                        </div>
                        {i < STEPS.length - 1 && (
                            <span className="hidden sm:block absolute top-1/2 -right-2 -translate-y-1/2 text-gray-300 text-[14px]">
                                →
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}