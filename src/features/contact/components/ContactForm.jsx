import React from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { Button } from '../../../components/ui/Button';
import { siteConfig } from '../../../config/siteConfig';
import { Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import './ContactForm.css';

export function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    errorMessage,
    handleChange,
    handleSubmit,
    resetStatus,
  } = useContactForm();

  if (submitStatus === 'success') {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <div className="contact-form-success__icon" aria-hidden="true">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="contact-form-success__title">Message Sent!</h3>
        <p className="contact-form-success__desc">
          Thank you for reaching out to INFODRILL AI SOLUTIONS. We will get back to you within 24 hours with a clear plan.
        </p>
        <Button variant="outline" size="sm" onClick={resetStatus} icon={ArrowRight}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {submitStatus === 'error' && (
        <div className="contact-form-alert" role="alert">
          <AlertCircle size={18} className="contact-form-alert__icon" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="contact-form-grid">
        {/* Full Name */}
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Full Name <span className="form-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email <span className="form-required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`form-input ${errors.email ? 'form-input--error' : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
        </div>
      </div>

      <div className="contact-form-grid">
        {/* Company */}
        <div className="form-field">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        {/* Service Needed Dropdown */}
        <div className="form-field">
          <label htmlFor="service" className="form-label">
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="form-select"
            disabled={isSubmitting}
          >
            <option value="">Select service</option>
            {siteConfig.services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="form-field">
        <label htmlFor="message" className="form-label">
          Message <span className="form-required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
          required
        />
        {errors.message && <span id="message-error" className="form-error">{errors.message}</span>}
      </div>

      {/* Submit Button */}
      <div className="contact-form-actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={Send}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        <span className="contact-form-note">
          We’ll get back to you within 24 hours with a clear plan.
        </span>
      </div>
    </form>
  );
}

export default ContactForm;
