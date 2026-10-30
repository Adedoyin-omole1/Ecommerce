// src/app/(customer)/account/addresses/page.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPlus, faPen, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/contexts/UserContext';

export default function AddressesPage() {
    const { user } = useUser();

    // In a real app, fetch these from Supabase. Hardcoded for now as requested.
    const addresses = [
        {
            id: 1,
            label: 'Home',
            name: user?.name || 'John Doe',
            line1: '123 Fashion Avenue',
            line2: 'Apartment 4B',
            city: 'Lagos',
            state: 'Lagos State',
            zip: '100001',
            country: 'Nigeria',
            default: true,
        },
        {
            id: 2,
            label: 'Office',
            name: user?.name || 'John Doe',
            line1: '45 Business District',
            line2: 'Floor 12',
            city: 'Lagos',
            state: 'Lagos State',
            zip: '100002',
            country: 'Nigeria',
            default: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4 flex-wrap bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-[18px] font-bold text-gray-900">Saved Addresses</h2>
                    <p className="text-[13px] text-gray-500 mt-1">{addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved</p>
                </div>
                <button className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-semibold shadow-md transition-all shrink-0">
                    <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" /> Add New Address
                </button>
            </div>

            {/* Address grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {addresses.map((addr) => (
                    <div key={addr.id} className={`bg-white rounded-2xl border p-6 transition-all shadow-sm ${addr.default ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-100 hover:border-gray-300'}`}>
                        <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-orange-500">
                                    <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                                </span>
                                <p className="text-[15px] font-bold text-gray-900">{addr.label}</p>
                            </div>
                            {addr.default && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wide">
                                    <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" /> Default
                                </span>
                            )}
                        </div>

                        <div className="text-[13.5px] text-gray-600 leading-relaxed">
                            <p className="font-semibold text-gray-900">{addr.name}</p>
                            <p className="mt-1.5">{addr.line1}</p>
                            {addr.line2 && <p>{addr.line2}</p>}
                            <p>{addr.city}, {addr.state} {addr.zip}</p>
                            <p>{addr.country}</p>
                        </div>

                        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-4 flex-wrap">
                            <button className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-orange-500 transition-colors">
                                <FontAwesomeIcon icon={faPen} className="w-3 h-3" /> Edit
                            </button>
                            <button className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-red-500 transition-colors">
                                <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" /> Delete
                            </button>
                            {!addr.default && (
                                <button className="ml-auto inline-flex items-center gap-2 text-[12.5px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                                    Set as Default
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}