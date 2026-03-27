import ProductCard from "./components/product-card/ProductCard";
import styles from "./styles/home.module.css";
import { ProductService } from "./services/products-services";

export default async function Home() {
  let products = [];
  
  try {
    // Attempting to fetch recommended products
    // We can use ProductService but here it has a limit=6 parameter.
    // I will use ProductService.getProducts() or just fetch with better error handling.
    const res = await fetch("https://fakestoreapi.com/products?limit=6", { cache: "no-store" });
    
    if (res.ok) {
        products = await res.json();
    } else {
        console.warn(`Home page: API returned status ${res.status}. Falling back to empty array.`);
    }

    if (!Array.isArray(products)) {
        console.warn("Home page: API did not return an array. Falling back.");
        products = [];
    }

  } catch (error) {
    console.error("Home page: Failed to fetch products during pre-render:", error);
    // Returning an empty page or fallback content instead of crashing the whole build
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
        {products.length > 0 ? (
            <div className={styles.grid}>
            {products.map((p: any) => (
                <ProductCard key={p.id} product={p} />
            ))}
            </div>
        ) : (
            <p style={{ textAlign: 'center', opacity: 0.7 }}>
                No recommended products available at the moment.
            </p>
        )}
      </section>
    </div>
  );
}
