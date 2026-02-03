import './Footer.css';
export default function Footer() {
    return (
        <footer className="simple-footer">
            <div className="footer-container">
                <p>© {new Date().getFullYear()} <span>Royal Spicy Masala</span>. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}