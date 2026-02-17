import './ServiceSection.css'

export default function ServiceSection() {
    const services = [
        {
            id: 1,
            title: "DryFruits",
            description: "Premium-grade dry fruits sourced from trusted farms and suppliers, ideal for retail, gifting, and culinary use.",
            image: "https://res.cloudinary.com/datkxm0yf/image/upload/v1771319480/dryfruits_djikiu.jpg",
            features: [" Almonds, Cashews, Pistachios", "Raisins, Dates, Figs", "Walnuts, Apricots, Mixed Dry Fruits"]
        },
        {
            id: 2,
            title: "Spices & Masala",
            description: "Authentic, lab-tested spices and custom masala blends that elevate flavor and meet international quality standards.",
            image: "https://res.cloudinary.com/datkxm0yf/image/upload/v1771319477/masla_dbjfif.jpg",
            features: [" Whole & ground spices (Haldi, Jeera, Mirchi)", "Custom masala blends", "Purity guarantee"]
        },
        {
            id: 3,
            title: "Oils & Ghee",
            description: "Cold-pressed oils and pure ghee for traditional cooking and modern health-conscious kitchens.",
            image: "https://res.cloudinary.com/datkxm0yf/image/upload/v1771319478/oils_khbtlw.jpg",
            features: ["Mustard, Groundnut, Coconut oils", "Pure ghee", "Nationwide coverage", "Available in retail and bulk formats"]
        },
        {
            id: 4,
            title: "Grains & Rice",
            description: "Premium-grade grains and rice sourced from trusted farms and suppliers, ideal for retail, gifting, and culinary use.",
            image: "https://res.cloudinary.com/datkxm0yf/image/upload/v1771319476/grains_u3e37u.jpg",
            features: ["Basmati, Sona Masoori, Idli Rice", "Wheat, Pulses, Millets", "Custom packaging options"]
        }
    ];

    return (
        <section className="services-section" id="services">
            {/* Hero Section */}
            <div className="services-hero">
                <div className="services-hero-content">
                    <h1>Our Products Categories</h1>
                    <p className="services-hero-subtitle">
                        We provide a wide range of products to meet your needs
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="services-content-wrapper">
                {/* Introduction */}
                <div className="services-intro">
                    <h2>What We Offer</h2>
                    <p>
                        We provide a wide range of products to meet your needs
                    </p>
                </div>

                {/* Service Cards */}
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-card-inner">
                                <div className="service-card-front">
                                    <img src={service.image} alt={service.title} />
                                    <div className="card-front-overlay">
                                        <h3>{service.title}</h3>
                                        <span className="tap-hint">Tap to see details</span>
                                    </div>
                                </div>
                                <div className="service-card-back">
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
                        </div>
                    ))}
                </div>

                {/* Additional Features */}
                <div className="services-features">
                    <h2>Why Choose Our Products</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🌟</div>
                            <h4>Wide Range of Products</h4>
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
                    <button className="cta-button"><a href="#contact">Get Started Today</a></button>
                </div>
            </div>
        </section>
    )
}