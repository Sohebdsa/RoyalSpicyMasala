import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product, index }) => {
    return (
        <motion.div
            className="product-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
        >
            <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.badge && <span className="product-badge">{product.badge}</span>}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-details">
                    <div className="product-weight">
                        <span className="detail-label">Weight:</span>
                        <span className="detail-value">{product.weight}</span>
                    </div>
                    <div className="product-rating">
                        <span className="stars">{'⭐'.repeat(product.rating)}</span>
                        <span className="rating-text">({product.reviews})</span>
                    </div>
                </div>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="current-price">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="original-price">₹{product.originalPrice}</span>
                        )}
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
