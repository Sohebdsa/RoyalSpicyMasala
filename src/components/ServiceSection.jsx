import './ServiceSection.css'

export default function ServiceSection() {
    const services = [
        {
            id: 1,
            title: "Wholesale Distribution",
            description: "Premier bulk supply solutions for restaurants, hotels, and commercial kitchens. We handle large-scale orders with competitive pricing and consistent quality.",
            image: "/OurServicesImg/wholesale_distribution.png",
            features: ["Bulk pricing", "Minimum order flexibility", "B2B partnerships"]
        },
        {
            id: 2,
            title: "Quality Assurance",
            description: "Rigorous testing and certification processes ensure every product meets international quality standards. Our lab-tested spices guarantee purity and authenticity.",
            image: "/OurServicesImg/quality_assurance.png",
            features: ["Lab testing", "Organic certification", "Purity guarantee"]
        },
        {
            id: 3,
            title: "Custom Packaging",
            description: "Tailored packaging solutions for your brand. From private labeling to custom blends, we help you create unique products that stand out in the market.",
            image: "/OurServicesImg/custom_packaging.png",
            features: ["Private labeling", "Custom blends", "Brand development"]
        },
        {
            id: 4,
            title: "Fast Delivery",
            description: "Efficient logistics network ensuring timely delivery across the country. Track your orders in real-time and receive products in perfect condition.",
            image: "/OurServicesImg/logistics_delivery.png",
            features: ["24-48 hour delivery", "Real-time tracking", "Nationwide coverage"]
        }
    ];

    return (
        <section className="services-section" id="services">
            {/* Hero Section */}
            <div className="services-hero">
                <div className="services-hero-content">
                    <h1>Our Services</h1>
                    <p className="services-hero-subtitle">
                        Comprehensive solutions tailored to your spice and grain needs
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="services-content-wrapper">
                {/* Introduction */}
                <div className="services-intro">
                    <h2>What We Offer</h2>
                    <p>
                        From wholesale distribution to custom packaging, we provide end-to-end solutions
                        for businesses and individuals seeking premium quality spices, grains, and dry fruits.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`service-card ${index % 2 === 1 ? 'service-card-reverse' : ''}`}
                        >
                            <div className="service-image">
                                <img src={service.image} alt={service.title} />
                            </div>
                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <ul className="service-features">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span className="feature-check">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Features */}
                <div className="services-features">
                    <h2>Why Choose Our Services</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🌟</div>
                            <h4>250+ Brands</h4>
                            <p>Access to premium brands and products</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">💯</div>
                            <h4>100% Authentic</h4>
                            <p>Guaranteed genuine and pure products</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🤝</div>
                            <h4>Dedicated Support</h4>
                            <p>24/7 customer service and assistance</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">💰</div>
                            <h4>Best Prices</h4>
                            <p>Competitive wholesale pricing</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="services-cta">
                    <h2>Ready to Partner With Us?</h2>
                    <p>
                        Join thousands of satisfied clients who trust Royal Spicy Masala for their spice needs.
                    </p>
                    <button className="cta-button">Get Started Today</button>
                </div>
            </div>
        </section>
    )
}