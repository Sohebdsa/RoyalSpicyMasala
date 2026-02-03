import Navbar from './components/Navbar'
import ScrollHero from './components/ScrollHero'
import ProductSection from './components/Productsection'
import ServiceSection from './components/ServiceSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

import './App.css'

function App() {
    // Dummy product data
    const products = [
        {
            id: 1,
            name: "Premium Garam Masala",
            description: "Authentic blend of aromatic spices for rich, flavorful curries",
            image: "https://images.unsplash.com/photo-1596040033229-a0b4e4d4e3d0?w=500&h=500&fit=crop",
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
            image: "https://images.unsplash.com/photo-1599909533730-f9b3e5d0d0e5?w=500&h=500&fit=crop",
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
            image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&h=500&fit=crop",
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
            image: "https://images.unsplash.com/photo-1599909533730-f9b3e5d0d0e5?w=500&h=500&fit=crop",
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
            image: "https://images.unsplash.com/photo-1596040033229-a0b4e4d4e3d0?w=500&h=500&fit=crop",
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
            image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&h=500&fit=crop",
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

            {/* About Section */}
            <AboutSection />

            {/* Products Section */}
            <ProductSection />

            {/* Services Section */}
            <ServiceSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default App
