// src/Components/checkout/CheckoutStepper.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const STEPS = [
    { id: 1, label: 'Shipping' },
    { id: 2, label: 'Payment' },
    { id: 3, label: 'Review' },
];

export default function CheckoutStepper({ currentStep = 1, onStepChange }) {
    return (
        <div className="flex items-center gap-3 sm:gap-5">
            {STEPS.map((step, idx) => {
                const isDone = step.id < currentStep;
                const isActive = step.id === currentStep;

                return (
                    <div key={step.id} className="flex items-center gap-3 sm:gap-5">
                        {/* Step */}
                        <button
                            onClick={() => onStepChange?.(step.id)}
                            className="flex items-center gap-2.5 group"
                        >
                            <span
                                className={`flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold transition-colors ${isDone
                                        ? 'bg-emerald-500 text-white'
                                        : isActive
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-white border-2 border-gray-200 text-gray-400'
                                    }`}
                            >
                                {isDone ? (
                                    <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                                ) : (
                                    step.id
                                )}
                            </span>
                            <span
                                className={`text-[12.5px] font-medium transition-colors ${isActive
                                        ? 'text-gray-900'
                                        : isDone
                                            ? 'text-emerald-600'
                                            : 'text-gray-400'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </button>

                        {/* Divider */}
                        {idx < STEPS.length - 1 && (
                            <span
                                className={`h-px w-8 sm:w-16 transition-colors ${step.id < currentStep ? 'bg-emerald-300' : 'bg-gray-200'
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}