// src/Components/checkout/PaymentMethodsList.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuildingColumns,
    faCreditCard,
    faMoneyBillWave,
    faWallet,
    faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';

const METHODS = [
    {
        id: 'transfer',
        label: 'Bank Transfer',
        icon: faBuildingColumns,
        hint: 'Naira Transfer',
        badge: null,
    },
    {
        id: 'card',
        label: 'Card',
        icon: faCreditCard,
        hint: 'Visa, Mastercard',
        badge: null,
    },
    {
        id: 'opay',
        label: 'OPay',
        icon: faWallet,
        hint: 'Pay with OPay wallet',
        badge: 'NEW',
    },
    {
        id: 'cod',
        label: 'Cash on Delivery',
        icon: faMoneyBillWave,
        hint: 'Pay when delivered',
        badge: null,
    },
];

export default function PaymentMethodsList({ value, onChange }) {
    return (
        <div className="space-y-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-3">
                Pay With
            </p>

            {METHODS.map((method) => {
                const isActive = value === method.id;
                return (
                    <button
                        key={method.id}
                        onClick={() => onChange(method.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all ${isActive
                                ? 'bg-orange-50 border border-orange-200'
                                : 'bg-white border border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <span
                            className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${isActive
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <FontAwesomeIcon icon={method.icon} className="w-3 h-3" />
                        </span>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p
                                    className={`text-[12.5px] font-semibold ${isActive ? 'text-orange-600' : 'text-gray-900'
                                        }`}
                                >
                                    {method.label}
                                </p>
                                {method.badge && (
                                    <span className="text-[8px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">
                                        {method.badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-[10.5px] text-gray-500 truncate">
                                {method.hint}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}