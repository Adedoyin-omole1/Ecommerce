// src/app/layout.js
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AppProviders from '@/Components/providers/AppProviders';
import {
  ConditionalNavbar,
  ConditionalFooter,
} from '@/Components/layout/ConditionalChrome';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: "King's Kollitaible",
  description: "Curated fashion, lifestyle, and everyday essentials.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppProviders>
          {/* Navbar first */}
          <ConditionalNavbar />

          {/* Page content — flex-1 pushes Footer to the bottom */}
          <main className="flex-1">{children}</main>

          {/* Footer last */}
          <ConditionalFooter />

          <Toaster position="top-right" />
        </AppProviders>
      </body>
    </html>
  );
}