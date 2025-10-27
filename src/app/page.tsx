import ProductCard from "./components/product-card/ProductCard";
import styles from "./styles/home.module.css";

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products?limit=6");
  const products = await res.json();

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Welcome to MyStore</h1>
        <p>Your one-stop destination for quality products</p>
      </section>

      <section className={styles.recommended}>
        <h2>🛍️ Recommended Products</h2>
        <div className={styles.grid}>
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
