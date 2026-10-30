// src/Components/admin/AdminTable.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faInbox } from '@fortawesome/free-solid-svg-icons';

export default function AdminTable({
    title,
    description,
    data,
    columns,
    searchPlaceholder = "Search...",
    searchKeys = []
}) {
    const [search, setSearch] = useState('');

    // Filter logic based on search keys
    const filteredData = data.filter((item) => {
        if (!search) return true;
        const query = search.toLowerCase();
        return searchKeys.some((key) =>
            String(item[key]).toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-900 tracking-tight">
                        {title}
                    </h1>
                    <p className="mt-1 text-[13px] text-gray-500">
                        {description}
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full h-10 pl-10 pr-4 rounded-full bg-white border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/15 text-[12.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider text-left">
                                {columns.map((col, i) => (
                                    <th key={i} className="px-6 py-3 whitespace-nowrap">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-16 text-center">
                                        <FontAwesomeIcon icon={faInbox} className="w-10 h-10 text-gray-200 mb-3" />
                                        <p className="text-[13px] text-gray-500 font-medium">No records found.</p>
                                        <p className="text-[11px] text-gray-400 mt-1">Try adjusting your search query.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50/60 transition-colors">
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className="px-6 py-3.5 whitespace-nowrap">
                                                {col.render ? col.render(row, rowIndex) : row[col.key]}
                                            </td>
                                        ))}
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