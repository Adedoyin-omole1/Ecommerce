// src/app/(main)/about/page.js
'use client';

import AboutHero from './sections/AboutHero';
import BrandMarquee from './sections/BrandMarquee';
import ImageCarousel from './sections/ImageCarousel';
import StatsRow from './sections/StatsRow';
import ValuesGrid from './sections/ValuesGrid';
import TeamGrid from './sections/TeamGrid';
import CTABanner from './sections/CTABanner';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* 1. Hero intro */}
      <AboutHero />

      {/* 2. Auto-scrolling image carousel */}
      <ImageCarousel />

      {/* 3. Animated marquee strip */}
      <BrandMarquee />

      {/* 4. Animated stat counters */}
      <StatsRow />

      {/* 5. Values with image */}
      <ValuesGrid />

      {/* 6. Team */}
      <TeamGrid />

      {/* 7. Closing CTA */}
      <CTABanner />

    </div>
  );
}