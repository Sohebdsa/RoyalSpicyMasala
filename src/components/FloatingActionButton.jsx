import { useState } from 'react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import './FloatingActionButton.css';

const FloatingActionButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setIsOpen(false);
    };

    const handleContactUs = () => {
        // Scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const handleCallUs = () => {
        // Call the business phone number
        window.location.href = 'tel:+919702713157';
        setIsOpen(false);
    };

    return (
        <div className="fab-container">
            {/* Menu Options */}
            <div className={`fab-menu ${isOpen ? 'open' : ''}`}>
                <button className="fab-option" onClick={scrollToTop} title="Scroll to Top">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4l-8 8h5v8h6v-8h5z" />
                    </svg>
                    <span>Scroll to Top</span>
                </button>

                <button className="fab-option" onClick={handleContactUs} title="Contact Us">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>Contact Us</span>
                </button>

                <button className="fab-option" onClick={handleCallUs} title="Call Us">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                    <span>Call Us</span>
                </button>
            </div>

            {/* Main FAB Button */}
            <button
                className={`fab-main ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Quick Actions"
            >
                {isOpen ? (
                    <svg
                        className="fab-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                ) : (
                    <SupportAgentIcon className="fab-icon" />
                )}
            </button>
        </div>
    );
};

export default FloatingActionButton;
