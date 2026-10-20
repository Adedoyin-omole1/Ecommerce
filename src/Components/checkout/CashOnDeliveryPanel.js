// src/Components/checkout/CashOnDeliveryPanel.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faTruckFast } from '@fortawesome/free-solid-svg-icons';

export default function CashOnDeliveryPanel({ onSuccess }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
            <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-500">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="w-4 h-4" />
                </span>
                <div>
                    <h3 className="text-[14px] font-bold text-gray-900">
                        Cash on Delivery
                    </h3>
                    <p className="text-[11px] text-gray-500">
                        Pay when your order arrives
                    </p>
                </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <FontAwesomeIcon icon={faTruckFast} className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[12px] text-gray-700 leading-relaxed">
                    Please have the exact amount ready when the delivery agent
                    arrives. You&apos;ll receive a call before delivery.
                </p>
            </div>

            <button
                type="button"
                onClick={() =>
                    onSuccess?.({
                        method: 'Cash on Delivery',
                        bank: 'Cash',
                        accountNumber: 'Pay on delivery',
                    })
                }
                className="mt-5 w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all"
            >
                Confirm Order
            </button>
        </div>
    );
}