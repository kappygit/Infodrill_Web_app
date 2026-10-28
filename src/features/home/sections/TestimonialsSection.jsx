import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../../config/siteConfig';
import { Quote, Star, CheckCircle } from 'lucide-react';
import './TestimonialsSection.css';

export function TestimonialsSection() {
  const { quote, author, role, company } = siteConfig.testimonial;

  return (
    <section className="testimonial-section" id="testimonials">
      <div className="testimonial-container">
        <div className="testimonial-card">
          {/* Header */}
          <div className="testimonial-header">
            <span className="ref-section-eyebrow">Client Stories</span>
            <h2 className="testimonial-headline">What Our Clients Say</h2>
          </div>

          {/* 5-Star Rating */}
          <div className="testimonial-stars" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} fill="#FFDE00" color="#FFDE00" />
            ))}
          </div>

          {/* Big Quote */}
          <blockquote className="testimonial-quote">
            <Quote size={40} className="quote-mark" />
            <p>{quote}</p>
          </blockquote>

          {/* Author Badge */}
          <div className="testimonial-author">
            <div className="author-avatar">
              <span>RP</span>
            </div>
            <div className="author-meta">
              <span className="author-name">{author}</span>
              <span className="author-role">{role}, <strong>{company}</strong></span>
            </div>
            <div className="author-verified">
              <CheckCircle size={16} />
              <span>Verified Client</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
