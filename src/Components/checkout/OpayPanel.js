// src/Components/checkout/OpayPanel.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCopy,
    faCheck,
    faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function OpayPanel({ onSuccess }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText('8147529610');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
            <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600">
                    <FontAwesomeIcon icon={faMobileScreen} className="w-4 h-4" />
                </span>
                <div>
                    <h3 className="text-[14px] font-bold text-gray-900">
                        Pay with OPay
                    </h3>
                    <p className="text-[11px] text-gray-500">
                        Transfer to our OPay wallet
                    </p>
                </div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-5 space-y-4">
                <div>
                    <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                        OPay Account Number
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-3">
                        <p className="text-[18px] font-bold text-gray-900 tabular-nums">
                            8147529610
                        </p>
                        <button
                            onClick={handleCopy}
                            aria-label="Copy OPay number"
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-emerald-200 hover:border-emerald-500 text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={copied ? faCheck : faCopy}
                                className="w-3 h-3"
                            />
                        </button>
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                        Account Name
                    </p>
                    <p className="mt-1 text-[14px] font-bold text-gray-900">
                        King&apos;s Kollitab Ltd
                    </p>
                </div>
                <div>
                    <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                        Amount
                    </p>
                    <p className="mt-1 text-[18px] font-bold text-gray-900 tabular-nums">
                        ₦4,850
                    </p>
                </div>
            </div>

            <p className="mt-4 text-center text-[11.5px] text-gray-500">
                Open OPay app → Transfer → Input account number → Confirm
            </p>

            <button
                type="button"
                onClick={() =>
                    onSuccess?.({
                        method: 'OPay',
                        bank: 'OPay',
                        accountNumber: '8147529610',
                    })
                }
                className="mt-5 w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all"
            >
                I&apos;ve Sent the Money
            </button>
        </div>
    );
}