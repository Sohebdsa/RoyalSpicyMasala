import './LocationSection.css';

export default function LocationSection() {
    return (
        <section className="location-section" id="location">
            <div className="location-content-wrapper">

                {/* Header */}
                <div className="location-header">
                    <h2>Visit Our Store</h2>
                    <p>Experience the aroma of fresh spices firsthand. Visit our flagship store in the heart of Mumbai.</p>
                </div>

                <div className="location-grid">

                    {/* Information Card */}
                    <div className="location-info-card">
                        <div className="info-item">
                            <div className="info-icon">📍</div>
                            <div className="info-text">
                                <h3>Our Location</h3>
                                <p>Shop no 1, AASHIYANA SRA SOCIETY,</p>
                                <p>OPP Subway, Navneeth Colony,</p>
                                <p>S V Road, behind millionaire bldg</p>
                                <p>Mumbai, Maharashtra 400058</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">⏰</div>
                            <div className="info-text">
                                <h3>Opening Hours</h3>
                                <p>Monday - Sunday</p>
                                <p>9:00 AM - 11:00 PM</p>
                                <p style={{ marginTop: '5px', color: '#cc5500', fontWeight: 'bold' }}>7 days opens</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">📞</div>
                            <div className="info-text">
                                <h3>Get in Touch</h3>
                                <p>+91 9702713157</p>
                                <p><a href="royalspicymasala786@gmail.com">royalspicymasala786@gmail.com</a></p>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d280.1791148054221!2d72.84593972564181!3d19.124064661924287!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d4242da943%3A0x87fdc7a41c245472!2sAASHIYANA%20SRA%20SOCIETY%2C%20Fish%20Market%20Area%2C%20Navneeth%20Colony%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400058!5e0!3m2!1sen!2sin!4v1770286377994!5m2!1sen!2sin"
                            className="map-frame"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Royal Spicy Masala Location"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
}
