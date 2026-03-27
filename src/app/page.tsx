import ProductCard from "./components/product-card/ProductCard";
import styles from "./styles/home.module.css";
import { ProductService } from "./services/products-services";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  
  try {
    // Standardizing by using ProductService for all fetching
    // This allows centralized header management and error handling
    const allProducts = await ProductService.getProducts();
    if (allProducts && Array.isArray(allProducts)) {
        products = allProducts.slice(0, 6);
    }
  } catch (error) {
    console.error("Home page: FAILED to fetch recommended products:", error);
    products = [];
  }

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Welcome to MyStore</h1>
        <p>Your one-stop destination for quality products</p>
      </section>

      <section className={styles.recommended}>
        <h2>🛍️ Recommended Products</h2>
        {products && products.length > 0 ? (
            <div className={styles.grid}>
            {products.map((p: any) => (
                <ProductCard key={p.id} product={p} />
            ))}
            </div>
        ) : (
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
               <p style={{ opacity: 0.7 }}>No recommended products available.</p>
               <p style={{ fontSize: '0.9rem', color: '#888' }}>
                   Check back later or explore the <strong>Products</strong> section.
               </p>
            </div>
        )}
      </section>
    </div>
  );
}
