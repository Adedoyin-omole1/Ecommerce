// src/Components/admin/CustomerList.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faPen,
    faTrashCan,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

const CUSTOMERS = [
    { id: 1, name: 'Olivia Carter', email: 'olivia@example.com', orders: 12, spent: 892.5, joined: '2024-01-15' },
    { id: 2, name: 'Liam Wilson', email: 'liam@example.com', orders: 8, spent: 542.0, joined: '2024-02-20' },
    { id: 3, name: 'Sophia Martinez', email: 'sophia@example.com', orders: 24, spent: 1849.99, joined: '2023-11-05' },
    { id: 4, name: 'Noah Anderson', email: 'noah@example.com', orders: 3, spent: 164.0, joined: '2024-04-12' },
    { id: 5, name: 'Ava Thompson', email: 'ava@example.com', orders: 15, spent: 1240.75, joined: '2023-08-30' },
];

export default function CustomerList() {
    const [search, setSearch] = useState('');

    const filtered = CUSTOMERS.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">

            {/* Search + Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search customers..."
                        className="w-full h-10 pl-10 pr-4 rounded-full bg-white border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/15 text-[12.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />
                </div>
                <p className="text-[12px] text-gray-500">
                    {filtered.length} customer{filtered.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Orders</th>
                                <th className="px-6 py-3 text-left">Total Spent</th>
                                <th className="px-6 py-3 text-left">Joined</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <FontAwesomeIcon icon={faUser} className="w-8 h-8 text-gray-300 mb-3" />
                                        <p className="text-[13px] text-gray-500">No customers found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="shrink-0 w-9 h-9 rounded-full bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold">
                                                    {c.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                                                </div>
                                                <span className="text-[12.5px] font-semibold text-gray-900 truncate">
                                                    {c.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-[12px] text-gray-600">
                                            {c.email}
                                        </td>
                                        <td className="px-6 py-3.5 text-[12.5px] font-semibold text-gray-900 tabular-nums">
                                            {c.orders}
                                        </td>
                                        <td className="px-6 py-3.5 text-[12.5px] font-semibold text-gray-900 tabular-nums">
                                            ${c.spent.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-3.5 text-[12px] text-gray-500">
                                            {c.joined}
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <div className="inline-flex items-center gap-1">
                                                <button className="w-8 h-8 rounded-lg hover:bg-orange-50 text-gray-500 hover:text-orange-500 flex items-center justify-center transition-colors">
                                                    <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                                                </button>
                                                <button className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 flex items-center justify-center transition-colors">
                                                    <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}