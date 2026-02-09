import { useState } from 'react';
import './Contactsection.css';

export default function Contactsection() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        purpose: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Purpose options - can be expanded later
    const purposeOptions = [
        { value: '', label: 'Select Purpose' },
        { value: 'bulk_order', label: 'Bulk Order Inquiry' },
        { value: 'wholesale', label: 'Wholesale Partnership' },
        { value: 'custom_packaging', label: 'Custom Packaging' },
        { value: 'quality_query', label: 'Quality & Certification' },
        { value: 'delivery', label: 'Delivery Information' },
        { value: 'general', label: 'General Inquiry' },
        { value: 'other', label: 'Other' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.purpose) {
            newErrors.purpose = 'Please select a purpose';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Format WhatsApp message
        const purposeLabel = purposeOptions.find(opt => opt.value === formData.purpose)?.label || formData.purpose;
        const whatsappMessage = `*New Inquiry from Royal Spicy Masala Website*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Purpose:* ${purposeLabel}%0A*Message:* ${formData.message}`;

        // WhatsApp number (replace with actual business number)
        const whatsappNumber = '9702713157'; // Replace with your WhatsApp business number

        // Open WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');

        // Reset form after short delay
        setTimeout(() => {
            setFormData({
                name: '',
                phone: '',
                purpose: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <section className="contact-section" id="contact">
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="contact-hero-content">
                    <h1>Get In Touch</h1>
                    <p className="contact-hero-subtitle">
                        Have questions or want to place an order? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="contact-content-wrapper">
                <div className="contact-grid">
                    {/* Contact Information */}
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p className="contact-intro">
                            Reach out to us for any inquiries about our products, services, or partnerships.
                        </p>

                        <div className="info-items">
                            <div className="info-item">
                                <div className="info-icon">📧</div>
                                <div className="info-content">
                                    <h4>Email</h4>
                                    <p>royalspicymasala786@gmail.com</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">📞</div>
                                <div className="info-content">
                                    <h4>Phone</h4>
                                    <p>+91 9702713157</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">📍</div>
                                <div className="info-content">
                                    <h4>Location</h4>
                                    <p>Shop no 1, AASHIYANA SRA SOCIETY,

                                        OPP Subway, Navneeth Colony,

                                        S V Road, behind millionaire bldg

                                        Mumbai, Maharashtra 400058</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">⏰</div>
                                <div className="info-content">
                                    <h4>Business Hours</h4>
                                    <p>Mon-Sat: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-container">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            {/* Phone Field */}
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your 10-digit phone number"
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            {/* Purpose Dropdown */}
                            <div className="form-group">
                                <label htmlFor="purpose">Purpose of Inquiry *</label>
                                <select
                                    id="purpose"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className={errors.purpose ? 'error' : ''}
                                >
                                    {purposeOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.purpose && <span className="error-message">{errors.purpose}</span>}
                            </div>

                            {/* Message Field */}
                            <div className="form-group">
                                <label htmlFor="message">Your Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your requirements..."
                                    rows="5"
                                    className={errors.message ? 'error' : ''}
                                ></textarea>
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
                                <span className="whatsapp-icon">💬</span>
                            </button>

                            <p className="form-note">
                                * Your message will be sent via WhatsApp for instant communication
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    );
}