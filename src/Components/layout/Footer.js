// src/Components/layout/Footer.js
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Solid icons
import {
  faArrowRight,
  faLocationDot,
  faPhone,
  faEnvelope,
  faArrowUp,
  faChevronRight,
  faCheckCircle,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';

// Brand icons (social + payment)
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faYoutube,
  faTiktok,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faCcAmex,
  faCcApplePay,
} from '@fortawesome/free-brands-svg-icons';

// ==========================================
// FOOTER LINKS
// ==========================================
const FOOTER_SECTIONS = [
  {
    title: 'Shop',
    links: [
      { name: 'Women', href: '/women' },
      { name: 'Men', href: '/men' },
      { name: 'Home & Living', href: '/home-living' },
      { name: 'Food', href: '/food' },
      { name: 'Marketplace', href: '/marketplace' },
      { name: 'Deals', href: '/deals' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping & Delivery', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'Track Your Order', href: '/track' },
      { name: 'Size Guide', href: '/size-guide' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Affiliates', href: '/affiliates' },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com', icon: faFacebookF },
  { name: 'Instagram', href: 'https://instagram.com', icon: faInstagram },
  { name: 'X', href: 'https://x.com', icon: faXTwitter },
  { name: 'YouTube', href: 'https://youtube.com', icon: faYoutube },
  { name: 'TikTok', href: 'https://tiktok.com', icon: faTiktok },
];

const PAYMENT_METHODS = [
  { name: 'Visa', icon: faCcVisa },
  { name: 'Mastercard', icon: faCcMastercard },
  { name: 'PayPal', icon: faCcPaypal },
  { name: 'Amex', icon: faCcAmex },
  { name: 'Apple Pay', icon: faCcApplePay },
];

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 hover:-translate-y-1 flex items-center justify-center transition-all duration-300"
    >
      <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4" />
    </button>
  );
}

export default function Footer({
  brandName = 'NovaTrend',
  tagline = 'Curated fashion, lifestyle, and everyday essentials — delivered with care.',
}) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: hook into your newsletter API
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      <footer className="bg-gray-950 text-white mt-auto">
        <div className="max-w-325 mx-auto px-6 lg:px-8">

          {/* ============================================
                        TOP — NEWSLETTER
                    ============================================ */}
          <div className="py-12 lg:py-14 border-b border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              <div>
                <p className="text-[11px] font-semibold text-red-400 uppercase tracking-[0.24em] mb-2.5">
                  Stay in the loop
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Get 10% off your{' '}
                  <span className="text-red-500">first order</span>
                </h3>
                <p className="mt-3 text-[13px] text-white/60 max-w-md leading-relaxed">
                  Subscribe for exclusive drops, early access, and insider deals
                  — no spam, ever.
                </p>
              </div>

              <div>
                <form
                  onSubmit={handleSubscribe}
                  className="w-full flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="w-full bg-white/5 border border-white/15 focus:border-red-500 focus:bg-white/10 focus:ring-2 focus:ring-red-500/20 placeholder:text-white/40 text-[13px] text-white rounded-full pl-10 pr-4 py-3 outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold px-6 py-3 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                  >
                    {subscribed ? (
                      <>
                        <FontAwesomeIcon icon={faCheckCircle} className="w-3.5 h-3.5" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
                <p className="mt-2.5 text-[11px] text-white/40 ml-1">
                  By subscribing you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-white/70 transition-colors">
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link href="/privacy" className="underline hover:text-white/70 transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* ============================================
                        MIDDLE — LINKS + BRAND
                    ============================================ */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <Link
                href="/home"
                className="text-2xl font-bold text-white tracking-tight hover:text-red-400 transition-colors"
              >
                {brandName}
              </Link>
              <p className="mt-4 text-[13px] text-white/60 leading-relaxed max-w-xs">
                {tagline}
              </p>

              {/* Contact info */}
              <ul className="mt-7 space-y-3.5">
                <li className="flex items-start gap-3 text-[13px] text-white/60">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 shrink-0">
                    <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-red-400" />
                  </span>
                  <span className="pt-1.5">123 Fashion Avenue, Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-3 text-[13px] text-white/60">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 shrink-0">
                    <FontAwesomeIcon icon={faPhone} className="w-3 h-3 text-red-400" />
                  </span>
                  <a
                    href="tel:+2348000000000"
                    className="hover:text-white transition-colors"
                  >
                    +234 800 000 0000
                  </a>
                </li>
                <li className="flex items-center gap-3 text-[13px] text-white/60">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 text-red-400" />
                  </span>
                  <a
                    href="mailto:hello@novatrend.com"
                    className="hover:text-white transition-colors"
                  >
                    hello@novatrend.com
                  </a>
                </li>
              </ul>

              {/* Socials */}
              <div className="mt-7">
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="group w-10 h-10 rounded-full bg-white/5 hover:bg-red-500 border border-white/10 hover:border-red-500 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                    >
                      <FontAwesomeIcon
                        icon={social.icon}
                        className="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Link sections */}
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h4 className="text-[12px] font-bold text-white uppercase tracking-[0.12em] mb-5">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-red-400 transition-colors"
                      >
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="w-2 h-2 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-400"
                        />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ============================================
                        TRUST ROW
                    ============================================ */}
          <div className="py-6 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6">

              {/* Live support badge */}
              <div className="flex items-center gap-2 text-[12px] text-white/60">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
                </span>
                <FontAwesomeIcon icon={faHeadset} className="w-3 h-3 text-white/70" />
                <span>24/7 Live Support Available</span>
              </div>

              {/* Secure checkout hint */}
              <p className="text-[12px] text-white/60 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-green-400" />
                <span>100% Secure SSL Checkout</span>
              </p>
            </div>
          </div>

          {/* ============================================
                        BOTTOM — COPYRIGHT + PAYMENTS
                    ============================================ */}
          <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5">

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-[12px] text-white/50 text-center sm:text-left">
              <p>© {currentYear} {brandName}. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-white/40 mr-1 hidden sm:inline">
                We accept:
              </span>
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method.name}
                  aria-label={method.name}
                  title={method.name}
                  className="w-10 h-7 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
                >
                  <FontAwesomeIcon icon={method.icon} className="w-5 h-4" />
                </span>
              ))}
            </div>

          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}