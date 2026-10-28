import { useState } from 'react';
import { apiClient } from '../../../services/api/client';
import { API_ENDPOINTS } from '../../../services/api/endpoints';
import { handleApiError } from '../../../services/api/errorHandler';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Agents & Automation',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

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
      newErrors.message = 'Please provide brief details about your inquiry.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Inquiry must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
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
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'AI Agents & Automation',
        message: '',
      });
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    setSubmitStatus(null);
    setErrorMessage('');
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    errorMessage,
    handleChange,
    handleSubmit,
    resetStatus,
  };
}
