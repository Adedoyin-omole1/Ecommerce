// src/app/(admin)/layout.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import AdminSidebar from '@/Components/admin/AdminSidebar';
import AdminTopbar from '@/Components/admin/AdminTopbar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, isLoggedIn, hydrated } = useUser();

  // Optional Auth Protection: Uncomment this to force login for admin
  /*
  useEffect(() => {
      if (!hydrated) return;
      if (!isLoggedIn || user?.role !== 'admin') {
          router.replace('/login');
      }
  }, [hydrated, isLoggedIn, user, router]);
  */

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      {/* Added lg:ml-64 to push content past the fixed sidebar */}
      <div className="flex-1 min-w-0 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}