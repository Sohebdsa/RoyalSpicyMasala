import Navbar from './components/Navbar'
import ScrollHero from './components/ScrollHero'
import ProductSection from './components/Productsection'
import ServiceSection from './components/ServiceSection'
import AboutSection from './components/AboutSection'
import ContactSection from "./components/Contactsection";
import Footer from './components/Footer'
import LocationSection from './components/LocationSection'

import { SpeedInsights } from "@vercel/speed-insights/react"

import './App.css'

function App() {
    // Dummy product data
    const products = [
        {
            id: 1,
            name: "Premium Almonds",
            description: "Premium quality almonds",
            image: "/productsImg/almonds.png",
            weight: "100g",
            price: 299,
            originalPrice: 399,
            rating: 5,
            reviews: 128,
            badge: "Bestseller"
        },
        {
            id: 2,
            name: "Kashmiri Red Chili",
            description: "Vibrant color and mild heat, perfect for authentic Indian dishes",
            image: "/productsImg/kasmiriMirchi.png",
            weight: "200g",
            price: 249,
            originalPrice: 329,
            rating: 5,
            reviews: 95,
            badge: "Hot"
        },
        {
            id: 3,
            name: "Turmeric Powder",
            description: "Pure, organic turmeric with anti-inflammatory properties",
            image: "/productsImg/haldi.png",
            weight: "150g",
            price: 199,
            originalPrice: null,
            rating: 5,
            reviews: 203,
            badge: "Organic"
        },
        {
            id: 4,
            name: "Cumin Seeds",
            description: "Aromatic whole cumin seeds for tempering and flavoring",
            image: "/productsImg/jeera.png",
            weight: "100g",
            price: 149,
            originalPrice: null,
            rating: 4,
            reviews: 67,
            badge: null
        },
        {
            id: 5,
            name: "Biryani Masala",
            description: "Special blend for authentic, restaurant-style biryani",
            image: "/productsImg/biryanimasala.png",
            weight: "100g",
            price: 279,
            originalPrice: 349,
            rating: 5,
            reviews: 156,
            badge: "New"
        },
        {
            id: 6,
            name: "Coriander Powder",
            description: "Freshly ground coriander for earthy, citrusy flavor",
            image: "/productsImg/coriander_powder.png",
            weight: "200g",
            price: 179,
            originalPrice: null,
            rating: 4,
            reviews: 89,
            badge: null
        }
    ];

    return (
        <div className="app">
            <Navbar />
            <ScrollHero />
            {/* Products Section */}
            <ProductSection products={products} />

            {/* Services Section */}
            <ServiceSection />

            {/* About Section */}
            <AboutSection />

            {/* Location Section */}
            <LocationSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />

            {/* Speed Insights Tracking */}
            <SpeedInsights />
        </div>
    )
}

export default App
