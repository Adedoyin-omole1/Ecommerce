// src/app/(admin)/settings/page.js
'use client';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-900 tracking-tight">Store Settings</h1>
        <p className="mt-1 text-[13px] text-gray-500">Manage your store preferences and details.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">Store Name</label>
            <input type="text" defaultValue="King's Kollectibles" className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 text-[13px] outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">Support Email</label>
            <input type="email" defaultValue="hello@kingskollectibles.com" className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 text-[13px] outline-none transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-[12.5px] font-medium text-gray-700 mb-1.5">Store Currency</label>
          <select className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-transparent focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 text-[13px] outline-none transition-all cursor-pointer">
            <option>USD ($)</option>
            <option>NGN (₦)</option>
            <option>GBP (£)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button className="h-11 px-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold shadow-lg shadow-red-500/25 transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}