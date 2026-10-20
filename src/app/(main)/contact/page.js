// src/app/(main)/contact/page.js
'use client';

import ContactHero from './sections/ContactHero';
import ContactGrid from './sections/ContactGrid';
import ContactForm from './sections/ContactForm';
import FAQTeaser from './sections/FAQTeaser';
import CTABanner from '../about/sections/CTABanner';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* 1. Hero */}
      <ContactHero />

      {/* 2. Quick contact cards */}
      <ContactGrid />

      {/* 3. Contact form + info panel */}
      <ContactForm />

      {/* 4. FAQ teaser */}
      <FAQTeaser />

      {/* 5. Closing CTA */}
      <CTABanner
        title="Ready to Explore?"
        subtitle="Thousands of curated products across fashion, home, beauty, and more."
        ctaText="Start Shopping"
        ctaHref="/shop"
      />

    </div>
  );
}