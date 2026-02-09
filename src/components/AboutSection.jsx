import './AboutSection.css'
import InfiniteSlider from '../common/infiniteSlider'

export default function AboutSection() {
    return (
        <section className="about-section" id="about">
            <InfiniteSlider />
            {/* Hero Section */}
            {/* <div className="about-hero">
                <div className="about-hero-overlay">
                    <div className="about-hero-content">
                        <h1>Our Legacy of Purity</h1>
                        <p className="about-hero-subtitle">
                            Bridging the gap between farm-fresh quality and affordable pricing
                        </p>
                    </div>
                </div>
            </div> */}
            {/* Main Content */}
            <div className="about-content-wrapper">
                {/* Philosophy Section */}
                <div className="about-philosophy">
                    <h2>Building Trust Through Scale & Philosophy</h2>
                    <p className="about-lead">
                        At Royal Spicy Masala, we bridge the gap between farm-fresh quality and affordable pricing.
                        As a premier distributor and wholesaler, we specialize in sourcing the finest organic spices,
                        nutrient-rich grains, and premium dry fruits.
                    </p>
                    <p className="about-description">
                        With a robust network featuring <strong>250+ top-tier brands</strong>, we ensure that every
                        kitchen—from households to commercial restaurants—has access to the gold standard of ingredients.
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="about-stats">
                    <div className="stat-card">
                        <div className="stat-number">250+</div>
                        <div className="stat-label">Premium Brands</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Organic Certified</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Customer Support</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">1000+</div>
                        <div className="stat-label">Happy Clients</div>
                    </div>
                </div>

                {/* Value Propositions with Images */}
                <div className="about-values">
                    <div className="value-card">
                        <div className="value-image">
                            <img src="/AboutSectionImg/farm_fresh_quality.png" alt="Farm Fresh Quality" />
                        </div>
                        <div className="value-content">
                            <h3>🌾 Farm-Fresh Quality</h3>
                            <p>
                                Direct sourcing from organic farms ensures maximum freshness and nutritional value.
                                We work closely with farmers to maintain the highest standards of purity.
                            </p>
                        </div>
                    </div>

                    <div className="value-card value-card-reverse">
                        <div className="value-image">
                            <img src="/AboutSectionImg/product_diversity.png" alt="Product Diversity" />
                        </div>
                        <div className="value-content">
                            <h3>🎯 Comprehensive Range</h3>
                            <p>
                                From aromatic spices to nutrient-rich grains and premium dry fruits, our extensive
                                catalog covers every culinary need with uncompromising quality.
                            </p>
                        </div>
                    </div>

                    <div className="value-card">
                        <div className="value-image">
                            <img src="/AboutSectionImg/distribution_network.png" alt="Distribution Network" />
                        </div>
                        <div className="value-content">
                            <h3>🚚 Robust Distribution</h3>
                            <p>
                                Our state-of-the-art distribution network ensures timely delivery and maintains
                                product integrity from our warehouse to your kitchen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Statement */}
                {/* <div className="about-mission">
                    <h2>Our Mission</h2>
                    <p>
                        To make premium, organic ingredients accessible to everyone by combining traditional
                        quality with modern efficiency. We believe that exceptional taste and nutrition
                        shouldn't come at a premium price.
                    </p>
                </div> */}
            </div>
        </section>
    )
}