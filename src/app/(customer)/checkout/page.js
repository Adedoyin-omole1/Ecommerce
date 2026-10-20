// src/app/(customer)/checkout/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';

import CheckoutStepper from '@/Components/checkout/CheckoutStepper';
import ContactForm from '@/Components/checkout/ContactForm';
import ReviewStep from '@/Components/checkout/ReviewStep';
import PaymentSection from '@/Components/checkout/PaymentSection';
import OrderSummary from '@/Components/checkout/OrderSummary';
import OrderReceipt from '@/Components/checkout/OrderReceipt';

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [completed, setCompleted] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // ---- After payment success ----
  const handlePaymentSuccess = (data) => {
    setOrderData(data);
    setCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---- Success screen ----
  if (completed) {
    return (
      <section className="bg-[#1a1a2e] min-h-screen py-10 lg:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <OrderReceipt orderData={orderData} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="inline-flex items-center gap-2 text-[12.5px] font-medium text-gray-600 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
            {step === 1 ? 'Back to Cart' : 'Back'}
          </button>
          <span className="inline-flex items-center gap-2 text-[12px] text-gray-500">
            <FontAwesomeIcon icon={faLock} className="w-3 h-3 text-emerald-500" />
            Secure Checkout
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[30px] sm:text-[34px] font-bold text-gray-900 tracking-tight mb-8">
          Checkout
        </h1>

        {/* Stepper */}
        <CheckoutStepper currentStep={step} />

        {/* Main grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">

          {/* LEFT — Step content */}
          <div className="space-y-8">

            {/* STEP 1 — Shipping */}
            {step === 1 && (
              <>
                <ContactForm />
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full h-14 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
                >
                  Next: Review Order →
                </button>
              </>
            )}

            {/* STEP 2 — Review */}
            {step === 2 && (
              <ReviewStep
                onContinue={() => setStep(3)}
              />
            )}

            {/* STEP 3 — Payment */}
            {step === 3 && (
              <PaymentSection onSuccess={handlePaymentSuccess} />
            )}
          </div>

          {/* RIGHT — Summary (sticky) */}
          <div className="lg:sticky lg:top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}