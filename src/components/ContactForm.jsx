import React, { useState, useRef } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const nameRef = useRef(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the active field to improve UX
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first field with an error (for this simple case, we just focus name if empty)
      if (validationErrors.name && nameRef.current) {
        nameRef.current.focus();
      }
      return;
    }

    // Simulate API submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', destination: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Success banner overlay */}
      <div 
        className={`absolute inset-0 z-10 bg-teal-900/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-500 transform ${
          isSuccess ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-teal-500 rounded-full p-4 mb-4">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-teal-100 text-center px-6">
          We'll contact you soon regarding your trip inquiry.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Send us a message</h2>
        <p className="text-slate-400">Fill out the form below and our travel experts will get in touch.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-900/50 border ${
              errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/50'
            } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-900/50 border ${
                errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/50'
              } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-slate-300 mb-1">Dream Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="e.g. Bali, Indonesia"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message *</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-900/50 border ${
              errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/50'
            } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none`}
            placeholder="Tell us about your travel plans..."
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
