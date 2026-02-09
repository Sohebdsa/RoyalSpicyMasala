import ProductCard from './ProductCard';
import './ProductSection.css';

export default function ProductSection({ products }) {
    return <section className="content-section" id="products">
        <div className="content-wrapper">
            <h2>Our Products</h2>
            <p>
                Discover our premium collection of authentic spices and masalas,
                crafted with the finest ingredients to bring authentic flavors to your kitchen.
            </p>
            <div className="products-grid">
                {products && products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </div>
    </section>
}