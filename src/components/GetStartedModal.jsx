import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { siteConfig } from '../config/siteConfig';
import { apiClient } from '../services/api/client';
import { API_ENDPOINTS } from '../services/api/endpoints';
import { handleApiError } from '../services/api/errorHandler';
import './GetStartedModal.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GetStartedModal — Two-panel centered lead capture modal rendered via React Portal.
 * Restyled to match website design tokens: hero gradient, brand accents, glass cards, and navbar button styles.
 */
export function GetStartedModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }) {
  const modalContext = useModal();
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : modalContext.isGetStartedOpen;
  const onClose = controlledOnClose !== undefined ? controlledOnClose : modalContext.closeGetStartedModal;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll while modal is open & restore on close
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Trap focus and close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form helper
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    });
    setErrors({});
    setSubmitStatus(null);
    setErrorMessage('');
  };

  // Auto-close after 3 seconds on success
  useEffect(() => {
    let timer;
    if (submitStatus === 'success') {
      timer = setTimeout(() => {
        onClose();
        resetForm();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [submitStatus, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      await apiClient(API_ENDPOINTS.CONTACT, {
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(handleApiError(err) || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof document === 'undefined') return null;

  const phoneValue = siteConfig.contact?.phone || '+91 92135 32517';
  const emailValue = siteConfig.contact?.email || 'infodrillaisolutions@gmail.com';
  const addressValue = siteConfig.contact?.address || '307, Silver Radiance One, Thaltej, Ahmedabad, Gujarat – 380054';
  const mapLink = siteConfig.contact?.mapLink || 'https://maps.google.com/?q=Silver+Radiance+One+Thaltej+Ahmedabad+Gujarat+380054';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="get-started-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          role="presentation"
        >
          {/* Modal Card: Fades in and scales from 0.95 to 1 */}
          <motion.div
            ref={modalRef}
            className="get-started-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-started-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close Button with rotate-90 hover animation */}
            <button
              type="button"
              className="get-started-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={2.4} />
            </button>

            {/* =================================================================
                LEFT PANEL (approx 38% width, hero gradient + subtle grid)
                ================================================================= */}
            <aside className="get-started-left-panel">
              <div className="modal-left-header">
                <span className="get-started-pill">START A PROJECT</span>
                <h2 id="get-started-modal-title" className="get-started-title">
                  Get Started with InfoDrill
                </h2>
                <p className="get-started-subtitle">
                  Tell us about your project and we'll get back to you within 24 hours with a clear plan.
                </p>

                {/* Mobile-Only Slim Action Row (< 768px): Tappable Call & Email Buttons */}
                <div className="modal-mobile-channels">
                  <a
                    href={`tel:${phoneValue.replace(/[^0-9+]/g, '')}`}
                    className="modal-mobile-action-btn"
                  >
                    <Phone size={14} />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${emailValue}`}
                    className="modal-mobile-action-btn"
                  >
                    <Mail size={14} />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Desktop-Only Direct Channels Cards with Staggered Fade Up */}
              <div className="modal-desktop-channels">
                {/* 1. Email */}
                <motion.a 
                  href={`mailto:${emailValue}`} 
                  className="modal-channel-item"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="modal-channel-icon" aria-hidden="true">
                    <Mail size={16} />
                  </div>
                  <div className="modal-channel-details">
                    <span className="modal-channel-label">Email</span>
                    <span className="modal-channel-value">{emailValue}</span>
                  </div>
                </motion.a>

                {/* 2. Phone */}
                <motion.a
                  href={`tel:${phoneValue.replace(/[^0-9+]/g, '')}`}
                  className="modal-channel-item"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="modal-channel-icon" aria-hidden="true">
                    <Phone size={16} />
                  </div>
                  <div className="modal-channel-details">
                    <span className="modal-channel-label">Phone</span>
                    <span className="modal-channel-value">{phoneValue}</span>
                  </div>
                </motion.a>

                {/* 3. Office Address */}
                <motion.div 
                  className="modal-channel-item"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="modal-channel-icon" aria-hidden="true">
                    <MapPin size={16} />
                  </div>
                  <div className="modal-channel-details">
                    <span className="modal-channel-label">Office</span>
                    <span className="modal-channel-value">{addressValue}</span>
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-map-link"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </motion.div>

                {/* 4. Guaranteed Response */}
                <motion.div 
                  className="modal-channel-item"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.29, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="modal-channel-icon" aria-hidden="true">
                    <Clock size={16} />
                  </div>
                  <div className="modal-channel-details">
                    <span className="modal-channel-label">Guaranteed Response</span>
                    <span className="modal-channel-value">Within 24 hours with a clear plan</span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom SLA / Confidentiality Note with Theme Accent */}
              <motion.div 
                className="modal-sla-box"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              >
                <ShieldCheck size={16} className="modal-sla-icon" aria-hidden="true" />
                <span>NDA &amp; Confidentiality guaranteed for all client intellectual property.</span>
              </motion.div>
            </aside>

            {/* =================================================================
                RIGHT PANEL (approx 62% width, theme surface, lead form)
                ================================================================= */}
            <div className="get-started-right-panel">
              {submitStatus === 'success' ? (
                <div className="get-started-success" role="status" aria-live="polite">
                  <div className="get-started-success-icon" aria-hidden="true">
                    <CheckCircle2 size={44} strokeWidth={2.4} />
                  </div>
                  <h3 className="get-started-success-title">Message Sent!</h3>
                  <p className="get-started-success-desc">
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                  <span className="get-started-success-badge">
                    Auto-closing in 3 seconds...
                  </span>
                </div>
              ) : (
                <>
                  {/* Error Alert Banner */}
                  {submitStatus === 'error' && (
                    <div className="get-started-alert" role="alert">
                      <AlertCircle size={18} className="get-started-alert-icon" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Clean Lead Form */}
                  <form className="get-started-form" onSubmit={handleSubmit} noValidate>
                    <div className="get-started-grid">
                      {/* Full Name */}
                      <div className="form-field">
                        <label htmlFor="modal-name" className="form-label">
                          Full Name <span className="form-required">*</span>
                        </label>
                        <input
                          ref={nameInputRef}
                          type="text"
                          id="modal-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'modal-name-error' : undefined}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.name && (
                          <span id="modal-name-error" className="form-error">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div className="form-field">
                        <label htmlFor="modal-email" className="form-label">
                          Email <span className="form-required">*</span>
                        </label>
                        <input
                          type="email"
                          id="modal-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'modal-email-error' : undefined}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.email && (
                          <span id="modal-email-error" className="form-error">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="get-started-grid">
                      {/* Company (Optional) */}
                      <div className="form-field">
                        <label htmlFor="modal-company" className="form-label">
                          Company
                        </label>
                        <input
                          type="text"
                          id="modal-company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Company name"
                          className="form-input"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Service Needed (Dropdown) */}
                      <div className="form-field">
                        <label htmlFor="modal-service" className="form-label">
                          Service Needed
                        </label>
                        <select
                          id="modal-service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="form-select"
                          disabled={isSubmitting}
                        >
                          <option value="">Select service</option>
                          {siteConfig.services?.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message (Required) */}
                    <div className="form-field">
                      <label htmlFor="modal-message" className="form-label">
                        Message <span className="form-required">*</span>
                      </label>
                      <textarea
                        id="modal-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'modal-message-error' : undefined}
                        disabled={isSubmitting}
                        required
                      />
                      {errors.message && (
                        <span id="modal-message-error" className="form-error">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Send Message Button: Styled matching Navbar Get Started CTA */}
                    <div className="get-started-actions">
                      <button
                        type="submit"
                        className={`get-started-submit-btn group ${isSubmitting ? 'get-started-submit-btn--loading' : ''}`}
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                      >
                        <span className="modal-btn-shimmer" aria-hidden="true" />
                        {isSubmitting ? (
                          <span className="modal-btn-loading-content">
                            <Loader2 size={18} className="modal-btn-spinner" strokeWidth={2.6} />
                            <span className="modal-btn-loading-text">
                              Sending
                              <span className="modal-loading-dots" aria-hidden="true">
                                <span className="modal-loading-dot">.</span>
                                <span className="modal-loading-dot">.</span>
                                <span className="modal-loading-dot">.</span>
                              </span>
                            </span>
                          </span>
                        ) : (
                          <>
                            <span className="modal-btn-text">Send Message</span>
                            <Send size={15} className="modal-btn-arrow" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default GetStartedModal;
