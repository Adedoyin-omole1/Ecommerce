// src/Components/checkout/BankTransferPanel.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCopy,
    faCheck,
    faUpload,
    faXmark,
    faClock,
} from '@fortawesome/free-solid-svg-icons';

const BANK_ACCOUNTS = [
    { bank: 'Paystack-Titan', accountNumber: '9992190523', accountName: "King's  Kollectibles Ltd" },
    { bank: 'Providus Bank', accountNumber: '8842105379', accountName: "King's  Kollectibles Ltd" },
    { bank: 'Wema Bank', accountNumber: '7315562084', accountName: "King's  Kollectibles Ltd" },
    { bank: 'Sterling Bank', accountNumber: '5578184203', accountName: "King's  Kollectibles Ltd" },
];

const TIMER_SECONDS = 5 * 60;

export default function BankTransferPanel({ onSuccess }) {
    const [accountIndex, setAccountIndex] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
    const [copied, setCopied] = useState(null);
    const [receipt, setReceipt] = useState(null);
    const fileInputRef = useRef(null);

    const account = BANK_ACCOUNTS[accountIndex];

    useEffect(() => {
        if (secondsLeft <= 0) {
            setAccountIndex((i) => (i + 1) % BANK_ACCOUNTS.length);
            setSecondsLeft(TIMER_SECONDS);
            return;
        }
        const timer = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const handleCopy = async (text, key) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(key);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setReceipt({
            name: file.name,
            size: (file.size / 1024).toFixed(0) + ' KB',
        });
    };

    const clearReceipt = () => {
        setReceipt(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = () => {
        onSuccess?.({
            method: 'Bank Transfer',
            bank: account.bank,
            accountNumber: account.accountNumber,
            receipt: receipt?.name,
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">

            <div className="text-center mb-5">
                <h3 className="text-[16px] font-bold text-gray-900">
                    Transfer ₦4,850 to PAYSTACK CHECKOUT
                </h3>
                <p className="mt-1 text-[11.5px] text-gray-500">
                    Complete the transfer using the details below
                </p>
            </div>

            {/* Account details */}
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Bank Name
                    </p>
                    <p className="mt-1 text-[14px] font-bold text-gray-900">
                        {account.bank}
                    </p>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Account Number
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-3">
                        <p className="text-[18px] font-bold text-gray-900 tabular-nums">
                            {account.accountNumber}
                        </p>
                        <button
                            onClick={() => handleCopy(account.accountNumber, 'number')}
                            aria-label="Copy account number"
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-orange-500 hover:text-orange-500 text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={copied === 'number' ? faCheck : faCopy}
                                className="w-3 h-3"
                            />
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Amount
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-3">
                        <p className="text-[18px] font-bold text-gray-900 tabular-nums">
                            ₦4,850
                        </p>
                        <button
                            onClick={() => handleCopy('4850', 'amount')}
                            aria-label="Copy amount"
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-orange-500 hover:text-orange-500 text-gray-500 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={copied === 'amount' ? faCheck : faCopy}
                                className="w-3 h-3"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Timer */}
            <div className="mt-5 pt-5 border-t border-dashed border-gray-200">
                <div className="flex items-center justify-center gap-2 text-[12.5px] text-gray-600">
                    <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5 text-orange-500" />
                    <span>
                        This account expires in{' '}
                        <span
                            className={`font-bold tabular-nums ${secondsLeft < 60 ? 'text-red-500' : 'text-emerald-600'
                                }`}
                        >
                            {String(minutes).padStart(2, '0')}:
                            {String(seconds).padStart(2, '0')}
                        </span>
                    </span>
                </div>
                <div className="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${secondsLeft < 60 ? 'bg-red-500' : 'bg-orange-500'
                            }`}
                        style={{ width: `${(secondsLeft / TIMER_SECONDS) * 100}%` }}
                    />
                </div>
            </div>

            {/* Receipt upload */}
            <div className="mt-6">
                <p className="text-[12px] font-semibold text-gray-700 mb-2">
                    Upload Transfer Receipt
                </p>

                {!receipt ? (
                    <>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFile}
                            className="hidden"
                            id="receipt-upload"
                        />
                        <label
                            htmlFor="receipt-upload"
                            className="flex flex-col items-center justify-center gap-2 h-28 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-400 bg-gray-50/60 hover:bg-orange-50/40 cursor-pointer transition-colors"
                        >
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-orange-500 shadow-sm">
                                <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
                            </span>
                            <span className="text-[12px] font-medium text-gray-700">
                                Click to upload receipt
                            </span>
                            <span className="text-[10.5px] text-gray-400">
                                PNG, JPG, or PDF · Max 5MB
                            </span>
                        </label>
                    </>
                ) : (
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-white shrink-0">
                            <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="text-[12.5px] font-semibold text-gray-900 truncate">
                                {receipt.name}
                            </p>
                            <p className="text-[10.5px] text-gray-500">
                                {receipt.size} · Uploaded
                            </p>
                        </div>
                        <button
                            onClick={clearReceipt}
                            aria-label="Remove receipt"
                            className="flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                        >
                            <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>

            {/* CTA */}
            <button
                type="button"
                onClick={handleSubmit}
                disabled={!receipt}
                className="mt-5 w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-[13.5px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all"
            >
                I&apos;ve Sent the Money
            </button>

            <p className="mt-3 text-center text-[10.5px] text-gray-400">
                Your order will be processed once we confirm payment
            </p>
        </div>
    );
}