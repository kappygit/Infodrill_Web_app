import React from 'react';
import { useScrollMotion } from '../../hooks/useScrollMotion';
import { HeroSection } from './sections/HeroSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { StatsSection } from './sections/StatsSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesGridSection } from './sections/ServicesGridSection';
import { IndustriesSection } from './sections/IndustriesSection';
import { WhyChooseUsSection } from './sections/WhyChooseUsSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactEnquirySection } from './sections/ContactEnquirySection';

export function HomePage() {
  // Activate scroll reveal motion observer
  useScrollMotion();

  return (
    <main id="main-content">
      {/* 2. Hero: Scroll-driven rising phone mockup & expanding concentric rings */}
      <HeroSection />

      {/* 3. Benefits: Smooth scroll tilted/fanned cards with vector character illustration */}
      <div data-reveal>
        <BenefitsSection />
      </div>

      {/* 4. Stats: 50+ Projects, 30+ Clients, 5+ Years, 99% Satisfaction */}
      <div data-reveal>
        <StatsSection />
      </div>

      {/* 5. About: About INFODRILL, Copy, Checklist, 5+ Years Badge & Learn More Button */}
      <div data-reveal>
        <AboutSection />
      </div>

      {/* 6. Services: What We Offer, 12 Complete IT Services Grid */}
      <div data-reveal>
        <ServicesGridSection />
      </div>

      {/* 7. Industries: Industries We Serve, 9 Key Sectors */}
      <div data-reveal>
        <IndustriesSection />
      </div>

      {/* 8. Why Choose Us: 6 Differentiators & 30+ Happy Clients Badge */}
      <div data-reveal>
        <WhyChooseUsSection />
      </div>

      {/* 9. Portfolio: Projects That Made a Difference (6 Projects & Tech Stack) */}
      <div data-reveal>
        <PortfolioSection />
      </div>

      {/* 10. Testimonial: Client Stories (Rajesh Patel, Patel Textiles Ltd.) */}
      <div data-reveal>
        <TestimonialsSection />
      </div>

      {/* 11. Contact: Get In Touch, Direct Channels & Form */}
      <div data-reveal>
        <ContactEnquirySection />
      </div>
    </main>
  );
}

export default HomePage;
