// src/Components/checkout/ContactForm.js
'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [form, setForm] = useState({
        email: '',
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        saveInfo: true,
    });

    const handleChange = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    return (
        <div className="space-y-8">

            {/* Contact Information */}
            <div>
                <h2 className="text-[16px] font-bold text-gray-900 mb-4">
                    Contact Information
                </h2>
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="youremail@example.com"
                        className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Shipping Address */}
            <div>
                <h2 className="text-[16px] font-bold text-gray-900 mb-4">
                    Shipping Address
                </h2>
                <div className="space-y-3">

                    {/* Full Name */}
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Full Name"
                        className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />

                    {/* Address 1 */}
                    <input
                        type="text"
                        value={form.address1}
                        onChange={(e) => handleChange('address1', e.target.value)}
                        placeholder="House number and street name"
                        className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />

                    {/* Address 2 */}
                    <input
                        type="text"
                        value={form.address2}
                        onChange={(e) => handleChange('address2', e.target.value)}
                        placeholder="Apartment, suite, etc. (Optional)"
                        className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                    />

                    {/* City + State */}
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            placeholder="City"
                            className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                        />
                        <select
                            value={form.state}
                            onChange={(e) => handleChange('state', e.target.value)}
                            className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 outline-none transition-all cursor-pointer"
                        >
                            <option value="">State / Province</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Kano">Kano</option>
                            <option value="Oyo">Oyo</option>
                        </select>
                    </div>

                    {/* ZIP + Country */}
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={form.zip}
                            onChange={(e) => handleChange('zip', e.target.value)}
                            placeholder="ZIP / Postal Code"
                            className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                        />
                        <select
                            value={form.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            className="w-full h-12 bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 rounded-xl px-4 text-[13.5px] text-gray-900 outline-none transition-all cursor-pointer"
                        >
                            <option value="Nigeria">Nigeria</option>
                            <option value="India">India</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Kenya">Kenya</option>
                            <option value="UK">United Kingdom</option>
                            <option value="USA">United States</option>
                        </select>
                    </div>
                </div>

                {/* Save info */}
                <label className="flex items-center gap-2.5 mt-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={form.saveInfo}
                        onChange={(e) => handleChange('saveInfo', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 accent-orange-500 cursor-pointer"
                    />
                    <span className="text-[12.5px] text-gray-600">
                        Save this information for next time
                    </span>
                </label>
            </div>
        </div>
    );
}