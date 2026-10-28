import React from 'react';
import { Container } from '../../../components/ui/Container';
import { ContactForm } from '../../contact/components/ContactForm';
import { siteConfig } from '../../../config/siteConfig';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import './ContactEnquirySection.css';

export function ContactEnquirySection() {
  return (
    <section className="contact-enquiry-section" id="contact">
      <Container>
        <div className="contact-section-header">
          <span className="contact-eyebrow">Get In Touch</span>
          <h2 className="contact-section-title">
            Let’s Build Something Together
          </h2>
          <p className="contact-section-subtitle">
            Tell us about your project and we’ll get back to you within 24 hours with a clear plan.
          </p>
        </div>

        <div className="contact-enquiry-grid">
          {/* Left Column: Direct Info Card */}
          <div className="contact-info-card">
            <h3 className="contact-info-card__title">Direct Channels</h3>
            <p className="contact-info-card__desc">
              Reach our leadership directly or visit our office in Ahmedabad, Gujarat.
            </p>

            <div className="contact-channels">
              {/* Email */}
              <a href={`mailto:${siteConfig.contact.email}`} className="contact-channel-item">
                <div className="contact-channel-item__icon">
                  <Mail size={18} />
                </div>
                <div className="contact-channel-item__details">
                  <span className="channel-label">Email</span>
                  <span className="channel-value">{siteConfig.contact.email}</span>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="contact-channel-item">
                <div className="contact-channel-item__icon">
                  <Phone size={18} />
                </div>
                <div className="contact-channel-item__details">
                  <span className="channel-label">Phone</span>
                  <span className="channel-value">{siteConfig.contact.phone}</span>
                </div>
              </a>

              {/* Office Address */}
              <div className="contact-channel-item">
                <div className="contact-channel-item__icon">
                  <MapPin size={18} />
                </div>
                <div className="contact-channel-item__details">
                  <span className="channel-label">Office</span>
                  <span className="channel-value">{siteConfig.contact.address}</span>
                  <a 
                    href={siteConfig.contact.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="map-ext-link"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="contact-channel-item">
                <div className="contact-channel-item__icon">
                  <Clock size={18} />
                </div>
                <div className="contact-channel-item__details">
                  <span className="channel-label">Guaranteed Response</span>
                  <span className="channel-value">Within 24 hours with a clear plan</span>
                </div>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="contact-sla-box">
              <div className="contact-sla-item">
                <ShieldCheck size={18} className="sla-icon" />
                <span>NDA & Confidentiality guaranteed for all client intellectual property</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-container">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactEnquirySection;
