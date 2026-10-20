// src/Components/product/ProductTabs.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const TABS = [
    { id: 'description', label: 'Description' },
    { id: 'info', label: 'Additional Info' },
    { id: 'reviews', label: 'Reviews (23)' },
];

export default function ProductTabs({ product }) {
    const [active, setActive] = useState('description');

    return (
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start border-t border-gray-100 pt-10 lg:pt-14">

            {/* Tabs */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {TABS.map((tab) => {
                    const isActive = active === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`shrink-0 lg:text-left px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${isActive
                                    ? 'text-orange-500 bg-orange-50'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="text-[13.5px] text-gray-600 leading-relaxed">

                {/* Description */}
                {active === 'description' && (
                    <div>
                        <p className="mb-4">
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint non provident.
                        </p>

                        <h3 className="mt-6 mb-3 text-[15px] font-bold text-gray-900">
                            Information
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                                <span>
                                    <span className="text-gray-900 font-medium">
                                        Fabric:
                                    </span>{' '}
                                    {product.info?.fabric || 'Premium'}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                                <span>
                                    <span className="text-gray-900 font-medium">
                                        Fit type:
                                    </span>{' '}
                                    {product.info?.fit || 'Regular'}
                                </span>
                            </li>
                            {(product.info?.features || []).map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-2 w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Additional Info */}
                {active === 'info' && (
                    <div className="overflow-hidden rounded-xl border border-gray-100">
                        <table className="w-full text-[13px]">
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50 w-1/3">
                                        SKU
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {product.sku}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">
                                        Category
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {product.category}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">
                                        Brand
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {product.brand}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">
                                        Tags
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {product.tags?.join(', ')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Reviews */}
                {active === 'reviews' && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-[11px] font-bold">
                                        JD
                                    </span>
                                    <div>
                                        <p className="text-[13px] font-semibold text-gray-900">
                                            John Doe
                                        </p>
                                        <div className="flex items-center gap-0.5 mt-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <FontAwesomeIcon
                                                    key={s}
                                                    icon={faStar}
                                                    className={`w-2.5 h-2.5 ${s <= 4 ? 'text-amber-400'
                                                            : 'text-gray-200'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[12.5px] text-gray-600 leading-relaxed">
                                    Excellent quality! Arrived faster than
                                    expected and the packaging was beautiful.
                                    Would definitely buy again.
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}