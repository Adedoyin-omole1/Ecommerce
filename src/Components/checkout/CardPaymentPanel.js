// src/Components/checkout/CardPaymentPanel.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';

export default function CardPaymentPanel({ onSuccess }) {
    const [card, setCard] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
    });

    const handleChange = (field, value) =>
        setCard((prev) => ({ ...prev, [field]: value }));

    const formatCardNumber = (value) =>
        value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

    const formatExpiry = (value) =>
        value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(?=\d)/, '$1/');

    const handleSubmit = () => {
        onSuccess?.({
            method: 'Card',
            bank: 'Card Payment',
            accountNumber: '•••• ' + card.number.replace(/\s/g, '').slice(-4),
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
            <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-orange-500">
                    <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" />
                </span>
                <div>
                    <h3 className="text-[14px] font-bold text-gray-900">
                        Pay with Card
                    </h3>
                    <p className="text-[11px] text-gray-500">
                        Visa, Mastercard, Verve
                    </p>
                </div>
            </div>

            <div className="space-y-3.5">
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                        Card Number
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={card.number}
                        onChange={(e) => handleChange('number', formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all tabular-nums"
                    />
                </div>

                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        value={card.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Name on card"
                        className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                            Expiry
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={card.expiry}
                            onChange={(e) => handleChange('expiry', formatExpiry(e.target.value))}
                            placeholder="MM/YY"
                            className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all tabular-nums"
                        />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                            CVV
                        </label>
                        <input
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            value={card.cvv}
                            onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, ''))}
                            placeholder="•••"
                            className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all tabular-nums"
                        />
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                className="mt-5 w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all"
            >
                Pay ₦4,850
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-gray-400">
                <FontAwesomeIcon icon={faLock} className="w-2.5 h-2.5 text-emerald-500" />
                Your card details are encrypted and secure
            </p>
        </div>
    );
}