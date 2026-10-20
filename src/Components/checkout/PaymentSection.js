// src/Components/checkout/PaymentSection.js
'use client';

import { useState } from 'react';
import PaymentMethodsList from './PaymentMethodList';
import BankTransferPanel from './BankTransferPanel';
import OpayPanel from './OpayPanel';
import CardPaymentPanel from './CardPaymentPanel';
import CashOnDeliveryPanel from './CashOnDeliveryPanel';

export default function PaymentSection({ onSuccess }) {
    const [method, setMethod] = useState('transfer');

    return (
        <div>
            <h2 className="text-[16px] font-bold text-gray-900 mb-4">
                Payment Method
            </h2>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

                {/* LEFT: Method list */}
                <div className="w-full lg:w-56 shrink-0">
                    <PaymentMethodsList value={method} onChange={setMethod} />
                </div>

                {/* RIGHT: Method panel */}
                <div className="flex-1 min-w-0">
                    {method === 'transfer' && (
                        <BankTransferPanel onSuccess={onSuccess} />
                    )}
                    {method === 'opay' && (
                        <OpayPanel onSuccess={onSuccess} />
                    )}
                    {method === 'card' && (
                        <CardPaymentPanel onSuccess={onSuccess} />
                    )}
                    {method === 'cod' && (
                        <CashOnDeliveryPanel onSuccess={onSuccess} />
                    )}
                </div>
            </div>
        </div>
    );
}